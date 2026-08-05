import type { Event } from "@/interfaces/catalog.interface";
import EventCard from "./EventCard";
import styles from "./EventsContainer.module.css";

interface Props { events: Event[]; }

function EventsContainer({ events }: Props) {
  return (
    <div className={styles.container}>
      {events && events.length > 0 ? (
        <div className={styles.gridContainer}>
          {events.map((event, index) => <EventCard key={`${event.key}-${index}`} event={event} />)}
        </div>
      ) : (
        <p className={styles.emptyMessage}>No hay eventos relacionados disponibles.</p>
      )}
    </div>
  );
}
export default EventsContainer;
