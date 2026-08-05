import type { RefObject } from "react";
import type { Program, Segment } from "@/interfaces/catalog.interface";
import styles from "./Tabs.module.css";

interface TabsProps {
  program: Program;
  activeSegment: Segment | null;
  setActiveSegment: (segment: Segment) => void;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  tabsRef: RefObject<HTMLDivElement | null>;
  scrollToTabs: () => void;
  requestScroll: () => void;
}

function Tabs({ program, activeSegment, setActiveSegment, showDetails, setShowDetails, tabsRef }: TabsProps) {
  return (
    <div ref={tabsRef} className={styles.tabsContainer}>
      <div className={styles.tabsWrapper}>
        {program.segments.map((segment, idx) => {
          const isActive = !showDetails && activeSegment?.id === segment.id;
          return (
            <div key={segment.key} className={styles.tabItem}>
              {idx > 0 && <span className={styles.separator} />}
              <button
                onClick={() => { setActiveSegment(segment); setShowDetails(false); }}
                style={{ cursor: "pointer", transition: "color 0.2s", fontSize: "1.875rem", fontWeight: isActive ? "bold" : "normal", color: "var(--clr-primary-title)", background: "none", border: "none" }}
              >
                {segment.name}
              </button>
            </div>
          );
        })}
        <span className={styles.finalSeparator} />
        <button
          onClick={() => setShowDetails(true)}
          style={{ cursor: "pointer", transition: "color 0.2s", fontSize: "1.875rem", fontWeight: showDetails ? "bold" : "normal", color: "var(--clr-primary-title)", background: "none", border: "none" }}
        >
          Detalles
        </button>
      </div>
    </div>
  );
}

export default Tabs;


