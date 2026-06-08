import { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { usePlayerEpisode } from "@/hooks/player/usePlayerEpisode";
import { usePlayerNavigation } from "@/hooks/player/usePlayerNavigation";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { EndOfEpisodeScreen } from "./components/EndOfEpisodeScreen";
import type { Chapter as VideoPlayerChapter } from "@/components/VideoPlayer/types";
import type { Chapter } from "@/interfaces/catalog.interface";
import styles from "./PlayerView.module.css";

/**
 * Convierte un Chapter del catálogo al formato que espera VideoPlayer
 */
function toVideoPlayerChapter(ch: Chapter): VideoPlayerChapter {
  return {
    chapter: ch.chapter,
    date_create: ch.date_create,
    date_update: ch.date_update,
    description: ch.description,
    duration: ch.duration,
    image: ch.image,
    image_land: ch.image_land,
    key: ch.key,
    key_segment: ch.key_segment,
    m3u8: ch.m3u8,
    name_program: ch.name_program,
    name_segment: ch.name_segment,
    restriction: ch.restriction,
    season: ch.season,
    slug: ch.slug,
    title: ch.title,
    title_complete: ch.title_complete,
  };
}

const PIP_THRESHOLD = 30;

function PlayerView() {
  const { goToEpisode } = usePlayerNavigation();

  const {
    loading,
    error,
    currentKey,
    episodeTitle,
    programTitle,
    vodSlug,
    m3u8,
    vastUrl,
    vastUrls,
    midrollCuepoints,
    postrollVastUrls,
    initialSeconds,
    episodes,
    goBack,
    token,
    activeProfile,
    chapterImage,
    programKey,
    segment,
  } = usePlayerEpisode();

  // --- Estado de transición de fin de episodio ---
  const [isEndingTransition, setIsEndingTransition] = useState(false);
  const [nextEpisode, setNextEpisode] = useState<VideoPlayerChapter | null>(null);
  const [endingCountdown, setEndingCountdown] = useState(PIP_THRESHOLD);
  const endingTriggeredRef = useRef(false);
  const autoNavFiredRef = useRef(false);

  // FocusContext para la vista completa del player
  const { ref: viewFocusRef, focusKey: viewFocusKey } = useFocusable({
    focusKey: "PLAYER-PAGE",
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Resetear transición al cambiar capítulo
  useEffect(() => {
    endingTriggeredRef.current = false;
    autoNavFiredRef.current = false;
    setIsEndingTransition(false);
    setNextEpisode(null);
    setEndingCountdown(PIP_THRESHOLD);
  }, [currentKey]);

  // Foco imperativo cuando el player está listo
  useEffect(() => {
    if (!loading && !error) {
      setFocus("PLAYER-VIEW");
    }
  }, [loading, error]);

  // Back key handler for loading/error states
  useEffect(() => {
    if (!loading && !error) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'GoBack' || e.key === 'XF86Back'
        || e.keyCode === 10009 || e.keyCode === 461 || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();
        goBack();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [loading, error, goBack]);

  const videoPlayerEpisodes = episodes.map(toVideoPlayerChapter);

  /** Navegar al siguiente episodio seleccionado */
  const handleEpisodeSelect = useCallback(
    (ep: VideoPlayerChapter) => {
      setIsEndingTransition(false);
      goToEpisode(programKey || '', ep, segment);
    },
    [goToEpisode, programKey, segment],
  );

  /** Determinar si hay un capítulo siguiente */
  const computedNextEpisode = useMemo(() => {
    if (videoPlayerEpisodes.length === 0 || !currentKey) return null;
    const current = videoPlayerEpisodes.find((ep) => ep.key === currentKey);
    if (!current) return null;
    return videoPlayerEpisodes.find(
      (ep) => ep.season === current.season && ep.chapter === current.chapter + 1,
    ) || null;
  }, [videoPlayerEpisodes, currentKey]);

  const hasNextChapter = computedNextEpisode !== null;

  /** Reiniciar el capítulo actual (seek a 0) */
  const handleRestartChapter = useCallback(() => {
    const video = document.getElementById('hls-video-player') as HTMLVideoElement | null;
    if (video) {
      video.currentTime = 0;
    }
  }, []);

  /** Pasar al siguiente capítulo */
  const handleNextChapter = useCallback(() => {
    if (computedNextEpisode) {
      handleEpisodeSelect(computedNextEpisode);
    }
  }, [computedNextEpisode, handleEpisodeSelect]);

  /** Auto-navegar al siguiente episodio o volver al programa */
  const autoNavigateToNext = useCallback(() => {
    if (autoNavFiredRef.current) return;
    autoNavFiredRef.current = true;

    if (nextEpisode) {
      handleEpisodeSelect(nextEpisode);
    } else {
      goBack();
    }
  }, [nextEpisode, handleEpisodeSelect, goBack]);

  /** onTimeUpdate del VideoPlayer — detectar últimos 30s */
  const handleTimeUpdate = useCallback(
    (currentTime: number, duration: number) => {
      if (duration <= 0) return;

      const timeLeft = duration - currentTime;

      if (timeLeft <= PIP_THRESHOLD && timeLeft >= -1) {
        if (!endingTriggeredRef.current) {
          endingTriggeredRef.current = true;
          setIsEndingTransition(true);

          // Buscar siguiente episodio si existe
          let hasNext = false;
          if (videoPlayerEpisodes.length > 0 && currentKey) {
            const current = videoPlayerEpisodes.find(
              (ep) => ep.key === currentKey,
            );
            if (current) {
              const next = videoPlayerEpisodes.find(
                (ep) => ep.season === current.season && ep.chapter === current.chapter + 1,
              );
              if (next) {
                setNextEpisode(next);
                hasNext = true;
              }
            }
          }

          // Foco imperativo al botón principal
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
        // El usuario buscó hacia atrás, cancelar la transición
        endingTriggeredRef.current = false;
        autoNavFiredRef.current = false;
        setIsEndingTransition(false);
        setNextEpisode(null);
      }
    },
    [videoPlayerEpisodes, currentKey, autoNavigateToNext],
  );

  /** onEnded del VideoPlayer — el video terminó naturalmente */
  const handleEnded = useCallback(() => {
    autoNavigateToNext();
  }, [autoNavigateToNext]);

  /** Cancelar la transición PiP (click en el video miniatura) */
  const handleCancelTransition = useCallback(() => {
    endingTriggeredRef.current = false;
    autoNavFiredRef.current = false;
    setIsEndingTransition(false);
    setNextEpisode(null);
    setTimeout(() => setFocus("PLAYER-BTN-PLAYPAUSE"), 50);
  }, []);

  if (loading) {
    return (
      <div className={styles.playerPage}>
        <FullScreenSpinner />
      </div>
    );
  }

  if (error || !currentKey || !m3u8) {
    return (
      <div className={styles.playerPage}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error || "No se pudo cargar el episodio"}</p>
        </div>
      </div>
    );
  }

  return (
    <FocusContext.Provider value={viewFocusKey}>
      <div ref={viewFocusRef} className={styles.playerPage}>
        {/* Reproductor de video */}
        <VideoPlayer
          src={m3u8}
          title={episodeTitle}
          description={programTitle}
          rudoKey={currentKey}
          vastUrl={vastUrl}
          vastUrls={vastUrls}
          autoplay
          onBack={goBack}
          pipMode={isEndingTransition}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          initialSeconds={initialSeconds}
          vodSlug={vodSlug}
          userToken={token || undefined}
          userProfile={activeProfile?.id || undefined}
          onRestartChapter={handleRestartChapter}
          onNextChapter={handleNextChapter}
          hasNextChapter={hasNextChapter}
          midrollCuepoints={midrollCuepoints}
          postrollVastUrls={postrollVastUrls}
        />

        {/* Pantalla de fin de episodio (background + info) — se renderiza 
            encima del VideoPlayer cuyo fondo es transparente en pip-active */}
        {isEndingTransition && (
          <EndOfEpisodeScreen
            backgroundImage={chapterImage}
            nextEpisode={nextEpisode}
            programTitle={programTitle}
            countdown={endingCountdown}
            onNextEpisode={handleEpisodeSelect}
            onBack={goBack}
            onCancelTransition={handleCancelTransition}
          />
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default PlayerView;
