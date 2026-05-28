import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useDaiPlayer } from "@/hooks/useDaiPlayer";
import { useLiveData } from "@/hooks/useLiveData";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { LiveTopView } from "./components/LiveTopView";
import { LiveStatusBar } from "./components/LiveStatusBar";
import { LiveGrid } from "./components/LiveGrid";
import { getCurrentEvent } from "./utils";
import { keepScreenAwake } from "@/utils/platform";

import styles from "./LiveView.module.css";

function LiveView() {
  const location = useLocation();
  const { playlistPremium, epg, isLoading } = useLiveData();

  // Leer señal preseleccionada desde Home (si existe)
  const initialKeyLive = (location.state as any)?.selectedKeyLive || null;

  const [selectedKeyLive, setSelectedKeyLive] = useState<string | null>(initialKeyLive);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

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
      setTimeout(() => setFocus("LIVE-GRID"), 100);
    },
    onArrowPress: (direction) => {
      if (direction === "up" || direction === "left") return false;
      if (direction === "right") {
        setFocus("LIVE-BTN-PLAYPAUSE");
        return false;
      }
      return true;
    },
  });

  // Norigin: botón play/pause
  const { ref: playPauseBtnRef, focused: playPauseFocused } = useFocusable({
    focusKey: "LIVE-BTN-PLAYPAUSE",
    focusable: isFullscreen,
    onEnterPress: () => togglePlayPause(),
    onArrowPress: (direction) => {
      if (direction === "up") return false;
      if (direction === "left") {
        setFocus("LIVE-BTN-BACK");
        return false;
      }
      return true;
    },
  });

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, []);



  // Prevenir Screensaver
  useEffect(() => {
    keepScreenAwake(true);
    return () => {
      keepScreenAwake(false);
    };
  }, []);

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

  // Sync isPaused state with video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPaused(false);
    const onPause = () => setIsPaused(true);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [selectedSignal]);

  // Live usa DAI para ads (server-side) con VAST preroll opcional (client-side)
  const { showVastPreroll, vastAdUrl, onVastFinished } = useDaiPlayer({
    streamSrc: selectedSignal?.m3u8 ?? "",
    assetKey: selectedSignal?.DPSDAIAssetKey || null,
    vastUrl: selectedSignal?.vast || null,
    videoRef,
    adUiRef,
  });

  // Track video loading state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsVideoLoading(true);

    const handlePlaying = () => setIsVideoLoading(false);
    const handleWaiting = () => setIsVideoLoading(true);

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("waiting", handleWaiting);

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("waiting", handleWaiting);
    };
  }, [selectedSignal]);

  // Evento EPG actual
  const currentEvent = useMemo(
    () => getCurrentEvent(selectedSignal, epg),
    [selectedSignal, epg],
  );

  const now = useMemo(() => new Date(), [epg]);

  // Seleccionar señal → fullscreen directo (DAI maneja ads)
  const handleSelectSignal = useCallback((keyLive: string) => {
    setSelectedKeyLive(keyLive);
    setIsFullscreen(true);
    setIsPaused(false);
    setTimeout(() => setFocus("LIVE-BTN-BACK"), 200);
  }, []);

  // Cuando termina el preroll, mover foco al play/pause
  useEffect(() => {
    if (isFullscreen && !showVastPreroll) {
      setTimeout(() => setFocus("LIVE-BTN-PLAYPAUSE"), 200);
    }
  }, [showVastPreroll, isFullscreen]);

  // Keyboard: Back solo sale de fullscreen — en vista normal lo maneja el global (exit modal)
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.keyCode;
      if (code === 27 || code === 8 || code === 10009 || code === 461) {
        e.preventDefault();
        e.stopPropagation();
        setIsFullscreen(false);
        setTimeout(() => setFocus("LIVE-GRID"), 100);
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isFullscreen]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={containerRef} className={styles.liveContainer}>
        {isLoading && <FullScreenSpinner />}

        {/* ── Top: video preview + channel info ── */}
        <div
          className={`${styles.topSection} ${isLoading ? styles.topSectionHidden : ""} ${isFullscreen ? styles.topSectionFullscreen : ""}`}
        >
          <LiveTopView
            videoRef={videoRef}
            adUiRef={adUiRef}
            selectedSignal={selectedSignal}
            currentEvent={currentEvent}
            isVideoLoading={isVideoLoading}
            isFullscreen={isFullscreen}
            showVastPreroll={showVastPreroll}
            vastAdUrl={vastAdUrl}
            onVastFinished={onVastFinished}
          />
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

        {/* ── Fullscreen overlay (controles) ── */}
        {isFullscreen && (
          <div className={styles.playerFullscreen}>
            <div className={styles.fullscreenOverlay}>
              <div className={styles.fullscreenTopBar}>
                <button
                  ref={backBtnRef}
                  className={`${styles.fullscreenBackBtn} ${backFocused ? styles.fullscreenBackBtnFocused : ""}`}
                  onClick={() => {
                    setIsFullscreen(false);
                    setTimeout(() => setFocus("LIVE-GRID"), 100);
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3882 0.616323C15.7799 1.01107 16 1.5464 16 2.10458C16 2.66275 15.7799 3.19808 15.3882 3.59283L5.04411 14.0127L15.3882 24.4326C15.7688 24.8296 15.9795 25.3613 15.9747 25.9133C15.9699 26.4652 15.7502 26.9932 15.3627 27.3835C14.9753 27.7737 14.4511 27.9951 13.9032 27.9999C13.3553 28.0047 12.8274 27.7925 12.4333 27.4091L0.611839 15.501C0.220079 15.1062 9.53674e-07 14.5709 9.53674e-07 14.0127C9.53674e-07 13.4545 0.220079 12.9192 0.611839 12.5245L12.4333 0.616323C12.8252 0.221692 13.3566 0 13.9107 0C14.4649 0 14.9963 0.221692 15.3882 0.616323Z" fill="currentColor"/>
                  </svg>
                </button>
                {!showVastPreroll && (
                <button
                  ref={playPauseBtnRef}
                  className={`${styles.fullscreenPlayPauseBtn} ${playPauseFocused ? styles.fullscreenPlayPauseBtnFocused : ""}`}
                  onClick={togglePlayPause}
                >
                  {isPaused ? (
                    <svg width="24" height="24" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.5069 12.335C16.4982 11.0454 16.4971 8.95392 14.5069 7.66503L3.60552 0.605085C1.61424 -0.684496 0 0.155193 0 2.47779V17.5223C0 19.8461 1.61532 20.6838 3.60552 19.395L14.5069 12.335Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5 0C2.24 0 0 2.24 0 5V35C0 37.76 2.24 40 5 40C7.76 40 10 37.76 10 35V5C10 2.24 7.76 0 5 0ZM30 5V35C30 37.76 27.76 40 25 40C22.24 40 20 37.76 20 35V5C20 2.24 22.24 0 25 0C27.76 0 30 2.24 30 5Z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
                )}
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
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default LiveView;
