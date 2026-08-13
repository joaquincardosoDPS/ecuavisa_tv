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
      ? { position: "fixed", top: 0, right: 0, bottom: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999, backgroundColor: "#000" }
      : { height: "100%", width: "auto", borderRadius: "0.75rem", overflow: "hidden", position: "relative" }
    }>
      {!isExpanded && (
        <svg viewBox="0 0 16 9" aria-hidden="true" style={{ display: "block", height: "100%", width: "auto" }} />
      )}
      <div style={isExpanded ? { width: "100%", height: "100%" } : { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <LivePlayer
          streamSrc={signal.m3u8 ?? ""}
          assetKey={signal.DPSDAIAssetKey || signal.assetKey || null}
          vastUrl={signal.vast || null}
          signalName={signal.name_live}
          currentEvent={currentEvent}
          isFullscreen={isExpanded}
          onBack={onToggleExpand}
        />
      </div>
      <ExpandButton isExpanded={isExpanded} onClick={onToggleExpand} />
    </div>
  );
}

export default LivePlayerSection;
