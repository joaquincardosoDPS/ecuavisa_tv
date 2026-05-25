import { useEffect, useRef, useCallback } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
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
  /** Callback del page-scroll para centrar un elemento en el viewport */
  onScrollToElement?: (el: HTMLElement | null) => void;
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
  onScrollToElement,
}: ChaptersContainerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

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

  /** REGLA F5.1: centra el card enfocado horizontalmente en el track */
  const scrollToCard = useCallback((cardFocusKey: string) => {
    const track = trackRef.current;
    if (!track) return;

    const wrapper = track.parentElement;
    if (!wrapper) return;

    const child = track.querySelector(
      `[data-focuskey="${cardFocusKey}"]`,
    ) as HTMLElement | null;
    if (!child) return;

    const wrapperWidth = wrapper.offsetWidth;
    const childLeft = child.offsetLeft;
    const childWidth = child.offsetWidth;

    const targetX = childLeft - (wrapperWidth / 2) + (childWidth / 2);
    const maxScroll = track.scrollWidth - wrapperWidth;
    const clampedX = Math.max(0, Math.min(targetX, maxScroll));

    track.style.transform = `translateX(-${clampedX}px)`;

    // También notificar al padre para page-scroll vertical
    if (onScrollToElement) {
      onScrollToElement(child);
    }
  }, [onScrollToElement]);

  /** Infinite scroll: carga más al acercarse al final */
  const handleCardFocus = useCallback((cardKey: string, index: number) => {
    scrollToCard(cardKey);

    // Prefetch cuando el foco llega a los últimos N cards
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      index >= chapters.length - PREFETCH_THRESHOLD
    ) {
      fetchNextPage();
    }
  }, [scrollToCard, hasNextPage, isFetchingNextPage, chapters.length, fetchNextPage]);

  /** FocusKey del primer card */
  const firstCardKey = chapters.length > 0
    ? `PROGRAM-CHAPTERS-${chapters[0].key}-0`
    : undefined;

  /** Intercepta flecha abajo desde SeasonSelector → foco al primer card */
  const handleSeasonArrowDown = useCallback(() => {
    if (firstCardKey) {
      setFocus(firstCardKey);
      return false;
    }
    return true;
  }, [firstCardKey]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        {/* Selector de temporada */}
        {activeSegment && activeSegment.all_temp.length > 1 && (
          <SeasonSelector
            seasons={activeSegment.all_temp}
            activeSeason={activeSeason}
            setActiveSeason={setActiveSeason}
            onArrowDown={handleSeasonArrowDown}
          />
        )}

        {/* Carrusel de capítulos */}
        {isLoadingChapters ? (
          <p className={styles.statusText}>Cargando capítulos...</p>
        ) : chapters.length > 0 ? (
          <div className={styles.chaptersWrapper}>
            <div ref={trackRef} className={styles.chaptersTrack}>
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

              <div className={styles.chaptersEndSpacer} />
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
