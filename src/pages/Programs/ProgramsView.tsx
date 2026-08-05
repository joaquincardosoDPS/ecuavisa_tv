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

  useEffect(() => {
    if (!activeProgram && categories && categories.length > 0) {
      const firstCategory = categories.find((c) => c.format === "default" && c.programs && c.programs.length > 0);
      if (firstCategory) setActiveProgram(firstCategory.programs[0] as Program);
    }
  }, [categories, activeProgram, setActiveProgram]);

  const criticalImages = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    const urls: string[] = [];
    const firstCategory = categories.find((c) => c.format === "default" && c.programs && c.programs.length > 0);
    if (firstCategory) {
      const firstProg = firstCategory.programs[0] as Program;
      const bg = firstProg.image_slider?.big || firstProg.image_land?.big;
      if (bg) urls.push(bg);
      const progLogo = firstProg.image_logo?.default;
      if (progLogo) urls.push(progLogo);
    }
    return urls;
  }, [categories]);

  const imagesReady = useImagePreloader(criticalImages, !isLoading && categories.length > 0);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasNextPage || isFetchingNextPage) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 600) fetchNextPage();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading || !imagesReady) return <FullScreenSpinner />;

  return (
    <TVScrollProvider>
      <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
        <ProgramsScrollWrapper>
          <ProgramsBanner activeProgram={activeProgram} />
          <div className={styles.carouselsContainer}>
            {categories?.filter((category) => category.format === "default").map((category) => (
              <div key={category.key}>
                <CarrouselContainer category={category} />
              </div>
            ))}
            <div className={styles.loadingSentinel}>
              {isFetchingNextPage && (
                <div className={styles.loadingSpinner} />
              )}
            </div>
          </div>
        </ProgramsScrollWrapper>
      </div>
    </TVScrollProvider>
  );
}
export default ProgramsView;
