import type { RefObject } from "react";
import type { Segment } from "@/interfaces/catalog.interface";
import styles from "./TabsSingle.module.css";

export type ActiveTab = "related" | "details" | Segment;

interface TabsSingleProps {
  segments: Segment[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  tabsRef: RefObject<HTMLDivElement | null>;
  scrollToTabs: () => void;
}

function TabsSingle({ segments, activeTab, setActiveTab, tabsRef, scrollToTabs }: TabsSingleProps) {
  const getTabStyle = (isActive: boolean) => ({
    paddingBottom: "1.25rem", paddingLeft: "0.5rem", paddingRight: "0.5rem", height: "100%", cursor: "pointer", borderBottom: "4px solid", marginBottom: "-2px", transition: "colors 0.2s",
    borderColor: isActive ? "var(--clr-primary-title)" : "transparent",
    color: isActive ? "var(--clr-primary-title)" : "var(--clr-secondary-text)",
    background: "none", borderTop: "none", borderLeft: "none", borderRight: "none", fontSize: "1.25rem", fontWeight: 500
  });

  return (
    <div ref={tabsRef} className={styles.tabsContainer}>
      <div className={styles.tabsList}>
        {segments.map((segment) => {
          const isActive = typeof activeTab === "object" && activeTab.id === segment.id;
          return <button key={segment.key} onClick={() => { setActiveTab(segment); scrollToTabs(); }} style={getTabStyle(isActive)}>{segment.name}</button>;
        })}
        <button onClick={() => { setActiveTab("related"); scrollToTabs(); }} style={getTabStyle(activeTab === "related")}>Relacionados</button>
        <button onClick={() => { setActiveTab("details"); scrollToTabs(); }} style={getTabStyle(activeTab === "details")}>Detalles</button>
      </div>
    </div>
  );
}
export default TabsSingle;
