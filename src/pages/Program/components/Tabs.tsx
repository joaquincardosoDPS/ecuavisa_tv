import type { RefObject, ReactNode } from "react";
import type { Program, Segment } from "@/interfaces/catalog.interface";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import styles from "./Tabs.module.css";

interface RelatedTab {
  active: boolean;
  onSelect: () => void;
}

interface TabsProps {
  program: Program;
  activeSegment: Segment | null;
  setActiveSegment: (segment: Segment) => void;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  tabsRef: RefObject<HTMLDivElement | null>;
  scrollToTabs: () => void;
  requestScroll: () => void;
  /** Pestaña "Relacionados" opcional (películas) con el mismo foco/movimiento */
  relatedTab?: RelatedTab;
  /** Override de selección de segmento (permite limpiar la pestaña Relacionados) */
  onSelectSegment?: (segment: Segment) => void;
  /** Override de selección de Detalles */
  onSelectDetails?: () => void;
}

function TabButton({ focusKey, isActive, onSelect, children }: { focusKey: string; isActive: boolean; onSelect: () => void; children: ReactNode }) {
  const { ref, focused } = useSpatialFocus({
    focusKey,
    onEnterPress: onSelect,
    // Al enfocar el tab, baja la vista y revela el contenido (como en la segunda fila de capítulos)
    position: "top",
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

function Tabs({ program, activeSegment, setActiveSegment, showDetails, setShowDetails, tabsRef, relatedTab, onSelectSegment, onSelectDetails }: TabsProps) {
  const handleSelectSegment = (segment: Segment) => {
    if (onSelectSegment) {
      onSelectSegment(segment);
      return;
    }
    setActiveSegment(segment);
    setShowDetails(false);
  };

  const handleSelectDetails = () => {
    if (onSelectDetails) {
      onSelectDetails();
      return;
    }
    setShowDetails(true);
  };

  return (
    <div ref={tabsRef} className={styles.tabsContainer} data-tabs-anchor="true">
      <div className={styles.tabsWrapper}>
        {program.segments.map((segment, idx) => {
          const isActive = !showDetails && !relatedTab?.active && activeSegment?.id === segment.id;
          return (
            <div key={segment.key} className={styles.tabItem}>
              {idx > 0 && <span className={styles.separator} />}
              <TabButton
                focusKey={`tab-${segment.key}`}
                isActive={isActive}
                onSelect={() => handleSelectSegment(segment)}
              >
                {segment.name}
              </TabButton>
            </div>
          );
        })}
        <span className={styles.finalSeparator} />
        {relatedTab && (
          <>
            <TabButton focusKey="tab-related" isActive={relatedTab.active} onSelect={relatedTab.onSelect}>
              Relacionados
            </TabButton>
            <span className={styles.finalSeparator} />
          </>
        )}
        <TabButton focusKey="tab-details" isActive={showDetails} onSelect={handleSelectDetails}>
          Detalles
        </TabButton>
      </div>
    </div>
  );
}

export default Tabs;


