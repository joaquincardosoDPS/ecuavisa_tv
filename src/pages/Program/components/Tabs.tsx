import type { RefObject, ReactNode } from "react";
import type { Program, Segment } from "@/interfaces/catalog.interface";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
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

function TabButton({ focusKey, isActive, onSelect, children }: { focusKey: string; isActive: boolean; onSelect: () => void; children: ReactNode }) {
  const { ref, focused } = useSpatialFocus({
    focusKey,
    onEnterPress: onSelect,
  });

  return (
    <button
      ref={ref}
      onClick={onSelect}
      className={[styles.tabButton, isActive ? styles.tabActive : "", focused ? styles.tabFocused : ""].join(" ")}
    >
      {children}
    </button>
  );
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
              <TabButton
                focusKey={`tab-${segment.key}`}
                isActive={isActive}
                onSelect={() => { setActiveSegment(segment); setShowDetails(false); }}
              >
                {segment.name}
              </TabButton>
            </div>
          );
        })}
        <span className={styles.finalSeparator} />
        <TabButton focusKey="tab-details" isActive={showDetails} onSelect={() => setShowDetails(true)}>
          Detalles
        </TabButton>
      </div>
    </div>
  );
}

export default Tabs;


