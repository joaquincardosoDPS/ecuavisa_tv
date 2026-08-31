import { useEffect, useRef, useState, useCallback } from "react";
import type { MetadataSample } from "hls.js";
import { getHlsSessionParams } from "@/services/hlsSessionService";
import type { HlsSessionParams } from "@/services/hlsSessionService";

type AdPhase = 'vast' | 'dai' | 'content';

interface DaiStreamData {
    url?: string;
    adProgressData?: {
        adPosition: number;
        totalAds: number;
        duration: number;
        currentTime: number;
    };
}

interface DaiStreamEvent {
    getStreamData: () => DaiStreamData;
}

interface DaiStreamManager {
    destroy?: () => void;
    reset?: () => void;
    addEventListener: (type: string, handler: (event: DaiStreamEvent) => void, useCapture?: boolean) => void;
    processMetadata: (kind: string, data: Uint8Array, timestamp: number) => void;
    requestStream: (request: { assetKey: string }) => void;
}

interface DaiStreamManagerConstructor {
    new (video: HTMLVideoElement, adUiElement: HTMLDivElement): DaiStreamManager;
}

interface DaiApi {
    StreamManager: DaiStreamManagerConstructor;
    StreamEvent: { Type: Record<string, string> };
    LiveStreamRequest: new () => { assetKey: string };
}

declare const google: {
    ima?: {
        dai?: {
            api?: DaiApi;
        };
    };
};

interface UseDaiStreamOptions {
    streamSrc: string;
    assetKey?: string | null;
    vastUrl?: string | null;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    adUiRef?: React.RefObject<HTMLDivElement | null>;
    onSessionParamsReady?: (params: HlsSessionParams) => void;
}

/**
 * Hook específico de Live: gestiona Google IMA DAI (server-side ad insertion),
 * VAST preroll, y session params DPS.
 *
 * Expone `resolvedStreamUrl` que useHlsStream usa como `src`.
 */
export function useDaiStream({
    streamSrc,
    assetKey,
    vastUrl,
    videoRef,
    adUiRef,
    onSessionParamsReady,
}: UseDaiStreamOptions) {
    const streamManagerRef = useRef<DaiStreamManager | null>(null);
    const [isAdPlaying, setIsAdPlaying] = useState(false);
    const [adPhase, setAdPhase] = useState<AdPhase>('content');

    const [resolvedStreamUrl, setResolvedStreamUrl] = useState('');

    const assetKeyRef = useRef(assetKey);
    const streamSrcRef = useRef(streamSrc);
    assetKeyRef.current = assetKey;
    streamSrcRef.current = streamSrc;

    const isAdPlayingRef = useRef(isAdPlaying);
    isAdPlayingRef.current = isAdPlaying;

    const generationRef = useRef(0);

    const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hasVast = !!(vastUrl && vastUrl.trim() !== '' && vastUrl !== 'none');

    const showVastPreroll = adPhase === 'vast';

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

    const cancelPendingTimeout = useCallback(() => {
        if (startTimeoutRef.current !== null) {
            clearTimeout(startTimeoutRef.current);
            startTimeoutRef.current = null;
        }
    }, []);

    const startDaiOrHls = useCallback(async () => {
        const video = videoRef.current;
        if (!video) return;

        const myGeneration = generationRef.current;
        const currentAssetKey = assetKeyRef.current;
        const currentStreamSrc = streamSrcRef.current;

        cleanupStreamManager();
        setResolvedStreamUrl('');

        let sessionParams: HlsSessionParams | null = null;
        try {
            sessionParams = await getHlsSessionParams();
            console.log("[Live] Session params obtenidos:", sessionParams);
        } catch (err) {
            console.warn("[Live] No se pudieron obtener session params:", err);
        }

        if (generationRef.current !== myGeneration) {
            console.warn("[Live] Generación cambió durante getHlsSessionParams, abortando");
            return;
        }

        if (sessionParams && onSessionParamsReady) {
            onSessionParamsReady(sessionParams);
        }

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

        const daiApi = google?.ima?.dai?.api;
        if (currentAssetKey && adUiRef && adUiRef.current && daiApi) {
            console.log("[Live] Inicializando Google IMA DAI para:", currentAssetKey);

            try {
                const streamManager = new daiApi.StreamManager(video, adUiRef.current);
                streamManagerRef.current = streamManager;

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.LOADED,
                    (e: DaiStreamEvent) => {
                        if (generationRef.current !== myGeneration) return;
                        console.log("[Live] DAI Stream loaded");
                        const streamUrl = e.getStreamData().url;
                        if (streamUrl) {
                            setAdPhase('content');
                            loadUrl(streamUrl);
                        }
                    },
                    false
                );

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.ERROR,
                    (e: DaiStreamEvent) => {
                        if (generationRef.current !== myGeneration) return;
                        console.error("[Live] DAI Error, playing backup stream.", e);
                        setAdPhase('content');
                        loadUrl(currentStreamSrc);
                    },
                    false
                );

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.AD_BREAK_STARTED,
                    () => {
                        if (generationRef.current !== myGeneration) return;
                        console.log("[Live] Ad Break Started");
                        setIsAdPlaying(true);
                        video.controls = false;
                        if (adUiRef.current) adUiRef.current.style.display = 'block';
                    },
                    false
                );

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.AD_BREAK_ENDED,
                    () => {
                        if (generationRef.current !== myGeneration) return;
                        console.log("[Live] Ad Break Ended");
                        setIsAdPlaying(false);
                        video.controls = false;
                        if (adUiRef.current) adUiRef.current.style.display = 'none';
                    },
                    false
                );

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.AD_PROGRESS,
                    (e: DaiStreamEvent) => {
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

                const streamRequest = new daiApi.LiveStreamRequest();
                streamRequest.assetKey = currentAssetKey;
                streamManager.requestStream(streamRequest);
                console.log("[Live] DAI LiveStreamRequest enviado con assetKey:", currentAssetKey);

            } catch (err) {
                console.error("[Live] Error initializing IMA DAI:", err);
                setAdPhase('content');
                loadUrl(currentStreamSrc);
            }

        } else {
            if (currentAssetKey) {
                console.log("[Live] IMA SDK no disponible. Reproduciendo HLS estándar.");
            }
            setAdPhase('content');
            loadUrl(currentStreamSrc);
        }
    }, [videoRef, adUiRef, cleanupStreamManager, onSessionParamsReady]);

    const onVastFinished = useCallback(() => {
        console.log("[Live] VAST preroll terminado, iniciando DAI/HLS...");

        const video = videoRef.current;
        if (video) {
            video.muted = false;
        }

        setAdPhase('dai');
        startDaiOrHls();
    }, [videoRef, startDaiOrHls]);

    const lastProcessedPtsRef = useRef<number>(-1);

    const processMetadata = useCallback((samples: MetadataSample[]) => {
        if (!streamManagerRef.current) return;

        for (let i = 0; i < samples.length; i++) {
            const sample = samples[i];
            if (sample.pts === lastProcessedPtsRef.current) continue;
            lastProcessedPtsRef.current = sample.pts;
            streamManagerRef.current.processMetadata('ID3', sample.data, sample.pts);
        }
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !streamSrc) return;

        generationRef.current++;
        const currentGen = generationRef.current;
        console.log("[Live] Nueva señal, generación:", currentGen, "src:", streamSrc);

        cancelPendingTimeout();

        cleanupStreamManager();
        setResolvedStreamUrl('');
        setIsAdPlaying(false);
        lastProcessedPtsRef.current = -1;

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
        resolvedStreamUrl,
    };
}
