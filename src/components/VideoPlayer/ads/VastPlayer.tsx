import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Player, PlayerOptions, loadImaSdk } from '@glomex/vast-ima-player';
import { getDeviceAdInfo, appendAdParamsToVastUrl, resolveVastUrl } from './deviceAdService';
import he from 'he';
import './VastPlayer.css';

interface VastPlayerProps {
    url?: string;
    vastUrls?: string[];
    portalTarget?: HTMLElement | null;
    onAdsPlaying?: () => void;
    onAdsFinished?: () => void;
}

interface AdEventDetail {
    errorCode?: number;
    message?: string;
    vastErrorCode?: string;
    ad?: { getAdPodInfo?: () => unknown };
    error?: { message?: string; vastErrorCode?: string };
}

/**
 * Reproductor de publicidad VAST con IMA SDK.
 * Soporta waterfall de URLs VAST y montaje inline (portalTarget) para previews.
 */
const VastPlayerComponent = ({ url, vastUrls, portalTarget, onAdsPlaying, onAdsFinished }: VastPlayerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const imaPlayerRef = useRef<Player | null>(null);
    const mountIdRef = useRef(0);
    const adTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const adsKey = vastUrls && vastUrls.length > 0 ? vastUrls.join('|') : (url || '');

    useEffect(() => {
        const currentMountId = ++mountIdRef.current;
        const isStale = () => mountIdRef.current !== currentMountId;

        const initAds = async () => {
            try {
                if (!videoRef.current || !containerRef.current) {
                    console.warn('[VAST] Refs no disponibles');
                    return;
                }

                let rawUrls: string[] = [];
                if (vastUrls && vastUrls.length > 0) {
                    rawUrls = vastUrls;
                } else if (url && url.trim() !== '' && url !== 'none') {
                    const resolved = await resolveVastUrl(url);
                    if (resolved && resolved.urls.length > 0) {
                        rawUrls = resolved.urls;
                    }
                }

                if (rawUrls.length === 0) {
                    console.log('[VAST] Sin URLs de ads, finalizando');
                    onAdsFinished?.();
                    return;
                }

                if (isStale()) return;

                const adInfo = await getDeviceAdInfo();
                const enrichedUrls = rawUrls.map((rawUrl) => {
                    let decodedUrl = he.decode(rawUrl);
                    while (decodedUrl.indexOf('&amp;') !== -1) {
                        decodedUrl = decodedUrl.replace(/&amp;/g, '&');
                    }
                    return appendAdParamsToVastUrl(decodedUrl, adInfo);
                });

                console.log(`[VAST] ${enrichedUrls.length} URL(s) de ads para intentar`);

                if (isStale()) return;

                const ima = await loadImaSdk();
                console.log('[VAST] IMA SDK cargado');

                if (isStale()) return;

                ima.settings.setLocale('es_cl');
                ima.settings.setVpaidMode(ima.ImaSdkSettings.VpaidMode.ENABLED);
                ima.settings.setNumRedirects(8);
                ima.settings.setPlayerType('hlsjs');
                ima.settings.setPlayerVersion('1.0.0');
                ima.settings.setAutoPlayAdBreaks(true);

                const adsRenderingSettings = new ima.AdsRenderingSettings();
                adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
                adsRenderingSettings.loadVideoTimeout = 15000;
                adsRenderingSettings.enablePreloading = true;
                adsRenderingSettings.autoAlign = true;
                adsRenderingSettings.uiElements = [
                    ima.UiElements.COUNTDOWN,
                    ima.UiElements.AD_ATTRIBUTION,
                ];

                const playerOptions = new PlayerOptions();

                const forceContainerSize = () => {
                    const target = portalTarget || document.body;
                    const w = portalTarget ? target.offsetWidth : window.innerWidth;
                    const h = portalTarget ? target.offsetHeight : window.innerHeight;
                    if (containerRef.current) {
                        containerRef.current.style.setProperty('width', `${w}px`, 'important');
                        containerRef.current.style.setProperty('height', `${h}px`, 'important');
                        const imaDivs = containerRef.current.querySelectorAll(':scope > div');
                        imaDivs.forEach((div) => {
                            (div as HTMLElement).style.setProperty('width', `${w}px`, 'important');
                            (div as HTMLElement).style.setProperty('height', `${h}px`, 'important');
                        });
                    }
                };

                const handleResize = () => forceContainerSize();
                window.addEventListener('resize', handleResize);

                if (resizeObserverRef.current) {
                    resizeObserverRef.current.disconnect();
                }
                const observeTarget = portalTarget || containerRef.current;
                if (observeTarget) {
                    resizeObserverRef.current = new ResizeObserver(() => {
                        forceContainerSize();
                    });
                    resizeObserverRef.current.observe(observeTarget);
                }

                let urlIndex = 0;

                const tryNextUrl = () => {
                    if (isStale()) return;
                    if (urlIndex >= enrichedUrls.length) {
                        console.log('[VAST] Todas las URLs de ads fallaron, continuando sin ad');
                        onAdsFinished?.();
                        return;
                    }

                    const currentUrl = enrichedUrls[urlIndex];
                    console.log(`[VAST] Intentando URL ${urlIndex + 1}/${enrichedUrls.length}`);

                    if (imaPlayerRef.current) {
                        try { imaPlayerRef.current.destroy(); } catch { /* ignore */ }
                        imaPlayerRef.current = null;
                    }

                    const imaPlayer = new Player(
                        ima,
                        videoRef.current!,
                        containerRef.current!,
                        adsRenderingSettings,
                        playerOptions,
                    );
                    imaPlayerRef.current = imaPlayer;

                    const adsRequest = new ima.AdsRequest();
                    adsRequest.adTagUrl = currentUrl;
                    adsRequest.setAdWillAutoPlay(true);
                    adsRequest.setAdWillPlayMuted(false);

                    if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
                    adTimeoutRef.current = setTimeout(() => {
                        console.warn(`[VAST] Timeout URL ${urlIndex + 1}, probando siguiente`);
                        urlIndex++;
                        tryNextUrl();
                    }, 15000);

                    imaPlayer.addEventListener('AdStarted', (event: CustomEvent<AdEventDetail>) => {
                        const podInfo = event.detail?.ad?.getAdPodInfo?.();
                        console.log('[VAST] Ad started', podInfo);
                        setIsLoading(false);
                        if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
                        forceContainerSize();
                        try { imaPlayer.resizeAd(
                            portalTarget ? (portalTarget || document.body).offsetWidth : window.innerWidth,
                            portalTarget ? (portalTarget || document.body).offsetHeight : window.innerHeight,
                        ); } catch { /* ignore */ }
                        onAdsPlaying?.();
                    });

                    imaPlayer.addEventListener('AdPaused', () => {
                        console.log('[VAST] Ad pausado, reanudando automáticamente');
                        try { videoRef.current?.play(); } catch { /* ignore */ }
                    });

                    imaPlayer.addEventListener('AdAllAdsCompleted', () => {
                        console.log('[VAST] Todos los ads completados');
                        if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
                        onAdsFinished?.();
                    });

                    imaPlayer.addEventListener('AdError', (event: CustomEvent<AdEventDetail>) => {
                        const detail = event?.detail;
                        const code = detail?.errorCode || 'unknown';
                        const vastCode = detail?.vastErrorCode || detail?.error?.vastErrorCode || 'N/A';
                        console.warn(`[VAST] AdError URL ${urlIndex + 1}:`, { code, vastCode });

                        if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);

                        urlIndex++;
                        tryNextUrl();
                    });

                    imaPlayer.addEventListener('AdContentResumeRequested', () => {
                        console.log('[VAST] Resume content');
                        if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
                        onAdsFinished?.();
                    });

                    imaPlayer.playAds(adsRequest);

                    forceContainerSize();
                    setTimeout(forceContainerSize, 100);
                    setTimeout(forceContainerSize, 300);
                    setTimeout(forceContainerSize, 500);
                    setTimeout(forceContainerSize, 1000);
                    setTimeout(forceContainerSize, 2000);
                };

                tryNextUrl();

            } catch (error) {
                console.error('[VAST] Error cargando ads:', error);
                onAdsFinished?.();
            }
        };

        initAds();

        // Capturar el elemento para el cleanup (evita usar refs stale)
        const videoElement = videoRef.current;

        return () => {
            if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
            if (imaPlayerRef.current) {
                try {
                    imaPlayerRef.current.destroy();
                } catch {
                    // Silenciar errores de destroy
                }
                imaPlayerRef.current = null;
            }
            if (videoElement) {
                videoElement.pause();
                videoElement.removeAttribute('src');
                videoElement.load();
            }
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }
            console.log('[VAST] Cleanup completo');
        };
    }, [adsKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const isInline = !!portalTarget;

    return createPortal(
        <div
            id="adVideoContainer"
            ref={containerRef}
            className={isInline ? undefined : 'vast-container'}
            style={isInline ? {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9999,
                background: '#000',
            } : undefined}
        >
            <video
                id="adVideoElement"
                ref={videoRef}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    background: 'black',
                }}
                playsInline
            />
            {isLoading && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                    }}
                >
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            border: '4px solid rgba(255,255,255,0.3)',
                            borderTop: '4px solid #fff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '16px',
                        }}
                    />
                    <span style={{ color: '#fff', fontSize: '1.1rem' }}>
                        Cargando publicidad...
                    </span>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            )}
        </div>,
        portalTarget || document.body
    );
};

export const VastPlayer = React.memo(VastPlayerComponent);
