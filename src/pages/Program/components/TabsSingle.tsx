import { useRef, useCallback } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
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

/** Tab individual con su propio useFocusable */
function TabButton({
    label,
    focusKey,
    isActive,
    onPress,
    onTabFocus,
}: {
    label: string;
    focusKey: string;
    isActive: boolean;
    onPress: () => void;
    onTabFocus?: () => void;
}) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: onPress,
        onFocus: () => {
            onPress();
            onTabFocus?.();
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

function TabsSingle({ segments, activeTab, setActiveTab, onTabsFocused }: TabsSingleProps) {
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

        const targetX = childLeft - (wrapperWidth / 2) + (childWidth / 2);
        const maxScroll = Math.max(0, track.scrollWidth - wrapperWidth);
        const clampedX = Math.max(0, Math.min(targetX, maxScroll));

        track.style.transform = `translateX(-${clampedX}px)`;
    }, []);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.tabsWrapper}>
                <div ref={trackRef} className={styles.tabsTrack}>
                    {/* Tabs de segmentos (si existen) */}
                    {segments.map((segment) => {
                        const isActive =
                            typeof activeTab === 'object' && activeTab.id === segment.id;
                        const tabKey = `program-single-tab-${segment.key}`;
                        return (
                            <TabButton
                                key={segment.key}
                                label={segment.name}
                                focusKey={tabKey}
                                isActive={isActive}
                                onPress={() => setActiveTab(segment)}
                                onTabFocus={() => scrollToTab(tabKey)}
                            />
                        );
                    })}

                    {/* Tab Relacionados */}
                    <TabButton
                        label="Relacionados"
                        focusKey="program-single-tab-related"
                        isActive={activeTab === 'related'}
                        onPress={() => setActiveTab('related')}
                        onTabFocus={() => scrollToTab('program-single-tab-related')}
                    />

                    {/* Tab Detalles */}
                    <TabButton
                        label="Detalles"
                        focusKey="program-single-tab-details"
                        isActive={activeTab === 'details'}
                        onPress={() => setActiveTab('details')}
                        onTabFocus={() => scrollToTab('program-single-tab-details')}
                    />
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default TabsSingle;
