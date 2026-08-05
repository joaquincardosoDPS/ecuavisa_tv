import type { Category, Event } from "@/interfaces/catalog.interface";
import { getEventStatus } from "@/utils/eventStatus";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import styles from "./SingleEvent.module.css";

interface SingleEventProps { category: Category; }

function SingleEvent({ category }: SingleEventProps) {
  const navigate = useNavigate();
  const event = (category.programs?.[0] as Event) || null;
  const eventStatus = event ? getEventStatus(event) : null;
  const bgImageUrl = category.image_background_category?.default || event?.image_background?.default || "";

  return (
    <div style={{ height: "50vh", width: "100%", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "100% auto", position: "relative", display: "flex", alignItems: "center", paddingLeft: "6.25rem", backgroundImage: `url(${bgImageUrl})` }}>
      <div className={styles.eventBackgroundOverlay} />
      <div className={styles.eventContent}>
        {eventStatus && (
          <span style={{ padding: "0.25rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: eventStatus.bgColor, color: eventStatus.textColor }}>
            {eventStatus.label}
          </span>
        )}
        <h2 className={styles.eventTitle}>
          {event?.title || category.title}
        </h2>
        {(event?.description_short || event?.description) && (
          <p className={styles.eventDescription}>
            {event.description_short || event.description}
          </p>
        )}
        <div className={styles.eventActions}>
          <Button variant="primary" onClick={() => navigate(event?.skip_view && event?.program_associated?.key ? `/programas/${event.program_associated.key}` : `/eventos/${event?.key}`)}>
            Ver detalles
          </Button>
        </div>
      </div>
    </div>
  );
}
export default SingleEvent;
