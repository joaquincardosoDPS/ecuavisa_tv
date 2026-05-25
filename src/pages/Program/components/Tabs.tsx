import { useRef, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import type { FocusDetails } from '@noriginmedia/norigin-spatial-navigation';
import type { Program, Segment } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

interface TabsProps {
    program: Program;
    activeSegment: Segment | null;
    setActiveSegment: (segment: Segment) => void;
    showDetails: boolean;
    setShowDetails: (show: boolean) => void;
    onTabsFocused?: (details: FocusDetails) => void;
}

/** Tab individual con su propio useFocusable */
function TabButton({
    label,
    focusKey,
    isActive,
    onPress,
    onTabFocus,
    onArrowDown,
}: {
    label: string;
    focusKey: string;
    isActive: boolean;
    onPress: () => void;
    onTabFocus?: () => void;
    onArrowDown?: () => boolean;
}) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: onPress,
        onFocus: () => {
            onPress();
            onTabFocus?.();
        },
        onArrowPress: (direction) => {
            if (direction === 'down' && onArrowDown) {
                return onArrowDown();
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

function Tabs({
    program,
    activeSegment,
    setActiveSegment,
    showDetails,
    setShowDetails,
    onTabsFocused,
}: TabsProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-TABS',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: (_layout, _props, details) => onTabsFocused?.(details),
    });

    /** REGLA F5.1: centra el tab enfocado horizontalmente */
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

    /**
     * Si el segmento activo no tiene temporadas (≤1),
     * forzar foco directo al contenedor de chapters.
     */
    const handleTabArrowDown = useCallback(() => {
        const hasSeasons = activeSegment && activeSegment.all_temp.length > 1;
        if (!hasSeasons && !showDetails) {
            setFocus('PROGRAM-CHAPTERS');
            return false;
        }
        return true;
    }, [activeSegment, showDetails]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.tabsWrapper}>
                <div ref={trackRef} className={styles.tabsTrack}>
                    {program.segments.map((segment) => {
                        const isActive = !showDetails && activeSegment?.id === segment.id;
                        const tabKey = `program-tab-${segment.key}`;
                        return (
                            <TabButton
                                key={segment.key}
                                label={segment.name}
                                focusKey={tabKey}
                                isActive={isActive}
                                onPress={() => {
                                    setActiveSegment(segment);
                                    setShowDetails(false);
                                }}
                                onTabFocus={() => scrollToTab(tabKey)}
                                onArrowDown={handleTabArrowDown}
                            />
                        );
                    })}

                    <TabButton
                        label="Detalles"
                        focusKey="program-tab-details"
                        isActive={showDetails}
                        onPress={() => setShowDetails(true)}
                        onTabFocus={() => scrollToTab('program-tab-details')}
                    />
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default Tabs;
