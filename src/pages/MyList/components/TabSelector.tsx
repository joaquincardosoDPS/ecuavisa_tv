import styles from "./TabSelector.module.css";

export type Tab = "favorites" | "history";

interface TabSelectorProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className={styles.tabContainer}>
      <span onClick={() => onTabChange("favorites")} style={{ cursor: "pointer", transition: "all 0.2s", fontWeight: activeTab === "favorites" ? "bold" : "normal", color: activeTab === "favorites" ? "var(--clr-primary-title)" : "color-mix(in srgb, var(--clr-primary-title) 50%, transparent)" }}>
        Mi Lista
      </span>
      <span className={styles.tabSeparator}>|</span>
      <span onClick={() => onTabChange("history")} style={{ cursor: "pointer", transition: "all 0.2s", fontWeight: activeTab === "history" ? "bold" : "normal", color: activeTab === "history" ? "var(--clr-primary-title)" : "color-mix(in srgb, var(--clr-primary-title) 50%, transparent)" }}>
        Seguir viendo
      </span>
    </div>
  );
}
