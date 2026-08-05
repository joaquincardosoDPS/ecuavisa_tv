import { useNavigate } from 'react-router-dom';
import type { Chapter } from "@/interfaces/catalog.interface";
import styles from "./ChapterCard.module.css";

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
  programKey: string;
  showChapter?: boolean;
  playbackTime?: number;
  isFinished?: boolean;
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return hrs > 0 ? `${hrs} hrs ${mins} min` : `${mins} min`;
}

function getProgress(playbackTime: number, durationSeg: number): number {
  if (durationSeg <= 0 || playbackTime <= 0) return 0;
  return Math.min(100, (playbackTime / durationSeg) * 100);
}

function ChapterCard({ chapter, programKey, showChapter = true, playbackTime = 0, isFinished = false }: ChapterCardProps) {
  const navigate = useNavigate();
  const imageSrc = chapter.image_land.small;

  const handleClick = () => {
    navigate(`/play/${programKey}/${chapter.key_segment}/${chapter.season}/${chapter.chapter}`, playbackTime > 0 && !isFinished ? { state: { resumeTime: playbackTime } } : undefined);
  };

  const progress = isFinished ? 100 : getProgress(playbackTime, chapter.duration_seg);
  const hasProgress = progress > 0;

  return (
    <div onClick={handleClick} className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={chapter.title} loading="lazy" className={styles.thumbnailImage} />
        {hasProgress && (
          <div className={styles.progressBarContainer}>
            <div style={{ height: "100%", backgroundColor: "var(--foc-primary)", transition: "all 0.3s", width: `${progress}%` }} />
          </div>
        )}
      </div>
      <div className={styles.textContainer}>
        {showChapter ? (
          <>
            <h1>Capítulo {chapter.chapter}</h1>
            <h2 className={styles.chapterTitle}>{chapter.title}</h2>
          </>
        ) : (
          <div className={styles.infoContainer}>
            <p className={styles.durationText}>{formatDuration(chapter.duration_seg)}</p>
            <h4 className={styles.titleText}>{chapter.title}</h4>
            <p className={styles.descriptionText}>{chapter.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default ChapterCard;
