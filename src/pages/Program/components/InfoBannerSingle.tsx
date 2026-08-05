import { useContinueWatching } from '@/hooks/program/useContinueWatching';
import Button from '@/components/ui/Button';
import { useFavorite } from '@/hooks/mylist/useFavorite';
import type { Chapter, Program } from '@/interfaces/catalog.interface';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '@/utils/formatDuration';
import ProgressBar from '@/components/ui/ProgressBar';
import styles from "./InfoBannerSingle.module.css";

function InfoBannerSingle({ program, chapter }: { program: Program, chapter?: Chapter }) {
  const navigate = useNavigate();
  const { isFavorited, isToggling, isEnabled, toggleFavorite } = useFavorite(program.key);
  const { item: continueWatchingItem } = useContinueWatching(program.key);

  const handlePlay = () => {
    if (continueWatchingItem) {
      navigate(`/play/${program.key}/${continueWatchingItem.key_segment}/${continueWatchingItem.season}/${continueWatchingItem.chapter}`, { state: { resumeTime: continueWatchingItem.time } });
    } else {
      const firstSegment = program.segments?.[0];
      if (firstSegment) {
        const firstSeason = firstSegment.all_temp?.[0] ?? 1;
        navigate(`/play/${program.key}/${firstSegment.key}/${firstSeason}/1`);
      }
    }
  }

  const handleClicFavorite = () => {
    if (isEnabled) toggleFavorite();
    else navigate('/auth/login');
  }

  const logoImg = program?.image_logo?.big;
  const genderNames = program.genders?.map((gender) => gender.name).join(", ");

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.logoWrapper}>
        {logoImg ? (
          <img src={logoImg} alt={program.title} className={styles.logoImage} />
        ) : (
          <h2 className={styles.programTitle}>
            {program.title}
          </h2>
        )}
      </div>
      <div className={styles.metaWrapper}>
        <span className={styles.classificationBadge}>{program.classification}</span>
        {program.anio_production && <span>{program.anio_production} -</span>}
        <span>{chapter?.duration ? formatDuration(chapter.duration) : ''}</span>
      </div>
      {genderNames && <span>{genderNames}</span>}
      <div className={styles.actionsWrapper}>
        <Button variant="primary" showArrow onClick={handlePlay}>{continueWatchingItem ? "Reanudar" : "Ver ahora"}</Button>
        <FavoriteButton isFavorited={isFavorited} isToggling={isToggling} onClick={handleClicFavorite} />
      </div>
      {continueWatchingItem && <ProgressBar duration={continueWatchingItem.duration} time={continueWatchingItem.time} />}
      <p className={styles.programDescription}>
        {program.description_short}
      </p>
    </div>
  )
}
export default InfoBannerSingle;
