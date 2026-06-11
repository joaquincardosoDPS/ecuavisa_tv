import { useEffect, useRef, useCallback } from "react";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import type { Segment } from "@/interfaces/catalog.interface";
import type { HistoryItem } from "@/interfaces/history.interface";
import { useChapters } from "@/hooks/program/useChapters";
import ChapterCard from "./ChapterCard";
import SeasonSelector from "./SeasonSelector";
import styles from "../ProgramPage.module.css";

/** Cuántos cards antes del final dispara la carga */
const PREFETCH_THRESHOLD = 3;

interface ChaptersContainerProps {
  slug: string;
  activeSegment: Segment | null;
  activeSeason: number | null;
  setActiveSeason: (season: number) => void;
  onLoaded?: () => void;
  showChapter?: boolean;
  onContentFocused?: () => void;
  progressMap?: Map<string, HistoryItem>;
  onChapterPress?: (chapter: any, resumeTime?: number) => void;
}

function ChaptersContainer({
  slug,
  activeSegment,
  activeSeason,
  setActiveSeason,
  onLoaded,
  showChapter = true,
  onContentFocused,
  progressMap,
  onChapterPress,
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

  /** Scroll vertical al capítulo enfocado (compatible webOS 1-3) */
  const scrollToChapter = useCallback((idx: number) => {
    const list = listRef.current;
    if (!list) return;

    // El contenedor scrolleable es chaptersWrapper (padre de chaptersTrack)
    const scrollContainer = list.parentElement;
    if (!scrollContainer) return;

    const children = list.children;
    if (idx < 0 || idx >= children.length) return;

    const child = children[idx] as HTMLElement;
    const containerRect = scrollContainer.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    // Si el elemento ya está visible, no scrollear
    if (childRect.top >= containerRect.top && childRect.bottom <= containerRect.bottom) {
      return;
    }

    // Calcular el nuevo scrollTop para centrar el elemento
    const childOffsetTop = child.offsetTop;
    const containerHeight = scrollContainer.clientHeight;
    const targetScroll = childOffsetTop - containerHeight / 2 + child.offsetHeight / 2;
    scrollContainer.scrollTop = Math.max(0, targetScroll);
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
            onSeasonFocused={onContentFocused}
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
                const historyItem = progressMap?.get(chapter.key);
                const enrichedChapter = historyItem
                  ? { ...chapter, time: historyItem.time, duration_seg: historyItem.duration_seg }
                  : chapter;
                return (
                  <ChapterCard
                    key={cardKey}
                    chapter={enrichedChapter}
                    index={index + 1}
                    focusKey={cardKey}
                    showChapter={showChapter}
                    onCardFocus={() => handleCardFocus(cardKey, index)}
                    resumeTime={historyItem?.end === 0 ? historyItem.time : undefined}
                    onPress={onChapterPress}
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
