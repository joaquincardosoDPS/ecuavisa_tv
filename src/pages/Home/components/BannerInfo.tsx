import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import type { Program } from '@/interfaces/catalog.interface';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import PlayIcon from '@/assets/img/icons/play.svg';
import styles from './BannerInfo.module.css';

interface BannerInfoProps {
    program: Program;
    onPlayFocused?: () => void;
    /** Ir al siguiente slide (undefined si ya es el último) */
    onSlideNext?: () => void;
    /** Ir al slide anterior (undefined si ya es el primero) */
    onSlidePrev?: () => void;
    /** true si estamos en el primer slide */
    isFirstSlide?: boolean;
    /** Callback de navegación — inyectado desde el padre */
    onPress?: () => void;
}

export function BannerInfo({ program, onPlayFocused, onSlideNext, onSlidePrev, isFirstSlide, onPress }: BannerInfoProps) {
    const { ref, focused } = useFocusable({
        focusKey: 'BANNER-PLAY',
        onEnterPress: () => onPress?.(),
        onFocus: () => onPlayFocused?.(),
        onArrowPress: (dir: string) => {
            if (dir === 'left') {
                if (onSlidePrev) {
                    onSlidePrev();
                } else if (isFirstSlide) {
                    setFocus(SIDEBAR_FOCUS_KEY);
                }
                return false;
            }
            if (dir === 'right') {
                if (onSlideNext) {
                    onSlideNext();
                }
                return false;
            }
            if (dir === 'up') return false;
            return true;
        },
    });

    if (!program) return null;

    // Géneros como texto separado por comas
    const genresText = program.genders?.map((g) => g.name).join(', ');

    return (
        <>
            {/* Logo del programa */}
            <div className={styles.logoWrapper}>
                {program.image_logo?.medium ? (
                    <img
                        src={program.image_logo.medium}
                        alt={program.title}
                        className={styles.logo}
                    />
                ) : (
                    <h2 className={styles.fallbackTitle}>
                        {program.title}
                    </h2>
                )}
            </div>

            {/* Descripción + Metadata */}
            <div className={styles.descriptionBlock}>
                <p className={styles.description}>
                    {program.description_short}
                </p>

                <div className={styles.metaRow}>
                    {program.classification && (
                        <span className={styles.classificationBadge}>
                            {typeof program.classification === 'object'
                                ? (program.classification as { name?: string }).name
                                : program.classification}
                        </span>
                    )}
                    {program.anio_production && (
                        <span>{program.anio_production}</span>
                    )}
                    {genresText && (
                        <>
                            <span className={styles.metaSeparator}>|</span>
                            <span className={styles.genres}>{genresText}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Botón "Ver ahora" */}
            <button
                ref={ref}
                type="button"
                className={`${styles.playButton} ${focused ? styles.focused : ''}`}
                onClick={onPress}
            >
                <span className={styles.playButtonContent}>
                    <img src={PlayIcon} alt="" className={styles.playIcon} />
                    <span className={styles.playText}>Ver ahora</span>
                </span>
            </button>
        </>
    );
}
