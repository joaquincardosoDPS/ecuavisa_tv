import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { getEventStatus } from '@/utils/eventStatus';
import type { Event } from '@/interfaces/catalog.interface';
import styles from '../EventView.module.css';

interface EventCardProps {
  event: Event;
  focusKey: string;
  onCardFocus?: () => void;
  onPress?: (eventKey: string) => void;
}

function EventCard({ event, focusKey, onCardFocus, onPress }: EventCardProps) {
  const imageSrc = event.image_land?.small;
  const eventStatus = getEventStatus(event);

  const handleSelect = () => {
    onPress?.(event.key);
  };

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: handleSelect,
    onFocus: () => onCardFocus?.(),
  });

  const showDate = eventStatus !== null && eventStatus.label === 'Próximamente';

  return (
    <div className={styles.eventCardWrapper}>
      <div
        ref={ref}
        className={`${styles.eventCard} ${focused ? styles.eventCardFocused : ''}`}
        onClick={handleSelect}
        data-focuskey={focusKey}
      >
        {eventStatus && (
          <span
            className={styles.eventCardBadge}
            style={{ backgroundColor: `var(${eventStatus.colorVar})` }}
          >
            {eventStatus.label}
          </span>
        )}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={event.title}
            className={styles.eventCardImg}
            draggable={false}
            decoding="async"
          />
        )}
      </div>
      {showDate && (
        <div className={styles.eventCardDateInfo}>
          <span className={styles.eventCardDateText}>
            {(() => {
              const d = new Date(event.gmt0_unlocked.replace(' ', 'T') + 'Z');
              const date = d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'long' });
              const time = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
              return `${date}, ${time} hrs`;
            })()}
          </span>
          <span className={styles.eventCardDateTitle}>{event.title}</span>
        </div>
      )}
    </div>
  );
}

export default EventCard;
