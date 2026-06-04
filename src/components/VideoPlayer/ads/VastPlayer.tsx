import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Player, PlayerOptions } from '@glomex/vast-ima-player';
import { getDeviceAdInfo, appendAdParamsToVastUrl, resolveVastUrl } from './deviceAdService';
import he from 'he';
import './VastPlayer.css';

interface VastPlayerProps {
    url: string;
    /** Elemento DOM donde montar el portal. Si no se pasa, usa document.body (fullscreen). */
    portalTarget?: HTMLElement | null;
    onAdsPlaying?: () => void;
    onAdsFinished?: () => void;
}

/**
 * Reproductor de publicidad VAST con IMA SDK
 */
const VastPlayerComponent = ({ url, portalTarget, onAdsPlaying, onAdsFinished }: VastPlayerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const imaPlayerRef = useRef<any>(null);
    const mountIdRef = useRef(0);
    const adTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Cada mount obtiene un ID único; si otro mount ocurre, el ID cambia
        // y las operaciones async del mount anterior se abortan
        const currentMountId = ++mountIdRef.current;
        const isStale = () => mountIdRef.current !== currentMountId;

        const initAds = async () => {
            try {
                if (!videoRef.current || !containerRef.current) {
                    console.warn('[VAST] Refs no disponibles');
                    return;
                }
                if (!url || url.trim() === '' || url === 'none') {
                    console.log('[VAST] Sin URL, finalizando');
                    onAdsFinished?.();
                    return;
                }

                // Pre-resolver URLs de VMAP (rudo.video) a VAST directo (Google)
                // Esto evita CORS cuando IMA corre en iframe HTTP
                const resolvedUrl = await resolveVastUrl(url);
                if (!resolvedUrl) {
                    console.log('[VAST] No se pudo resolver VAST URL, finalizando');
                    onAdsFinished?.();
                    return;
                }

                if (isStale()) return;

                console.log('[VAST] URL resuelta:', resolvedUrl.substring(0, 100) + '...');

                // Obtener info del dispositivo y enriquecer URL
                const adInfo = await getDeviceAdInfo();

                let decodedUrl = he.decode(resolvedUrl);
                while (decodedUrl.indexOf('&amp;') !== -1) {
                    decodedUrl = decodedUrl.replace(/&amp;/g, '&');
                }

                const enrichedUrl = appendAdParamsToVastUrl(decodedUrl, adInfo);
                console.log('[VAST] URL enriquecida:', enrichedUrl.substring(0, 100) + '...');

                if (isStale()) return;

                // IMA SDK se carga desde index.html (<script src="ima3.js">).
                // Esperamos a que google.ima esté completamente inicializado.
                const getImaNamespace = (): Promise<any> => {
                    return new Promise((resolve, reject) => {
                        const w = window as any;
                        if (w.google?.ima?.AdsRequest) {
                            resolve(w.google.ima);
                            return;
                        }
                        // Safety poll: el script del HTML podría estar aún cargando
                        let elapsed = 0;
                        const check = () => {
                            if (w.google?.ima?.AdsRequest) {
                                resolve(w.google.ima);
                                return;
                            }
                            elapsed += 200;
                            if (elapsed >= 10000) {
                                const keys = w.google?.ima ? Object.keys(w.google.ima) : [];
                                console.error('[VAST] IMA SDK no disponible. keys:', keys,
                                    '¿Falta <script src="ima3.js"> en index.html?');
                                reject(new Error('IMA SDK client-side no disponible'));
                                return;
                            }
                            setTimeout(check, 200);
                        };
                        setTimeout(check, 200);
                    });
                };

                const imaNamespace = await getImaNamespace();
                console.log('[VAST] IMA SDK listo, keys:', Object.keys(imaNamespace));

                if (isStale()) return;

                // Configurar settings (ya deberían estar disponibles)
                if (imaNamespace.settings) {
                    try {
                        imaNamespace.settings.setLocale('es_cl');
                        imaNamespace.settings.setVpaidMode(imaNamespace.ImaSdkSettings?.VpaidMode?.ENABLED ?? 1);
                        imaNamespace.settings.setNumRedirects(8);
                        imaNamespace.settings.setPlayerType('hlsjs');
                        imaNamespace.settings.setPlayerVersion('1.0.0');
                        imaNamespace.settings.setAutoPlayAdBreaks(true);
                    } catch (e) {
                        console.warn('[VAST] Error configurando IMA settings:', e);
                    }
                }

                const adsRenderingSettings = new imaNamespace.AdsRenderingSettings();
                adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
                adsRenderingSettings.loadVideoTimeout = 15000;
                adsRenderingSettings.enablePreloading = true;
                adsRenderingSettings.autoAlign = true;
                adsRenderingSettings.uiElements = [
                    imaNamespace.UiElements.COUNTDOWN,
                    imaNamespace.UiElements.AD_ATTRIBUTION,
                ];

                // No usar autoResize — IMA lo sobreescribe a width:0
                const playerOptions = new PlayerOptions();

                const imaPlayer = new Player(
                    imaNamespace,
                    videoRef.current!,
                    containerRef.current!,
                    adsRenderingSettings,
                    playerOptions,
                );
                imaPlayerRef.current = imaPlayer;

                const adsRequest = new imaNamespace.AdsRequest();
                adsRequest.adTagUrl = enrichedUrl;
                adsRequest.setAdWillAutoPlay(true);
                adsRequest.setAdWillPlayMuted(false);

                // Helper: forzar dimensiones del contenedor y sus hijos IMA
                const forceContainerSize = () => {
                    const target = portalTarget || document.body;
                    const w = portalTarget ? target.offsetWidth : window.innerWidth;
                    const h = portalTarget ? target.offsetHeight : window.innerHeight;
                    if (containerRef.current) {
                        containerRef.current.style.setProperty('width', `${w}px`, 'important');
                        containerRef.current.style.setProperty('height', `${h}px`, 'important');
                        // Forzar también los divs hijos que IMA crea (ad containers)
                        const imaDivs = containerRef.current.querySelectorAll(':scope > div');
                        imaDivs.forEach((div) => {
                            (div as HTMLElement).style.setProperty('width', `${w}px`, 'important');
                            (div as HTMLElement).style.setProperty('height', `${h}px`, 'important');
                        });
                    }
                    // También llamar resizeAd en el player
                    try {
                        imaPlayer.resizeAd(w, h);
                    } catch (_e) { /* ignore */ }
                };

                // Timeout de seguridad: si el ad no inicia en 30s, continuar
                adTimeoutRef.current = setTimeout(() => {
                    console.warn('[VAST] Timeout - continuando sin ad');
                    setIsLoading(false);
                    onAdsFinished?.();
                }, 30000);

                // Event listeners del IMA player
                imaPlayer.addEventListener('AdStarted', (event: any) => {
                    const podInfo = event.detail?.ad?.getAdPodInfo?.();
                    console.log('[VAST] Ad started', podInfo);
                    setIsLoading(false);
                    if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
                    // Forzar dimensiones cuando el ad empieza
                    forceContainerSize();
                    onAdsPlaying?.();
                });

                // Si el ad se pausa (SIMID/TrueView play button), reanudar automáticamente
                imaPlayer.addEventListener('AdPaused', () => {
                    console.log('[VAST] Ad pausado, reanudando automáticamente');
                    try { videoRef.current?.play(); } catch (_e) { /* ignore */ }
                });

                imaPlayer.addEventListener('AdAllAdsCompleted', () => {
                    console.log('[VAST] Todos los ads completados');
                    if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
                    onAdsFinished?.();
                });

                imaPlayer.addEventListener('AdError', (event: any) => {
                    const detail = event?.detail;
                    const code = detail?.errorCode || 'unknown';
                    const msg = detail?.message || detail?.error?.message || 'Unknown';
                    const vastCode = detail?.vastErrorCode || detail?.error?.vastErrorCode || 'N/A';
                    console.warn('[VAST] AdError:', { code, vastCode, msg });

                    if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
                    setIsLoading(false);
                    onAdsFinished?.();
                });

                imaPlayer.addEventListener('AdContentResumeRequested', () => {
                    console.log('[VAST] Resume content');
                    if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
                    onAdsFinished?.();
                });

                // Listener de resize de ventana
                const handleResize = () => forceContainerSize();
                window.addEventListener('resize', handleResize);

                // ResizeObserver: detectar cambios de tamaño del contenedor padre
                // (ej: cuando el player pasa de preview a fullscreen via CSS)
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

                imaPlayer.playAds(adsRequest);
                console.log('[VAST] playAds ejecutado');

                // Forzar dimensiones inmediatamente y con delay (IMA las setea async)
                forceContainerSize();
                setTimeout(forceContainerSize, 100);
                setTimeout(forceContainerSize, 300);
                setTimeout(forceContainerSize, 500);
                setTimeout(forceContainerSize, 1000);
                setTimeout(forceContainerSize, 2000);

            } catch (error) {
                console.error('[VAST] Error cargando ads:', error);
                setIsLoading(false);
                onAdsFinished?.();
            }
        };

        initAds();

        // Cleanup
        return () => {
            if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
            if (imaPlayerRef.current) {
                try {
                    imaPlayerRef.current.destroy?.();
                } catch (_e) {
                    // Silenciar errores de destroy
                }
                imaPlayerRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }
            console.log('[VAST] Cleanup completo');
        };
    }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

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
            <div
                    className="vast-loading-overlay"
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
                        opacity: isLoading ? 1 : 0,
                        pointerEvents: isLoading ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease-out',
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
        </div>,
        portalTarget || document.body
    );
};

export const VastPlayer = React.memo(VastPlayerComponent);
