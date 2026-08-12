import type { ReactNode } from "react";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import styles from "@/pages/Program/components/Tabs.module.css";

export type TabKey = "relacionados" | "detalles";

interface TabsProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

function TabButton({ focusKey, isActive, onSelect, children }: { focusKey: string; isActive: boolean; onSelect: () => void; children: ReactNode }) {
  const { ref, focused } = useSpatialFocus({
    focusKey,
    onEnterPress: onSelect,
    // Al enfocar el tab, baja la vista y revela el contenido inferior
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

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsWrapper}>
        <TabButton focusKey="event-tab-related" isActive={activeTab === "relacionados"} onSelect={() => setActiveTab("relacionados")}>
          Relacionados
        </TabButton>
        <span className={styles.finalSeparator} />
        <TabButton focusKey="event-tab-details" isActive={activeTab === "detalles"} onSelect={() => setActiveTab("detalles")}>
          Detalles
        </TabButton>
      </div>
    </div>
  );
}
export default Tabs;
