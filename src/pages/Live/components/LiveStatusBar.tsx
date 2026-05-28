import { useMemo } from "react";
import type { EPGChannel } from "@/interfaces/catalog.interface";
import styles from "../LiveView.module.css";

interface LiveStatusBarProps {
  epg: EPGChannel[];
  selectedKeyLive: string | null;
}

export function LiveStatusBar({ epg, selectedKeyLive }: LiveStatusBarProps) {
  const labels = useMemo(() => {
    if (!selectedKeyLive) return { first: null as string | null, second: null as string | null, highlight: false };

    const channel = epg.find((ch) => ch.key_live === selectedKeyLive);
    if (!channel) return { first: null, second: null, highlight: false };

    const now = new Date();
    const futureEvents = channel.events
      .filter((ev) => new Date(ev.endTime) > now)
      .sort(
        (a, b) =>
          new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime(),
      );

    if (futureEvents.length === 0) return { first: null, second: null, highlight: false };

    const first = futureEvents[0];
    const isLive =
      new Date(first.beginTime) <= now && new Date(first.endTime) > now;

    if (isLive) {
      return {
        first: "Ahora",
        second: futureEvents.length > 1 ? "A Continuación" : null,
        highlight: false,
      };
    }

    return { first: "A CONTINUACIÓN", second: null, highlight: true };
  }, [epg, selectedKeyLive]);

  return (
    <div className={styles.statusBar}>
      <div className={styles.statusLogoSpacer} />
      <span className={styles.statusLabel}>{labels.first ?? "Ahora"}</span>
      <span className={styles.statusLabel}>{labels.second ?? "A Continuación"}</span>
    </div>
  );
}
