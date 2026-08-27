import styles from "./TabSelector.module.css";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { useTVScroll } from "@/hooks/tv/useTVScroll";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";

export type Tab = "favorites" | "history";

interface TabSelectorProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  favoritesEmpty?: boolean;
  historyEmpty?: boolean;
}

export function TabSelector({ activeTab, onTabChange, favoritesEmpty = false, historyEmpty = false }: TabSelectorProps) {
  // La página usa scroll por transform (TVScrollProvider). Al enfocar un tab
  // volvemos la vista al tope para que la fila de tabs quede visible bajo el
  // header fijo y la navegación izquierda/derecha no "pierda" el foco.
  const { resetScroll } = useTVScroll();

  // Al presionar "abajo" desde un tab, mover el foco al primer elemento de la
  // pestaña activa (la que se está mostrando actualmente).
  const handleDown = () => {
    if (activeTab === 'favorites') {
      setFocus(favoritesEmpty ? 'mylist-empty-add' : 'program-grid-item-0');
    } else {
      setFocus(historyEmpty ? 'mylist-history-empty-explore' : 'mylist-history-item-0');
    }
    return false;
  };

  const { ref: favRef, focused: favFocused } = useSpatialFocus({
    focusKey: 'mylist-tab-favorites',
    onEnterPress: () => onTabChange('favorites'),
    onArrowPress: (dir) => (dir === 'down' ? handleDown() : true),
    onFocus: resetScroll,
    position: 'top'
  });
  const { ref: histRef, focused: histFocused } = useSpatialFocus({
    focusKey: 'mylist-tab-history',
    onEnterPress: () => onTabChange('history'),
    onArrowPress: (dir) => (dir === 'down' ? handleDown() : true),
    onFocus: resetScroll,
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
