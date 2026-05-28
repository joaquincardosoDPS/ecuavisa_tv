import { useMemo } from "react";
import type {
  LiveSignal,
  EPGChannel,
} from "@/interfaces/catalog.interface";
import { LiveItemCard } from "./LiveItemCard";
import styles from "../LiveView.module.css";

interface LiveGridRowProps {
  signal: LiveSignal;
  epg: EPGChannel[];
  now: Date;
  rowIndex: number;
  onSelectSignal: (keyLive: string) => void;
  onCardFocus: (keyLive: string) => void;
}

export function LiveGridRow({
  signal,
  epg,
  now,
  rowIndex,
  onSelectSignal,
  onCardFocus,
}: LiveGridRowProps) {
  // Get up to 5 future events for this channel
  const events = useMemo(() => {
    const channel = epg.find(
      (ch) => ch.key_live === signal.key_live || ch.key_live === signal.key,
    );
    if (!channel) return [];

    return channel.events
      .filter((ev) => new Date(ev.endTime) > now)
      .sort(
        (a, b) =>
          new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime(),
      )
      .slice(0, 5);
  }, [epg, signal, now]);

  const isRestricted =
    signal.restriction !== "0" && signal.restriction !== "";

  const logoClass = [
    styles.channelLogo,
    isRestricted && styles.channelLogoRestricted,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.gridRow} id={`live-row-${rowIndex}`}>
      {/* Channel logo */}
      <div className={logoClass}>
        {signal.logo ? (
          <img
            src={signal.logo}
            alt={signal.name_live}
            className={styles.channelLogoImg}
            draggable={false}
            decoding="async"
          />
        ) : (
          <span className={styles.channelLogoText}>{signal.name_live}</span>
        )}
        {isRestricted && (
          <svg
            className={styles.lockIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        )}
      </div>

      {/* Cards strip */}
      <div className={styles.cardsStrip}>
        {events.length > 0 ? (
          events.map((event, colIndex) => (
            <LiveItemCard
              key={event.id}
              event={event}
              now={now}
              focusKey={`live-card-${rowIndex}-${colIndex}`}
              onSelect={() => onSelectSignal(signal.key_live)}
              onCardFocus={() => onCardFocus(signal.key_live)}
              channelName={signal.name_live}
              isLast={colIndex === events.length - 1}
            />
          ))
        ) : (
          <LiveItemCard
            event={{
              id: `placeholder-${signal.key_live}`,
              programId: "",
              beginTime: now.toISOString(),
              endTime: new Date(now.getTime() + 3600000).toISOString(),
              title: signal.name_live,
              synopsis: "",
              genre: null,
              episodeTitle: "",
              pictures: { photo: "", poster: "", cover: "", background: "" },
              rating: "",
            }}
            now={now}
            focusKey={`live-card-${rowIndex}-0`}
            onSelect={() => onSelectSignal(signal.key_live)}
            onCardFocus={() => onCardFocus(signal.key_live)}
            isPlaceholder
            channelName={signal.name_live}
            isLast
          />
        )}
      </div>
    </div>
  );
}
