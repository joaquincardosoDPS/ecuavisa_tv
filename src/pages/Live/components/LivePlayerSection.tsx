import { useRef, useCallback, useEffect } from "react";
import type { LiveSignal } from "@/interfaces/catalog.interface";
import ExpandButton from "@/components/ui/ExpandButton";
import { getStoredVolume } from "@/utils/volumeStorage";
import styles from "./LivePlayerSection.module.css";

interface LivePlayerSectionProps {
  signal: LiveSignal | null;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function LivePlayerSection({ signal, isExpanded, onToggleExpand }: LivePlayerSectionProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rudoKey = signal?.key_live || signal?.key || null;

  const handleIframeLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    const post = (payload: Record<string, unknown>) =>
      iframe.contentWindow!.postMessage({ message: payload }, "*");
    post({ event: "play" });
    post({ event: "volumeon", value: getStoredVolume() });
  }, []);

  useEffect(() => {
    if (iframeRef.current) handleIframeLoad();
  }, [rudoKey, handleIframeLoad]);

  if (!signal || !rudoKey) {
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
      <iframe
        key={rudoKey}
        ref={iframeRef}
        id="vrudo"
        src={`https://rudo.video/live/${rudoKey}?platform=ecuavisaweb`}
        width="100%"
        height="100%"
        title={signal.name_live || "Canal en vivo"}
        allow="autoplay; fullscreen"
        onLoad={handleIframeLoad} className={styles.playerIframe}
      />
      <ExpandButton isExpanded={isExpanded} onClick={onToggleExpand} />
    </div>
  );
}

export default LivePlayerSection;
