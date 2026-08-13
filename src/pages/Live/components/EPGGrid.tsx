import { useMemo, useRef, useCallback, useState, useEffect } from "react";
import type { EPGChannel, EPGEvent, LiveSignal } from "@/interfaces/catalog.interface";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import styles from "./EPGGrid.module.css";
import { EPGChannelRow } from "./EPGChannelRow";

interface EPGGridProps {
  epg: EPGChannel[];
  signals: LiveSignal[];
  selectedKeyLive?: string;
  onSelectSignal?: (keyLive: string) => void;
  onEnterSignal?: (keyLive: string) => void;
}

const VISIBLE_HOURS = 4;
const REFRESH_INTERVAL_MS = 60_000;
const LOGO_COL_WIDTH = "17vw";

function getEventsInWindow(events: EPGEvent[], windowStart: Date, windowEnd: Date) {
  const windowMs = windowEnd.getTime() - windowStart.getTime();
  return events.map((event) => {
    const snapMs = 1000 * 60 * 5;
    const begin = new Date(Math.round(new Date(event.beginTime).getTime() / snapMs) * snapMs);
    const end = new Date(Math.round(new Date(event.endTime).getTime() / snapMs) * snapMs);
    const clampedStart = begin < windowStart ? windowStart : begin;
    const clampedEnd = end > windowEnd ? windowEnd : end;
    if (clampedStart >= clampedEnd) return null;
    const startPct = ((clampedStart.getTime() - windowStart.getTime()) / windowMs) * 100;
    const widthPct = ((clampedEnd.getTime() - clampedStart.getTime()) / windowMs) * 100;
    return { event, startPct, widthPct };
  }).filter(Boolean) as { event: EPGEvent; startPct: number; widthPct: number; }[];
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function getTimeMarks(windowStart: Date, windowEnd: Date) {
  const windowMs = windowEnd.getTime() - windowStart.getTime();
  if (windowMs <= 0) return [];
  const marks: { label: string; startPct: number; widthPct: number; isCurrent: boolean }[] = [];
  const nowMs = Date.now();
  const firstHour = new Date(windowStart);
  firstHour.setMinutes(0, 0, 0);
  for (let t = new Date(firstHour); t < windowEnd; t = new Date(t.getTime() + 3600000)) {
    const nextT = new Date(t.getTime() + 3600000);
    const rawStart = ((t.getTime() - windowStart.getTime()) / windowMs) * 100;
    const rawEnd = ((nextT.getTime() - windowStart.getTime()) / windowMs) * 100;
    const clampedStart = Math.max(0, rawStart);
    const clampedEnd = Math.min(100, rawEnd);
    const widthPct = clampedEnd - clampedStart;
    if (widthPct > 0) {
      const isCurrent = t.getTime() <= nowMs && nowMs < nextT.getTime();
      marks.push({ label: formatTime(t), startPct: clampedStart, widthPct, isCurrent });
    }
  }
  return marks;
}

// const CURRENT_HOUR_BG = "linear-gradient(0deg, rgba(0, 198, 255, 0.64) 0%, rgba(0, 198, 255, 0.64) 100%), rgba(255, 255, 255, 0.10)";

function EPGGrid({ epg, signals, selectedKeyLive, onSelectSignal, onEnterSignal }: EPGGridProps) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);
  const windowStart = now;
  const windowEnd = useMemo(() => {
    let maxEnd = now.getTime() + VISIBLE_HOURS * 3600000;
    epg.forEach((ch) => { ch.events.forEach((ev) => { const end = new Date(ev.endTime).getTime(); if (end > maxEnd) maxEnd = end; }); });
    return new Date(maxEnd);
  }, [epg, now]);

  const totalHours = (windowEnd.getTime() - windowStart.getTime()) / 3600000;
  const scrollRatio = Math.max(1, totalHours / VISIBLE_HOURS);
  const timeMarks = useMemo(() => getTimeMarks(windowStart, windowEnd), [windowStart, windowEnd]);
  const epgMap = useMemo(() => { const map = new Map<string, EPGChannel>(); epg.forEach((ch) => map.set(ch.key_live, ch)); return map; }, [epg]);

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isSyncing = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const wasDragged = useRef(false);

  const handleScroll = useCallback((sourceIdx: number) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    const source = sourceIdx === -1 ? headerRef.current : scrollRefs.current[sourceIdx];
    if (!source) { isSyncing.current = false; return; }
    const scrollLeft = source.scrollLeft;
    if (sourceIdx !== -1 && headerRef.current) headerRef.current.scrollLeft = scrollLeft;
    scrollRefs.current.forEach((ref, i) => { if (ref && i !== sourceIdx) ref.scrollLeft = scrollLeft; });
    isSyncing.current = false;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    wasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartScroll.current = headerRef.current?.scrollLeft ?? 0;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 3) wasDragged.current = true;
    const newScroll = dragStartScroll.current - dx;
    if (headerRef.current) headerRef.current.scrollLeft = newScroll;
    scrollRefs.current.forEach((ref) => { if (ref) ref.scrollLeft = newScroll; });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    if (signals.length > 0) {
      setTimeout(() => {
        setFocus(`epg-row-${signals[0].key_live}`);
      }, 300);
    }
  }, [signals]);

  const handleRowClick = useCallback((keyLive: string) => {
    if (wasDragged.current) return;
    onSelectSignal?.(keyLive);
    onEnterSignal?.(keyLive);
  }, [onSelectSignal, onEnterSignal]);
  const innerWidthPct = `${scrollRatio * 100}%`;

  return (
    <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className={styles.epgContainer}>
      <div className={styles.epgHeaderWrapper}>
        <div className={styles.epgHeaderBackground} />
        <div className={styles.epgHeaderBar}>
          <div style={{ flexShrink: 0, position: "relative", zIndex: 20, width: LOGO_COL_WIDTH }} />
          <div ref={headerRef} onScroll={() => handleScroll(-1)} className={styles.epgTimelineScroll}>
            <div style={{ position: "relative", height: "2rem", width: innerWidthPct }}>
              {timeMarks.map((mark, idx) => (
                <div key={`${mark.label}-${idx}`} className={styles.epgTimeMarkContainer} style={{ left: `${mark.startPct}%`, width: `${mark.widthPct}%` }}>
                  <div className={`${styles.epgTimeMark} ${mark.isCurrent ? styles.epgTimeMarkCurrent : styles.epgTimeMarkNormal}`} title={mark.label}>
                    <span>{mark.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.epgChannelsScroll}>
        {signals.map((signal, rowIdx) => {
          const channel = epgMap.get(signal.key_live) || epgMap.get(signal.key);
          const events = channel ? getEventsInWindow(channel.events, windowStart, windowEnd) : [];
          // const hasEpg = events.length > 0;
          const isSelected = selectedKeyLive === signal.key_live;

          return (
            <EPGChannelRow
              key={signal.key_live}
              signal={signal}
              events={events}
              isSelected={isSelected}
              onSelectSignal={onSelectSignal}
              onActivateSignal={handleRowClick}
              rowIdx={rowIdx}
              scrollRatio={scrollRatio}
              innerWidthPct={innerWidthPct}
              logoColWidth={LOGO_COL_WIDTH}
              now={now}
              onScroll={handleScroll}
              setScrollRef={(el) => { scrollRefs.current[rowIdx] = el; }}
              formatTime={formatTime}
              isFirstRow={rowIdx === 0}
            />
          );
        })}
      </div>
    </div>
  );
}
export default EPGGrid;
