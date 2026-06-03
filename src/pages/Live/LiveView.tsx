import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useLiveData } from "@/hooks/useLiveData";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { LivePlayer } from "@/components/LivePlayer/LivePlayer";
import { LiveStatusBar } from "./components/LiveStatusBar";
import { LiveGrid } from "./components/LiveGrid";
import { getCurrentEvent } from "./utils";

import styles from "./LiveView.module.css";

function LiveView() {
  const location = useLocation();
  const { playlistPremium, epg, isLoading } = useLiveData();

  // Leer señal preseleccionada desde Home (si existe)
  const initialKeyLive = (location.state as any)?.selectedKeyLive || null;

  const [selectedKeyLive, setSelectedKeyLive] = useState<string | null>(initialKeyLive);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Norigin: contenedor principal
  const { ref: containerRef, focusKey } = useFocusable({
    focusKey: "LIVE-VIEW",
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Seleccionar primera señal al cargar (solo si no viene preseleccionada)
  useEffect(() => {
    if (playlistPremium.length > 0 && !selectedKeyLive) {
      const firstActive = playlistPremium.find((s) => s.active);
      if (firstActive) setSelectedKeyLive(firstActive.key_live);
    }
  }, [playlistPremium, selectedKeyLive]);

  // Señal seleccionada
  const selectedSignal = useMemo(
    () =>
      playlistPremium.find((s) => s.key_live === selectedKeyLive) ??
      playlistPremium.find((s) => s.active) ??
      null,
    [playlistPremium, selectedKeyLive],
  );

  // Evento EPG actual
  const currentEvent = useMemo(
    () => getCurrentEvent(selectedSignal, epg),
    [selectedSignal, epg],
  );

  const now = useMemo(() => new Date(), [epg]);

  // Seleccionar señal → fullscreen directo
  const handleSelectSignal = useCallback((keyLive: string) => {
    setSelectedKeyLive(keyLive);
    setIsFullscreen(true);
    setTimeout(() => setFocus("LIVE-BTN-BACK"), 200);
  }, []);

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
                  {currentEvent.description && (
                    <p className={styles.channelDescription}>
                      {currentEvent.description}
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
