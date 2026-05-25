import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { Button } from '@/components/ui/Button';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import type { Event } from '@/interfaces/catalog.interface';
import styles from '../EventView.module.css';

interface EventBannerContentProps {
  event: Event;
  onBannerFocused?: () => void;
}

/** Contenido del banner: status, logo, clasificación, play, categoría, título, sinopsis */
function EventBannerContent({ event, onBannerFocused }: EventBannerContentProps) {
  const navigate = useNavigate();

  const logoCat = event.category?.image_logo?.default;
  const logoEvent = event.image_logo?.default;
  const classification = event.classification;
  const categoryName = Array.isArray(event.category)
    ? event.category[0]?.name || ''
    : event.category?.name || '';

  // Event status
  const eventDate = new Date(event.gmt0_unlocked?.replace(' ', 'T') + 'Z');
  const now = new Date();
  const eventStatus = now < eventDate
    ? `Próximamente · ${eventDate.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${eventDate.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false })}`
    : event.live_associated?.key
      ? 'En vivo ahora'
      : null;

  const handlePlay = useCallback(() => {
    if (event.live_associated?.key) {
      navigate('/live', { state: { signal: event.live_associated.key } });
    } else if (event.program_associated?.key) {
      navigate(`/programas/${event.program_associated.key}`);
    }
  }, [event, navigate]);

  return (
    <div className={styles.bannerContent}>
      {eventStatus && (
        <span className={styles.eventStatusBadge}>{eventStatus}</span>
      )}

      {logoEvent && (
        <img
          src={logoEvent}
          alt={event.title}
          className={styles.eventLogo}
          draggable={false}
          decoding="async"
        />
      )}

      {classification && (
        <span className={styles.classificationBadge}>{classification}</span>
      )}

      <Button
        focusKey="EVENT-PLAY"
        variant="primary"
        showArrow
        onPress={handlePlay}
        onFocused={onBannerFocused}
        onArrowPress={(direction) => {
          if (direction === 'left') {
            setFocus(SIDEBAR_FOCUS_KEY);
            return false;
          }
          if (direction === 'right') {
            return false;
          }
          if (direction === 'down') {
            setFocus('EVENT-TAB-relacionados');
            return false;
          }
          return true;
        }}
      >
        Play
      </Button>

      <div className={styles.categoryRow}>
        {logoCat && (
          <img src={logoCat} alt="" className={styles.categoryLogo} draggable={false} />
        )}
        <span className={styles.categoryName}>{categoryName}</span>
      </div>

      <h1 className={styles.eventTitle}>{event.title}</h1>
      <p className={styles.eventDescription}>{event.description_short}</p>
    </div>
  );
}

export default EventBannerContent;
