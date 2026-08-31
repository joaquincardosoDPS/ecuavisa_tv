import { useEffect, useMemo } from "react";
import CarrouselContainer from "@/components/ProgramCard/CarrouselContainer";
import ProgramsBanner from "./components/ProgramsBanner";
import { useProgramsStore } from "@/features/programs/programsStore";
import type { Program } from "@/interfaces/catalog.interface";
import { useProgramsData } from "@/hooks/program/useProgramsData";
import { useImagePreloader } from "@/hooks/shared/useImagePreloader";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { TVScrollProvider, useTVScroll } from "@/hooks/tv/useTVScroll";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import styles from "./ProgramsView.module.css";

function ProgramsScrollWrapper({ children }: { children: React.ReactNode }) {
  const { scrollY } = useTVScroll();
  return (
    <div style={{ transform: `translateY(${scrollY}px)`, transition: 'transform 0.3s ease-out' }}>
      {children}
    </div>
  );
}

function ProgramsView() {
  useDocumentTitle('Programas');
  const { categories, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useProgramsData();
  const activeProgram = useProgramsStore((state) => state.activeProgram);
  const setActiveProgram = useProgramsStore((state) => state.setActiveProgram);

  const defaultCategories = useMemo(
    () => categories?.filter((c) => c.format === "default") || [],
    [categories]
  );

  const firstDefaultCategory = defaultCategories.length > 0 ? defaultCategories[0] : null;

  useEffect(() => {
    if (!activeProgram && firstDefaultCategory && firstDefaultCategory.programs.length > 0) {
      setActiveProgram(firstDefaultCategory.programs[0] as Program);
    }
  }, [firstDefaultCategory, activeProgram, setActiveProgram]);

  const criticalImages = useMemo(() => {
    if (!firstDefaultCategory || firstDefaultCategory.programs.length === 0) return [];
    const urls: string[] = [];
    const firstProg = firstDefaultCategory.programs[0] as Program;
    const bg = firstProg.image_slider?.big || firstProg.image_land?.big;
    if (bg) urls.push(bg);
    const progLogo = firstProg.image_logo?.default;
    if (progLogo) urls.push(progLogo);
    return urls;
  }, [firstDefaultCategory]);

  const imagesReady = useImagePreloader(criticalImages, !isLoading && categories.length > 0);

  const { focusKey: rootFocusKey, ref: rootRef } = useFocusable({
    focusKey: 'page-programs',
    saveLastFocusedChild: true,
    autoRestoreFocus: true
  });

  useEffect(() => {
    if (!activeProgram || !hasNextPage || isFetchingNextPage) return;
    const categoryIndex = defaultCategories.findIndex((c) =>
      c.programs.some((p) => p.id === activeProgram.id)
    );
    if (categoryIndex >= 0 && categoryIndex >= defaultCategories.length - 2) {
      fetchNextPage();
    }
  }, [activeProgram, defaultCategories, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading || !imagesReady) return <FullScreenSpinner />;

  return (
    <FocusContext.Provider value={rootFocusKey}>
      <TVScrollProvider>
        <div ref={rootRef} className={styles.page}>
          <ProgramsBanner activeProgram={activeProgram} />
          <ProgramsScrollWrapper>
            <div className={styles.carouselsContainer}>
              {defaultCategories.map((category, index) => (
                <div key={category.key}>
                  <CarrouselContainer category={category} autoFocusFirst={index === 0} />
                </div>
              ))}
              {isFetchingNextPage && (
                <div className={styles.loadingSentinel}>
                  <div className={styles.loadingSpinner} />
                </div>
              )}
            </div>
          </ProgramsScrollWrapper>
        </div>
      </TVScrollProvider>
    </FocusContext.Provider>
  );
}
export default ProgramsView;

