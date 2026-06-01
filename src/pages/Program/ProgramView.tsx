import { useState, useCallback, useEffect, useMemo } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import type { Program, Segment } from "@/interfaces/catalog.interface";
import { usePageScroll } from "@/hooks/usePageScroll";
import { useRelatedPrograms } from "@/hooks/useRelatedPrograms";
import { useContinueWatching } from "@/hooks/useContinueWatching";
import Banner, { BannerBackground } from "./components/Banner";
import Tabs from "./components/Tabs";
import DetailsProgram from "./components/DetailsProgram";
import ChaptersContainer from "./components/ChaptersContainer";
import RelatedProgramsContainer from "./components/RelatedProgramsContainer";
import styles from "./ProgramPage.module.css";

interface ProgramViewProps {
  program: Program;
  slug: string;
  setIsLoading: (loading: boolean) => void;
}

function ProgramView({
  program: programDetail,
  slug,
  setIsLoading,
}: ProgramViewProps) {
  // Filtrar segmentos sin temporadas/episodios
  const validSegments = useMemo(
    () => (programDetail?.segments ?? []).filter(
      (s) => s.all_temp && s.all_temp.length > 0
    ),
    [programDetail?.segments],
  );

  const firstSegment = validSegments[0] ?? null;

  const [activeSegment, setActiveSegment] = useState<Segment | null>(
    firstSegment,
  );
  const [activeSeason, setActiveSeason] = useState<number | null>(
    firstSegment?.all_temp?.[0] ?? null,
  );
  const [showDetails, setShowDetails] = useState(!firstSegment);
  const [showRelated, setShowRelated] = useState(false);

  // Obtener programas relacionados con scroll infinito
  const {
    programs: relatedPrograms,
    isLoading: isLoadingRelated,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useRelatedPrograms(programDetail.key, programDetail.name_category);

  // Historial "Seguir viendo" para el banner — sin filtro de segment/season
  const { item: continueWatchingItem } = useContinueWatching(programDetail.key);

  // Historial filtrado por segment/season — para barras de progreso en chapters
  const { progressMap } = useContinueWatching(
    programDetail.key, activeSegment?.key, activeSeason,
  );

  const { ref, focusKey } = useFocusable({
    focusKey: "PROGRAM-VIEW",
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    autoRestoreFocus: true,
  });

  useEffect(() => {
    setFocus("program-btn-play");
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const { scrollRef, scrollToTop, scrollToSection } = usePageScroll({
    onScroll: setScrollY,
  });

  const handleSegmentChange = useCallback((segment: Segment) => {
    setActiveSegment(segment);
    if (segment.all_temp && segment.all_temp.length > 0) {
      setActiveSeason(segment.all_temp[0]);
    }
  }, []);

  const handleChaptersLoaded = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.pageWrapper}>
        <BannerBackground program={programDetail} scrollY={scrollY} />

        <div ref={scrollRef} className={styles.pageScroller}>
          <Banner
            program={programDetail}
            onBannerFocused={scrollToTop}
            continueWatchingItem={continueWatchingItem}
          />

          <div data-section="tabs" className={styles.mainContent}>
            <Tabs
              program={programDetail}
              validSegments={validSegments}
              activeSegment={activeSegment}
              setActiveSegment={handleSegmentChange}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              showRelated={showRelated}
              setShowRelated={setShowRelated}
              onTabsFocused={(details) => {
                const evt = details?.event as KeyboardEvent | undefined;
                if (evt && (evt.key === 'ArrowUp' || evt.keyCode === 38)) {
                  return;
                }
                scrollToSection("tabs", "start", 60);
              }}
            />

            <div className={styles.contentArea}>
              {showRelated ? (
                <RelatedProgramsContainer
                  programs={relatedPrograms}
                  isLoading={isLoadingRelated}
                  isFetchingNextPage={isFetchingNextPage}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                />
              ) : showDetails ? (
                <DetailsProgram programDetail={programDetail} />
              ) : (
                <ChaptersContainer
                  slug={slug || ""}
                  programKey={programDetail.key}
                  activeSegment={activeSegment}
                  activeSeason={activeSeason}
                  setActiveSeason={setActiveSeason}
                  onLoaded={handleChaptersLoaded}
                  showChapter={programDetail.active_number}
                  progressMap={progressMap}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default ProgramView;
