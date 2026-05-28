import { useRef, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import type { FocusDetails } from '@noriginmedia/norigin-spatial-navigation';
import type { Segment } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

export type ActiveTab = 'related' | 'details' | Segment;

interface TabsSingleProps {
    segments: Segment[];
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
    onTabsFocused?: (details: FocusDetails) => void;
}

/** Tab individual con su propio useFocusable — misma lógica que Tabs regular */
function TabButton({
    label,
    focusKey,
    isActive,
    onPress,
    onTabFocus,
    onArrowDown,
    index,
    allFocusKeys,
}: {
    label: string;
    focusKey: string;
    isActive: boolean;
    onPress: () => void;
    onTabFocus?: () => void;
    onArrowDown?: () => boolean;
    index: number;
    allFocusKeys: string[];
}) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: onPress,
        onFocus: () => {
            if (!isActive) {
                onPress();
            }
            onTabFocus?.();
        },
        onArrowPress: (direction) => {
            if (direction === 'down' && onArrowDown) {
                return onArrowDown();
            }
            // Navegación manual izq/der para evitar saltos
            if (direction === 'left') {
                if (index > 0) {
                    setFocus(allFocusKeys[index - 1]);
                }
                return false;
            }
            if (direction === 'right') {
                if (index < allFocusKeys.length - 1) {
                    setFocus(allFocusKeys[index + 1]);
                }
                return false;
            }
            return true;
        },
    });

    const classList = [
        styles.tabItem,
        isActive && styles.tabItemActive,
        focused && styles.tabItemFocused,
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            type="button"
            className={classList}
            onClick={onPress}
            data-focuskey={focusKey}
        >
            {label}
        </button>
    );
}

function TabsSingle({ activeTab, setActiveTab, onTabsFocused }: TabsSingleProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-TABS-SINGLE',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: (_layout, _props, details) => onTabsFocused?.(details),
    });

    /** REGLA F5.1: centra el tab enfocado */
    const scrollToTab = useCallback((tabFocusKey: string) => {
        const track = trackRef.current;
        if (!track) return;

        const wrapper = track.parentElement;
        if (!wrapper) return;

        const child = track.querySelector(
            `[data-focuskey="${tabFocusKey}"]`,
        ) as HTMLElement | null;
        if (!child) return;

        const wrapperWidth = wrapper.offsetWidth;
        const childLeft = child.offsetLeft;
        const childWidth = child.offsetWidth;
        const rightMargin = 80;

        const targetX = childLeft - (wrapperWidth / 2) + (childWidth / 2);
        const maxScroll = Math.max(0, track.scrollWidth - wrapperWidth + rightMargin);
        const clampedX = Math.max(0, Math.min(targetX, maxScroll));

        track.style.transform = `translateX(-${clampedX}px)`;
    }, []);

    /** Flecha abajo → contenido debajo (Recomendados o Detalles) */
    const handleTabArrowDown = useCallback(() => {
        // Intentar foco al contenedor de related
        setFocus('PROGRAM-RELATED');
        return false;
    }, []);

    // Build focus keys array for manual left/right navigation
    const allFocusKeys = [
        'program-single-tab-related',
        'program-single-tab-details',
    ];

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.tabsWrapper}>
                <div ref={trackRef} className={styles.tabsTrack}>
                    {/* Tab Recomendados */}
                    <TabButton
                        label="Recomendados"
                        focusKey="program-single-tab-related"
                        isActive={activeTab === 'related'}
                        index={0}
                        allFocusKeys={allFocusKeys}
                        onPress={() => setActiveTab('related')}
                        onTabFocus={() => scrollToTab('program-single-tab-related')}
                        onArrowDown={handleTabArrowDown}
                    />

                    {/* Tab Detalles */}
                    <TabButton
                        label="Detalles"
                        focusKey="program-single-tab-details"
                        isActive={activeTab === 'details'}
                        index={1}
                        allFocusKeys={allFocusKeys}
                        onPress={() => setActiveTab('details')}
                        onTabFocus={() => scrollToTab('program-single-tab-details')}
                    />
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default TabsSingle;
