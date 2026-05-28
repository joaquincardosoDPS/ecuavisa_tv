import { useState, useEffect, useCallback } from 'react';
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import type { Program } from "@/interfaces/catalog.interface";
import { useFetch } from "@/hooks/useFetch";
import { usePageScroll } from "@/hooks/usePageScroll";
import { catalogService } from "@/services/catalogService";
import Banner, { BannerBackground } from "./components/Banner";
import TabsSingle, { type ActiveTab } from "./components/TabsSingle";
import DetailsProgram from "./components/DetailsProgram";
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
  // Obtener primer capítulo — idéntico al original: {page:1, limit:1} sin segment/season
  const { data: chapterData, isLoading: isLoadingChapters } = useFetch(
    () =>
      catalogService.getChapters({
        program: programDetail.key,
        page: 1,
        limit: 1,
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

  // Single episode: solo "Recomendados" y "Detalles"
  const [activeTab, setActiveTab] = useState<ActiveTab>("related");

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
  const { scrollRef, scrollToTop, scrollToSection } = usePageScroll({
    onScroll: setScrollY,
  });

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
  }, []);

  // Señalar al padre que todo cargó
  useEffect(() => {
    if (!isLoadingChapters && !isLoadingRelated) {
      setIsLoading(false);
    }
  }, [isLoadingChapters, isLoadingRelated, setIsLoading]);

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
              segments={[]}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              onTabsFocused={(details) => {
                const evt = details?.event as KeyboardEvent | undefined;
                if (evt && (evt.key === 'ArrowUp' || evt.keyCode === 38)) {
                  return;
                }
                scrollToSection("tabs", "start", 60);
              }}
            />

            <div className={styles.contentArea}>
              {activeTab === "details" ? (
                <DetailsProgram programDetail={programDetail} />
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
