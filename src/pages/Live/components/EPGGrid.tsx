import { useMemo, useRef, useCallback } from "react";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import type { LiveSignal, EPGChannel } from "@/interfaces/catalog.interface";
import { EPGRow } from "./EPGRow";
import styles from "../LiveView.module.css";

// ── Helpers ──

const VISIBLE_HOURS = 4;

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getTimeMarks(
  windowStart: Date,
  windowEnd: Date,
): { label: string; pct: number }[] {
  const marks: { label: string; pct: number }[] = [];
  const windowMs = windowEnd.getTime() - windowStart.getTime();
  const firstHour = new Date(windowStart);
  firstHour.setMinutes(0, 0, 0);
  if (firstHour < windowStart) firstHour.setHours(firstHour.getHours() + 1);
  for (let t = firstHour; t <= windowEnd; t = new Date(t.getTime() + 3600000)) {
    const pct = ((t.getTime() - windowStart.getTime()) / windowMs) * 100;
    if (pct >= 0 && pct <= 100) {
      marks.push({ label: formatTime(t), pct });
    }
  }
  return marks;
}

// ── EPG Grid ──

interface EPGGridProps {
  playlistPremium: LiveSignal[];
  epg: EPGChannel[];
  selectedKeyLive: string | null;
  now: Date;
  isFullscreen: boolean;
  isLoading: boolean;
  onSelectSignal: (keyLive: string) => void;
  onRowFocus: (keyLive: string) => void;
}

export function EPGGrid({
  playlistPremium,
  epg,
  selectedKeyLive,
  now,
  isFullscreen,
  isLoading,
  onSelectSignal,
  onRowFocus,
}: EPGGridProps) {
  const windowStart = now;

  const windowEnd = useMemo(() => {
    let maxEnd = now.getTime() + VISIBLE_HOURS * 3600000;
    epg.forEach((ch) => {
      ch.events.forEach((ev) => {
        const end = new Date(ev.endTime).getTime();
        if (end > maxEnd) maxEnd = end;
      });
    });
    return new Date(maxEnd);
  }, [epg, now]);

  const totalHours = (windowEnd.getTime() - windowStart.getTime()) / 3600000;
  const scrollRatio = Math.max(1, totalHours / VISIBLE_HOURS);
  const innerWidthPct = `${scrollRatio * 100}%`;

  const timeMarks = useMemo(() => getTimeMarks(windowStart, windowEnd), [windowStart, windowEnd]);

  const { ref: epgRef, focusKey: epgFocusKey } = useFocusable({
    focusKey: "LIVE-EPG",
    focusable: !isFullscreen,
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Scrolling logic
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerInnerRef = useRef<HTMLDivElement | null>(null);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollX = useRef(0);

  const applyScroll = useCallback((x: number) => {
    if (headerInnerRef.current) {
      headerInnerRef.current.style.transform = `translateX(-${x}px)`;
    }
    scrollRefs.current.forEach((ref) => {
      if (ref) ref.style.transform = `translateX(-${x}px)`;
    });
  }, []);

  const scrollByAmount = useCallback((amount: number) => {
    if (headerRef.current) {
      const maxScroll = headerRef.current.clientWidth * (scrollRatio - 1);
      let next = scrollX.current + amount;
      next = Math.max(0, Math.min(next, maxScroll));
      
      scrollX.current = next;
      applyScroll(next);
    }
  }, [applyScroll, scrollRatio]);

  const handleArrowRight = useCallback(() => {
    if (headerRef.current) {
      const maxScroll = headerRef.current.clientWidth * (scrollRatio - 1);
      if (scrollX.current < maxScroll) {
        scrollByAmount(300);
      }
    }
    return false; // Prevent focus escaping right
  }, [scrollByAmount, scrollRatio]);

  const lastLeftPressTime = useRef(0);

  const handleArrowLeft = useCallback(() => {
    const now = Date.now();
    const timeSinceLastPress = now - lastLeftPressTime.current;
    lastLeftPressTime.current = now;

    if (scrollX.current > 0) {
      scrollByAmount(-300);
      return false; // Prevent focus escaping left while we can scroll
    }

    // Si llegamos al inicio (0) pero el usuario mantiene presionado el botón 
    // (los eventos se disparan muy rápido, ej: < 300ms), bloqueamos la salida
    // para que no se abra el sidebar por accidente.
    if (timeSinceLastPress < 300) {
      return false;
    }

    return true; // Solo permitir salir al sidebar si es una pulsación nueva e intencional
  }, [scrollByAmount]);

  return (
    <div
      className={styles.epgSection}
      style={{ display: isFullscreen || isLoading ? "none" : "flex" }}
    >
      <div 
        ref={headerRef}
        className={styles.epgTimeHeader}
        style={{ overflowX: "hidden" }}
      >
        <div 
          ref={headerInnerRef}
          style={{ position: "relative", height: "100%", width: innerWidthPct, flexShrink: 0, transition: "transform 0.3s ease-out" }}
        >
          {timeMarks.map((mark) => (
            <div
              key={mark.label}
              className={styles.epgTimeMark}
              style={{ left: `${mark.pct}%` }}
            >
              {mark.label}
            </div>
          ))}
        </div>
      </div>

      <FocusContext.Provider value={epgFocusKey}>
        <div ref={epgRef} className={styles.epgRows}>
          {playlistPremium.map((signal, idx) => (
            <EPGRow
              key={signal.key_live}
              signal={signal}
              isSelected={selectedKeyLive === signal.key_live}
              epg={epg}
              now={now}
              windowStart={windowStart}
              windowEnd={windowEnd}
              focusKey={`live-epg-${signal.key_live}`}
              onSelect={() => onSelectSignal(signal.key_live)}
              onRowFocus={() => onRowFocus(signal.key_live)}
              innerWidthPct={innerWidthPct}
              onArrowRight={handleArrowRight}
              onArrowLeft={handleArrowLeft}
              eventsRef={(el) => { scrollRefs.current[idx] = el; }}
            />
          ))}
        </div>
      </FocusContext.Provider>
    </div>
  );
}
