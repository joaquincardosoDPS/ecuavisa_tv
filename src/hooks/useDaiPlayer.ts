import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface UseDaiPlayerOptions {
  /** URL m3u8 del stream en vivo (backup si DAI falla) */
  streamSrc: string;
  /** Llave del recurso DAI (DPSDAIAssetKey) — si existe, se usa DAI */
  assetKey?: string | null;
  /** Ref al elemento video */
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** Ref al contenedor de la UI de anuncios de IMA */
  adUiRef?: React.RefObject<HTMLDivElement | null>;
}

declare const google: any;

/**
 * Hook que reproduce un stream en vivo usando Google IMA DAI (Full Service)
 * o HLS estándar como fallback.
 *
 * Usa LiveStreamRequest con assetKey — Google devuelve la URL del stream
 * con ads ya stitched vía el evento LOADED.
 */
export function useDaiPlayer({
  streamSrc,
  assetKey,
  videoRef,
  adUiRef,
}: UseDaiPlayerOptions) {
  const hlsRef = useRef<Hls | null>(null);
  const streamManagerRef = useRef<any>(null);
  const [isAdPlaying, setIsAdPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamSrc) return;

    let hls: Hls | null = null;
    let streamManager: any = null;

    // Limpiar instancias previas
    const cleanup = () => {
      if (hls) {
        hls.destroy();
        hls = null;
        hlsRef.current = null;
      }
      if (streamManager) {
        try {
          if (typeof streamManager.destroy === 'function') {
            streamManager.destroy();
          } else if (typeof streamManager.reset === 'function') {
            streamManager.reset();
          }
        } catch (e) {
          console.warn("[Live] Error cleaning StreamManager", e);
        }
        streamManager = null;
        streamManagerRef.current = null;
      }
      video.pause();
      video.removeAttribute("src");
      video.load();
      setIsAdPlaying(false);
    };

    cleanup();

    // ── Función para cargar HLS en el reproductor ──
    const loadUrl = (url: string) => {
      if (!url) {
        console.error("[Live] No URL provided to loadUrl");
        return;
      }

      console.log("[Live] Loading stream:", url);

      if (Hls.isSupported()) {
        hls = new Hls({
          autoStartLoad: true,
          enableWorker: true,
          lowLatencyMode: false,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 10,
          liveDurationInfinity: true,
          backBufferLength: 30,
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
        });
        hlsRef.current = hls;

        hls.loadSource(url);
        hls.attachMedia(video);

        // Pasar metadata ID3 al StreamManager de IMA DAI
        hls.on(Hls.Events.FRAG_PARSING_METADATA, (_event, data) => {
          if (streamManager && data && data.samples) {
            data.samples.forEach((sample: any) => {
              streamManager.processMetadata('ID3', sample.data, sample.pts);
            });
          }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("[Live] Manifest parsed, playing...");
          video.play().catch((err) => {
            console.warn("[Live] Autoplay prevented:", err);
          });
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.warn("[Live] Network error, retrying...");
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn("[Live] Media error, recovering...");
                hls?.recoverMediaError();
                break;
              default:
                console.error("[Live] Fatal error:", data);
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.play().catch(() => { });
      }
    };

    // ── Lógica de Google IMA DAI (Full Service — LiveStreamRequest) ──
    if (assetKey && adUiRef?.current && typeof google !== "undefined" && google?.ima?.dai) {
      console.log("[Live] Inicializando Google IMA DAI (LiveStreamRequest) para:", assetKey);

      try {
        streamManager = new google.ima.dai.api.StreamManager(video, adUiRef.current);
        streamManagerRef.current = streamManager;

        // Eventos del StreamManager
        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.LOADED,
          (e: any) => {
            console.log("[Live] DAI Stream loaded");
            const streamUrl = e.getStreamData().url;
            loadUrl(streamUrl);
          },
          false
        );

        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.ERROR,
          (e: any) => {
            console.error("[Live] DAI Error, playing backup stream.", e);
            loadUrl(streamSrc);
          },
          false
        );

        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED,
          () => {
            console.log("[Live] Ad Break Started");
            setIsAdPlaying(true);
            video.controls = false;
            if (adUiRef.current) adUiRef.current.style.display = 'block';
          },
          false
        );

        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED,
          () => {
            console.log("[Live] Ad Break Ended");
            setIsAdPlaying(false);
            video.controls = false;
            if (adUiRef.current) adUiRef.current.style.display = 'none';
          },
          false
        );

        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.AD_PROGRESS,
          (e: any) => {
            const adProgressData = e.getStreamData().adProgressData;
            if (adProgressData) {
              console.log(
                `[Live] Ad ${adProgressData.adPosition}/${adProgressData.totalAds} ` +
                `${Math.floor(adProgressData.duration - adProgressData.currentTime)}s remaining`
              );
            }
          },
          false
        );

        // Pause/Play handlers para interacción durante ads
        const onPause = () => {
          if (isAdPlaying && adUiRef.current) {
            adUiRef.current.style.display = 'none';
          }
        };
        const onPlay = () => {
          if (isAdPlaying && adUiRef.current) {
            adUiRef.current.style.display = 'block';
          }
        };
        video.addEventListener('pause', onPause);
        video.addEventListener('play', onPlay);

        // Solicitar LiveStream con assetKey
        const streamRequest = new google.ima.dai.api.LiveStreamRequest();
        streamRequest.assetKey = assetKey;
        streamManager.requestStream(streamRequest);
        console.log("[Live] DAI LiveStreamRequest enviado con assetKey:", assetKey);

      } catch (err) {
        console.error("[Live] Error initializing IMA DAI:", err);
        loadUrl(streamSrc);
      }

    } else {
      // ── Sin DAI, reproducir HLS estándar ──
      if (assetKey) {
        console.log("[Live] IMA SDK no disponible. Reproduciendo HLS estándar.");
      }
      loadUrl(streamSrc);
    }

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamSrc, assetKey]);

  return {
    isAdPlaying,
  };
}
