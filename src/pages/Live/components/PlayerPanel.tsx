import type { RefObject } from "react";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import type { LiveSignal, EPGEvent } from "@/interfaces/catalog.interface";
import iconoVolverRaw from "@/assets/img/icons/iconos-volver.svg?raw";
import styles from "../LiveView.module.css";

interface PlayerPanelProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  isFullscreen: boolean;
  setIsFullscreen: (v: boolean) => void;
  backBtnRef: RefObject<HTMLButtonElement | null>;
  backFocused: boolean;
  selectedSignal: LiveSignal | null;
  currentEvent: EPGEvent | null;
  adUiRef: RefObject<HTMLDivElement | null>;
}

export function PlayerPanel({
  videoRef,
  isFullscreen,
  setIsFullscreen,
  backBtnRef,
  backFocused,
  selectedSignal,
  currentEvent,
  adUiRef,
}: PlayerPanelProps) {
  return (
    <div className={isFullscreen ? styles.playerFullscreen : styles.playerPreview}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls={false}
        tabIndex={-1}
      />
      <div 
        ref={adUiRef} 
        className={styles.adUiOverlay}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* Overlay fullscreen */}
      <div
        className={styles.fullscreenOverlay}
        style={{ display: isFullscreen ? "flex" : "none" }}
      >
        <div className={styles.fullscreenTopBar}>
          <button
            ref={backBtnRef}
            className={`${styles.fullscreenBackBtn} ${backFocused ? styles.fullscreenBackBtnFocused : ""}`}
            onClick={() => {
              setIsFullscreen(false);
              setTimeout(() => setFocus("LIVE-EPG"), 100);
            }}
          >
            <span
              style={{ display: "inline-flex", width: 20, height: 20 }}
              dangerouslySetInnerHTML={{
                __html: iconoVolverRaw
                  .replace(/width="[^"]*"/, 'width="20"')
                  .replace(/height="[^"]*"/, 'height="20"'),
              }}
            />
          </button>
          <span className={styles.fullscreenTitle}>
            {selectedSignal?.name_live}
          </span>
        </div>
        <div className={styles.fullscreenBottomBar}>
          <div className={styles.fullscreenLiveBadge}>
            <span className={styles.liveDot} />
            EN VIVO
            {currentEvent && (
              <span style={{ marginLeft: "12px", opacity: 0.7 }}>
                {currentEvent.title}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
