import type { Category, Event } from "@/interfaces/catalog.interface";
import { getEventStatus } from "@/utils/eventStatus";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import styles from "./SingleEvent.module.css";

interface SingleEventProps { category: Category; }

const SingleEventButton = ({ event, category, handleClick }: { event: Event | null, category: Category, handleClick: () => void }) => {
  const { ref: buttonRef, focused: buttonFocused } = useCarouselFocus({
    focusKey: `single-event-btn-${event?.id || category.key}`,
    isBanner: false, // Changed from true to false to prevent scrolling to top
    onEnterPress: handleClick,
  });

  return (
    <Button ref={buttonRef} variant="primary" onClick={handleClick} tabIndex={0} focused={buttonFocused}>
      Ver detalles
    </Button>
  );
};

function SingleEvent({ category }: SingleEventProps) {
  const navigate = useNavigate();
  const event = (category.programs?.[0] as Event) || null;
  const eventStatus = event ? getEventStatus(event) : null;
  const bgImageUrl = category.image_background_category?.default || event?.image_background?.default || "";

  const { focusKey: generatedFocusKey, ref: zoneRef } = useFocusable({
    focusKey: `zone-single-event-${category.key}`,
    saveLastFocusedChild: true,
  });

  const handleClick = () => {
    navigate(event?.skip_view && event?.program_associated?.key ? `/programas/${event.program_associated.key}` : `/eventos/${event?.key}`);
  };

  return (
    <FocusContext.Provider value={generatedFocusKey}>
      <div ref={zoneRef} className={styles.singleEventRoot} style={{ backgroundImage: `url(${bgImageUrl})` }}>
        <div className={styles.eventBackgroundOverlay} />
        <div className={styles.eventContent}>
          {eventStatus && (
            <span className={styles.eventBadge} style={{ backgroundColor: eventStatus.bgColor, color: eventStatus.textColor }}>
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
            <SingleEventButton event={event} category={category} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}
export default SingleEvent;
