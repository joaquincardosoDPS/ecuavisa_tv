import { useEffect, useRef, useCallback } from "react";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import type { Segment } from "@/interfaces/catalog.interface";
import { useChapters } from "@/hooks/useChapters";
import ChapterCard from "./ChapterCard";
import SeasonSelector from "./SeasonSelector";
import styles from "../ProgramPage.module.css";

/** Cuántos cards antes del final dispara la carga */
const PREFETCH_THRESHOLD = 3;

interface ChaptersContainerProps {
  slug: string;
  programKey: string;
  activeSegment: Segment | null;
  activeSeason: number | null;
  setActiveSeason: (season: number) => void;
  onLoaded?: () => void;
  showChapter?: boolean;
  onContentFocused?: () => void;
}

function ChaptersContainer({
  slug,
  programKey,
  activeSegment,
  activeSeason,
  setActiveSeason,
  onLoaded,
  showChapter = true,
  onContentFocused,
}: ChaptersContainerProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const {
    chapters: chaptersData,
    isLoading: isLoadingChapters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChapters(slug, activeSeason, activeSegment?.key || null, 12);

  const chapters =
    chaptersData?.pages?.flatMap((page: any) => page?.data || []) || [];

  // Señalar al padre que terminamos de cargar
  useEffect(() => {
    if (!isLoadingChapters && onLoaded) {
      onLoaded();
    }
  }, [isLoadingChapters]); // eslint-disable-line react-hooks/exhaustive-deps

  const { ref, focusKey } = useFocusable({
    focusKey: "PROGRAM-CHAPTERS",
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    onFocus: () => onContentFocused?.(),
  });

  /** Scroll vertical al capítulo enfocado */
  const scrollToChapter = useCallback((idx: number) => {
    const list = listRef.current;
    if (!list) return;

    const children = list.children;
    if (idx < 0 || idx >= children.length) return;

    const child = children[idx] as HTMLElement;
    child.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  /** Focus handler con infinite scroll */
  const handleCardFocus = useCallback((_cardKey: string, index: number) => {
    scrollToChapter(index);

    // Prefetch cuando el foco llega a los últimos N cards
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      index >= chapters.length - PREFETCH_THRESHOLD
    ) {
      fetchNextPage();
    }
  }, [scrollToChapter, hasNextPage, isFetchingNextPage, chapters.length, fetchNextPage]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Sidebar de temporadas — a la izquierda */}
        {activeSegment && activeSegment.all_temp.length >= 1 && (
          <SeasonSelector
            seasons={activeSegment.all_temp}
            activeSeason={activeSeason}
            setActiveSeason={setActiveSeason}
          />
        )}

        {/* Lista vertical de capítulos — a la derecha */}
        {isLoadingChapters ? (
          <p className={styles.statusText}>Cargando capítulos...</p>
        ) : chapters.length > 0 ? (
          <div className={styles.chaptersWrapper}>
            <div ref={listRef} className={styles.chaptersTrack}>
              {chapters.map((chapter: any, index: number) => {
                const cardKey = `PROGRAM-CHAPTERS-${chapter.key}-${index}`;
                return (
                  <ChapterCard
                    key={cardKey}
                    chapter={chapter}
                    index={index + 1}
                    programKey={programKey}
                    focusKey={cardKey}
                    showChapter={showChapter}
                    onCardFocus={() => handleCardFocus(cardKey, index)}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <p className={styles.emptyText}>
            No hay capítulos disponibles para esta temporada.
          </p>
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default ChaptersContainer;
