import { useRef, useCallback } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import styles from '../ProgramPage.module.css';

interface SeasonSelectorProps {
    seasons: number[];
    activeSeason: number | null;
    setActiveSeason: (season: number) => void;
    onSeasonFocused?: () => void;
}

/** Botón de temporada individual */
function SeasonButton({
    season,
    focusKey,
    isActive,
    onPress,
    onFocused,
    onArrowDown,
}: {
    season: number;
    focusKey: string;
    isActive: boolean;
    onPress: () => void;
    onFocused?: () => void;
    onArrowDown?: () => boolean;
}) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: onPress,
        onArrowPress: (direction) => {
            if (direction === 'down' && onArrowDown) {
                return onArrowDown();
            }
            return true;
        },
        onFocus: () => {
            onPress();
            onFocused?.();
        },
    });

    const classList = [
        styles.seasonItem,
        isActive && styles.seasonItemActive,
        focused && styles.seasonItemFocused,
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            type="button"
            className={classList}
            onClick={onPress}
            data-focuskey={focusKey}
        >
            Temporada {season}
        </button>
    );
}

function SeasonSelector({ seasons, activeSeason, setActiveSeason, onSeasonFocused }: SeasonSelectorProps) {
    const listRef = useRef<HTMLDivElement>(null);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-SEASONS',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onSeasonFocused?.(),
    });

    /** Scroll into view del season enfocado (mismo patrón que chapters) */
    const scrollToSeason = useCallback((idx: number) => {
        const list = listRef.current;
        if (!list) return;

        const children = list.children;
        if (idx < 0 || idx >= children.length) return;

        const child = children[idx] as HTMLElement;
        const containerRect = list.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();

        // Si ya está visible, no scrollear
        if (childRect.top >= containerRect.top && childRect.bottom <= containerRect.bottom) {
            return;
        }

        // Centrar el elemento en el contenedor
        const childOffsetTop = child.offsetTop;
        const containerHeight = list.clientHeight;
        const targetScroll = childOffsetTop - containerHeight / 2 + child.offsetHeight / 2;
        list.scrollTop = Math.max(0, targetScroll);
    }, []);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref}>
                <div ref={listRef} className={styles.seasonsRow}>
                    {seasons.map((season, idx) => {
                        const seasonKey = `program-season-${season}`;
                        const isLast = idx === seasons.length - 1;
                        return (
                            <SeasonButton
                                key={season}
                                season={season}
                                focusKey={seasonKey}
                                isActive={activeSeason === season}
                                onPress={() => setActiveSeason(season)}
                                onFocused={() => scrollToSeason(idx)}
                                onArrowDown={isLast ? () => false : undefined}
                            />
                        );
                    })}
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default SeasonSelector;
