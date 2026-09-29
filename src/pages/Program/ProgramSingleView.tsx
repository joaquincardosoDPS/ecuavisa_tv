import type { Program, Segment } from "@/interfaces/catalog.interface";
import { useProgramSingleData } from "@/hooks/program/useProgramSingleData";
import Banner from "./components/Banner";
import Tabs from "./components/Tabs";
import DetailsProgram from "./components/DetailsProgram";
import ChaptersContainer from "./components/ChaptersContainer";
import RelatedProgramsContainer from "./components/RelatedProgramsContainer";
import styles from "./ProgramView.module.css";

interface ProgramSingleViewProps {
  program: Program;
  setIsLoading: (loading: boolean) => void;
}

function ProgramSingleView({ program: programDetail, setIsLoading }: ProgramSingleViewProps) {
  const { chapter, relatedPrograms, isLoadingRelatedPrograms, activeSegment, setActiveSegment, showDetails, setShowDetails, showRelated, setShowRelated, activeSeason, setActiveSeason, tabsRef, scrollToTabs, requestScroll, handleChaptersLoaded } = useProgramSingleData(programDetail, setIsLoading);

  const selectSegment = (segment: Segment) => setActiveSegment(segment);
  const selectDetails = () => setShowDetails(true);
  const selectRelated = () => setShowRelated(true);

  return (
    <div className={styles.viewContainer}>
      <Banner program={programDetail} firstChapter={chapter ?? undefined} />
      <div className={styles.programBody}>
        <Tabs
          program={programDetail}
          activeSegment={activeSegment}
          setActiveSegment={setActiveSegment}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          tabsRef={tabsRef}
          scrollToTabs={scrollToTabs}
          requestScroll={requestScroll}
          relatedTab={{ active: showRelated, onSelect: selectRelated }}
          onSelectSegment={selectSegment}
          onSelectDetails={selectDetails}
        />
        <div className={styles.viewContent}>
          {showDetails ? (
            <DetailsProgram programDetail={programDetail} />
          ) : showRelated ? (
            <RelatedProgramsContainer programs={relatedPrograms} isLoading={isLoadingRelatedPrograms} />
          ) : (
            <ChaptersContainer
              slug={programDetail.key}
              programKey={programDetail.key}
              activeSegment={activeSegment}
              activeSeason={activeSeason}
              setActiveSeason={setActiveSeason}
              onLoaded={handleChaptersLoaded}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgramSingleView;
