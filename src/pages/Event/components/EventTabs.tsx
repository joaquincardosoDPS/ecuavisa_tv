import {
  FocusContext,
  useFocusable,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import styles from '../EventView.module.css';

type TabKey = 'relacionados' | 'detalles';

interface EventTabsProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  onTabsFocused?: () => void;
}

/** Tab individual con su propio useFocusable */
function TabButton({
  label,
  tabKey,
  isActive,
  focusKey,
  onPress,
}: {
  label: string;
  tabKey: TabKey;
  isActive: boolean;
  focusKey: string;
  onPress: (key: TabKey) => void;
}) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: () => onPress(tabKey),
    onFocus: () => onPress(tabKey),
    onArrowPress: (direction) => {
      if (direction === 'up') {
        setFocus('EVENT-PLAY');
        return false;
      }
      if (direction === 'down') {
        setFocus('EVENT-CARD-0');
        return false;
      }
      return true;
    },
  });

  const classList = [
    styles.tabBtn,
    isActive && styles.tabBtnActive,
    focused && styles.tabBtnFocused,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      className={classList}
      onClick={() => onPress(tabKey)}
      data-focuskey={focusKey}
    >
      {label}
    </button>
  );
}

/** Contenedor de tabs con FocusContext propio */
function EventTabs({ activeTab, setActiveTab, onTabsFocused }: EventTabsProps) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'EVENT-TABS',
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    onFocus: (_layout, _props, details) => {
      const evt = details?.event as KeyboardEvent | undefined;
      // No scrollear si el movimiento fue horizontal (entre tabs) o hacia arriba
      if (evt && (evt.key === 'ArrowLeft' || evt.key === 'ArrowRight'
        || evt.keyCode === 37 || evt.keyCode === 39
        || evt.key === 'ArrowUp' || evt.keyCode === 38)) {
        return;
      }
      onTabsFocused?.();
    },
  });

  return (
    <div data-section="content" className={styles.tabsContainer}>
      <FocusContext.Provider value={focusKey}>
        <div ref={ref} className={styles.tabsInner}>
          <TabButton
            label="Relacionados"
            tabKey="relacionados"
            isActive={activeTab === 'relacionados'}
            focusKey="EVENT-TAB-relacionados"
            onPress={setActiveTab}
          />
          <TabButton
            label="Detalles"
            tabKey="detalles"
            isActive={activeTab === 'detalles'}
            focusKey="EVENT-TAB-detalles"
            onPress={setActiveTab}
          />
        </div>
      </FocusContext.Provider>
    </div>
  );
}

export default EventTabs;
export type { TabKey };
