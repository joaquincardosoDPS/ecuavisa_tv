import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useHlsStream } from "@/hooks/player/useHlsStream";
import { usePlayerKeyboard } from "@/hooks/player/usePlayerKeyboard";
import { useUIVisibility } from "@/hooks/player/useUIVisibility";
import { useDaiStream } from "./hooks/useDaiStream";
import { VastPlayer } from "@/components/VideoPlayer/ads/VastPlayer";
import { keepScreenAwake } from "@/utils/platform";
import { forceSessionParams } from "@/services/hlsSessionService";
import type { HlsSessionParams } from "@/services/hlsSessionService";
import type { EPGEvent } from "@/interfaces/catalog.interface";
import { getStoredVolume } from "@/utils/volumeStorage";

import styles from "./LivePlayer.module.css";

interface LivePlayerProps {
  streamSrc: string;
  assetKey?: string | null;
  vastUrl?: string | null;
  signalName?: string;
  currentEvent?: EPGEvent | null;
  isFullscreen?: boolean;
  onBack?: () => void;
}

const LIVE_HLS_CONFIG = {
  lowLatencyMode: false,
  liveSyncDurationCount: 3,
  liveMaxLatencyDurationCount: 10,
  liveDurationInfinity: true,
  backBufferLength: 30,
  maxBufferLength: 30,
  maxMaxBufferLength: 60,
};

/**
 * Componente auto-contenido del reproductor Live.
 * Arquitectura similar a VideoPlayer (VOD): usa hooks compartidos
 * (useHlsStream, usePlayerKeyboard, useUIVisibility) + hook específico (useDaiStream).
 */
export function LivePlayer({
  streamSrc,
  assetKey,
  vastUrl,
  signalName,
  currentEvent,
  isFullscreen = false,
  onBack,
}: LivePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const adUiRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [sessionParams, setSessionParams] = useState<HlsSessionParams | null>(null);

  const [isPaused, setIsPaused] = useState(false);

  const { ref: focusContainerRef, focusKey } = useFocusable({
    focusKey: "LIVE-PLAYER-VIEW",
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: isFullscreen,
  });

  const { ref: backBtnRef, focused: backFocused } = useFocusable({
    focusKey: "LIVE-BTN-BACK",
    focusable: isFullscreen,
    onEnterPress: () => {
      if (onBack) onBack();
    },
    onArrowPress: (direction) => {
      if (direction === "up" || direction === "left" || direction === "down") return false;
      if (direction === "right") {
        setFocus("LIVE-BTN-PLAYPAUSE");
        return false;
      }
      return true;
    },
  });

  const { ref: playPauseBtnRef, focused: playPauseFocused } = useFocusable({
    focusKey: "LIVE-BTN-PLAYPAUSE",
    focusable: isFullscreen,
    onEnterPress: () => togglePlayPause(),
    onArrowPress: (direction) => {
      if (direction === "up" || direction === "down" || direction === "right") return false;
      if (direction === "left") {
        setFocus("LIVE-BTN-BACK");
        return false;
      }
      return true;
    },
  });

  useEffect(() => {
    keepScreenAwake(true);
    return () => {
      keepScreenAwake(false);
    };
  }, []);

  const xhrSetup = useMemo(() => {
    if (!sessionParams) return undefined;
    return (xhr: XMLHttpRequest, requestUrl: string) => {
      if (requestUrl.indexOf('.ts') !== -1 && requestUrl.indexOf('dai.google.com') === -1) {
        const enrichedUrl = forceSessionParams(requestUrl, sessionParams);
        xhr.open('GET', enrichedUrl, true);
      }
    };
  }, [sessionParams]);

  const daiStream = useDaiStream({
    streamSrc,
    assetKey,
    vastUrl,
    videoRef,
    adUiRef,
    onSessionParamsReady: setSessionParams,
  });

  const hlsStream = useHlsStream({
    videoRef,
    src: daiStream.resolvedStreamUrl,
    autoplay: true,
    isLive: true,
    hlsConfig: LIVE_HLS_CONFIG,
    xhrSetup,
    onMetadata: daiStream.processMetadata,
  });

  const { isUIVisible, resetUIVisibility } = useUIVisibility({
    autoHideMs: 4000,
  });

  usePlayerKeyboard({
    onBack: onBack || (() => {}),
    isUIVisible,
    showUI: resetUIVisibility,
    isLive: true,
    playingAds: daiStream.isAdPlaying || daiStream.showVastPreroll,
    isPlaying: !isPaused,
    pause: hlsStream.pause,
    enabled: isFullscreen,
    focusKeys: {
      playPause: 'LIVE-BTN-PLAYPAUSE',
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
  }, [streamSrc]);

  const [isVideoLoading, setIsVideoLoading] = useState(true);
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
  }, [streamSrc]);

  useEffect(() => {
    if (isFullscreen && !daiStream.showVastPreroll) {
      setTimeout(() => setFocus("LIVE-BTN-PLAYPAUSE"), 200);
    }
  }, [daiStream.showVastPreroll, isFullscreen]);

  // El video arranca muteado por autoplay; activar sonido al entrar a fullscreen
  useEffect(() => {
    if (isFullscreen && !daiStream.showVastPreroll && !daiStream.isAdPlaying) {
      const video = videoRef.current;
      if (video) video.muted = false;
    }
  }, [isFullscreen, daiStream.showVastPreroll, daiStream.isAdPlaying]);

  // Restaurar volumen guardado al montar
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = getStoredVolume();
    }
  }, []);

  const containerClassName = `${styles.livePlayerContainer}${isFullscreen ? ` ${styles.livePlayerContainerFullscreen}` : ""}`;

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={(el) => {
        focusContainerRef.current = el;
        playerContainerRef.current = el;
      }} className={containerClassName}>
        <video
          ref={videoRef}
          className={styles.videoElement}
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
        />

        {isVideoLoading && !daiStream.showVastPreroll && (
          <div className={styles.videoLoading}>
            <div className={styles.spinner} />
          </div>
        )}

        {daiStream.showVastPreroll && daiStream.vastAdUrl && (
          <VastPlayer
            url={daiStream.vastAdUrl}
            portalTarget={playerContainerRef.current}
            onAdsFinished={daiStream.onVastFinished}
          />
        )}

        {isFullscreen && isUIVisible && (
          <div className={styles.fullscreenOverlay}>
            <div className={styles.fullscreenTopBar}>
              <button
                ref={backBtnRef}
                className={`${styles.fullscreenBackBtn} ${backFocused ? styles.fullscreenBackBtnFocused : ""}`}
                onClick={() => {
                  if (onBack) onBack();
                }}
              >
                <svg width="20" height="20" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3882 0.616323C15.7799 1.01107 16 1.5464 16 2.10458C16 2.66275 15.7799 3.19808 15.3882 3.59283L5.04411 14.0127L15.3882 24.4326C15.7688 24.8296 15.9795 25.3613 15.9747 25.9133C15.9699 26.4652 15.7502 26.9932 15.3627 27.3835C14.9753 27.7737 14.4511 27.9951 13.9032 27.9999C13.3553 28.0047 12.8274 27.7925 12.4333 27.4091L0.611839 15.501C0.220079 15.1062 9.53674e-07 14.5709 9.53674e-07 14.0127C9.53674e-07 13.4545 0.220079 12.9192 0.611839 12.5245L12.4333 0.616323C12.8252 0.221692 13.3566 0 13.9107 0C14.4649 0 14.9963 0.221692 15.3882 0.616323Z" fill="currentColor"/>
                </svg>
              </button>
              {!daiStream.showVastPreroll && (
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
                {signalName}
              </span>
            </div>
            <div className={styles.fullscreenBottomBar}>
              <div className={styles.fullscreenLiveBadge}>
                <span className={styles.liveDot} />
                EN VIVO
                {currentEvent && (
                  <span className={styles.fullscreenEventTitle}>
                    {currentEvent.title}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </FocusContext.Provider>
  );
}
