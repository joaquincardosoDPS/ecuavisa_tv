import { useRef, type RefObject } from "react";
import type { LiveSignal, EPGEvent } from "@/interfaces/catalog.interface";
import { VastPlayer } from "@/components/VideoPlayer/ads/VastPlayer";
import styles from "../LiveView.module.css";

interface LiveTopViewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  adUiRef: RefObject<HTMLDivElement | null>;
  selectedSignal: LiveSignal | null;
  currentEvent: EPGEvent | null;
  isVideoLoading: boolean;
  isFullscreen?: boolean;
  /** VAST preroll */
  showVastPreroll?: boolean;
  vastAdUrl?: string | null;
  onVastFinished?: () => void;
}

export function LiveTopView({
  videoRef,
  adUiRef,
  selectedSignal,
  currentEvent,
  isVideoLoading,
  isFullscreen = false,
  showVastPreroll,
  vastAdUrl,
  onVastFinished,
}: LiveTopViewProps) {
  const playerContainerRef = useRef<HTMLDivElement>(null);

  console.log(selectedSignal, 'selectedSignal')
  console.log(currentEvent, 'currentEvent')
  return (
    <>
      {/* Video Preview */}
      <div
        ref={playerContainerRef}
        className={`${styles.videoPreview} ${isFullscreen ? styles.videoPreviewFullscreen : ""}`}
        style={isFullscreen ? undefined : { position: 'relative' }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          controls={false}
          tabIndex={-1}
        />
        {!isFullscreen && <div className={styles.videoGradient} />}
        <div
          ref={adUiRef}
          className={styles.adUiOverlay}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        />

        {isVideoLoading && (
          <div className={styles.videoLoading}>
            <div className={styles.spinner} />
          </div>
        )}

        {/* VAST Preroll — se renderiza dentro del panel del player */}
        {showVastPreroll && vastAdUrl && (
          <VastPlayer
            url={vastAdUrl}
            portalTarget={playerContainerRef.current}
            onAdsFinished={onVastFinished}
          />
        )}
      </div>

      {/* Channel Info (solo en modo preview) */}
      {!isFullscreen && (
        <div className={styles.channelInfo}>
          <h3 className={styles.channelName}>
            {selectedSignal?.name_live || ""}
          </h3>
          <h4 className={styles.channelProgram}>
            {selectedSignal?.active_item_data?.title || "En Vivo"}
          </h4>

        </div>
      )}
    </>
  );
}
