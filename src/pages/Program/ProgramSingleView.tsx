import { useState, useEffect, useCallback } from 'react';
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import type { Program, Segment } from "@/interfaces/catalog.interface";
import { useFetch } from "@/hooks/useFetch";
import { usePageScroll } from "@/hooks/usePageScroll";
import { catalogService } from "@/services/catalogService";
import Banner, { BannerBackground } from "./components/Banner";
import TabsSingle, { type ActiveTab } from "./components/TabsSingle";
import DetailsProgram from "./components/DetailsProgram";
import ChaptersContainer from "./components/ChaptersContainer";
import RelatedProgramsContainer from "./components/RelatedProgramsContainer";
import styles from "./ProgramPage.module.css";

interface ProgramSingleViewProps {
  program: Program;
  setIsLoading: (loading: boolean) => void;
}

function ProgramSingleView({
  program: programDetail,
  setIsLoading,
}: ProgramSingleViewProps) {
  // Obtener primer capítulo (para duración en el banner)
  const { data: chapterData, isLoading: isLoadingChapters } = useFetch(
    () =>
      catalogService.getChapters({
        program: programDetail.key,
        no_segments: true,
      }),
    [programDetail.key],
    { enabled: !!programDetail.key },
  );

  // Obtener programas relacionados
  const { data: relatedProgramsData, isLoading: isLoadingRelated } = useFetch(
    () =>
      catalogService.searchPrograms({
        slug_exclude: programDetail.key,
        category: programDetail.name_category,
      }),
    [programDetail.key],
    { enabled: !!programDetail.key },
  );

  const relatedPrograms = relatedProgramsData?.data ?? [];
  const chapter = chapterData?.data?.[0] ?? null;
  const segments = programDetail.segments ?? [];
  const hasSegments = segments.length > 0;

  const [activeTab, setActiveTab] = useState<ActiveTab>(
    hasSegments ? segments[0] : "related",
  );
  const [activeSeason, setActiveSeason] = useState<number | null>(
    hasSegments ? (segments[0].all_temp?.[0] ?? 1) : null,
  );

  const { ref, focusKey } = useFocusable({
    focusKey: "PROGRAM-SINGLE-VIEW",
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    autoRestoreFocus: true,
  });

  // REGLA F4.1: foco imperativo al botón Play al montar
  useEffect(() => {
    setFocus("program-single-btn-play");
  }, []);

  // Page scroll (misma lógica que ProgramView)
  const [scrollY, setScrollY] = useState(0);
  const { scrollRef, scrollToTop, scrollToSection, scrollToElement } = usePageScroll({
    onScroll: setScrollY,
  });

  // Cambio de tab con reset de temporada integrado (evita race condition)
  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    if (typeof tab === 'object' && tab.all_temp?.length > 0) {
      setActiveSeason(tab.all_temp[0]);
    }
  }, []);

  // Señalar al padre que todo cargó
  useEffect(() => {
    if (!isLoadingChapters && !isLoadingRelated) {
      setIsLoading(false);
    }
  }, [isLoadingChapters, isLoadingRelated, setIsLoading]);

  // Segmento activo para ChaptersContainer
  const activeSegment: Segment | null =
    typeof activeTab === "object" ? activeTab : null;

  const handleChaptersLoaded = useCallback(() => {
    // Ya señalamos loading via el effect de arriba
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.pageWrapper}>
        <BannerBackground program={programDetail} scrollY={scrollY} />

        <div ref={scrollRef} className={styles.pageScroller}>
          <Banner
            program={programDetail}
            isSingle={true}
            chapter={chapter ?? undefined}
            onBannerFocused={scrollToTop}
          />

          <div data-section="tabs" className={styles.mainContent}>
            <TabsSingle
              segments={segments}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              onTabsFocused={(details) => {
                const evt = details?.event as KeyboardEvent | undefined;
                if (evt && (evt.key === 'ArrowUp' || evt.keyCode === 38)) {
                  return;
                }
                scrollToSection("tabs", "start", window.innerHeight * 0.25);
              }}
            />

            <div className={styles.contentArea}>
              {activeTab === "details" ? (
                <DetailsProgram programDetail={programDetail} />
              ) : activeSegment ? (
                <ChaptersContainer
                  slug={programDetail.key}
                  programKey={programDetail.key}
                  activeSegment={activeSegment}
                  activeSeason={activeSeason}
                  setActiveSeason={setActiveSeason}
                  onLoaded={handleChaptersLoaded}
                  onScrollToElement={scrollToElement}
                />
              ) : (
                <RelatedProgramsContainer
                  programs={relatedPrograms}
                  isLoading={isLoadingRelated}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default ProgramSingleView;
