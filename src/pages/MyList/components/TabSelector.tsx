import styles from "./TabSelector.module.css";

export type Tab = "favorites" | "history";

interface TabSelectorProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className={styles.tabContainer}>
      <span onClick={() => onTabChange("favorites")} className={`${styles.tab} ${activeTab === "favorites" ? styles.tabActive : styles.tabInactive}`}>
        Mi Lista
      </span>
      <span className={styles.tabSeparator}>|</span>
      <span onClick={() => onTabChange("history")} className={`${styles.tab} ${activeTab === "history" ? styles.tabActive : styles.tabInactive}`}>
        Seguir viendo
      </span>
    </div>
  );
}
