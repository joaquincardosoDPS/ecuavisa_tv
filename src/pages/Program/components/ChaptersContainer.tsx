import type { Chapter, ChapterWithHistory, Segment } from "@/interfaces/catalog.interface";
import { useChapters } from "@/hooks/program/useChapters";
import { useEffect } from "react";
import ChapterCard from "@/pages/Event/components/ChapterCard";
import Button from "@/components/ui/Button";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { getCurrentFocusKey, setFocus } from "@noriginmedia/norigin-spatial-navigation";
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

function SeasonItem({ focusKey, temp, isActive, onSelect }: { focusKey: string; temp: number; isActive: boolean; onSelect: () => void }) {
  const { ref, focused } = useSpatialFocus({
    focusKey,
    onEnterPress: onSelect,
  });

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={[styles.seasonItem, isActive ? styles.seasonActive : styles.seasonInactive, focused ? styles.seasonFocused : ""].join(" ")}
    >
      Temporada {temp}
    </div>
  );
}

function LoadMore({ programKey, onClick, isFetching }: { programKey: string; onClick: () => void; isFetching: boolean }) {
  const { ref, focused } = useSpatialFocus({
    focusKey: `load-more-${programKey}`,
    onEnterPress: onClick,
  });

  return (
    <div ref={ref} className={[styles.loadMoreWrap, focused ? styles.loadMoreFocused : ""].join(" ")}>
      <Button variant="tertiary" onClick={onClick} disabled={isFetching} className={styles.loadMoreBtn}>
        {isFetching ? "Cargando..." : "Ver mas"}
      </Button>
    </div>
  );
}

function ChaptersContainer({ slug, programKey, activeSegment, activeSeason, setActiveSeason, onLoaded, onFirstChapter, showChapter = true }: Props) {
  const { chaptersWithHistory, isLoading: isLoadingChapters, fetchNextPage, hasNextPage, isFetchingNextPage } = useChapters(slug, activeSeason, activeSegment?.key || null);

  useEffect(() => {
    if (!isLoadingChapters && onLoaded) onLoaded();
    if (!isLoadingChapters && chaptersWithHistory.length > 0 && onFirstChapter) onFirstChapter(chaptersWithHistory[0]);
  }, [isLoadingChapters]);

  // Último capítulo cargado y su clave de foco
  const lastChapter = chaptersWithHistory[chaptersWithHistory.length - 1];
  const lastChapterFocusKey = lastChapter
    ? `chapter-${programKey}-${lastChapter.key_segment}-${lastChapter.season}-${lastChapter.chapter}`
    : null;
  const loadMoreFocusKey = `load-more-${programKey}`;

  // Si el botón "Ver mas" estaba enfocado y desaparece (última página cargada),
  // la librería restauraría el foco a ROOT y se perdería la navegación.
  // Movemos el foco al último capítulo para continuar bajando por la grilla.
  useEffect(() => {
    if (hasNextPage || isFetchingNextPage || !lastChapterFocusKey) return;
    if (getCurrentFocusKey() !== loadMoreFocusKey) return;
    setFocus(lastChapterFocusKey);
  }, [hasNextPage, isFetchingNextPage, lastChapterFocusKey, loadMoreFocusKey]);

  return (
    <div className={styles.chaptersWrap}>
      <div className={styles.seasonsGrid}>
        {activeSegment?.all_temp.map((temp) => {
          const isSeasonActive = activeSeason === temp;
          return (
            <SeasonItem
              key={temp}
              focusKey={`season-${activeSegment.key}-${temp}`}
              temp={temp}
              isActive={isSeasonActive}
              onSelect={() => setActiveSeason(temp)}
            />
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
                isFirstRow={index < 5}
              />
            ))}
          </div>
          {hasNextPage && (
            <LoadMore
              programKey={programKey}
              onClick={() => { if (!isFetchingNextPage) fetchNextPage(); }}
              isFetching={isFetchingNextPage}
            />
          )}
        </>
      ) : (
        <p className={styles.emptyText}>No hay capitulos disponibles para esta temporada.</p>
      )}
    </div>
  );
}

export default ChaptersContainer;
