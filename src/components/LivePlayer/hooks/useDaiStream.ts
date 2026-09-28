import { useEffect, useRef, useState, useCallback } from "react";
import type { MetadataSample } from "hls.js";
import { getHlsSessionParams } from "@/services/hlsSessionService";
import type { HlsSessionParams } from "@/services/hlsSessionService";

type AdPhase = 'vast' | 'dai' | 'content';

interface DaiStreamData {
    url?: string;
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
            } catch {
                /* noop */
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
        } catch {
            /* noop: sin params se continúa sin tracking */
        }

        if (generationRef.current !== myGeneration) {
            return;
        }

        if (sessionParams && onSessionParamsReady) {
            onSessionParamsReady(sessionParams);
        }

        const loadUrl = (url: string) => {
            if (generationRef.current !== myGeneration) {
                return;
            }
            if (!url) {
                return;
            }
            setResolvedStreamUrl(url);
        };

        const daiApi = google?.ima?.dai?.api;
        if (currentAssetKey && adUiRef && adUiRef.current && daiApi) {
            try {
                const streamManager = new daiApi.StreamManager(video, adUiRef.current);
                streamManagerRef.current = streamManager;

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.LOADED,
                    (e: DaiStreamEvent) => {
                        if (generationRef.current !== myGeneration) return;
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
                    () => {
                        if (generationRef.current !== myGeneration) return;
                        setAdPhase('content');
                        loadUrl(currentStreamSrc);
                    },
                    false
                );

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.AD_BREAK_STARTED,
                    () => {
                        if (generationRef.current !== myGeneration) return;
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
                        setIsAdPlaying(false);
                        video.controls = false;
                        if (adUiRef.current) adUiRef.current.style.display = 'none';
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

            } catch {
                setAdPhase('content');
                loadUrl(currentStreamSrc);
            }

        } else {
            setAdPhase('content');
            loadUrl(currentStreamSrc);
        }
    }, [videoRef, adUiRef, cleanupStreamManager, onSessionParamsReady]);

    const onVastFinished = useCallback(() => {
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

        cancelPendingTimeout();

        cleanupStreamManager();
        setResolvedStreamUrl('');
        setIsAdPlaying(false);
        lastProcessedPtsRef.current = -1;

        if (hasVast) {
            setAdPhase('vast');
        } else {
            setAdPhase('dai');
            startTimeoutRef.current = setTimeout(() => {
                startTimeoutRef.current = null;
                if (generationRef.current !== currentGen) {
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
