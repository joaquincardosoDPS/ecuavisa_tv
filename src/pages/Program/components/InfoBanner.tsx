import { useCallback } from 'react';
import { useFavorite } from '@/hooks/program/useFavorite';
import type { Program } from '@/interfaces/catalog.interface';
import type { HistoryItem } from '@/interfaces/history.interface';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import iconoReiniciarRaw from '@/assets/img/icons/iconos-reiniciar-program.svg?raw';
import FavoriteButton from './FavoriteButton';
import ProgressBar from './ProgressBar';
import styles from '../ProgramPage.module.css';

interface InfoBannerProps {
    program: Program;
    onBannerFocused?: () => void;
    continueWatchingItem?: HistoryItem | null;
    onPlay?: () => void;
    onRestart?: () => void;
}

function InfoBanner({ program, onBannerFocused, continueWatchingItem, onPlay, onRestart }: InfoBannerProps) {
    const { isFavorited, isToggling, isEnabled, toggleFavorite } = useFavorite(program.key);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-BANNER-ACTIONS',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onBannerFocused?.(),
    });

    const handlePlay = useCallback(() => {
        onPlay?.();
    }, [onPlay]);

    const handleRestart = useCallback(() => {
        onRestart?.();
    }, [onRestart]);

    const isResuming = !!continueWatchingItem;

    const logoImg = program?.image_logo?.big;
    const maxSeasons = program.segments?.[0]?.max_temp || 0;
    const genderNames = program.genders?.map((g) => g.name).join(', ');

    const { ref: playRef, focused: playFocused } = useFocusable({
        focusKey: 'program-btn-play',
        onEnterPress: handlePlay,
        onFocus: () => onBannerFocused?.(),
        onArrowPress: (direction) => {
            if (direction === 'right') {
                if (isResuming) {
                    setFocus('program-btn-restart');
                    return false;
                }
                if (isEnabled) {
                    setFocus('program-btn-favorite');
                    return false;
                }
                return false;
            }
            if (direction === 'left') {
                setFocus('SIDEBAR');
                return false;
            }
            if (direction === 'down') {
                setFocus('PROGRAM-TABS');
                return false;
            }
            return true;
        },
    });

    const { ref: restartRef, focused: restartFocused } = useFocusable({
        focusKey: 'program-btn-restart',
        onEnterPress: handleRestart,
        onFocus: () => onBannerFocused?.(),
        onArrowPress: (direction) => {
            if (direction === 'left') {
                setFocus('program-btn-play');
                return false;
            }
            if (direction === 'right' && isEnabled) {
                setFocus('program-btn-favorite');
                return false;
            }
            if (direction === 'down') {
                setFocus('PROGRAM-TABS');
                return false;
            }
            return true;
        },
    });

    return (
        <div className={styles.infoBanner}>
            {/* Logo / Título — posición absoluta */}
            {logoImg ? (
                <div className={styles.logoContainer}>
                    <img
                        src={logoImg}
                        alt={program.title}
                        className={styles.logoImg}
                        draggable={false}
                    />
                </div>
            ) : (
                <h2 className={styles.titleFallback}>{program.title}</h2>
            )}

            {/* Metadata — posición absoluta */}
            <div className={styles.metaRow}>
                {program.classification && (
                    <span className={styles.badge}>{program.classification}</span>
                )}
                <span className={styles.metaText}>
                    {program.anio_production && `${program.anio_production} – `}
                    {maxSeasons > 1 ? `${maxSeasons} Temporadas` : '1 Temporada'}
                    {genderNames && ` – ${genderNames}`}
                </span>

                {/* Descripción */}
                <p className={styles.description}>
                    {program.description_short}
                </p>
            </div>

            {/* Botón Play — posición absoluta en el fondo */}
            <FocusContext.Provider value={focusKey}>
                <div ref={ref} className={styles.actionRow}>
                    <div
                        ref={playRef}
                        className={`${styles.playBtn} ${playFocused ? styles.focused : ''}`}
                        onClick={handlePlay}
                        onMouseEnter={() => {/* hover handled by CSS */}}
                    >
                        <span className={styles.playIcon}>▶</span>
                        <span className={styles.playText}>
                            {continueWatchingItem ? 'Reanudar' : program.single_episode ? 'Reproducir' : 'Capítulos'}
                        </span>
                    </div>

                    {isResuming && (
                        <button
                            ref={restartRef}
                            type="button"
                            className={`${styles.restartBtn} ${restartFocused ? styles.focused : ''}`}
                            onClick={handleRestart}
                        >
                            <span
                                className={styles.restartIcon}
                                dangerouslySetInnerHTML={{ __html: iconoReiniciarRaw }}
                            />
                        </button>
                    )}

                    {isEnabled && (
                        <FavoriteButton
                            focusKey="program-btn-favorite"
                            isFavorited={isFavorited}
                            isToggling={isToggling}
                            onPress={toggleFavorite}
                            playFocusKey={isResuming ? 'program-btn-restart' : 'program-btn-play'}
                        />
                    )}
                </div>
            </FocusContext.Provider>

            {/* Barra de progreso */}
            {continueWatchingItem && (
                <div className={styles.progressUnderAction}>
                    <ProgressBar
                        duration={continueWatchingItem.duration}
                        time={continueWatchingItem.time}
                        subtitle={continueWatchingItem.title_complete}
                    />
                </div>
            )}
        </div>
    );
}

export default InfoBanner;
