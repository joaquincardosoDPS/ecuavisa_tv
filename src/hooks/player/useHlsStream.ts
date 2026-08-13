import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import type { MetadataSample } from 'hls.js';

interface UseHlsStreamOptions {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    src: string;
    autoplay?: boolean;
    isLive?: boolean;
    livetoken?: string;
    enabled?: boolean;
    initialSeconds?: number;
    hlsConfig?: Partial<Hls['config']>;
    xhrSetup?: (xhr: XMLHttpRequest, url: string) => void;
    onMetadata?: (samples: MetadataSample[]) => void;
    onFatalError?: (data: unknown) => void;
    onManifestParsed?: () => void;
    onPlaying?: () => void;
    onPause?: () => void;
}

interface UseHlsStreamReturn {
    hlsRef: React.RefObject<Hls | null>;
    isPlaying: boolean;
    isLoading: boolean;
    isReady: boolean;
    isEnded: boolean;
    currentTime: number;
    duration: number;
    loadedTime: number;
    levels: { height: number; name?: string }[];
    play: () => void;
    pause: () => void;
    destroy: () => void;
    loadSource: (url: string) => void;
}

const DEFAULT_VOD_CONFIG: Partial<Hls['config']> = {
    autoStartLoad: true,
    enableWorker: true,
    maxBufferSize: 1000 * 1000 * 100,
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

function buildLiveUrl(src: string, token: string): string {
    if (!token || token === 'undefined' || token === 'null') return src;
    const match = src.match(/\/hls\/([^/]+)\//);
    const firstSegment = match ? match[1] : null;
    if (firstSegment) {
        return `https://redirector.dps.live/hls/${firstSegment}/playlist.m3u8?auth-token=${encodeURIComponent(token)}`;
    }
    return src;
}

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

    const xhrSetupRef = useRef(xhrSetup);
    xhrSetupRef.current = xhrSetup;

    const effectiveLivetoken = (livetoken && livetoken !== 'undefined' && livetoken !== 'null')
        ? livetoken
        : '';

    const destroy = useCallback(() => {
        if (hlsRef.current) {
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

    const loadSource = useCallback((url: string) => {
        const hls = hlsRef.current;
        if (hls) {
            hls.loadSource(url);
        }
    }, []);

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

    const pause = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [videoRef]);

    useEffect(() => {
        if (!enabled) return;
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (!src || src === 'undefined' || src === 'null') {
            console.warn('[HlsStream] URL inválida:', src);
            return;
        }

        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();

        setIsLoading(true);
        setIsReady(false);
        setIsEnded(false);
        setCurrentTime(0);
        setDuration(0);
        setLoadedTime(0);
        setLevels([]);

        if (Hls.isSupported()) {
            const mergedConfig: Partial<Hls['config']> = {
                ...DEFAULT_VOD_CONFIG,
                liveDurationInfinity: isLive,
                ...hlsConfig,
            };

            if (xhrSetupRef.current) {
                (mergedConfig as Record<string, unknown>).xhrSetup = xhrSetupRef.current;
            }

            const hls = new Hls(mergedConfig);
            hlsRef.current = hls;

            const hlsUrl = isLive ? buildLiveUrl(src, effectiveLivetoken) : src;

            hls.loadSource(hlsUrl);
            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setIsReady(true);

                if (hls.levels && hls.levels.length > 0) {
                    setLevels(hls.levels.map(l => ({ height: l.height, name: l.name })));
                }

                if (autoplay) {
                    videoElement.play().catch(err => console.warn('[HlsStream] Autoplay prevented:', err));
                }

                if (initialSeconds && initialSeconds > 0 && !isLive) {
                    videoElement.currentTime = initialSeconds;
                }

                if (onManifestParsedRef.current) {
                    onManifestParsedRef.current();
                }
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
                const level = hls.levels[data.level];
                if (level) {
                    console.info(`[HlsStream] Calidad: ${level.height}p (${Math.round(level.bitrate / 1024)} kbps)`);
                }
            });

            hls.on(Hls.Events.FRAG_PARSING_METADATA, (_event, data) => {
                if (onMetadataRef.current && data && data.samples) {
                    onMetadataRef.current(data.samples);
                }
            });

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

        return () => {
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
            videoElement.removeEventListener('waiting', handleWaiting);
            videoElement.removeEventListener('canplay', handleCanPlay);
            videoElement.removeEventListener('playing', handlePlaying);
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            videoElement.removeEventListener('ended', handleEnded);

            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }

            videoElement.pause();
            videoElement.removeAttribute('src');
            videoElement.load();
        };
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
