import { useCallback } from 'react';
import { useFavorite } from '@/hooks/program/useFavorite';
import type { Chapter, Program } from '@/interfaces/catalog.interface';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useContinueWatching } from '@/hooks/program/useContinueWatching';
import { formatDuration } from '@/utils/formatDuration';
import FavoriteButton from './FavoriteButton';
import ProgressBar from './ProgressBar';
import styles from '../ProgramPage.module.css';

interface InfoBannerSingleProps {
  program: Program;
  chapter?: Chapter;
  onBannerFocused?: () => void;
  onPlay?: () => void;
}

function InfoBannerSingle({
  program,
  chapter,
  onBannerFocused,
  onPlay,
}: InfoBannerSingleProps) {
  const { isFavorited, isToggling, isEnabled, toggleFavorite } = useFavorite(program.key);
  const { item: continueWatchingItem } = useContinueWatching(program.key);

  const { ref, focusKey } = useFocusable({
    focusKey: 'PROGRAM-SINGLE-BANNER-ACTIONS',
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    onFocus: () => onBannerFocused?.(),
  });

  const handlePlay = useCallback(() => {
    onPlay?.();
  }, [onPlay]);

  const logoImg = program?.image_logo?.big;
  const genderNames = program.genders?.map((g) => g.name).join(', ');

  const { ref: playRef, focused: playFocused } = useFocusable({
    focusKey: 'program-single-btn-play',
    onEnterPress: handlePlay,
    onFocus: () => onBannerFocused?.(),
    onArrowPress: (direction) => {
      if (direction === 'right' && isEnabled) {
        setFocus('program-single-btn-favorite');
        return false;
      }
      if (direction === 'down') {
        setFocus('PROGRAM-TABS-SINGLE');
        return false;
      }
      return true;
    },
  });

  return (
    <div className={styles.infoBanner}>
      {/* Logo / Título — misma estructura que InfoBanner */}
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

      {/* Metadata — misma estructura que InfoBanner */}
      <div className={styles.metaRow}>
        {program.classification && (
          <span className={styles.badge}>{program.classification}</span>
        )}
        <span className={styles.metaText}>
          {program.anio_production && `${program.anio_production}`}
          {chapter?.duration && ` – ${formatDuration(chapter.duration)}`}
          {genderNames && ` – ${genderNames}`}
        </span>

        {/* Descripción */}
        <p className={styles.description}>
          {program.description_short}
        </p>
      </div>

      {/* Botón Play + Progress — posición absoluta en el fondo */}
      <FocusContext.Provider value={focusKey}>
        <div ref={ref} className={styles.actionRow}>
          <div
            ref={playRef}
            className={`${styles.playBtn} ${playFocused ? styles.focused : ''}`}
            onClick={handlePlay}
          >
            <span className={styles.playIcon}>▶</span>
            <span className={styles.playText}>
              {continueWatchingItem ? 'Reanudar' : 'Reproducir'}
            </span>
          </div>

          {isEnabled && (
            <FavoriteButton
              focusKey="program-single-btn-favorite"
              isFavorited={isFavorited}
              isToggling={isToggling}
              onPress={toggleFavorite}
              playFocusKey="program-single-btn-play"
              tabsFocusKey="PROGRAM-TABS-SINGLE"
            />
          )}
        </div>

        {/* Barra de progreso — debajo del botón */}
        {continueWatchingItem && (
          <div className={styles.progressUnderAction}>
            <ProgressBar
              duration={continueWatchingItem.duration}
              time={continueWatchingItem.time}
            />
          </div>
        )}
      </FocusContext.Provider>
    </div>
  );
}

export default InfoBannerSingle;
