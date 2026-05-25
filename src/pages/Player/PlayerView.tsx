import { useEffect, useCallback } from "react";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useNavigate } from "react-router-dom";
import { usePlayerEpisode } from "@/hooks/usePlayerEpisode";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
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

function PlayerView() {
  const navigate = useNavigate();

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
    chapterImage,
    programKey,
    segment,
  } = usePlayerEpisode();

  // Foco imperativo cuando el player está listo
  useEffect(() => {
    if (!loading && !error) {
      setFocus("PLAYER-VIEW");
    }
  }, [loading, error]);

  // Back key handler for loading/error states (REGLA 4.1)
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

  /** Navegar al siguiente episodio seleccionado por el VideoPlayer */
  const handleEpisodeSelect = useCallback(
    (ep: VideoPlayerChapter) => {
      // Navegar al episodio usando la ruta play/:program/:segment/:season/:chapter
      const prog = programKey || '';
      const seg = ep.key_segment || segment || '';
      navigate(`/play/${prog}/${seg}/${ep.season}/${ep.chapter}`);
    },
    [navigate, programKey, segment],
  );

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

  const videoPlayerEpisodes = episodes.map(toVideoPlayerChapter);

  return (
    <div className={styles.playerPage}>
      <VideoPlayer
        src={m3u8}
        title={episodeTitle}
        description={programTitle}
        rudoKey={currentKey}
        vastUrl={vastUrl}
        autoplay
        onBack={goBack}
        episodes={videoPlayerEpisodes}
        currentEpisodeKey={currentKey}
        onEpisodeSelect={handleEpisodeSelect}
        initialSeconds={initialSeconds}
        vodSlug={vodSlug}
        userToken={token || undefined}
        userProfile={activeProfile?.id || undefined}
        programBackgroundImage={chapterImage}
      />
    </div>
  );
}

export default PlayerView;

