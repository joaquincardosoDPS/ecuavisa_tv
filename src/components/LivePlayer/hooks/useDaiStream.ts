import { useEffect, useRef, useState, useCallback } from "react";
import { getHlsSessionParams } from "@/services/hlsSessionService";
import type { HlsSessionParams } from "@/services/hlsSessionService";

declare const google: any;

/** Fases del flujo de ads en live */
type AdPhase = 'vast' | 'dai' | 'content';

interface UseDaiStreamOptions {
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
  /** Callback cuando se obtienen session params (para xhrSetup de useHlsStream) */
  onSessionParamsReady?: (params: HlsSessionParams) => void;
}

/**
 * Hook específico de Live: gestiona Google IMA DAI (server-side ad insertion),
 * VAST preroll, y session params DPS.
 *
 * Expone `resolvedStreamUrl` que useHlsStream usa como `src`.
 * Cuando DAI resuelve la URL del stream, la setea y useHlsStream arranca.
 */
export function useDaiStream({
  streamSrc,
  assetKey,
  vastUrl,
  videoRef,
  adUiRef,
  onSessionParamsReady,
}: UseDaiStreamOptions) {
  const streamManagerRef = useRef<any>(null);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [adPhase, setAdPhase] = useState<AdPhase>('content');

  // URL resuelta: cuando se setea, useHlsStream (en el padre) arranca
  const [resolvedStreamUrl, setResolvedStreamUrl] = useState('');

  // Refs para evitar stale closures
  const assetKeyRef = useRef(assetKey);
  const streamSrcRef = useRef(streamSrc);
  assetKeyRef.current = assetKey;
  streamSrcRef.current = streamSrc;

  const isAdPlayingRef = useRef(isAdPlaying);
  isAdPlayingRef.current = isAdPlaying;

  // Generación: se incrementa en cada cambio de señal
  const generationRef = useRef(0);

  // Ref del setTimeout pendiente
  const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determinar si hay VAST preroll válido
  const hasVast = !!(vastUrl && vastUrl.trim() !== '' && vastUrl !== 'none');

  // Estado expuesto: ¿mostrar VastPlayer?
  const showVastPreroll = adPhase === 'vast';

  // Cleanup centralizado del StreamManager
  const cleanupStreamManager = useCallback(() => {
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
  }, []);

  // Cancelar timeout pendiente
  const cancelPendingTimeout = useCallback(() => {
    if (startTimeoutRef.current !== null) {
      clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
  }, []);

  // Función que inicia DAI/HLS (fase 2)
  const startDaiOrHls = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    const myGeneration = generationRef.current;
    const currentAssetKey = assetKeyRef.current;
    const currentStreamSrc = streamSrcRef.current;

    // Limpiar instancias previas
    cleanupStreamManager();
    // Limpiar URL resuelta para que useHlsStream destruya la instancia anterior
    setResolvedStreamUrl('');

    // Obtener parámetros de sesión DPS
    let sessionParams: HlsSessionParams | null = null;
    try {
      sessionParams = await getHlsSessionParams();
      console.log("[Live] Session params obtenidos:", sessionParams);
    } catch (err) {
      console.warn("[Live] No se pudieron obtener session params:", err);
    }

    // Guard: verificar generación
    if (generationRef.current !== myGeneration) {
      console.warn("[Live] Generación cambió durante getHlsSessionParams, abortando");
      return;
    }

    // Notificar session params al padre (para xhrSetup de useHlsStream)
    if (sessionParams && onSessionParamsReady) {
      onSessionParamsReady(sessionParams);
    }

    // Función para setear la URL resuelta → useHlsStream arranca automáticamente
    const loadUrl = (url: string) => {
      if (generationRef.current !== myGeneration) {
        console.warn("[Live] Stale loadUrl call ignored");
        return;
      }
      if (!url) {
        console.error("[Live] No URL provided to loadUrl");
        return;
      }
      console.log("[Live] Resolved stream URL:", url);
      setResolvedStreamUrl(url);
    };

    // Lógica de Google IMA DAI
    if (currentAssetKey && adUiRef && adUiRef.current && typeof google !== "undefined" && google && google.ima && google.ima.dai) {
      console.log("[Live] Inicializando Google IMA DAI para:", currentAssetKey);

      try {
        const streamManager = new google.ima.dai.api.StreamManager(video, adUiRef.current);
        streamManagerRef.current = streamManager;

        // LOADED
        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.LOADED,
          (e: any) => {
            if (generationRef.current !== myGeneration) return;
            console.log("[Live] DAI Stream loaded");
            const streamUrl = e.getStreamData().url;
            setAdPhase('content');
            loadUrl(streamUrl);
          },
          false
        );

        // ERROR
        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.ERROR,
          (e: any) => {
            if (generationRef.current !== myGeneration) return;
            console.error("[Live] DAI Error, playing backup stream.", e);
            setAdPhase('content');
            loadUrl(currentStreamSrc);
          },
          false
        );

        // AD_BREAK_STARTED
        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED,
          () => {
            if (generationRef.current !== myGeneration) return;
            console.log("[Live] Ad Break Started");
            setIsAdPlaying(true);
            video.controls = false;
            if (adUiRef.current) adUiRef.current.style.display = 'block';
          },
          false
        );

        // AD_BREAK_ENDED
        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED,
          () => {
            if (generationRef.current !== myGeneration) return;
            console.log("[Live] Ad Break Ended");
            setIsAdPlaying(false);
            video.controls = false;
            if (adUiRef.current) adUiRef.current.style.display = 'none';
          },
          false
        );

        // AD_PROGRESS
        streamManager.addEventListener(
          google.ima.dai.api.StreamEvent.Type.AD_PROGRESS,
          (e: any) => {
            if (generationRef.current !== myGeneration) return;
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

        // Pause/Play handlers para ads
        const onPause = () => {
          if (isAdPlayingRef.current && adUiRef.current) {
            adUiRef.current.style.display = 'none';
          }
        };
        const onPlay = () => {
          if (isAdPlayingRef.current && adUiRef.current) {
            adUiRef.current.style.display = 'block';
          }
        };
        video.addEventListener('pause', onPause);
        video.addEventListener('play', onPlay);

        // Solicitar LiveStream
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
      // Sin DAI, reproducir HLS estándar
      if (currentAssetKey) {
        console.log("[Live] IMA SDK no disponible. Reproduciendo HLS estándar.");
      }
      setAdPhase('content');
      loadUrl(currentStreamSrc);
    }
  }, [videoRef, adUiRef, cleanupStreamManager, onSessionParamsReady]);

  // Callback: VastPlayer terminó → iniciar DAI/HLS
  const onVastFinished = useCallback(() => {
    console.log("[Live] VAST preroll terminado, iniciando DAI/HLS...");
    setAdPhase('dai');
    startDaiOrHls();
  }, [startDaiOrHls]);

  // Callback: procesar metadata ID3 para DAI (con deduplicación por PTS)
  // Cada segmento .ts puede tener múltiples frames ID3 con el mismo PTS.
  // Solo necesitamos enviar 1 por PTS al StreamManager para evitar
  // requests redundantes a id3-events.json.
  const lastProcessedPtsRef = useRef<number>(-1);

  const processMetadata = useCallback((samples: any[]) => {
    if (!streamManagerRef.current) return;

    for (let i = 0; i < samples.length; i++) {
      const sample = samples[i];
      // Deduplicar: saltar si ya procesamos este PTS
      if (sample.pts === lastProcessedPtsRef.current) continue;
      lastProcessedPtsRef.current = sample.pts;
      streamManagerRef.current.processMetadata('ID3', sample.data, sample.pts);
    }
  }, []);

  // Efecto principal: al cambiar señal, decidir fase inicial
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamSrc) return;

    // Incrementar generación
    generationRef.current++;
    const currentGen = generationRef.current;
    console.log("[Live] Nueva señal, generación:", currentGen, "src:", streamSrc);

    // Cancelar timeout pendiente
    cancelPendingTimeout();

    // Cleanup previo
    cleanupStreamManager();
    setResolvedStreamUrl(''); // Limpiar → useHlsStream destruye la instancia
    setIsAdPlaying(false);
    lastProcessedPtsRef.current = -1; // Reset deduplicación de ID3

    if (hasVast) {
      console.log("[Live] Señal con VAST preroll, mostrando preroll...");
      setAdPhase('vast');
    } else {
      console.log("[Live] Sin VAST preroll, iniciando DAI/HLS directo...");
      setAdPhase('dai');
      startTimeoutRef.current = setTimeout(() => {
        startTimeoutRef.current = null;
        if (generationRef.current !== currentGen) {
          console.warn("[Live] setTimeout stale, generación cambió durante delay");
          return;
        }
        startDaiOrHls();
      }, 50);
    }

    return () => {
      cancelPendingTimeout();
      cleanupStreamManager();
      setResolvedStreamUrl('');
      setIsAdPlaying(false);
      setAdPhase('content');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamSrc, assetKey, vastUrl]);

  return {
    isAdPlaying,
    showVastPreroll,
    vastAdUrl: hasVast ? vastUrl! : null,
    onVastFinished,
    processMetadata,
    adPhase,
    /** URL resuelta del stream — pasarla como `src` a useHlsStream */
    resolvedStreamUrl,
  };
}
