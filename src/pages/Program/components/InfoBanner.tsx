import { useCallback } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate } from 'react-router-dom';
import type { Program } from '@/interfaces/catalog.interface';
import { useFavorite } from '@/hooks/useFavorite';
import { useContinueWatching } from '@/hooks/useContinueWatching';
import { Button } from '@/components/ui/Button';
import FavoriteButton from './FavoriteButton';
import ProgressBar from './ProgressBar';
import styles from '../ProgramPage.module.css';

interface InfoBannerProps {
    program: Program;
    onBannerFocused?: () => void;
}

function InfoBanner({ program, onBannerFocused }: InfoBannerProps) {
    const navigate = useNavigate();
    const { isFavorited, isToggling, isEnabled, toggleFavorite } = useFavorite(program.key);
    const { item: continueWatchingItem } = useContinueWatching(program.key);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-BANNER-ACTIONS',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onBannerFocused?.(),
    });

    const handlePlay = useCallback(() => {
        if (continueWatchingItem) {
            navigate(
                `/play/${program.key}/${continueWatchingItem.key_segment}/${continueWatchingItem.season}/${continueWatchingItem.chapter}`,
                { state: { resumeTime: continueWatchingItem.time } },
            );
        } else {
            const firstSegment = program.segments?.[0];
            if (firstSegment) {
                const firstSeason = firstSegment.all_temp?.[0] ?? 1;
                navigate(`/play/${program.key}/${firstSegment.key}/${firstSeason}/1`);
            }
        }
    }, [continueWatchingItem, program, navigate]);

    const logoImg = program?.image_logo?.big;
    const maxSeasons = program.segments?.[0]?.max_temp || 0;
    const genderNames = program.genders?.map((g) => g.name).join(', ');

    return (
        <div className={styles.infoBanner}>
            {/* Logo / Título */}
            <div className={styles.logoContainer}>
                {logoImg ? (
                    <img
                        src={logoImg}
                        alt={program.title}
                        className={styles.logoImg}
                        draggable={false}
                    />
                ) : (
                    <h2 className={styles.titleFallback}>{program.title}</h2>
                )}
            </div>

            {/* Metadata */}
            <div className={styles.metaRow}>
                {program.classification && (
                    <span className={styles.badge}>{program.classification}</span>
                )}
                {program.anio_production && (
                    <span className={styles.metaText}>{program.anio_production} –</span>
                )}
                <span className={styles.metaText}>
                    {maxSeasons > 1 ? `${maxSeasons} Temporadas` : '1 Temporada'} –
                </span>
                {genderNames && <span className={styles.metaText}>{genderNames}</span>}
            </div>

            {/* Botones de acción — zona de foco */}
            <FocusContext.Provider value={focusKey}>
                <div ref={ref} className={styles.actionRow}>
                    <Button
                        focusKey="program-btn-play"
                        variant="primary"
                        showArrow
                        onPress={handlePlay}
                    >
                        {continueWatchingItem ? 'Reanudar' : 'Play'}
                    </Button>

                    {isEnabled && (
                        <FavoriteButton
                            focusKey="program-btn-favorite"
                            isFavorited={isFavorited}
                            isToggling={isToggling}
                            onPress={toggleFavorite}
                        />
                    )}
                </div>
            </FocusContext.Provider>

            {/* Barra de progreso */}
            {continueWatchingItem && (
                <ProgressBar
                    duration={continueWatchingItem.duration}
                    time={continueWatchingItem.time}
                />
            )}

            {/* Descripción */}
            <p className={styles.description}>
                {program.description_short}
            </p>
        </div>
    );
}

export default InfoBanner;
