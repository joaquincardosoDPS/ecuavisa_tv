import { useRef, useCallback } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import styles from '../ProgramPage.module.css';

interface SeasonSelectorProps {
    seasons: number[];
    activeSeason: number | null;
    setActiveSeason: (season: number) => void;
    /** Intercepta flecha abajo — para forzar foco al primer card */
    onArrowDown?: () => boolean;
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
            return true; // permite movimiento normal en otras direcciones
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

function SeasonSelector({ seasons, activeSeason, setActiveSeason, onArrowDown }: SeasonSelectorProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-SEASONS',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
    });

    /** Scroll horizontal al enfocar un season button */
    const scrollToSeason = useCallback((seasonFocusKey: string) => {
        const track = trackRef.current;
        if (!track) return;

        const wrapper = track.parentElement;
        if (!wrapper) return;

        const child = track.querySelector(
            `[data-focuskey="${seasonFocusKey}"]`,
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
            <div ref={ref} className={styles.seasonsRow} style={{ overflow: 'hidden' }}>
                <div
                    ref={trackRef}
                    style={{
                        display: 'flex',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform',
                    }}
                >
                    {seasons.map((season) => {
                        const seasonKey = `program-season-${season}`;
                        return (
                            <SeasonButton
                                key={season}
                                season={season}
                                focusKey={seasonKey}
                                isActive={activeSeason === season}
                                onPress={() => setActiveSeason(season)}
                                onFocused={() => scrollToSeason(seasonKey)}
                                onArrowDown={onArrowDown}
                            />
                        );
                    })}
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default SeasonSelector;
