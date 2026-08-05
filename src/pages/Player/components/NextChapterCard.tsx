import type { Chapter } from "@/interfaces/catalog.interface";
import styles from "./NextChapterCard.module.css";

interface NextChapterCardProps {
  chapter: Chapter;
  onPlay: () => void;
}

export function NextChapterCard({ chapter, onPlay }: NextChapterCardProps) {
  return (
    <div
      onClick={onPlay}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 0 20px var(--foc-primary, #ff1376)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }} className={styles.cardContainer}
    >
      <img
        src={chapter.image_land?.medium || chapter.image}
        alt={chapter.title} className={styles.thumbnailImage}
      />
      <div className={styles.infoWrapper}>
        <span className={styles.nextChapterLabel}
        >
          Siguiente capítulo
        </span>
        <span className={styles.episodeInfoText}
        >
          T{chapter.season}:E{chapter.chapter}
        </span>
        <span className={styles.episodeTitleText}
        >
          {chapter.title || chapter.name_program}
        </span>
      </div>
    </div>
  );
}
