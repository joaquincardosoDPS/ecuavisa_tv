import { useEffect } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import type { LiveSignal, EPGChannel, EPGEvent } from "@/interfaces/catalog.interface";
import styles from "../LiveView.module.css";

// ── Helpers ──

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getEventsInWindow(
  events: EPGEvent[],
  windowStart: Date,
  windowEnd: Date,
): { event: EPGEvent; startPct: number; widthPct: number }[] {
  const windowMs = windowEnd.getTime() - windowStart.getTime();
  return events
    .map((event) => {
      const begin = new Date(event.beginTime);
      const end = new Date(event.endTime);
      const clampedStart = begin < windowStart ? windowStart : begin;
      const clampedEnd = end > windowEnd ? windowEnd : end;
      if (clampedStart >= clampedEnd) return null;
      const startPct =
        ((clampedStart.getTime() - windowStart.getTime()) / windowMs) * 100;
      const widthPct =
        ((clampedEnd.getTime() - clampedStart.getTime()) / windowMs) * 100;
      return { event, startPct, widthPct };
    })
    .filter(Boolean) as { event: EPGEvent; startPct: number; widthPct: number }[];
}

// ── EPG Row (focusable) ──

interface EPGRowProps {
  signal: LiveSignal;
  isSelected: boolean;
  epg: EPGChannel[];
  now: Date;
  windowStart: Date;
  windowEnd: Date;
  onSelect: () => void;
  focusKey: string;
  onRowFocus?: () => void;
  innerWidthPct: string;
  onArrowRight?: () => boolean;
  onArrowLeft?: () => boolean;
  eventsRef?: React.Ref<HTMLDivElement>;
}

export function EPGRow({
  signal,
  isSelected,
  epg,
  now,
  windowStart,
  windowEnd,
  onSelect,
  focusKey,
  onRowFocus,
  innerWidthPct,
  onArrowRight,
  onArrowLeft,
  eventsRef,
}: EPGRowProps) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onSelect,
    onFocus: () => onRowFocus?.(),
    onArrowPress: (direction) => {
      if (direction === "right" && onArrowRight) {
        return onArrowRight();
      }
      if (direction === "left" && onArrowLeft) {
        return onArrowLeft();
      }
      return true;
    },
  });

  // Scroll into view cuando el row recibe foco (F5.1)
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [focused, ref]);

  const channel = epg.find(
    (ch) => ch.key_live === signal.key_live || ch.key_live === signal.key,
  );
  const events = channel
    ? getEventsInWindow(channel.events, windowStart, windowEnd)
    : [];

  const rowClass = [
    styles.epgRow,
    !isSelected && !focused && styles.epgRowDimmed,
    focused && styles.epgRowFocused,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={rowClass}
      onClick={onSelect}
    >
      <div className={`${styles.epgLogo} ${focused ? styles.epgLogoFocused : ''}`}>
        {signal.logo ? (
          <img
            src={signal.logo}
            alt={signal.name_live}
            className={styles.epgLogoImg}
            draggable={false}
            decoding="async"
          />
        ) : (
          <span className={styles.epgLogoText}>{signal.name_live}</span>
        )}
      </div>

      {/* Events bar */}
      <div 
        className={styles.epgEvents}
        style={{ overflowX: "hidden", overflowY: "hidden" }}
      >
        <div 
          ref={eventsRef}
          style={{ position: "relative", height: "100%", width: innerWidthPct, flexShrink: 0, transition: "transform 0.3s ease-out" }}
        >
          {events.length > 0 ? (
            events.map(({ event, startPct, widthPct }, idx) => {
              const begin = new Date(event.beginTime);
              const end = new Date(event.endTime);
              const isNow = begin <= now && end > now;
              const isFirst = idx === 0;
              const useHighlight = isSelected && (isNow || isFirst);

              const eventClass = useHighlight
                ? styles.epgEventHighlight
                : isNow
                  ? styles.epgEventNow
                  : styles.epgEventDefault;

              return (
                <div
                  key={event.id}
                  className={`${styles.epgEvent} ${eventClass}`}
                  style={{
                    left: `calc(${startPct}% + 4px)`,
                    width: `calc(${widthPct}% - 8px)`,
                  }}
                  title={`${event.title} — ${event.episodeTitle}`}
                >
                  <p className={styles.epgEventTitle}>{event.title}</p>
                  <p className={styles.epgEventTime}>
                    {formatTime(begin)} – {formatTime(end)}
                  </p>
                </div>
              );
            })
          ) : (
            <div
              className={`${styles.epgEventFallback} ${isSelected ? styles.epgEventHighlight : styles.epgEventNow
                }`}
            >
              <p className={styles.epgEventTitle}>{signal.name_live}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
