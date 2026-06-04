import React, { useCallback, useEffect, useState, useRef } from "react";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useHlsStream } from "@/hooks/player/useHlsStream";
import { usePlayerKeyboard } from "@/hooks/player/usePlayerKeyboard";
import { useUIVisibility } from "@/hooks/player/useUIVisibility";
import { useAdsPolicy } from "./hooks/useAdsPolicy";
import { usePlayerAnalytics } from "./hooks/usePlayerAnalytics";
import { useWatchHistory } from "./hooks/useWatchHistory";
import { VastPlayer } from "./ads/VastPlayer";
import { Spinner } from "@/components/ui/Spinner";
import { PlayerTopBar } from "./UI/PlayerTopBar";
import { PlayerControls } from "./UI/PlayerControls";
import type { VideoPlayerProps } from "./types";
import { keepScreenAwake } from "@/utils/platform";
import "./VideoPlayer.css";

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

  // Evaluar política de ads (síncrono — evaluated siempre es true)
  const { shouldPlayAds, effectiveVastUrl, effectiveVastUrls } = useAdsPolicy({
    vastUrl,
    vastUrls,
  });

  // Estado de ads: inicializado sincrónicamente con shouldPlayAds
  // para evitar que HLS arranque con autoplay antes de saber si hay ads.
  const [playingAds, setPlayingAds] = useState(shouldPlayAds);
  const adsCompletedRef = useRef(false);

  // Si vastUrl llega después del mount (carga paralela), activar ads
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

  // Hold-to-seek state
  const [keySeekPreview, setKeySeekPreview] = useState<number | null>(null);
  const keySeekIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const seekTargetRef = useRef<number | null>(null);

  // ── Ref para el <video> (propiedad del componente) ──
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

  // ── Keyboard (hook compartido) ──
  usePlayerKeyboard({
    onBack: onBack || (() => {}),
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

  // Limpiar preview de seek cuando el currentTime alcanza la posición objetivo
  useEffect(() => {
    if (
      seekTargetRef.current !== null &&
      keySeekPreview !== null &&
      !keySeekIntervalRef.current
    ) {
      const diff = Math.abs(currentTime - seekTargetRef.current);
      if (diff < 3) {
        seekTargetRef.current = null;
        setKeySeekPreview(null);
      }
    }
  }, [currentTime, keySeekPreview]);

  // Reportar progreso en cada timeupdate y notificar al padre
  useEffect(() => {
    if (!isLive && !playingAds && currentTime > 0 && duration > 0) {
      analytics.onPlaybackProgress(currentTime, duration);
      if (onTimeUpdate) onTimeUpdate(currentTime, duration);
    }
  }, [currentTime, duration, playingAds, isLive, analytics, onTimeUpdate]);

  // Notificar al padre cuando el video termina naturalmente
  useEffect(() => {
    if (hlsStream.isEnded) {
      saveProgress(1); // Marcar episodio actual como finalizado
      if (onEnded) onEnded();
    }
  }, [hlsStream.isEnded, saveProgress, onEnded]);

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
    // Forzamos startLoad + play para reanudar el contenido.
    const hls = hlsStream.hlsRef?.current;
    if (hls) {
      try { hls.startLoad(-1); } catch (_e) { /* ignore */ }
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

  // --- Volume / Skip / Fullscreen handlers ---
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
        {!playingAds && !hideUI && (!pipMode || forceControlsVisible) && (
          <>
            <PlayerTopBar
              title={title}
              description={description}
              isVisible={isUIVisible}
              isLive={isLive}
              onBackClick={onBack}
            />
            <PlayerControls
              playing={isPlaying}
              visible={isUIVisible}
              isLive={isLive}
              duration={duration}
              seekTime={currentTime}
              previewSeekTime={keySeekPreview}
              loadedTime={loadedTime}
              onPlayButtonClick={
                isPlaying ? pause : play
              }
              onSeek={(time) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = time;
                }
              }}
              onSkip={handleSkip}
              onHideControls={() => setIsUIVisible(false)}
              onSidebarVisibilityChange={setIsSidebarOpen}
            />
          </>
        )}

        {/* Spinner de carga */}
        {isLoading && !playingAds && (
          <div className="video-player-spinner">
            <Spinner />
          </div>
        )}
      </div>
    </FocusContext.Provider>
  );
};

export const VideoPlayer = React.memo(VideoPlayerComponent);
