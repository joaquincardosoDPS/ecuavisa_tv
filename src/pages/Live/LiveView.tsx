import { useEffect, useState, useCallback } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useLiveData } from "@/hooks/live/useLiveData";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { LivePlayer } from "@/components/LivePlayer/LivePlayer";
import { LiveStatusBar } from "./components/LiveStatusBar";
import { LiveGrid } from "./components/LiveGrid";

import styles from "./LiveView.module.css";

function LiveView() {
  /* ── Hook de datos ── */
  const {
    playlistPremium,
    epg,
    isLoading,
    selectedSignal,
    selectedKeyLive,
    currentEvent,
    now,
    selectSignal,
    setSelectedKeyLive,
  } = useLiveData();

  /* ── Estado UI (fullscreen) ── */
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ── Foco ── */
  const { ref: containerRef, focusKey } = useFocusable({
    focusKey: "LIVE-VIEW",
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Seleccionar señal → fullscreen directo
  const handleSelectSignal = useCallback((keyLive: string) => {
    selectSignal(keyLive);
    setIsFullscreen(true);
    setTimeout(() => setFocus("LIVE-BTN-BACK"), 200);
  }, [selectSignal]);

  // Callback de salida de fullscreen
  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setTimeout(() => setFocus("LIVE-GRID"), 100);
  }, []);

  // Keyboard: Back solo sale de fullscreen — en vista normal lo maneja el global (exit modal)
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.keyCode;
      if (code === 27 || code === 8 || code === 10009 || code === 461) {
        e.preventDefault();
        e.stopPropagation();
        handleExitFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isFullscreen, handleExitFullscreen]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={containerRef} className={styles.liveContainer}>
        {isLoading && <FullScreenSpinner />}

        {/* ── Top: video preview + channel info ── */}
        <div
          className={`${styles.topSection} ${isLoading ? styles.topSectionHidden : ""} ${isFullscreen ? styles.topSectionFullscreen : ""}`}
        >
          {/* LivePlayer auto-contenido */}
          <div className={`${styles.videoPreview} ${isFullscreen ? styles.videoPreviewFullscreen : ""}`}>
            {selectedSignal && (
              <LivePlayer
                streamSrc={selectedSignal.m3u8 ?? ""}
                assetKey={selectedSignal.DPSDAIAssetKey || null}
                vastUrl={selectedSignal.vast || null}
                signalName={selectedSignal.name_live}
                currentEvent={currentEvent}
                isFullscreen={isFullscreen}
                onBack={handleExitFullscreen}
              />
            )}
          </div>

          {/* Channel info (solo en preview, no fullscreen) */}
          {!isFullscreen && selectedSignal && (
            <div className={styles.channelInfo}>
              <h2 className={styles.channelName}>{selectedSignal.name_live}</h2>
              {currentEvent && (
                <>
                  <p className={styles.channelProgram}>{currentEvent.title}</p>
                  {currentEvent.synopsis && (
                    <p className={styles.channelDescription}>
                      {currentEvent.synopsis}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Status Bar ── */}
        {!isFullscreen && !isLoading && (
          <LiveStatusBar
            epg={epg}
            selectedKeyLive={selectedKeyLive}
          />
        )}

        {/* ── Grid ── */}
        <LiveGrid
          playlistPremium={playlistPremium}
          epg={epg}
          now={now}
          isFullscreen={isFullscreen}
          isLoading={isLoading}
          onSelectSignal={handleSelectSignal}
          onRowFocus={setSelectedKeyLive}
        />
      </div>
    </FocusContext.Provider>
  );
}

export default LiveView;
