import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import styles from '../ProgramPage.module.css';

interface SeasonSelectorProps {
    seasons: number[];
    activeSeason: number | null;
    setActiveSeason: (season: number) => void;
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
            // Scroll la temporada enfocada a la vista
            if (ref.current) {
                (ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
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

function SeasonSelector({ seasons, activeSeason, setActiveSeason }: SeasonSelectorProps) {

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-SEASONS',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
    });


    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.seasonsRow}>
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
                            onArrowDown={isLast ? () => false : undefined}
                        />
                    );
                })}
            </div>
        </FocusContext.Provider>
    );
}

export default SeasonSelector;
