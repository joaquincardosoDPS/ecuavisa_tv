import { useNavigate } from 'react-router-dom';
import type { Event } from "@/interfaces/catalog.interface";
import { getEventStatus } from '@/utils/eventStatus';
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import styles from "./EventCard.module.css";

interface CardProps { event: Event; }

function EventCard({ event }: CardProps) {
  const navigate = useNavigate();
  const imageSrc = event.image_land.small;
  const eventStatus = getEventStatus(event);
  const showDate = eventStatus !== null && eventStatus.label === 'Próximamente';

  const handleClick = () => navigate(`/eventos/${event.key}`);

  const { ref, focused } = useSpatialFocus({
    focusKey: `event-card-${event.key}`,
    onEnterPress: handleClick,
  });

  return (
    <div ref={ref} onClick={handleClick} className={[styles.cardContainer, focused ? styles.focused : ""].join(" ")}>
      <div className={styles.imageWrapper}>
        {eventStatus && (
          <span style={{ position: "absolute", top: 0, left: 0, zIndex: 10, padding: "0.25rem 0.75rem", borderRadius: "0.25rem", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: eventStatus.bgColor, color: eventStatus.textColor }}>
            {eventStatus.label}
          </span>
        )}
        {imageSrc && (
          <img src={imageSrc} alt={event.title} loading="lazy" className={styles.thumbnailImage} />
        )}
      </div>
      {showDate && (
        <div className={styles.textWrapper}>
          <span className={styles.dateText}>
            {(() => {
              const d = new Date(event.gmt0_unlocked.replace(' ', 'T') + 'Z');
              return `${d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'long' })}, ${d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false })} hrs`;
            })()}
          </span>
          <span className={styles.titleText}>{event.title}</span>
        </div>
      )}
    </div>
  );
}
export default EventCard;
