import type { Chapter, ChapterWithHistory, Segment } from "@/interfaces/catalog.interface";
import { useChapters } from "@/hooks/program/useChapters";
import { useEffect } from "react";
import ChapterCard from "@/pages/Event/components/ChapterCard";
import Button from "@/components/ui/Button";
import styles from "../Program.module.css";

interface Props {
  slug: string;
  programKey: string;
  activeSegment: Segment | null;
  activeSeason: number | null;
  setActiveSeason: (season: number) => void;
  onLoaded?: () => void;
  onFirstChapter?: (chapter: Chapter) => void;
  showChapter?: boolean;
}

function ChaptersContainer({ slug, programKey, activeSegment, activeSeason, setActiveSeason, onLoaded, onFirstChapter, showChapter = true }: Props) {
  const { chaptersWithHistory, isLoading: isLoadingChapters, fetchNextPage, hasNextPage, isFetchingNextPage } = useChapters(slug, activeSeason, activeSegment?.key || null);

  useEffect(() => {
    if (!isLoadingChapters && onLoaded) onLoaded();
    if (!isLoadingChapters && chaptersWithHistory.length > 0 && onFirstChapter) onFirstChapter(chaptersWithHistory[0]);
  }, [isLoadingChapters]);

  return (
    <div className={styles.chaptersWrap}>
      <div className={styles.seasonsGrid}>
        {activeSegment?.all_temp.map((temp) => {
          const isSeasonActive = activeSeason === temp;
          return (
            <div
              key={temp}
              onClick={() => setActiveSeason(temp)}
              className={[styles.seasonItem, isSeasonActive ? styles.seasonActive : styles.seasonInactive].join(" ")}
            >
              Temporada {temp}
            </div>
          );
        })}
      </div>

      {isLoadingChapters ? (
        <p className={styles.loadingText}>Cargando capitulos...</p>
      ) : chaptersWithHistory && chaptersWithHistory.length > 0 ? (
        <>
          <div className={styles.chaptersGrid}>
            {chaptersWithHistory.map((chapter: ChapterWithHistory, index: number) => (
              <ChapterCard
                key={`${chapter.key}-${index}`}
                chapter={chapter}
                index={index + 1}
                programKey={programKey}
                showChapter={showChapter}
                playbackTime={chapter.playbackTime}
                isFinished={chapter.isFinished}
              />
            ))}
          </div>
          {hasNextPage && (
            <div className={styles.loadMoreWrap}>
              <Button variant="tertiary" onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className={styles.loadMoreBtn}>
                {isFetchingNextPage ? "Cargando..." : "Ver mas"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className={styles.emptyText}>No hay capitulos disponibles para esta temporada.</p>
      )}
    </div>
  );
}

export default ChaptersContainer;
