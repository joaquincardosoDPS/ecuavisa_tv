import type { LiveSignal, EPGEvent } from "@/interfaces/catalog.interface";
import styles from "../LiveView.module.css";

interface InfoPanelProps {
  selectedSignal: LiveSignal | null;
  currentEvent: EPGEvent | null;
  infoImage: string | null;
  isFullscreen: boolean;
  isLoading: boolean;
}

export function InfoPanel({
  selectedSignal,
  currentEvent,
  infoImage,
  isFullscreen,
  isLoading,
}: InfoPanelProps) {
  return (
    <div
      className={styles.infoPanel}
      style={{ display: isFullscreen || isLoading ? "none" : "flex" }}
    >

      <div className={styles.infoContent}>
        <div className={styles.liveBadge}>
          <span className={styles.liveDot} />
          EN VIVO
        </div>

        {infoImage && (
          <img
            src={infoImage}
            alt={currentEvent?.title || selectedSignal?.name_live || ""}
            className={styles.infoImage}
            draggable={false}
            decoding="async"
          />
        )}

        <h1 className={styles.infoTitle}>
          {currentEvent?.title || selectedSignal?.name_live || "Sin señal"}
        </h1>

        {currentEvent?.synopsis && (
          <p className={styles.infoSynopsis}>{currentEvent.synopsis}</p>
        )}
      </div>
    </div>
  );
}
