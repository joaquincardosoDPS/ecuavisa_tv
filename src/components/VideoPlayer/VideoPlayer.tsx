import React, { useCallback, useEffect, useState, useRef } from "react";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useHlsPlayer } from "./hooks/useHlsPlayer";
import { useAdsPolicy } from "./hooks/useAdsPolicy";
import { usePlayerAnalytics } from "./hooks/usePlayerAnalytics";
import { useWatchHistory } from "./hooks/useWatchHistory";
import { VastPlayer } from "./ads/VastPlayer";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { PlayerTopBar } from "./UI/PlayerTopBar";
import { PlayerControls } from "./UI/PlayerControls";
import type { VideoPlayerProps } from "./types";
import { keepScreenAwake } from "@/utils/platform";
import "./VideoPlayer.css";

/**
 * Componente orquestador del reproductor de video
 */
const VideoPlayerComponent = ({
  src,
  title,
  description,
  isLive = false,
  vastUrl,
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
  programBackgroundImage,
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

  const [playingAds, setPlayingAds] = useState(false);

  // UI Overlay state
  const [isUIVisible, setIsUIVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsJustShownRef = useRef(false);

  // End-of-episode PiP transition state
  const [isEndingTransition, setIsEndingTransition] = useState(false);
  const [nextEpisode, setNextEpisode] = useState<any>(null);
  const [endingCountdown, setEndingCountdown] = useState(30);
  const endingTriggeredRef = useRef(false);
  const nextEpisodeRef = useRef<any>(null);
  const autoNavFiredRef = useRef(false);

  // Hold-to-seek state
  const [keySeekPreview, setKeySeekPreview] = useState<number | null>(null);
  const keySeekIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const seekTargetRef = useRef<number | null>(null);

  // Focus para el video en miniatura (PiP)
  const { ref: pipVideoRef, focused: pipVideoFocused } = useFocusable({
    focusKey: "PIP-VIDEO",
    focusable: isEndingTransition,
    onEnterPress: () => {
      if (isEndingTransition) {
        setIsEndingTransition(false);
        setNextEpisode(null);
        setTimeout(() => setFocus("PLAYER-BTN-PLAYPAUSE"), 50);
      }
    },
    onArrowPress: (dir) => {
      if (dir === 'left') {
        setTimeout(() => setFocus("PIP-BTN-EPISODES"), 0);
        return false;
      }
      if (dir === 'up' || dir === 'down' || dir === 'right') return false;
      return true;
    }
  });

  // Resetear transición al cambiar capítulo
  useEffect(() => {
    endingTriggeredRef.current = false;
    autoNavFiredRef.current = false;
    nextEpisodeRef.current = null;
    setIsEndingTransition(false);
    setNextEpisode(null);
    setEndingCountdown(30);
  }, [currentEpisodeKey]);

  // Evaluar política de ads
  const { shouldPlayAds, effectiveVastUrl, evaluated } = useAdsPolicy({
    vastUrl,
  });

  // console.log('[VideoPlayer] Ads debug:', { vastUrl, effectiveVastUrl, shouldPlayAds, evaluated, playingAds });

  // Activar ads al inicio si corresponde
  useEffect(() => {
    if (evaluated && shouldPlayAds && effectiveVastUrl) {
      // console.log("[VideoPlayer] Ads detectados, activando playingAds");
      setPlayingAds(true);
    }
  }, [evaluated, shouldPlayAds, effectiveVastUrl]);

  // Foco inicial al botón Play/Pause al montar
  useEffect(() => {
    if (!playingAds) {
      const timer = setTimeout(() => {
        setFocus("PLAYER-BTN-PLAYPAUSE");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [playingAds]);

  // Inicializar HLS (no autoplay si hay ads pendientes)
  const hlsPlayer = useHlsPlayer({
    src,
    autoplay: autoplay && !playingAds,
    isLive,
    livetoken,
    initialSeconds: initialSeconds,
  });

  const {
    levels: hlsLevels,
    videoRef,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    play,
    pause,
  } = hlsPlayer;

  // Forzar pausa del video HLS cuando las ads están reproduciéndose
  useEffect(() => {
    if (playingAds && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    }
  }, [playingAds, videoRef]);

  // Overlay Mouse / Key visibility logic
  const resetUIVisibility = useCallback(() => {
    setIsUIVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    if (!isSidebarOpen) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsUIVisible(false);
      }, 4000);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    // Start the timeout on mount natively without forcing a state update
    if (isUIVisible && !hideTimeoutRef.current) {
      resetUIVisibility();
    }

    window.addEventListener("mousemove", resetUIVisibility);

    return () => {
      window.removeEventListener("mousemove", resetUIVisibility);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [resetUIVisibility, isUIVisible]);

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
  const currentEpisodeDetails = episodes?.find(
    (e: any) => e.key === currentEpisodeKey,
  );
  const analytics = usePlayerAnalytics(
    rudoKey,
    currentEpisodeDetails,
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

  // Reportar progreso en cada timeupdate
  useEffect(() => {
    if (!isLive && !playingAds && currentTime > 0 && duration > 0) {
      analytics.onPlaybackProgress(currentTime, duration);
    }
  }, [currentTime, duration, playingAds, isLive, analytics]);

  // Función para auto-navegar al siguiente episodio o volver al programa
  const autoNavigateToNext = useCallback(() => {
    if (autoNavFiredRef.current) return;
    autoNavFiredRef.current = true;
    const ep = nextEpisodeRef.current;
    if (ep && onEpisodeSelect) {
      onEpisodeSelect(ep);
    } else if (onBack) {
      // No hay siguiente episodio: volver al programa
      onBack();
    }
  }, [onEpisodeSelect, onBack]);

  // Chequear tiempo restante para transición PiP de fin de episodio
  useEffect(() => {
    if (isLive || duration <= 0) return;

    const timeLeft = duration - currentTime;
    const PIP_THRESHOLD = 30;

    if (timeLeft <= PIP_THRESHOLD && timeLeft >= -1) {
      if (!endingTriggeredRef.current) {
        endingTriggeredRef.current = true;
        setIsEndingTransition(true);

        // Buscar siguiente episodio si existe
        let hasNext = false;
        if (episodes && episodes.length > 0 && currentEpisodeKey) {
          const current = episodes.find(
            (ep: any) => ep.key === currentEpisodeKey,
          );
          if (current) {
            // Buscar el siguiente capítulo por número, sin importar el orden del array
            const next = episodes.find(
              (ep: any) => ep.season === current.season && ep.chapter === current.chapter + 1,
            );
            if (next) {
              nextEpisodeRef.current = next;
              setNextEpisode(next);
              hasNext = true;
            }
          }
        }

        // Foco imperativo al botón principal (REGLA F4.1)
        setTimeout(() => {
          setFocus(hasNext ? "PIP-BTN-NEXT" : "PIP-BTN-EPISODES");
        }, 200);
      }
      setEndingCountdown(Math.max(0, Math.ceil(timeLeft)));

      // Auto-navegar cuando timeLeft llega a 0
      if (timeLeft <= 0) {
        autoNavigateToNext();
      }
    } else if (endingTriggeredRef.current && timeLeft > PIP_THRESHOLD) {
      endingTriggeredRef.current = false;
      autoNavFiredRef.current = false;
      nextEpisodeRef.current = null;
      setIsEndingTransition(false);
      setNextEpisode(null);
    }
  }, [
    currentTime,
    duration,
    isLive,
    episodes,
    currentEpisodeKey,
    autoNavigateToNext,
  ]);

  // Fallback: auto-navegar cuando el video emite 'ended'
  useEffect(() => {
    if (hlsPlayer.isEnded) {
      saveProgress(1); // Marcar episodio actual como finalizado
      autoNavigateToNext();
    }
  }, [hlsPlayer.isEnded, autoNavigateToNext, saveProgress]);

  const handleNextEpisodeSelect = useCallback(
    (ep: any) => {
      setIsEndingTransition(false);
      if (onEpisodeSelect) onEpisodeSelect(ep);
    },
    [onEpisodeSelect],
  );

  // Callbacks de VAST
  const handleAdsPlaying = useCallback(() => {
    // console.log("[VideoPlayer] Ads reproduciendo");
    setPlayingAds(true);
    pause();
    analytics.onAdStarted();
    if (onAdsPlaying) onAdsPlaying();
  }, [pause, analytics, onAdsPlaying]);

  const handleAdsFinished = useCallback(() => {
    // console.log("[VideoPlayer] Ads finalizados");
    setPlayingAds(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
    play();
    analytics.onAdCompleted();
    if (onAdsFinished) onAdsFinished();
  }, [play, analytics, onAdsFinished, videoRef]);

  // (Manejo de Back ahora integrado en el keydown principal para evitar conflictos de listeners)

  const handleBackgroundClick = useCallback(
    (e: React.MouseEvent) => {
      // Ignorar clics en botones interactivos, barra de progreso o menú lateral
      const target = e.target as Element;
      if (
        target.closest(
          'button, .seekbar-track, .seekbar-wrapper, [role="button"]',
        )
      ) {
        return;
      }

      // No pausar durante la transición PiP de fin de episodio
      if (isEndingTransition) return;

      // No interactuar durante los ads
      if (playingAds) return;

      // Click central pausa o reanuda
      if (isPlaying) pause();
      else play();
    },
    [isLive, isPlaying, play, pause, isEndingTransition, playingAds],
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
    [videoRef, duration],
  );

  // Refs estables para keyboard (evitar que el effect se re-ejecute cada frame)
  const currentTimeRef = useRef(currentTime);
  const durationRef = useRef(duration);
  currentTimeRef.current = currentTime;
  durationRef.current = duration;

  // Keyboard controls: solo Back y Enter/Flechas para mostrar UI + dar foco
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.keyCode;
      if (playingAds) return;

      // Back: ESC(27), Backspace(8), Samsung Return(10009)
      if (code === 27 || code === 8 || code === 10009) {
        e.preventDefault();
        e.stopPropagation();
        if (onBack) onBack();
        return;
      }

      // Si estamos en la transición PiP de fin de episodio, dejar que Norigin 
      // maneje el 100% de la navegación (arriba ya cubrimos el botón Back)
      if (isEndingTransition) {
        return;
      }

      // Si la UI NO está visible, cualquier tecla la muestra
      if (!isUIVisible) {
        // Marcar que los controles acaban de aparecer (bloquear primera navegación Norigin)
        const showAndGuard = () => {
          controlsJustShownRef.current = true;
          setIsUIVisible(true);
          resetUIVisibility();
          setTimeout(() => { controlsJustShownRef.current = false; }, 150);
        };

        // Enter (13) / Espacio (32): mostrar UI + pausar + foco en Play/Pause
        if (code === 13 || code === 32) {
          e.preventDefault();
          e.stopPropagation();
          if (isPlaying) pause();
          showAndGuard();
          setTimeout(() => setFocus("PLAYER-BTN-PLAYPAUSE"), 50);
          return;
        }

        // Flechas Izq (37) / Der (39): mostrar UI + foco en seekbar
        if ((code === 37 || code === 39) && !isLive) {
          e.preventDefault();
          e.stopPropagation();
          showAndGuard();
          setTimeout(() => setFocus("PLAYER-SEEKBAR-THUMB"), 50);
          return;
        }

        // Arriba (38): mostrar UI + foco en PlayPause (no Back, para evitar doble salto)
        if (code === 38) {
          e.preventDefault();
          e.stopPropagation();
          showAndGuard();
          setTimeout(() => setFocus("PLAYER-BTN-PLAYPAUSE"), 50);
          return;
        }

        // Abajo (40): mostrar UI + foco en controles
        if (code === 40) {
          e.preventDefault();
          e.stopPropagation();
          showAndGuard();
          setTimeout(() => setFocus("PLAYER-BTN-PLAYPAUSE"), 50);
          return;
        }
      }

      // Guard: si los controles acaban de aparecer, consumir la tecla
      // para evitar que Norigin procese el mismo keypress que mostró la UI
      if (controlsJustShownRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Si la UI está visible, dejar que Norigin maneje la navegación
      // pero resetear el timer de auto-hide
      resetUIVisibility();
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [
    resetUIVisibility,
    onBack,
    isLive,
    isPlaying,
    pause,
    playingAds,
    isUIVisible,
    isEndingTransition,
  ]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={playerFocusRef} className="video-player-container" onClick={handleBackgroundClick}>
        {/* Fondo durante transición PiP */}
        {isEndingTransition && (
          <div className="pip-background">
            {programBackgroundImage && (
              <img
                src={programBackgroundImage}
                alt=""
                className="pip-background-image"
              />
            )}
            <div className="pip-background-overlay" />
          </div>
        )}

        {/* VAST Ads overlay */}
        {playingAds && effectiveVastUrl && (
          <VastPlayer
            url={effectiveVastUrl}
            onAdsPlaying={handleAdsPlaying}
            onAdsFinished={handleAdsFinished}
          />
        )}

        {/* Video principal — se achica a PiP cuando isEndingTransition */}
        <video
          id="hls-video-player"
          ref={(el) => {
            if (videoRef) videoRef.current = el;
            if (pipVideoRef) pipVideoRef.current = el;
          }}
          className={`${playingAds ? "hidden" : ""} ${isEndingTransition && !playingAds ? "pip-mode" : ""} ${pipVideoFocused ? "focused" : ""}`}
          playsInline
          autoPlay={autoplay && !playingAds}
          controls={false}
          muted={playingAds}
          tabIndex={-1}
          onClick={(e) => {
            if (isEndingTransition) {
              e.stopPropagation();
              setIsEndingTransition(false);
              setNextEpisode(null);
            }
          }}
        />

        {/* Info estilo ShrunkBackdrop (replica del web) */}
        {isEndingTransition && (
          <div className="pip-info">
            <h1 className="pip-info-program-title">{nextEpisode.title}</h1>
            {nextEpisode?.description && (
              <p className="pip-info-description">{nextEpisode.description}</p>
            )}
            <div className="pip-info-buttons">
              {nextEpisode && (
                <Button
                  focusKey="PIP-BTN-NEXT"
                  variant="primary"
                  showArrow
                  onPress={() => handleNextEpisodeSelect(nextEpisode)}
                  onArrowPress={(dir) => {
                    if (dir === 'right') {
                      setTimeout(() => setFocus("PIP-BTN-EPISODES"), 0);
                      return false;
                    }
                    if (dir === 'up' || dir === 'down' || dir === 'left') return false;
                    return true;
                  }}
                >
                  Siguiente episodio en <span className="pip-countdown-number">{endingCountdown}</span>s
                </Button>
              )}
              <Button
                focusKey="PIP-BTN-EPISODES"
                variant="tertiary"
                onPress={() => { if (onBack) onBack(); }}
                onArrowPress={(dir) => {
                  if (dir === 'left' && nextEpisode) {
                    setTimeout(() => setFocus("PIP-BTN-NEXT"), 0);
                    return false;
                  }
                  if (dir === 'right') {
                    setTimeout(() => setFocus("PIP-VIDEO"), 0);
                    return false;
                  }
                  if (dir === 'up' || dir === 'down') return false;
                  return true;
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '0.5vw' }}>
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
                Listado de episodios
              </Button>
            </div>
          </div>
        )}

        {/* UI Overlay (ocultar durante transición PiP) */}
        {!playingAds && !hideUI && !isEndingTransition && (
          <>
            <PlayerTopBar
              title={title}
              description={description}
              isVisible={isUIVisible}
              isLive={isLive}
              onBackClick={onBack}
            />
            <PlayerControls
              playing={hlsPlayer.isPlaying}
              visible={isUIVisible}
              isLive={isLive}
              duration={hlsPlayer.duration}
              seekTime={hlsPlayer.currentTime}
              previewSeekTime={keySeekPreview}
              loadedTime={hlsPlayer.loadedTime}
              onPlayButtonClick={
                hlsPlayer.isPlaying ? hlsPlayer.pause : hlsPlayer.play
              }
              onSeek={(time) => {
                if (hlsPlayer.videoRef.current) {
                  hlsPlayer.videoRef.current.currentTime = time;
                }
              }}
              onSkip={handleSkip}
              currentEpisodeKey={currentEpisodeKey}
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
