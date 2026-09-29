import { useEffect, useRef, useState, useCallback } from "react";
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
    onTimedMetadata: (metadata: Record<string, string>) => void;
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

// Si Google no entrega el stream de DAI en este tiempo, se sigue con el de respaldo.
const DAI_TIMEOUT_MS = 10000;

// Sesión de DAI activa a nivel de módulo (persiste entre HMR y remontajes): una
// sola viva a la vez, así una que quedó huérfana se cierra antes de abrir otra y
// no queda consultando id3-events.json de fondo.
let activeDaiManager: DaiStreamManager | null = null;

function resetDaiManager(manager: DaiStreamManager | null) {
    if (!manager) return;
    try {
        if (typeof manager.reset === 'function') manager.reset();
        else if (typeof manager.destroy === 'function') manager.destroy();
    } catch {
        /* noop */
    }
    if (activeDaiManager === manager) activeDaiManager = null;
}

// DAI: las marcas ID3 del stream se le pasan al SDK como cues de la pista de
// metadata del <video> (las crea hls.js, o el navegador en HLS nativo) con
// onTimedMetadata al momento de reproducirse, igual que el plugin videojs-ima del
// reproductor de Rudo (no con processMetadata al descargar cada segmento).
// Devuelve la función que deja de escuchar.
function listenDaiMetadataCues(video: HTMLVideoElement, getManager: () => DaiStreamManager | null): () => void {
    const handlers = new Map<TextTrack, () => void>();
    const watch = (track: TextTrack) => {
        if (track.kind !== 'metadata' || handlers.has(track)) return;
        track.mode = 'hidden';
        const onCueChange = () => {
            const cues = track.activeCues;
            if (!cues) return;
            for (let i = 0; i < cues.length; i++) {
                const value = (cues[i] as unknown as { value?: { key?: string; data?: string } }).value;
                if (value?.key && value?.data) {
                    getManager()?.onTimedMetadata({ [value.key]: value.data });
                }
            }
        };
        track.addEventListener('cuechange', onCueChange);
        handlers.set(track, onCueChange);
    };
    for (let i = 0; i < video.textTracks.length; i++) watch(video.textTracks[i]);
    const onAddTrack = (event: TrackEvent) => {
        if (event.track) watch(event.track as TextTrack);
    };
    video.textTracks.addEventListener('addtrack', onAddTrack);
    return () => {
        video.textTracks.removeEventListener('addtrack', onAddTrack);
        handlers.forEach((handler, track) => track.removeEventListener('cuechange', handler));
    };
}

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

    // DAI: generación para la que ya se inició el stream (una sola sesión por
    // señal: VastPlayer puede avisar el fin varias veces, ej. AdContentResumeRequested
    // + AdAllAdsCompleted, y cada aviso abría un StreamManager nuevo)
    const startedGenerationRef = useRef(-1);
    const daiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const removeMetadataListenerRef = useRef<(() => void) | null>(null);

    const hasVast = !!(vastUrl && vastUrl.trim() !== '' && vastUrl !== 'none');

    const showVastPreroll = adPhase === 'vast';

    const cleanupStreamManager = useCallback(() => {
        if (streamManagerRef.current) {
            // reset corta la consulta periódica de id3-events.json
            resetDaiManager(streamManagerRef.current);
            streamManagerRef.current = null;
        }
        if (daiTimeoutRef.current !== null) {
            clearTimeout(daiTimeoutRef.current);
            daiTimeoutRef.current = null;
        }
        if (removeMetadataListenerRef.current) {
            removeMetadataListenerRef.current();
            removeMetadataListenerRef.current = null;
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

        // Una sola vez por señal: si ya se inició para esta generación (aviso de fin
        // de VAST repetido), no se abre otra sesión de DAI.
        if (startedGenerationRef.current === myGeneration) return;
        startedGenerationRef.current = myGeneration;

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
            // Sin DAI (error del SDK o sin respuesta a tiempo): se cierra la sesión y
            // se reproduce el stream de respaldo. Una sola vez por sesión.
            let settled = false;
            const fallbackToBackup = () => {
                if (settled || generationRef.current !== myGeneration) return;
                settled = true;
                if (daiTimeoutRef.current !== null) {
                    clearTimeout(daiTimeoutRef.current);
                    daiTimeoutRef.current = null;
                }
                resetDaiManager(streamManagerRef.current);
                streamManagerRef.current = null;
                setAdPhase('content');
                loadUrl(currentStreamSrc);
            };

            try {
                // Una sola sesión a la vez: se cierra cualquiera que haya quedado viva.
                resetDaiManager(activeDaiManager);
                const streamManager = new daiApi.StreamManager(video, adUiRef.current);
                streamManagerRef.current = streamManager;
                activeDaiManager = streamManager;

                daiTimeoutRef.current = setTimeout(() => {
                    daiTimeoutRef.current = null;
                    fallbackToBackup();
                }, DAI_TIMEOUT_MS);

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.LOADED,
                    (e: DaiStreamEvent) => {
                        if (generationRef.current !== myGeneration || settled) return;
                        const streamUrl = e.getStreamData().url;
                        if (!streamUrl) {
                            fallbackToBackup();
                            return;
                        }
                        settled = true;
                        if (daiTimeoutRef.current !== null) {
                            clearTimeout(daiTimeoutRef.current);
                            daiTimeoutRef.current = null;
                        }
                        // Marcas ID3 al SDK por cues de metadata (ver listenDaiMetadataCues)
                        if (removeMetadataListenerRef.current) removeMetadataListenerRef.current();
                        removeMetadataListenerRef.current = listenDaiMetadataCues(video, () => streamManagerRef.current);
                        setAdPhase('content');
                        loadUrl(streamUrl);
                    },
                    false
                );

                streamManager.addEventListener(
                    daiApi.StreamEvent.Type.ERROR,
                    () => {
                        if (generationRef.current !== myGeneration) return;
                        fallbackToBackup();
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
                fallbackToBackup();
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

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !streamSrc) return;

        generationRef.current++;
        const currentGen = generationRef.current;

        cancelPendingTimeout();

        cleanupStreamManager();
        setResolvedStreamUrl('');
        setIsAdPlaying(false);

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
        adPhase,
        resolvedStreamUrl,
    };
}
