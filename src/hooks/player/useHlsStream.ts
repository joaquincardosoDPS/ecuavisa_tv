import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';

// ── Tipos ──

interface UseHlsStreamOptions {
  /** Ref al elemento <video> (el padre lo crea) */
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** URL del stream m3u8 */
  src: string;
  /** Autoplay tras parsear manifest. Default: true */
  autoplay?: boolean;
  /** Si es stream en vivo (afecta config HLS por defecto) */
  isLive?: boolean;
  /** Token de autenticación para redirector live */
  livetoken?: string;
  /** Si false, no inicializa HLS. Default: true */
  enabled?: boolean;
  /** Segundos iniciales para seek tras manifest parsed (solo VOD) */
  initialSeconds?: number;
  /** Override de config HLS.js */
  hlsConfig?: Partial<Hls['config']>;
  /** Interceptor de requests XHR (para session params en Live) */
  xhrSetup?: (xhr: XMLHttpRequest, url: string) => void;
  /** Callback cuando HLS parsea metadata ID3 (para DAI) */
  onMetadata?: (samples: any[]) => void;
  /** Callback en error fatal no recuperable */
  onFatalError?: (data: any) => void;
  /** Callback cuando el manifest se parsea (ready) */
  onManifestParsed?: () => void;
  /** Callback cuando el video emite play */
  onPlaying?: () => void;
  /** Callback cuando el video emite pause */
  onPause?: () => void;
}

interface UseHlsStreamReturn {
  /** Ref a la instancia de HLS.js */
  hlsRef: React.RefObject<Hls | null>;
  /** Si el video se está reproduciendo */
  isPlaying: boolean;
  /** Si el video está cargando/buffering */
  isLoading: boolean;
  /** Si HLS/video está listo para reproducir */
  isReady: boolean;
  /** Si el video terminó */
  isEnded: boolean;
  /** Tiempo actual en segundos */
  currentTime: number;
  /** Duración total en segundos */
  duration: number;
  /** Tiempo cargado en buffer */
  loadedTime: number;
  /** Niveles de calidad disponibles */
  levels: { height: number; name?: string }[];
  /** Reproducir el video (con guard de readyState) */
  play: () => void;
  /** Pausar el video */
  pause: () => void;
  /** Destruir HLS y limpiar el video element */
  destroy: () => void;
  /** Cargar una nueva URL sin destruir/recrear el hook */
  loadSource: (url: string) => void;
}

// ── Config por defecto VOD ──

const DEFAULT_VOD_CONFIG: Partial<Hls['config']> = {
  autoStartLoad: true,
  enableWorker: true,
  maxBufferSize: 1000 * 1000 * 100,     // 100 MB
  maxBufferLength: 1500,
  maxMaxBufferLength: 2200,
  liveSyncDurationCount: 15,
  liveMaxLatencyDurationCount: Infinity,
  maxLiveSyncPlaybackRate: 1.0,
  highBufferWatchdogPeriod: 15000,
  startLevel: -1,
  liveDurationInfinity: false,
  liveBackBufferLength: 121,
};

// ── Utils ──

function buildLiveUrl(src: string, token: string): string {
  if (!token || token === 'undefined' || token === 'null') return src;
  const match = src.match(/\/hls\/([^/]+)\//);
  const firstSegment = match ? match[1] : null;
  if (firstSegment) {
    return `https://redirector.dps.live/hls/${firstSegment}/playlist.m3u8?auth-token=${encodeURIComponent(token)}`;
  }
  return src;
}

// ── Hook ──

/**
 * Hook compartido para gestión de HLS.js.
 * Usado tanto por VideoPlayer (VOD) como LivePlayer (Live).
 *
 * El padre crea el <video> element y pasa su ref.
 * Este hook maneja: init/destroy de HLS, eventos del video,
 * error handling con retry, y expone estado de playback.
 */
export function useHlsStream({
  videoRef,
  src,
  autoplay = true,
  isLive = false,
  livetoken,
  enabled = true,
  initialSeconds,
  hlsConfig,
  xhrSetup,
  onMetadata,
  onFatalError,
  onManifestParsed,
  onPlaying,
  onPause,
}: UseHlsStreamOptions): UseHlsStreamReturn {
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadedTime, setLoadedTime] = useState(0);
  const [levels, setLevels] = useState<{ height: number; name?: string }[]>([]);

  // Refs estables para callbacks (evitan stale closures y re-suscripciones)
  const onMetadataRef = useRef(onMetadata);
  const onFatalErrorRef = useRef(onFatalError);
  const onManifestParsedRef = useRef(onManifestParsed);
  const onPlayingRef = useRef(onPlaying);
  const onPauseRef = useRef(onPause);
  onMetadataRef.current = onMetadata;
  onFatalErrorRef.current = onFatalError;
  onManifestParsedRef.current = onManifestParsed;
  onPlayingRef.current = onPlaying;
  onPauseRef.current = onPause;

  // Ref para xhrSetup (puede cambiar con session params)
  const xhrSetupRef = useRef(xhrSetup);
  xhrSetupRef.current = xhrSetup;

  // Token efectivo
  const effectiveLivetoken = (livetoken && livetoken !== 'undefined' && livetoken !== 'null')
    ? livetoken
    : '';

  // ── Destroy ──
  const destroy = useCallback(() => {
    if (hlsRef.current) {
      console.log('[HlsStream] Destruyendo instancia HLS');
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }, [videoRef]);

  // ── Load Source (sin recrear instancia si ya existe) ──
  const loadSource = useCallback((url: string) => {
    const hls = hlsRef.current;
    if (hls) {
      console.log('[HlsStream] loadSource:', url);
      hls.loadSource(url);
    }
  }, []);

  // ── Play con guard de readyState ──
  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      video.play().catch(err => console.warn('[HlsStream] Play error:', err));
    } else {
      video.addEventListener('canplay', () => {
        video.play().catch(err => console.warn('[HlsStream] Play error after canplay:', err));
      }, { once: true });
    }
  }, [videoRef]);

  // ── Pause ──
  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [videoRef]);

  // ── Efecto principal: init/destroy HLS ──
  useEffect(() => {
    if (!enabled) return;
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (!src || src === 'undefined' || src === 'null') {
      console.warn('[HlsStream] URL inválida:', src);
      return;
    }

    // Destruir instancia previa
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    videoElement.pause();
    videoElement.removeAttribute('src');
    videoElement.load();

    // Resetear estados
    setIsLoading(true);
    setIsReady(false);
    setIsEnded(false);
    setCurrentTime(0);
    setDuration(0);
    setLoadedTime(0);
    setLevels([]);

    console.log('[HlsStream] Inicializando:', { src, isLive, autoplay });

    if (Hls.isSupported()) {
      // Merge config: defaults + isLive toggle + override del consumidor
      const mergedConfig: Partial<Hls['config']> = {
        ...DEFAULT_VOD_CONFIG,
        liveDurationInfinity: isLive,
        ...hlsConfig,
      };

      // xhrSetup via ref (para session params en Live)
      if (xhrSetupRef.current) {
        (mergedConfig as any).xhrSetup = xhrSetupRef.current;
      }

      const hls = new Hls(mergedConfig as any);
      hlsRef.current = hls;

      const hlsUrl = isLive ? buildLiveUrl(src, effectiveLivetoken) : src;
      console.log('[HlsStream] URL final:', hlsUrl);

      hls.loadSource(hlsUrl);
      hls.attachMedia(videoElement);

      // ── Manifest parsed ──
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('[HlsStream] MANIFEST_PARSED, levels:', hls.levels.length);
        setIsReady(true);

        if (hls.levels && hls.levels.length > 0) {
          setLevels(hls.levels.map(l => ({ height: l.height, name: l.name })));
        }

        if (autoplay) {
          videoElement.play().then(() => {
            console.log('[HlsStream] Autoplay success');
          }).catch(err => console.warn('[HlsStream] Autoplay prevented:', err));
        }

        if (initialSeconds && initialSeconds > 0 && !isLive) {
          console.log('[HlsStream] Seek inicial a:', initialSeconds);
          videoElement.currentTime = initialSeconds;
        }

        if (onManifestParsedRef.current) {
          onManifestParsedRef.current();
        }
      });

      // ── Level switched (debug) ──
      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        const level = hls.levels[data.level];
        if (level) {
          console.info(`[HlsStream] Calidad: ${level.height}p (${Math.round(level.bitrate / 1024)} kbps)`);
        }
      });

      // ── Metadata ID3 (para DAI en Live) ──
      hls.on(Hls.Events.FRAG_PARSING_METADATA, (_event, data) => {
        if (onMetadataRef.current && data && data.samples) {
          onMetadataRef.current(data.samples);
        }
      });

      // ── Error handling ──
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('[HlsStream] Network error, reintentando:', data);
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('[HlsStream] Media error, recuperando:', data);
              hls.recoverMediaError();
              break;
            default:
              console.error('[HlsStream] Error fatal:', data);
              hls.destroy();
              if (onFatalErrorRef.current) {
                onFatalErrorRef.current(data);
              }
              break;
          }
        }
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Soporte nativo (Safari / iOS)
      videoElement.src = isLive ? buildLiveUrl(src, livetoken || '') : src;
      videoElement.addEventListener('loadedmetadata', () => {
        setIsReady(true);
        if (initialSeconds && initialSeconds > 0 && !isLive) {
          videoElement.currentTime = initialSeconds;
        }
        if (onManifestParsedRef.current) {
          onManifestParsedRef.current();
        }
      }, { once: true });
    }

    // ── Video element event listeners ──
    const handlePlay = () => {
      setIsPlaying(true);
      if (onPlayingRef.current) onPlayingRef.current();
    };
    const handlePause = () => {
      setIsPlaying(false);
      if (onPauseRef.current) onPauseRef.current();
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      if (onPlayingRef.current) onPlayingRef.current();
    };
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
      if (videoElement.duration && !isNaN(videoElement.duration)) {
        setDuration(videoElement.duration);
      }
      if (videoElement.buffered.length > 0) {
        setLoadedTime(videoElement.buffered.end(videoElement.buffered.length - 1));
      }
    };
    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('playing', handlePlaying);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('ended', handleEnded);

    // ── Cleanup ──
    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('waiting', handleWaiting);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('playing', handlePlaying);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', handleEnded);

      if (hlsRef.current) {
        console.log('[HlsStream] Destruyendo instancia (cleanup)');
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      videoElement.pause();
      videoElement.removeAttribute('src');
      videoElement.load();
    };
    // hlsConfig y xhrSetup se acceden via refs para no re-ejecutar el efecto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, autoplay, isLive, livetoken, enabled, initialSeconds, videoRef]);

  return {
    hlsRef,
    isPlaying,
    isLoading,
    isReady,
    isEnded,
    currentTime,
    duration,
    loadedTime,
    levels,
    play,
    pause,
    destroy,
    loadSource,
  };
}
