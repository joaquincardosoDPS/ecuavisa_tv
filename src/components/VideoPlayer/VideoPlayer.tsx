import React, { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useHlsStream } from "@/hooks/player/useHlsStream";
import { usePlayerKeyboard } from "@/hooks/player/usePlayerKeyboard";
import { useUIVisibility } from "@/hooks/player/useUIVisibility";
import { useAdsPolicy } from "./hooks/useAdsPolicy";
import { useAdBreaks } from "./hooks/useAdBreaks";
import { usePlayerAnalytics } from "./hooks/usePlayerAnalytics";
import { useWatchHistory } from "./hooks/useWatchHistory";
import { VastPlayer } from "./ads/VastPlayer";
import { Spinner } from "@/components/ui/Spinner";
import { PlayerTopBar } from "./UI/PlayerTopBar";
import { PlayerControls } from "./UI/PlayerControls";
import type { VideoPlayerProps, Chapter, ProgramChapter } from "./types";
import { keepScreenAwake } from "@/utils/platform";
import { getStoredVolume, setStoredVolume } from "@/utils/volumeStorage";
import "./VideoPlayer.css";

const toProgramChapter = (ch: Chapter): ProgramChapter => ({
    id: ch.key,
    key: ch.key,
    title: ch.title,
    image: ch.image_land?.medium || ch.image,
    link: ch.slug,
    duration: ch.duration,
    restriction: ch.restriction,
    description: ch.description,
});

/**
 * Componente orquestador del reproductor de video (VOD/OTT).
 * Usa hooks compartidos con LivePlayer: useHlsStream, usePlayerKeyboard, useUIVisibility.
 */
const VideoPlayerComponent = ({
    src,
    title,
    description,
    isLive = false,
    vastUrl,
    vastUrls,
    livetoken,
    rudoKey,
    autoplay = true,
    onBack,
    episodes = [],
    currentEpisodeKey,
    onEpisodeSelect,
    hideUI = false,
    onQualitiesChange,
    onAdsPlaying,
    onAdsFinished,
    onTimeUpdate,
    onEnded,
    pipMode = false,
    forceControlsVisible = false,
    initialSeconds,
    vodSlug,
    userToken,
    userProfile,
    onRestartChapter,
    onNextChapter,
    hasNextChapter = false,
    midrollCuepoints = [],
    postrollVastUrls = [],
}: VideoPlayerProps) => {
    // Norigin spatial navigation context for the player
    const { ref: playerFocusRef, focusKey } = useFocusable({
        focusKey: "PLAYER-VIEW",
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: true,
    });

    // Prevenir Screensaver mientras el reproductor exista
    useEffect(() => {
        keepScreenAwake(true);
        return () => {
            keepScreenAwake(false);
        };
    }, []);

    const { shouldPlayAds, effectiveVastUrl, effectiveVastUrls } = useAdsPolicy({
        vastUrl,
        vastUrls,
    });

    const [playingAds, setPlayingAds] = useState(shouldPlayAds);
    const adsCompletedRef = useRef(false);

    useEffect(() => {
        if (shouldPlayAds && (effectiveVastUrl || effectiveVastUrls) && !playingAds && !adsCompletedRef.current) {
            setPlayingAds(true);
        }
    }, [shouldPlayAds, effectiveVastUrl, effectiveVastUrls]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── UI Visibility (hook compartido) ──
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isUIVisible, setIsUIVisible, resetUIVisibility } = useUIVisibility({
        preventHide: isSidebarOpen || forceControlsVisible,
    });

    // Si el panel de capítulos está abierto, Back lo cierra y devuelve
    // el foco al botón de episodios en lugar de salir del player.
    const handleBack = useCallback(() => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
            setTimeout(() => setFocus("PLAYER-BTN-EPISODES"), 120);
            return;
        }
        if (onBack) onBack();
    }, [isSidebarOpen, onBack]);

    // Volume state
    const [volume, setVolume] = useState(getStoredVolume());
    const [muted, setMuted] = useState(false);

    // Ref para el <video> (propiedad del componente)
    const videoRef = useRef<HTMLVideoElement>(null);

    // ── HLS (hook compartido) ──
    const hlsStream = useHlsStream({
        videoRef,
        src,
        autoplay: autoplay && !shouldPlayAds,
        isLive,
        livetoken,
        initialSeconds,
    });

    const {
        levels: hlsLevels,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        loadedTime,
        isEnded: hlsIsEnded,
        play,
        pause,
    } = hlsStream;

    // Foco inicial al botón Play/Pause al montar
    useEffect(() => {
        if (!playingAds) {
            const timer = setTimeout(() => {
                setFocus("PLAYER-BTN-PLAYPAUSE");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [playingAds]);

    // Forzar pausa del video HLS cuando las ads están reproduciéndose
    useEffect(() => {
        if (playingAds && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.muted = true;
        }
    }, [playingAds]);

    // ── Ad Breaks (midroll / postroll) ──
    const {
        activeAdBreak,
        isAdBreakActive,
        onAdBreakFinished,
        playedCuepointsArray,
        resumeAfterAdTime,
    } = useAdBreaks({
        midrollCuepoints,
        postrollVastUrls,
        currentTime,
        duration,
        isEnded: hlsIsEnded,
        isLive,
        initialSeconds,
    });

    // Pausar el video principal cuando hay un ad break activo
    useEffect(() => {
        if (isAdBreakActive && videoRef.current) {
            videoRef.current.pause();
        }
    }, [isAdBreakActive]);

    // ── Keyboard (hook compartido) ──
    usePlayerKeyboard({
        onBack: handleBack,
        isUIVisible,
        showUI: resetUIVisibility,
        isLive,
        playingAds,
        pipMode,
        isPlaying,
        pause,
    });

    // Notificar calidades disponibles al padre
    useEffect(() => {
        if (hlsLevels && hlsLevels.length > 0 && onQualitiesChange) {
            const lvls = hlsLevels.map((l) => ({
                value: l.height.toString(),
                label: l.height === 0 ? "Audio" : `${l.height}p`,
            }));
            const unique = lvls.filter(
                (v, i, a) => a.findIndex((t) => t.value === v.value) === i,
            );
            const newQualities = [
                { value: "auto", label: "Auto" },
                ...unique.reverse(),
            ];
            onQualitiesChange(newQualities);
        }
    }, [hlsLevels, onQualitiesChange]);

    // Analytics y Tracking de VOD
    const analytics = usePlayerAnalytics(
        rudoKey,
        undefined,
        description,
    );

    // Guardado periódico de historial "Seguir viendo"
    const { saveProgress } = useWatchHistory({
        vodSlug,
        currentTime,
        duration,
        isPlaying,
        isLive,
        playingAds,
        token: userToken,
        profile: userProfile,
    });

    // Reportar progreso en cada timeupdate y notificar al padre
    useEffect(() => {
        if (!isLive && !playingAds && currentTime > 0 && duration > 0) {
            analytics.onPlaybackProgress(currentTime, duration);
            if (onTimeUpdate) onTimeUpdate(currentTime, duration);
        }
    }, [currentTime, duration, playingAds, isLive, analytics, onTimeUpdate]);

    // Notificar al padre cuando el video termina naturalmente
    useEffect(() => {
        if (hlsIsEnded) {
            saveProgress(1);
            if (!isAdBreakActive && onEnded) {
                onEnded();
            }
        }
    }, [hlsIsEnded, isAdBreakActive, saveProgress, onEnded]);

    // Callbacks de VAST
    const handleAdsPlaying = useCallback(() => {
        analytics.onAdStarted();
        if (onAdsPlaying) onAdsPlaying();
    }, [analytics, onAdsPlaying]);

    const handleAdsFinished = useCallback(() => {
        adsCompletedRef.current = true;
        setPlayingAds(false);

        const video = videoRef.current;
        if (video) {
            video.muted = false;
        }

        // En TVs, HLS se inicializó con autoplay=false (por los ads).
        const hls = hlsStream.hlsRef?.current;
        if (hls) {
            try { hls.startLoad(-1); } catch { /* ignore */ }
        }

        if (video) {
            if (video.readyState >= 2) {
                video.play().catch(err => console.warn('[VideoPlayer] Post-ad play error:', err));
            } else {
                const onReady = () => {
                    video.play().catch(err => console.warn('[VideoPlayer] Post-ad play error (canplay):', err));
                };
                video.addEventListener('canplay', onReady, { once: true });
                setTimeout(() => {
                    video.removeEventListener('canplay', onReady);
                    video.play().catch(err => console.warn('[VideoPlayer] Post-ad play error (timeout):', err));
                }, 5000);
            }
        }

        analytics.onAdCompleted();
        if (onAdsFinished) onAdsFinished();
    }, [hlsStream.hlsRef, analytics, onAdsFinished]);

    // Handler para cuando termina un ad break de midroll/postroll
    const handleMidPostAdFinished = useCallback(() => {
        const seekResumeTo = resumeAfterAdTime;
        onAdBreakFinished();

        const video = videoRef.current;
        if (!video) return;

        video.muted = false;

        if (seekResumeTo !== null && seekResumeTo > 0) {
            video.currentTime = seekResumeTo;
        }

        if (video.readyState >= 2) {
            video.play().catch(err => console.warn('[VideoPlayer] Post-midroll play error:', err));
        } else {
            const onReady = () => {
                video.play().catch(err => console.warn('[VideoPlayer] Post-midroll play error (canplay):', err));
            };
            video.addEventListener('canplay', onReady, { once: true });
            setTimeout(() => {
                video.removeEventListener('canplay', onReady);
                video.play().catch(err => console.warn('[VideoPlayer] Post-midroll play error (timeout):', err));
            }, 5000);
        }

        if (hlsIsEnded && onEnded) {
            onEnded();
        }
    }, [onAdBreakFinished, resumeAfterAdTime, hlsIsEnded, onEnded]);

    const handleMidPostAdPlaying = useCallback(() => {
        analytics.onAdStarted();
    }, [analytics]);

    const handleBackgroundClick = useCallback(
        (e: React.MouseEvent) => {
            const target = e.target as Element;
            if (
                target.closest(
                    'button, .seekbar-track, .seekbar-wrapper, [role="button"]',
                )
            ) {
                return;
            }

            if (pipMode) return;
            if (playingAds) return;

            if (isPlaying) pause();
            else play();
        },
        [isPlaying, play, pause, pipMode, playingAds],
    );

    // --- Volume / Skip handlers ---
    const handleVolumeChange = useCallback(
        (newVolume: number) => {
            setVolume(newVolume);
            setStoredVolume(newVolume);
            if (videoRef.current) {
                videoRef.current.volume = newVolume;
                if (newVolume > 0 && muted) {
                    videoRef.current.muted = false;
                    setMuted(false);
                }
            }
        },
        [muted],
    );

    const handleMuteToggle = useCallback(() => {
        setMuted((prev) => {
            const next = !prev;
            if (videoRef.current) {
                videoRef.current.muted = next;
            }
            return next;
        });
    }, []);

    const handleSkip = useCallback(
        (seconds: number) => {
            if (videoRef.current && duration > 0) {
                const newTime = Math.max(
                    0,
                    Math.min(duration, videoRef.current.currentTime + seconds),
                );
                videoRef.current.currentTime = newTime;
            }
        },
        [duration],
    );

    const handleFullscreen = useCallback(() => {
        const container = videoRef.current?.closest(
            ".video-player-container",
        ) as HTMLElement | null;
        if (!container) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen().catch(console.error);
        }
    }, []);

    // Episodios para el sidebar (ProgramChapter[])
    const programChapters = useMemo(
        () => episodes.map(toProgramChapter),
        [episodes],
    );

    const handleEpisodeSelect = useCallback(
        (episode: ProgramChapter) => {
            if (!onEpisodeSelect) return;
            const original = episodes.find((e) => e.key === episode.key);
            if (original) onEpisodeSelect(original);
        },
        [episodes, onEpisodeSelect],
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={playerFocusRef} className={`video-player-container${pipMode ? " pip-active" : ""}`} onClick={handleBackgroundClick}>
                {/* VAST Ads overlay */}
                {playingAds && (effectiveVastUrl || effectiveVastUrls) && (
                    <VastPlayer
                        url={effectiveVastUrl}
                        vastUrls={effectiveVastUrls}
                        onAdsPlaying={handleAdsPlaying}
                        onAdsFinished={handleAdsFinished}
                    />
                )}

                {/* Midroll / Postroll ads overlay */}
                {isAdBreakActive && activeAdBreak && (
                    <VastPlayer
                        vastUrls={activeAdBreak.vastUrls}
                        onAdsPlaying={handleMidPostAdPlaying}
                        onAdsFinished={handleMidPostAdFinished}
                    />
                )}

                {/* Video principal — pipMode controlado por el padre */}
                <video
                    id="hls-video-player"
                    ref={videoRef}
                    className={`${playingAds ? "hidden" : ""} ${pipMode && !playingAds ? "pip-mode" : ""}`}
                    playsInline
                    autoPlay={autoplay && !playingAds}
                    controls={false}
                    muted={playingAds}
                    tabIndex={-1}
                />

                {/* UI Overlay (ocultar durante modo PiP) */}
                {!playingAds && !isAdBreakActive && !hideUI && (!pipMode || forceControlsVisible) && (
                    <>
                        <PlayerTopBar
                            title={title}
                            description={description}
                            isVisible={isUIVisible}
                            isLive={isLive}
                            onBackClick={handleBack}
                        />
                        <PlayerControls
                            playing={isPlaying}
                            visible={isUIVisible}
                            isLive={isLive}
                            duration={duration}
                            seekTime={currentTime}
                            loadedTime={loadedTime}
                            volume={volume}
                            muted={muted}
                            episodes={programChapters}
                            currentEpisodeKey={currentEpisodeKey}
                            onPlayButtonClick={isPlaying ? pause : play}
                            onSeek={(time) => {
                                if (videoRef.current) {
                                    videoRef.current.currentTime = time;
                                }
                            }}
                            onSkip={handleSkip}
                            onVolumeChange={handleVolumeChange}
                            onMuteToggle={handleMuteToggle}
                            onFullscreen={handleFullscreen}
                            onEpisodeSelect={handleEpisodeSelect}
                            onHideControls={() => setIsUIVisible(false)}
                            onSidebarVisibilityChange={setIsSidebarOpen}
                            onRestartChapter={onRestartChapter}
                            onNextChapter={onNextChapter}
                            hasNextChapter={hasNextChapter}
                            chaptersPanelOpen={isSidebarOpen}
                            adCuepoints={midrollCuepoints}
                            playedCuepoints={playedCuepointsArray}
                        />
                    </>
                )}

                {/* Spinner de carga */}
                {isLoading && !playingAds && !isAdBreakActive && (
                    <div className="video-player-spinner">
                        <Spinner />
                    </div>
                )}
            </div>
        </FocusContext.Provider>
    );
};

export const VideoPlayer = React.memo(VideoPlayerComponent);
