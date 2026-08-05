import type { Chapter } from "@/interfaces/catalog.interface";
import Button from "@/components/ui/Button";
import styles from "./ShrunkBackdrop.module.css";

interface ShrunkBackdropProps {
  chapterImage: string;
  nextChapter: Chapter | null;
  programTitle: string;
  remainingSeconds: number;
  onPlayNext: () => void;
  onGoToEpisodes: () => void;
}

export function ShrunkBackdrop({ chapterImage, nextChapter, programTitle, remainingSeconds, onPlayNext, onGoToEpisodes }: ShrunkBackdropProps) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, background: `url(${chapterImage}) center/cover no-repeat #000` }}>
      <div className={styles.overlayLayer} />
      <div className={styles.backdropContainer}>
        <h1 className={styles.programTitleText}>{programTitle}</h1>
        {nextChapter && <p className={styles.nextChapterDescription}>{nextChapter.description}</p>}
        <div className={styles.buttonGroup}>
          {nextChapter && (
            <Button variant="primary" showArrow onClick={onPlayNext}>
              Siguiente episodio en <span className={styles.countdownText}>{remainingSeconds}</span>s
            </Button>
          )}
          <Button variant="tertiary" onClick={onGoToEpisodes}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.listIcon}>
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Listado de episodios
          </Button>
        </div>
      </div>
    </div>
  );
}
