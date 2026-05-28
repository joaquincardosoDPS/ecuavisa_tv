import { useEffect } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import type { EPGEvent } from "@/interfaces/catalog.interface";
import styles from "../LiveView.module.css";

interface LiveItemCardProps {
  event: EPGEvent;
  now: Date;
  focusKey: string;
  onSelect: () => void;
  onCardFocus?: () => void;
  isPlaceholder?: boolean;
  channelName?: string;
  isLast?: boolean;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function LiveItemCard({
  event,
  now,
  focusKey,
  onSelect,
  onCardFocus,
  isPlaceholder = false,
  channelName,
  isLast = false,
}: LiveItemCardProps) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onSelect,
    onFocus: () => onCardFocus?.(),
    onArrowPress: (direction) => {
      // Block right on last card (or single placeholder) to prevent jumping to another row
      if (direction === "right" && isLast) return false;
      return true;
    },
  });

  // Scroll into view on focus (F5.1)
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  }, [focused, ref]);

  const begin = new Date(event.beginTime);
  const end = new Date(event.endTime);
  const isLive = begin <= now && end > now;

  // Progress percentage for live events
  let progressPct = 0;
  if (isLive) {
    const elapsed = now.getTime() - begin.getTime();
    const total = end.getTime() - begin.getTime();
    progressPct = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0;
  }

  const classList = [
    styles.itemCard,
    focused && styles.itemCardFocused,
    isPlaceholder && styles.itemCardPlaceholder,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classList}
      onClick={onSelect}
      onMouseEnter={() => onCardFocus?.()}
    >
      <p className={styles.itemTitle}>
        {event.title || channelName || "Sin información"}
      </p>
      {event.episodeTitle && (
        <p className={styles.itemEpisode}>{event.episodeTitle}</p>
      )}
      <p className={styles.itemTime}>
        {formatTime(begin)} - {formatTime(end)}
      </p>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
