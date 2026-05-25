import type { Event } from '@/interfaces/catalog.interface';
import styles from '../EventView.module.css';

interface EventBannerBackgroundProps {
  event: Event;
  scrollOpacity: number;
}

/** Fondo fijo del banner  */
export function EventBannerBackground({ event, scrollOpacity }: EventBannerBackgroundProps) {
  const bgImg = event.image_background?.big || event.image_land?.big;

  return (
    <div className={styles.bannerBg}>
      {bgImg && (
        <div
          className={styles.bannerBgImage}
          style={{ backgroundImage: `url(${bgImg})` }}
        />
      )}
      <div className={styles.bannerOverlayLeft} />
      <div className={styles.bannerOverlayBottom} />
      <div
        className={styles.bannerScrollOverlay}
        style={{ opacity: scrollOpacity }}
      />
    </div>
  );
}
