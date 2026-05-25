import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useDaiPlayer } from "@/hooks/useDaiPlayer";
import { useLiveData } from "@/hooks/useLiveData";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { InfoPanel } from "./components/InfoPanel";
import { PlayerPanel } from "./components/PlayerPanel";
import { EPGGrid } from "./components/EPGGrid";
import { getCurrentEvent } from "./utils";
import { keepScreenAwake } from "@/utils/platform";
import styles from "./LiveView.module.css";

// ── Main LiveView ──

function LiveView() {
  const navigate = useNavigate();
  const { playlistPremium, epg, isLoading } = useLiveData();

  const [selectedKeyLive, setSelectedKeyLive] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const adUiRef = useRef<HTMLDivElement>(null);

  // Norigin: contenedor principal
  const { ref: containerRef, focusKey } = useFocusable({
    focusKey: "LIVE-VIEW",
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Norigin: botón back (siempre renderizado, oculto cuando no fullscreen)
  const { ref: backBtnRef, focused: backFocused } = useFocusable({
    focusKey: "LIVE-BTN-BACK",
    focusable: isFullscreen,
    onEnterPress: () => {
      setIsFullscreen(false);
      setTimeout(() => setFocus("LIVE-EPG"), 100);
    },
    onArrowPress: (direction) => {
      if (direction === "up" || direction === "left" || direction === "right")
        return false;
      return true;
    },
  });

  // Prevenir Screensaver
  useEffect(() => {
    keepScreenAwake(true);
    return () => {
      keepScreenAwake(false);
    };
  }, []);

  // Seleccionar primera señal al cargar
  useEffect(() => {
    if (playlistPremium.length > 0 && !selectedKeyLive) {
      setSelectedKeyLive(playlistPremium[0].key_live);
    }
  }, [playlistPremium, selectedKeyLive]);

  // Señal seleccionada
  const selectedSignal = useMemo(
    () =>
      playlistPremium.find((s) => s.key_live === selectedKeyLive) ??
      playlistPremium[0] ??
      null,
    [playlistPremium, selectedKeyLive],
  );

  useDaiPlayer({
    streamSrc: selectedSignal?.m3u8 ?? "",
    assetKey: selectedSignal?.DPSDAIAssetKey || null,
    videoRef,
    adUiRef,
  });

  // Evento EPG actual
  const currentEvent = useMemo(
    () => getCurrentEvent(selectedSignal, epg),
    [selectedSignal, epg],
  );

  // Ventana de tiempo EPG
  const now = useMemo(() => new Date(), [epg]);

  // Imagen del info panel
  const infoImage = useMemo(() => {
    if (!currentEvent) return selectedSignal?.background_image || selectedSignal?.logo || null;
    return (
      currentEvent.pictures?.cover ||
      currentEvent.pictures?.background ||
      currentEvent.pictures?.photo ||
      selectedSignal?.background_image ||
      selectedSignal?.logo ||
      null
    );
  }, [currentEvent, selectedSignal]);

  // Foco inicial al EPG
  useEffect(() => {
    if (!isLoading && playlistPremium.length > 0 && !isFullscreen) {
      setTimeout(() => setFocus("LIVE-EPG"), 300);
    }
  }, [isLoading, playlistPremium.length]);

  // Seleccionar señal → fullscreen
  const handleSelectSignal = useCallback((keyLive: string) => {
    setSelectedKeyLive(keyLive);
    setIsFullscreen(true);
    setTimeout(() => setFocus("LIVE-BTN-BACK"), 200);
  }, []);

  // Keyboard: Back sale de fullscreen o navega atrás
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.keyCode;
      if (code === 27 || code === 8 || code === 10009) {
        e.preventDefault();
        e.stopPropagation();
        if (isFullscreen) {
          setIsFullscreen(false);
          setTimeout(() => setFocus("LIVE-EPG"), 100);
        } else {
          navigate(-1);
        }
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isFullscreen, navigate]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={containerRef} className={styles.liveContainer}>
        {isLoading && <FullScreenSpinner />}

        <div
          className={styles.topSection}
          style={isLoading || isFullscreen ? { height: 0, overflow: "hidden", padding: 0, margin: 0 } : undefined}
        >
          <InfoPanel
            selectedSignal={selectedSignal}
            currentEvent={currentEvent}
            infoImage={infoImage}
            isFullscreen={isFullscreen}
            isLoading={isLoading}
          />

          <PlayerPanel
            videoRef={videoRef}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
            backBtnRef={backBtnRef}
            backFocused={backFocused}
            selectedSignal={selectedSignal}
            currentEvent={currentEvent}
            adUiRef={adUiRef}
          />
        </div>

        {/* ── EPG Grid ── */}
        <EPGGrid
          playlistPremium={playlistPremium}
          epg={epg}
          selectedKeyLive={selectedKeyLive}
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
