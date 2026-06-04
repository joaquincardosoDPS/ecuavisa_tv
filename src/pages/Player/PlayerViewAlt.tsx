import { useEffect, useCallback, useState, useRef } from "react";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { usePlayerEpisode } from "@/hooks/player/usePlayerEpisode";
import { usePlayerNavigation } from "@/hooks/player/usePlayerNavigation";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { NextEpisodeCard } from "./components/NextEpisodeCard";
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

/**
 * PlayerViewAlt — Vista alternativa del reproductor.
 * En vez de reducir el video (PiP shrink), muestra un card flotante
 * "A continuación" sobre el video a tamaño completo con los controles visibles.
 */
function PlayerViewAlt() {
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
    initialSeconds,
    episodes,
    goBack,
    token,
    activeProfile,
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

          // Buscar siguiente episodio si existe
          let foundNext: VideoPlayerChapter | null = null;
          if (videoPlayerEpisodes.length > 0 && currentKey) {
            const current = videoPlayerEpisodes.find(
              (ep) => ep.key === currentKey,
            );
            if (current) {
              const next = videoPlayerEpisodes.find(
                (ep) => ep.season === current.season && ep.chapter === current.chapter + 1,
              );
              if (next) {
                foundNext = next;
              }
            }
          }

          // Solo activar transición si hay siguiente episodio
          // (en modo card no hay pantalla de "Listado de episodios" como fallback)
          if (foundNext) {
            setNextEpisode(foundNext);
            setIsEndingTransition(true);

            // Foco imperativo al card
            setTimeout(() => {
              setFocus("CARD-NEXT-EP");
            }, 200);
          }
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
        {/* Reproductor de video — NUNCA en modo PiP en esta vista */}
        <VideoPlayer
          src={m3u8}
          title={episodeTitle}
          description={programTitle}
          rudoKey={currentKey}
          vastUrl={vastUrl}
          autoplay
          onBack={goBack}
          pipMode={false}
          forceControlsVisible={isEndingTransition}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          initialSeconds={initialSeconds}
          vodSlug={vodSlug}
          userToken={token || undefined}
          userProfile={activeProfile?.id || undefined}
        />

        {/* Card flotante "A continuación" — se renderiza
            sobre el video a tamaño completo con controles visibles */}
        {isEndingTransition && nextEpisode && (
          <NextEpisodeCard
            episode={nextEpisode}
            countdown={endingCountdown}
            threshold={PIP_THRESHOLD}
            onNextEpisode={handleEpisodeSelect}
          />
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default PlayerViewAlt;
