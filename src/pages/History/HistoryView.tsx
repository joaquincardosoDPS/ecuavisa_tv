import { useNavigate } from "react-router-dom";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { useHistoryData } from "@/hooks/history/useHistoryData";
import Button from "@/components/ui/Button";
import type { HistoryItem } from "@/interfaces/history.interface";
import styles from "./HistoryView.module.css";

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0 && m > 0) return `${h} h ${m} min`;
  if (h > 0) return `${h} h`;
  return `${m} min`;
}

function getProgress(item: HistoryItem): number {
  if (item.duration_seg <= 0) return 0;
  return Math.min(100, (item.time / item.duration_seg) * 100);
}

function getImage(item: HistoryItem): string {
  return item.image_land?.medium || item.image_land?.default || item.image || "";
}

function HistoryView() {
  useDocumentTitle("Seguir Viendo");
  const navigate = useNavigate();
  const { historyItems, isLoading, isError, error, isAuthenticated } = useHistoryData();

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Seguir Viendo</h1>
      {!isAuthenticated ? (
        <div className={styles.authPromptContainer}>
          <p className={styles.authPromptText}>
            Inicia sesión para ver tu historial.
          </p>
          <Button variant="secondary" onClick={() => navigate("/auth/login")}>Iniciar sesión</Button>
        </div>
      ) : isLoading ? (
        <FullScreenSpinner />
      ) : isError ? (
        <p className={styles.errorMessage}>
          {error instanceof Error ? error.message : "Error al cargar historial."}
        </p>
      ) : !historyItems || historyItems.length === 0 ? (
        <div className={styles.emptyStateContainer}>
          <p className={styles.emptyStateText}>
            No tienes episodios pendientes por ver.
          </p>
          <Button variant="secondary" onClick={() => navigate("/")}>Explorar contenido</Button>
        </div>
      ) : (
        <div className={styles.historyGrid}>
          {historyItems.map((item) => {
            const imgSrc = getImage(item);
            const progress = getProgress(item);
            const remaining = item.duration_seg - item.time;
            const remainingText = remaining > 0 ? `${formatDuration(remaining)} restantes` : "";

            return (
              <div
                key={item.slug}
                tabIndex={0}
                onClick={() => navigate(`/play/${item.key_program}/${item.key_segment}/${item.season}/${item.chapter}`, { state: { resumeTime: item.time } })} className={styles.historyCard}
              >
                <div className={styles.imageWrapper}>
                  {imgSrc ? (
                    <img src={imgSrc} alt={item.title} draggable={false} decoding="async" className={styles.historyImage} />
                  ) : (
                    <div className={styles.placeholderWrapper}>
                      <span className={styles.placeholderText}>{item.title}</span>
                    </div>
                  )}
                  <div className={styles.progressBarContainer}>
                    <div style={{ height: "100%", backgroundColor: "var(--foc-primary)", transition: "all 0.3s", width: `${progress}%` }} />
                  </div>
                </div>
                <div className={styles.infoWrapper}>
                  <p className={styles.programName}>{item.name_program}</p>
                  <p className={styles.episodeTitle}>{item.title}</p>
                  {remainingText && <p className={styles.remainingTimeText}>{remainingText}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default HistoryView;
