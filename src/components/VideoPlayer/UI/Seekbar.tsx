import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { SkipButton } from "./SkipButton";
import { PlayPauseButton } from "./PlayPauseButton";
import { ChapterButton } from "./ChapterButton";
import { EpisodesButton } from "./EpisodesButton";
import { VolumeControl } from "./VolumeControl";
import { FullscreenButton } from "./FullscreenButton";
import { LiveControls } from "./LiveControls";
import styles from "./Seekbar.module.css";

interface SeekbarProps {
  seekTime?: number;
  previewSeekTime?: number | null;
  loadedTime?: number;
  duration?: number;
  isLive?: boolean;
  playing?: boolean;
  volume?: number;
  muted?: boolean;
  onSeek?: (time: number) => void;
  onSeekStart?: () => void;
  onPlayPause?: () => void;
  onSkip?: (seconds: number) => void;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: () => void;
  onFullscreen?: () => void;
  onRestartChapter?: () => void;
  onNextChapter?: () => void;
  onSeeAllChapters?: () => void;
  hasNextChapter?: boolean;
  adCuepoints?: { timeSeconds: number }[];
  playedCuepoints?: number[];
}

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const SEEK_STEP = 10;

const SeekbarComponent = ({
  seekTime = 0,
  previewSeekTime = null,
  loadedTime = 0,
  duration = 0,
  isLive = false,
  playing = false,
  volume = 1,
  muted = false,
  onSeek,
  onPlayPause,
  onSkip,
  onVolumeChange,
  onMuteToggle,
  onFullscreen,
  onRestartChapter,
  onNextChapter,
  onSeeAllChapters,
  hasNextChapter = false,
  adCuepoints,
  playedCuepoints,
}: SeekbarProps) => {
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const consecutiveSeeksRef = useRef(0);
  const lastTargetPositionRef = useRef<number | null>(null);
  const dragPositionRef = useRef(0);

  const seekIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const seekDirectionRef = useRef<number>(0);

  const applySeek = useCallback(
    (newPos: number) => {
      consecutiveSeeksRef.current = 0;
      lastTargetPositionRef.current = newPos;
      if (onSeek) onSeek(newPos);
      setIsSeeking(false);

      setTimeout(() => {
        lastTargetPositionRef.current = null;
      }, 2000);
    },
    [onSeek],
  );

  const calcPositionFromClientX = useCallback(
    (clientX: number): number => {
      if (!trackRef.current || duration <= 0) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      return ratio * duration;
    },
    [duration],
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isLive || duration <= 0) return;
      if (isDragging) return;

      const newPos = calcPositionFromClientX(e.clientX);
      setPosition(newPos);
      applySeek(newPos);
    },
    [isLive, duration, isDragging, calcPositionFromClientX, applySeek],
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      const newPos = calcPositionFromClientX(clientX);
      dragPositionRef.current = newPos;
      setPosition(newPos);
    },
    [calcPositionFromClientX],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setIsSeeking(false);
    applySeek(dragPositionRef.current);
  }, [applySeek]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => handleDragMove(e.clientX),
    [handleDragMove],
  );
  const onMouseUp = useCallback(() => handleDragEnd(), [handleDragEnd]);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) handleDragMove(e.touches[0].clientX);
    },
    [handleDragMove],
  );
  const onTouchEnd = useCallback(() => handleDragEnd(), [handleDragEnd]);

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isLive || duration <= 0) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setIsSeeking(true);
      dragPositionRef.current = position;
    },
    [isLive, duration, position],
  );

  const handleThumbTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isLive || duration <= 0) return;
      e.stopPropagation();
      setIsDragging(true);
      setIsSeeking(true);
      dragPositionRef.current = position;
    },
    [isLive, duration, position],
  );

  useEffect(() => {
    if (previewSeekTime !== null && previewSeekTime !== undefined) {
      setPosition(previewSeekTime);
      return;
    }

    if (isSeeking || isDragging) return;

    if (lastTargetPositionRef.current !== null) {
      const diff = Math.abs(seekTime - lastTargetPositionRef.current);
      if (diff < 5) {
        lastTargetPositionRef.current = null;
        setPosition(seekTime);
      }
    } else {
      setPosition(seekTime);
    }
  }, [seekTime, previewSeekTime, isSeeking, isDragging]);

  const startDpadSeeking = useCallback((direction: number) => {
    seekDirectionRef.current = direction;
    setPosition((prev) => {
      const newPos = Math.max(0, Math.min(duration, prev + direction * SEEK_STEP));
      return newPos;
    });
    setIsSeeking(true);

    if (seekIntervalRef.current) return;
    seekIntervalRef.current = setInterval(() => {
      setPosition((prev) => {
        const newPos = Math.max(0, Math.min(duration, prev + seekDirectionRef.current * SEEK_STEP));
        return newPos;
      });
    }, 150);
  }, [duration]);

  const stopDpadSeeking = useCallback(() => {
    const wasSeeking = seekIntervalRef.current !== null;
    if (seekIntervalRef.current) {
      clearInterval(seekIntervalRef.current);
      seekIntervalRef.current = null;
    }
    if (wasSeeking) {
      setPosition((prev) => {
        applySeek(prev);
        return prev;
      });
    }
  }, [applySeek]);

  useEffect(() => {
    return () => {
      if (seekIntervalRef.current) {
        clearInterval(seekIntervalRef.current);
      }
    };
  }, []);

  const { ref: thumbFocusRef, focused: thumbFocused } = useFocusable({
    focusKey: "PLAYER-SEEKBAR-THUMB",
    onArrowPress: (direction) => {
      if (direction === "left" || direction === "right") {
        const dir = direction === "left" ? -1 : 1;
        startDpadSeeking(dir);
        return false;
      }
      if (direction === "up") {
        stopDpadSeeking();
        setFocus("PLAYER-BTN-PLAYPAUSE");
        return false;
      }
      if (direction === "down") {
        return false;
      }
      return true;
    },
    onEnterPress: () => {
      onPlayPause?.();
    },
  });

  useEffect(() => {
    if (!thumbFocused && seekIntervalRef.current) {
      stopDpadSeeking();
    }
  }, [thumbFocused, stopDpadSeeking]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if ((e.keyCode === 37 || e.keyCode === 39) && seekIntervalRef.current) {
        stopDpadSeeking();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [stopDpadSeeking]);

  const percentage = isLive
    ? 0
    : duration > 0
      ? (position / duration) * 100
      : 0;
  const loadedPercentage = isLive
    ? 0
    : duration > 0
      ? (loadedTime / duration) * 100
      : 0;
  const barColor = isLive ? "#888888" : "#FFFFFF";

  return (
    <div
      className={`seekbar-wrapper ${styles.seekbarWrapper}`}
    >
      {isLive && (
        <LiveControls
          playing={playing}
          volume={volume}
          muted={muted}
          onPlayPause={onPlayPause}
          onVolumeChange={onVolumeChange}
          onMuteToggle={onMuteToggle}
          onFullscreen={onFullscreen}
        />
      )}

      {!isLive && (
        <>
          <div className={styles.controlRow}
          >
            <div className={styles.timeDisplay}>
              <div className={styles.durationText}>{formatTime(duration)}</div>
              <span>{" / "}</span>
              <div className={styles.positionText}>{formatTime(position)}</div>
            </div>

            <div className={styles.centerControls}>
              <ChapterButton action="restart" onClick={onRestartChapter} />
              <SkipButton seconds={-10} onClick={() => onSkip && onSkip(-10)} />
              <PlayPauseButton playing={playing} onClick={onPlayPause} />
              <SkipButton seconds={10} onClick={() => onSkip && onSkip(10)} hasNextChapter={hasNextChapter} />
              <ChapterButton action="next" onClick={onNextChapter} disabled={!hasNextChapter} />
              <EpisodesButton onClick={onSeeAllChapters} hasNextChapter={hasNextChapter} />
            </div>

            <div className={styles.rightControls}>
              <VolumeControl
                muted={muted}
                onMuteToggle={onMuteToggle}
              />
              <FullscreenButton onClick={onFullscreen} />
            </div>
          </div>

          <div
            ref={trackRef}
            className={`seekbar-track ${styles.seekbarTrack}`}
            onClick={handleTrackClick}
          >
            <div
              className={`seekbar-loaded ${styles.seekbarLoaded}`}
              style={{
                width: `${loadedPercentage}%`,
              }}
            />
            <div
              className={`seekbar-fill ${styles.seekbarFill}`}
              style={{
                width: `${percentage}%`,
                backgroundColor: barColor,
                transition: isSeeking || isDragging ? "none" : "width 0.2s linear",
              }}
            />
            <div
              ref={thumbFocusRef}
              className={`seekbar-thumb ${styles.seekbarThumb}`}
              onMouseDown={handleThumbMouseDown}
              onTouchStart={handleThumbTouchStart}
              style={{
                left: `${percentage}%`,
                width: thumbFocused ? "20px" : "15px",
                height: thumbFocused ? "20px" : "15px",
                backgroundColor: thumbFocused ? "var(--foc-primary, #FF1376)" : "var(--clr-primary-title)",
                border: thumbFocused ? "3px solid var(--foc-primary, #FF1376)" : "3px solid #FFFFFF",
                cursor: isDragging ? "grabbing" : "grab",
                transition: isDragging ? "none" : "all 0.15s ease",
                boxShadow: thumbFocused ? "0 0 16px rgba(255,19,118,0.6)" : "none",
              }}
            />
            {adCuepoints?.map((cp) => {
              const pos = duration > 0 ? (cp.timeSeconds / duration) * 100 : 0;
              const isPlayed = playedCuepoints?.includes(cp.timeSeconds) ?? false;
              return (
                <div
                  key={cp.timeSeconds}
                  className={styles.cuepoint}
                  style={{
                    left: `${pos}%`,
                    backgroundColor: isPlayed ? '#666' : '#FFD700',
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export const Seekbar = React.memo(SeekbarComponent);
