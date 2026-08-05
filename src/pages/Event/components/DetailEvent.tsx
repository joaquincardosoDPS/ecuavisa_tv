import type { Event } from "@/interfaces/catalog.interface";
import styles from "./DetailEvent.module.css";

function DetailEvent({ event }: { event: Event }) {
  return (
    <div className={styles.detailContainer}>
      <h3 className={styles.synopsisTitle}>Sinopsis</h3>
      <div className={styles.contentWrapper}>
        <div className={styles.descriptionWrapper}>
          <p className={styles.descriptionText}>
            {event.description || event.description_short}
          </p>
        </div>
      </div>
    </div>
  );
}
export default DetailEvent;
