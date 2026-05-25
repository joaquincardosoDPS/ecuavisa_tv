import { useState, useCallback, useEffect } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import type { Program, Segment } from "@/interfaces/catalog.interface";
import { usePageScroll } from "@/hooks/usePageScroll";
import Banner, { BannerBackground } from "./components/Banner";
import Tabs from "./components/Tabs";
import DetailsProgram from "./components/DetailsProgram";
import ChaptersContainer from "./components/ChaptersContainer";
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
  const firstSegment = programDetail?.segments?.[0] ?? null;

  const [activeSegment, setActiveSegment] = useState<Segment | null>(
    firstSegment,
  );
  const [activeSeason, setActiveSeason] = useState<number | null>(
    firstSegment?.all_temp?.[0] ?? null,
  );
  const [showDetails, setShowDetails] = useState(!firstSegment);

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
  const { scrollRef, scrollToTop, scrollToSection, scrollToElement } = usePageScroll({
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
          />

          <div data-section="tabs" className={styles.mainContent}>
            <Tabs
              program={programDetail}
              activeSegment={activeSegment}
              setActiveSegment={handleSegmentChange}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              onTabsFocused={(details) => {
                const evt = details?.event as KeyboardEvent | undefined;
                if (evt && (evt.key === 'ArrowUp' || evt.keyCode === 38)) {
                  return;
                }
                scrollToSection("tabs", "start", window.innerHeight * 0.25);
              }}
            />

            <div className={styles.contentArea}>
              {showDetails ? (
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
                  // onContentFocused={() => scrollToSection("tabs", "start")}
                  onScrollToElement={scrollToElement}
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
