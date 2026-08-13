import styles from "./TabSelector.module.css";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";

export type Tab = "favorites" | "history";

interface TabSelectorProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  // Al presionar "abajo" desde un tab, mover el foco al primer elemento de la
  // pestaña activa (la que se está mostrando actualmente).
  const handleDown = () => {
    setFocus(activeTab === 'favorites' ? 'program-grid-item-0' : 'mylist-history-item-0');
    return false;
  };

  const { ref: favRef, focused: favFocused } = useSpatialFocus({
    focusKey: 'mylist-tab-favorites',
    onEnterPress: () => onTabChange('favorites'),
    onArrowPress: (dir) => (dir === 'down' ? handleDown() : true),
    position: 'top'
  });
  const { ref: histRef, focused: histFocused } = useSpatialFocus({
    focusKey: 'mylist-tab-history',
    onEnterPress: () => onTabChange('history'),
    onArrowPress: (dir) => (dir === 'down' ? handleDown() : true),
    position: 'top'
  });

  return (
    <div className={styles.tabContainer}>
      <span ref={favRef} onClick={() => onTabChange("favorites")} style={{ cursor: "pointer", transition: "all 0.2s", fontWeight: (activeTab === "favorites" || favFocused) ? "bold" : "normal", color: (activeTab === "favorites" || favFocused) ? "var(--clr-primary-title)" : "color-mix(in srgb, var(--clr-primary-title) 50%, transparent)" }}>
        Mi Lista
      </span>
      <span className={styles.tabSeparator}>|</span>
      <span ref={histRef} onClick={() => onTabChange("history")} style={{ cursor: "pointer", transition: "all 0.2s", fontWeight: (activeTab === "history" || histFocused) ? "bold" : "normal", color: (activeTab === "history" || histFocused) ? "var(--clr-primary-title)" : "color-mix(in srgb, var(--clr-primary-title) 50%, transparent)" }}>
        Seguir viendo
      </span>
    </div>
  );
}
