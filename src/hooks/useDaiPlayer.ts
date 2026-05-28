import { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";

interface UseDaiPlayerOptions {
  /** URL m3u8 del stream en vivo (backup si DAI falla) */
  streamSrc: string;
  /** Llave del recurso DAI (DPSDAIAssetKey) — si existe, se usa DAI */
  assetKey?: string | null;
  /** URL VAST para preroll client-side (si existe, se muestra antes de DAI) */
  vastUrl?: string | null;
  /** Ref al elemento video */
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** Ref al contenedor de la UI de anuncios de IMA */
  adUiRef?: React.RefObject<HTMLDivElement | null>;
}

declare const google: any;

/** Fases del flujo de ads en live */
type AdPhase = 'vast' | 'dai' | 'content';

/**
 * Hook que reproduce un stream en vivo con soporte para:
 * 1. VAST preroll (client-side, opcional) → se muestra primero
 * 2. Google IMA DAI (Full Service, opcional) → stream con ads stitched
 * 3. HLS estándar como fallback final
 *
 * Flujo: VAST preroll → DAI stream (o HLS plano)
 */
export function useDaiPlayer({
  streamSrc,
  assetKey,
  vastUrl,
  videoRef,
  adUiRef,
}: UseDaiPlayerOptions) {
  const hlsRef = useRef<Hls | null>(null);
  const streamManagerRef = useRef<any>(null);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [adPhase, setAdPhase] = useState<AdPhase>('content');

  // ── Refs para evitar stale closures en el cleanup ──
  const assetKeyRef = useRef(assetKey);
  const streamSrcRef = useRef(streamSrc);
  assetKeyRef.current = assetKey;
  streamSrcRef.current = streamSrc;

  // ── Determinar si hay VAST preroll válido ──
  const hasVast = !!(vastUrl && vastUrl.trim() !== '' && vastUrl !== 'none');

  // ── Estado expuesto: ¿mostrar VastPlayer? ──
  const showVastPreroll = adPhase === 'vast';

  // ── Función que inicia DAI/HLS (fase 2) ──
  const startDaiOrHls = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const currentAssetKey = assetKeyRef.current;
    const currentStreamSrc = streamSrcRef.current;

    // Limpiar instancias previas de HLS/StreamManager
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (streamManagerRef.current) {
      try {
        if (typeof streamManagerRef.current.destroy === 'function') {
          streamManagerRef.current.destroy();
        } else if (typeof streamManagerRef.current.reset === 'function') {
          streamManagerRef.current.reset();
        }
      } catch (e) {
        console.warn("[Live] Error cleaning StreamManager", e);
      }
      streamManagerRef.current = null;
    }

    // ── Función para cargar HLS en el reproductor ──
    const loadUrl = (url: string) => {
      if (!url) {
        console.error("[Live] No URL provided to loadUrl");
        return;
      }

      console.log("[Live] Loading stream:", url);

      if (Hls.isSupported()) {
        const hls = new Hls({
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
          if (streamManagerRef.current && data && data.samples) {
            data.samples.forEach((sample: any) => {
              streamManagerRef.current.processMetadata('ID3', sample.data, sample.pts);
            });
          }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("[Live] Manifest parsed, playing...");
          video.play().then(() => {
            video.muted = false;
          }).catch((err) => {
            console.warn("[Live] Autoplay prevented:", err);
          });
        });

        let networkRetries = 0;
        const MAX_NETWORK_RETRIES = 3;

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                networkRetries++;
                if (networkRetries <= MAX_NETWORK_RETRIES) {
                  console.warn(`[Live] Network error (${networkRetries}/${MAX_NETWORK_RETRIES}), retrying...`);
                  hls?.startLoad();
                } else {
                  // DAI stream inalcanzable, fallback al stream directo
                  const backupSrc = streamSrcRef.current;
                  if (url !== backupSrc && backupSrc) {
                    console.warn("[Live] DAI stream unreachable, falling back to backup HLS:", backupSrc);
                    hls?.destroy();
                    hlsRef.current = null;
                    streamManagerRef.current = null;
                    loadUrl(backupSrc);
                  } else {
                    console.error("[Live] Network error, no fallback available");
                    hls?.destroy();
                  }
                }
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
    if (currentAssetKey && adUiRef?.current && typeof google !== "undefined" && google?.ima?.dai) {
      console.log("[Live] Inicializando Google IMA DAI (LiveStreamRequest) para:", currentAssetKey);

      try {
        const streamManager = new google.ima.dai.api.StreamManager(video, adUiRef.current);
        streamManagerRef.current = streamManager;

        // Eventos del StreamManager
        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.LOADED,
          (e: any) => {
            console.log("[Live] DAI Stream loaded");
            const streamUrl = e.getStreamData().url;
            setAdPhase('content');
            loadUrl(streamUrl);
          },
          false
        );

        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.ERROR,
          (e: any) => {
            console.error("[Live] DAI Error, playing backup stream.", e);
            setAdPhase('content');
            loadUrl(currentStreamSrc);
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
        streamRequest.assetKey = currentAssetKey;
        streamManager.requestStream(streamRequest);
        console.log("[Live] DAI LiveStreamRequest enviado con assetKey:", currentAssetKey);

      } catch (err) {
        console.error("[Live] Error initializing IMA DAI:", err);
        setAdPhase('content');
        loadUrl(currentStreamSrc);
      }

    } else {
      // ── Sin DAI, reproducir HLS estándar ──
      if (currentAssetKey) {
        console.log("[Live] IMA SDK no disponible. Reproduciendo HLS estándar.");
      }
      setAdPhase('content');
      loadUrl(currentStreamSrc);
    }
  }, [videoRef, adUiRef, isAdPlaying]);

  // ── Callback expuesto: VastPlayer terminó → iniciar DAI/HLS ──
  const onVastFinished = useCallback(() => {
    console.log("[Live] VAST preroll terminado, iniciando DAI/HLS...");
    setAdPhase('dai');
    startDaiOrHls();
  }, [startDaiOrHls]);

  // ── Efecto principal: al cambiar señal/vastUrl, decidir fase inicial ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamSrc) return;

    // Cleanup previo
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (streamManagerRef.current) {
      try {
        if (typeof streamManagerRef.current.destroy === 'function') {
          streamManagerRef.current.destroy();
        } else if (typeof streamManagerRef.current.reset === 'function') {
          streamManagerRef.current.reset();
        }
      } catch (e) {
        console.warn("[Live] Error cleaning StreamManager", e);
      }
      streamManagerRef.current = null;
    }
    video.pause();
    video.removeAttribute("src");
    video.load();
    setIsAdPlaying(false);

    if (hasVast) {
      // Fase 1: mostrar VAST preroll — DAI arrancará después via onVastFinished
      console.log("[Live] Señal con VAST preroll, mostrando preroll...");
      setAdPhase('vast');
    } else {
      // Sin VAST → ir directo a DAI/HLS
      console.log("[Live] Sin VAST preroll, iniciando DAI/HLS directo...");
      setAdPhase('dai');
      // Pequeño delay para que el cleanup del video se aplique
      setTimeout(() => startDaiOrHls(), 50);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (streamManagerRef.current) {
        try {
          if (typeof streamManagerRef.current.destroy === 'function') {
            streamManagerRef.current.destroy();
          } else if (typeof streamManagerRef.current.reset === 'function') {
            streamManagerRef.current.reset();
          }
        } catch (e) {
          console.warn("[Live] Error cleaning StreamManager", e);
        }
        streamManagerRef.current = null;
      }
      video.pause();
      video.removeAttribute("src");
      video.load();
      setIsAdPlaying(false);
      setAdPhase('content');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamSrc, assetKey, vastUrl]);

  return {
    isAdPlaying,
    /** true cuando se debe renderizar el VastPlayer overlay */
    showVastPreroll,
    /** URL VAST enriquecida para pasar al VastPlayer */
    vastAdUrl: hasVast ? vastUrl! : null,
    /** Callback para cuando VastPlayer termina (ad completado, error, o timeout) */
    onVastFinished,
  };
}
