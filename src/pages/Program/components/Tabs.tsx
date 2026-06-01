import { useRef, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import type { FocusDetails } from '@noriginmedia/norigin-spatial-navigation';
import type { Program, Segment } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

interface TabsProps {
    program: Program;
    validSegments: Segment[];
    activeSegment: Segment | null;
    setActiveSegment: (segment: Segment) => void;
    showDetails: boolean;
    setShowDetails: (show: boolean) => void;
    showRelated: boolean;
    setShowRelated: (show: boolean) => void;
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

function Tabs({
    validSegments,
    activeSegment,
    setActiveSegment,
    showDetails,
    setShowDetails,
    showRelated,
    setShowRelated,
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
        const rightMargin = 80; // px extra para que el último tab no quede cortado

        const targetX = childLeft - (wrapperWidth / 2) + (childWidth / 2);
        const maxScroll = Math.max(0, track.scrollWidth - wrapperWidth + rightMargin);
        const clampedX = Math.max(0, Math.min(targetX, maxScroll));

        track.style.transform = `translateX(-${clampedX}px)`;
    }, []);

    /**
     * Si el segmento activo no tiene temporadas (≤1),
     * forzar foco directo al contenedor de chapters.
     */
    const handleTabArrowDown = useCallback(() => {
        const hasSeasons = activeSegment && activeSegment.all_temp.length > 1;
        if (!hasSeasons && !showDetails && !showRelated) {
            setFocus('PROGRAM-CHAPTERS');
            return false;
        }
        return true;
    }, [activeSegment, showDetails, showRelated]);

    /** Flecha abajo desde tab Recomendados → grid de relacionados */
    const handleRelatedArrowDown = useCallback(() => {
        setFocus('PROGRAM-RELATED');
        return false;
    }, []);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.tabsWrapper}>
                <div ref={trackRef} className={styles.tabsTrack}>
                    {(() => {
                        const allFocusKeys = [
                            ...validSegments.map((s) => `program-tab-${s.key}`),
                            'program-tab-related',
                            'program-tab-details',
                        ];
                        return (
                            <>
                                {validSegments.map((segment, idx) => {
                                    const isActive = !showDetails && !showRelated && activeSegment?.id === segment.id;
                                    const tabKey = `program-tab-${segment.key}`;
                                    return (
                                        <TabButton
                                            key={segment.key}
                                            label={segment.name}
                                            focusKey={tabKey}
                                            isActive={isActive}
                                            index={idx}
                                            allFocusKeys={allFocusKeys}
                                            onPress={() => {
                                                setActiveSegment(segment);
                                                setShowDetails(false);
                                                setShowRelated(false);
                                            }}
                                            onTabFocus={() => scrollToTab(tabKey)}
                                            onArrowDown={handleTabArrowDown}
                                        />
                                    );
                                })}

                                <TabButton
                                    label="Recomendados"
                                    focusKey="program-tab-related"
                                    isActive={showRelated}
                                    index={validSegments.length}
                                    allFocusKeys={allFocusKeys}
                                    onPress={() => {
                                        setShowRelated(true);
                                        setShowDetails(false);
                                    }}
                                    onTabFocus={() => scrollToTab('program-tab-related')}
                                    onArrowDown={handleRelatedArrowDown}
                                />

                                <TabButton
                                    label="Detalles"
                                    focusKey="program-tab-details"
                                    isActive={showDetails}
                                    index={validSegments.length + 1}
                                    allFocusKeys={allFocusKeys}
                                    onPress={() => {
                                        setShowDetails(true);
                                        setShowRelated(false);
                                    }}
                                    onTabFocus={() => scrollToTab('program-tab-details')}
                                />
                            </>
                        );
                    })()}
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default Tabs;
