import { useEffect } from "react";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import type { EPGEvent, LiveSignal } from "@/interfaces/catalog.interface";
import ExpandButton from "@/components/ui/ExpandButton";
import { LivePlayer } from "@/components/LivePlayer/LivePlayer";
import styles from "./LivePlayerSection.module.css";

interface LivePlayerSectionProps {
  signal: LiveSignal | null;
  currentEvent: EPGEvent | null;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function LivePlayerSection({ signal, currentEvent, isExpanded, onToggleExpand }: LivePlayerSectionProps) {
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => setFocus("LIVE-BTN-BACK"), 200);
    }
  }, [isExpanded]);

  if (!signal) {
    return (
      <div className={styles.noSignalContainer}>
        <span className={styles.noSignalText}>Sin senal disponible</span>
      </div>
    );
  }

  return (
    <div style={isExpanded
      ? { position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 9999, backgroundColor: "#000" }
      : { height: "100%", width: "auto", aspectRatio: "16/9", borderRadius: "0.75rem", overflow: "hidden", position: "relative" }
    }>
      <LivePlayer
        streamSrc={signal.m3u8 ?? ""}
        assetKey={signal.DPSDAIAssetKey || signal.assetKey || null}
        vastUrl={signal.vast || null}
        signalName={signal.name_live}
        currentEvent={currentEvent}
        isFullscreen={isExpanded}
        onBack={onToggleExpand}
      />
      <ExpandButton isExpanded={isExpanded} onClick={onToggleExpand} />
    </div>
  );
}

export default LivePlayerSection;
