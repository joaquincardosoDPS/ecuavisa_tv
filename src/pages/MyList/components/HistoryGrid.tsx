import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { HistoryItem as ContinueWatchingItem } from "@/interfaces/history.interface";
import Button from "@/components/ui/Button";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import styles from "./HistoryGrid.module.css";

interface HistoryGridProps {
  items: ContinueWatchingItem[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return hrs > 0 ? `${hrs} hrs ${mins} min` : `${mins} min`;
}

function getProgress(item: ContinueWatchingItem): number {
  if (item.duration_seg <= 0 || item.time <= 0) return 0;
  return Math.min(100, (item.time / item.duration_seg) * 100);
}

function getImage(item: ContinueWatchingItem): string | null {
  return item.image_land?.medium || item.image_land?.default || item.image || null;
}

interface HistoryCardProps {
  item: ContinueWatchingItem;
  index: number;
  onPress: () => void;
}

function HistoryCard({ item, index, onPress }: HistoryCardProps) {
  const imgSrc = getImage(item);
  const progress = getProgress(item);
  const remaining = item.duration_seg - item.time;
  const remainingText = remaining > 0 ? `${formatDuration(remaining)} restantes` : "";

  const { ref, focused } = useCarouselFocus({
    focusKey: `mylist-history-item-${index}`,
    onEnterPress: onPress,
  });

  return (
    <div ref={ref} tabIndex={0} onClick={onPress} className={`${styles.historyCard}${focused ? ` ${styles.focused}` : ''}`}>
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
}

export function HistoryGrid({ items, isFetchingNextPage, hasNextPage, fetchNextPage }: HistoryGridProps) {
  const navigate = useNavigate();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, { rootMargin: "400px" });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { ref, focusKey } = useFocusable({
    focusKey: "zone-history-grid",
    saveLastFocusedChild: true,
  });

  if (items.length === 0) {
    return (
      <div className={styles.emptyStateContainer}>
        <p className={styles.emptyStateText}>No tienes episodios pendientes por ver.</p>
        <Button variant="secondary" onClick={() => navigate("/")}>Explorar contenido</Button>
      </div>
    );
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.gridContainer}>
        {items.map((item, index) => (
          <HistoryCard
            key={item.slug}
            item={item}
            index={index}
            onPress={() => navigate(`/play/${item.key_program}/${item.key_segment}/${item.season}/${item.chapter}`, { state: { resumeTime: item.time } })}
          />
        ))}
      </div>
      <div ref={sentinelRef} className={styles.loadingSentinel}>
        {isFetchingNextPage && <div className={styles.loadingSpinner} />}
      </div>
    </FocusContext.Provider>
  );
}

