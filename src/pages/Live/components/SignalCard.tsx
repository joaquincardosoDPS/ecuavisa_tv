import { useMemo } from "react";
import {
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import type { LiveSignal, EPGChannel } from "@/interfaces/catalog.interface";
import styles from "../LiveView.module.css";

interface SignalCardProps {
  signal: LiveSignal;
  isSelected: boolean;
  epg: EPGChannel[];
  onSelect: () => void;
  focusKey: string;
  onCardFocus?: () => void;
}

function SignalCard({
  signal,
  isSelected,
  epg,
  onSelect,
  focusKey,
  onCardFocus,
}: SignalCardProps) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onSelect,
    onFocus: () => onCardFocus?.(),
  });

  // Programa actual en emisión
  const currentProgram = useMemo(() => {
    const channel = epg.find((ch) => ch.key_live === signal.key_live);
    if (!channel) return null;
    const now = new Date();
    return (
      channel.events.find((ev) => {
        const begin = new Date(ev.beginTime);
        const end = new Date(ev.endTime);
        return begin <= now && end > now;
      }) ?? null
    );
  }, [signal, epg]);

  const classList = [
    styles.signalCard,
    focused && styles.signalCardFocused,
    isSelected && !focused && styles.signalCardSelected,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classList}
      data-focuskey={focusKey}
      onClick={onSelect}
    >
      {signal.logo ? (
        <img
          src={signal.logo}
          alt={signal.name_live}
          className={styles.signalCardLogo}
          draggable={false}
          decoding="async"
        />
      ) : (
        <span className={styles.signalCardName}>{signal.name_live}</span>
      )}
      {currentProgram && (
        <span
          className={styles.signalCardName}
          style={{
            fontSize: "0.65rem",
            opacity: 0.7,
            maxWidth: "90%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {currentProgram.title}
        </span>
      )}
    </div>
  );
}

export default SignalCard;
