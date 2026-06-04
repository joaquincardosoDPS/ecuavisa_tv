import { memo, useCallback } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import type { Chapter } from "@/components/VideoPlayer/types";
import styles from "./NextEpisodeCard.module.css";

interface NextEpisodeCardProps {
  /** Episodio siguiente */
  episode: Chapter;
  /** Segundos restantes para auto-navegación */
  countdown: number;
  /** Threshold total (para la barra de progreso) */
  threshold: number;
  /** Callback al seleccionar el siguiente episodio */
  onNextEpisode: (episode: Chapter) => void;
}

/**
 * Card flotante "A continuación" — se muestra sobre los controles del player
 * durante los últimos segundos del episodio actual.
 * Todo el card es clickeable/focusable para ir al siguiente episodio.
 */
const NextEpisodeCardComponent = ({
  episode,
  countdown,
  threshold,
  onNextEpisode,
}: NextEpisodeCardProps) => {
  const handleSelect = useCallback(() => {
    onNextEpisode(episode);
  }, [onNextEpisode, episode]);

  // Card completo como elemento focusable
  const { ref: cardRef, focused } = useFocusable({
    focusKey: "CARD-NEXT-EP",
    onEnterPress: handleSelect,
    onArrowPress: (dir) => {
      // Down → ir a controles del player
      if (dir === "down") return true;
      // Bloquear Up, Left, Right dentro del card
      if (dir === "up" || dir === "left" || dir === "right") return false;
      return true;
    },
  });

  // Progreso visual: de 100% a 0% conforme avanza el countdown
  const progressPercent = threshold > 0 ? (countdown / threshold) * 100 : 0;

  // Resolver la mejor imagen disponible del episodio
  const episodeImage = episode.image_land?.big
    || episode.image_land?.normal
    || episode.image_land?.default
    || episode.image
    || "";

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${focused ? styles.focused : ""}`}
      onClick={handleSelect}
    >
      {/* Header */}
      <div className={styles.header}>A continuación</div>

      {/* Body: thumbnail + título */}
      <div className={styles.body}>
        <div className={styles.thumbnailWrapper}>
          <img
            src={episodeImage}
            alt={episode.title}
            className={styles.thumbnail}
            loading="lazy"
          />
          {countdown > 0 && (
            <div className={styles.countdownOverlay}>
              En <span className={styles.countdownNumber}>{countdown}</span>s
            </div>
          )}
        </div>

        <div className={styles.episodeTitle}>
          {episode.title}
        </div>
      </div>

      {/* Barra de progreso del countdown */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export const NextEpisodeCard = memo(NextEpisodeCardComponent);
