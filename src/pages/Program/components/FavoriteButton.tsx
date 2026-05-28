import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import styles from '../ProgramPage.module.css';

interface FavoriteButtonProps {
    focusKey: string;
    isFavorited: boolean;
    isToggling: boolean;
    onPress: () => void;
    /** FocusKey del botón play al que navegar con flecha izquierda */
    playFocusKey?: string;
    /** FocusKey de los tabs al que navegar con flecha abajo */
    tabsFocusKey?: string;
}

/**
 * Botón de favorito circular para TV con navegación espacial.
 * REGLA F6.1: hover = focused
 * REGLA F6.2: onClick = onEnterPress
 */
function FavoriteButton({
    focusKey,
    isFavorited,
    isToggling,
    onPress,
    playFocusKey = 'program-btn-play',
    tabsFocusKey = 'PROGRAM-TABS',
}: FavoriteButtonProps) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: () => {
            if (!isToggling) onPress();
        },
        onArrowPress: (direction) => {
            if (direction === 'left') {
                setFocus(playFocusKey);
                return false;
            }
            if (direction === 'down') {
                setFocus(tabsFocusKey);
                return false;
            }
            return true;
        },
    });

    const classList = [
        styles.favoriteBtn,
        focused && styles.focused,
        isFavorited && styles.active,
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            type="button"
            className={classList}
            onClick={() => {
                if (!isToggling) onPress();
            }}
            data-focuskey={focusKey}
        >
            <svg
                className={styles.favoriteSvg}
                viewBox="0 0 24 24"
                fill={isFavorited ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
            >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </button>
    );
}

export default FavoriteButton;
