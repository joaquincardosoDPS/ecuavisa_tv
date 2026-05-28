import { useEffect } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import type { LiveSignal, EPGChannel } from "@/interfaces/catalog.interface";
import { LiveGridRow } from "./LiveGridRow";
import styles from "../LiveView.module.css";

interface LiveGridProps {
  playlistPremium: LiveSignal[];
  epg: EPGChannel[];
  now: Date;
  isFullscreen: boolean;
  isLoading: boolean;
  onSelectSignal: (keyLive: string) => void;
  onRowFocus: (keyLive: string) => void;
}

export function LiveGrid({
  playlistPremium,
  epg,
  now,
  isFullscreen,
  isLoading,
  onSelectSignal,
  onRowFocus,
}: LiveGridProps) {
  const { ref, focusKey } = useFocusable({
    focusKey: "LIVE-GRID",
    focusable: !isFullscreen,
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Auto-focus on first load only
  useEffect(() => {
    if (!isLoading && playlistPremium.length > 0 && !isFullscreen) {
      setTimeout(() => setFocus("LIVE-GRID"), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, playlistPremium.length]);

  if (isLoading) return null;

  const hidden = isFullscreen;

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className={styles.gridContainer}
        id="live-grid-container"
        style={hidden ? { display: 'none' } : undefined}
      >
        {playlistPremium
          .filter((s) => s.active)
          .map((signal, idx) => (
            <LiveGridRow
              key={signal.key_live}
              signal={signal}
              epg={epg}
              now={now}
              rowIndex={idx}
              onSelectSignal={onSelectSignal}
              onCardFocus={onRowFocus}
            />
          ))}
      </div>
    </FocusContext.Provider>
  );
}
