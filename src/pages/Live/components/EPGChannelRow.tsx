import { useRef, useEffect } from "react";
import type { LiveSignal, EPGEvent } from "@/interfaces/catalog.interface";
import styles from "./EPGGrid.module.css";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";

const HORIZONTAL_SCROLL_AMOUNT = 600; // Constante para cantidad de scroll horizontal
const SCROLL_DURATION = 300; // Duración de la animación en ms

// Helper para easing
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

interface EPGChannelRowProps {
  signal: LiveSignal;
  events: { event: EPGEvent; startPct: number; widthPct: number }[];
  isSelected: boolean;
  onSelectSignal: (keyLive: string) => void;
  rowIdx: number;
  scrollRatio: number;
  innerWidthPct: string;
  logoColWidth: string;
  now: Date;
  onScroll: (rowIdx: number) => void;
  setScrollRef: (el: HTMLDivElement | null) => void;
  formatTime: (date: Date) => string;
  isFirstRow: boolean;
}

export function EPGChannelRow({
  signal,
  events,
  isSelected,
  onSelectSignal,
  rowIdx,
  scrollRatio,
  innerWidthPct,
  logoColWidth,
  now,
  onScroll,
  setScrollRef,
  formatTime,
  isFirstRow
}: EPGChannelRowProps) {
  const localScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTarget = useRef<number>(0);
  const scrollAnimId = useRef<number | null>(null);
  const rowId = `epg-row-${signal.key_live}`;
  const hasEpg = events.length > 0;

  const animateScroll = (target: number) => {
    if (!localScrollRef.current) return;

    if (scrollAnimId.current) cancelAnimationFrame(scrollAnimId.current);

    const startScroll = localScrollRef.current.scrollLeft;
    const distance = target - startScroll;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      if (!localScrollRef.current) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);

      localScrollRef.current.scrollLeft = startScroll + distance * easeOutQuart(progress);

      if (progress < 1) {
        scrollAnimId.current = requestAnimationFrame(step);
      } else {
        scrollAnimId.current = null;
      }
    };

    scrollAnimId.current = requestAnimationFrame(step);
  };

  const { ref, focused } = useFocusable({
    focusKey: rowId,
    onEnterPress: () => {
      onSelectSignal(signal.key_live);
    },
    onArrowPress: (direction) => {
      if (direction === "up" && isFirstRow) {
        setFocus("navbar-live");
        return false;
      }

      if (direction === "left") {
        if (localScrollRef.current) {
          if (!scrollAnimId.current) scrollTarget.current = localScrollRef.current.scrollLeft;
          scrollTarget.current = Math.max(0, scrollTarget.current - HORIZONTAL_SCROLL_AMOUNT);
          animateScroll(scrollTarget.current);
        }
        return false; // Evita que el foco salga de la grilla horizontalmente
      }

      if (direction === "right") {
        if (localScrollRef.current) {
          if (!scrollAnimId.current) scrollTarget.current = localScrollRef.current.scrollLeft;
          scrollTarget.current += HORIZONTAL_SCROLL_AMOUNT;
          animateScroll(scrollTarget.current);
        }
        return false; // Evita que el foco salga de la grilla horizontalmente
      }

      return true; // Permite navegación arriba/abajo por defecto
    }
  });

  useEffect(() => {
    if (focused) {
      const el = document.getElementById(rowId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
    }
  }, [focused, rowId]);

  return (
    <div
      id={rowId}
      ref={ref}
      onClick={() => onSelectSignal(signal.key_live)}
      className={`${styles.epgChannelRow} ${focused ? styles.focusedRow : ""}`}
    >
      <div
        className={`${styles.epgChannelLogo} ${isSelected ? styles.epgChannelLogoSelected : styles.epgChannelLogoNormal}`}
        style={{
          width: `calc(${logoColWidth} - 12px)`,
          border: focused ? "2px solid var(--foc-primary)" : (isSelected ? "2px solid var(--clr-primary-title)" : "")
        }}
      >
        <div className={styles.epgChannelInfo}>
          <h2 className={styles.epgChannelLabel}>Canal</h2>
          <h1 className={styles.epgChannelTitle}>{signal.name_live}</h1>
        </div>
      </div>

      {hasEpg ? (
        <div
          ref={(el) => {
            localScrollRef.current = el;
            setScrollRef(el);
          }}
          onScroll={() => onScroll(rowIdx)}
          className={styles.epgEventsScroll}
        >
          <div className={styles.epgEventsWrapper} style={{ width: innerWidthPct }}>
            {events.map(({ event, startPct, widthPct }) => {
              const begin = new Date(event.beginTime);
              const end = new Date(event.endTime);
              const isNow = begin <= now && end > now;
              const useHighlight = isSelected && isNow;
              const visiblePct = widthPct * scrollRatio;
              const isSmall = visiblePct < 2.5;

              const cardBgClass = useHighlight
                ? styles.epgEventHighlight
                : (isSelected && !isNow ? styles.epgEventSelectedNotNow : (!useHighlight && !isSelected ? styles.epgEventNormal : ""));

              return (
                <div key={event.id} className={styles.epgEventPos} style={{ left: `${startPct}%`, width: `${widthPct}%` }}>
                  <div
                    className={`${styles.epgEventCard} ${isSmall ? styles.epgEventCardSmall : styles.epgEventCardLarge} ${cardBgClass}`}
                    title={`${event.title} — ${formatTime(begin)} – ${formatTime(end)}`}
                  >
                    <p className={styles.epgEventTitle}>{!isSmall ? event.title : ""}</p>
                    {!isSmall && <p className={styles.epgEventTime}>{formatTime(begin)} – {formatTime(end)}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.epgNoEvents}>
          <div className={`${styles.epgNoEventsCard} ${isSelected ? styles.epgEventHighlight : styles.epgTimeMarkNormal}`}>
            <p className={styles.epgNoEventsText}>{signal.name_live}</p>
          </div>
        </div>
      )}
    </div>
  );
}
