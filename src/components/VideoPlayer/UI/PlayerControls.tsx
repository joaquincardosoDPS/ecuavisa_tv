import { EpisodeSidebar } from "./EpisodeSidebar";
import { Seekbar } from "./Seekbar";
import type { ProgramChapter } from "../types";

import iconosConfig from "@/assets/img/icons/iconos-config.svg";
import { useEffect, useState } from "react";
import React from "react";
import styles from "./PlayerControls.module.css";

// ---- Botón de Opciones ----
interface PlayerOptionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export const PlayerOptionButton = ({
  icon,
  onClick,
}: PlayerOptionButtonProps) => {
  return (
    <button
      onClick={onClick} className={styles.optionButton}
    >
      {icon}
    </button>
  );
};

// ---- Botón de Calidad Dinámico ----
interface QualityOptionProps {
  label: string;
  onSelect: () => void;
}

const QualityOption = ({ label, onSelect }: QualityOptionProps) => {
  return (
    <div
      onClick={onSelect} className={styles.qualityOption}
    >
      {label}
    </div>
  );
};

interface PlayerQualityButtonProps {
  value?: string;
  qualities: { value: string; label: string }[];
  onChange?: (val: string) => void;
}

export const PlayerQualityButton = ({
  value = "auto",
  qualities,
  onChange,
}: PlayerQualityButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (val: string) => {
    if (onChange) onChange(val);
    setOpen(false);
  };

  return (
    <div className={styles.qualityButtonContainer}>
      <button
        onClick={() => setOpen(!open)} className={styles.qualityButton}
      >
        <img src={iconosConfig} alt="Configuración" width={26} height={26} />
        Calidad{" "}
        <span className={styles.qualityLabel}>
          {qualities.find((o) => o.value === value)?.label || "Auto"}
        </span>
      </button>

      {open && (
        <div className={styles.qualityDropdown}
        >
          {qualities.map((opt) => (
            <QualityOption
              key={opt.value}
              label={opt.label}
              onSelect={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ---- Componente Principal PlayerControls ----

interface PlayerControlsProps {
  seekTime?: number;
  previewSeekTime?: number | null;
  loadedTime?: number;
  duration?: number;
  playing?: boolean;
  visible?: boolean;
  isLive?: boolean;
  volume?: number;
  muted?: boolean;
  episodes?: ProgramChapter[];
  currentEpisodeKey?: string;

  onPlayButtonClick?: () => void;
  onSeek?: (time: number) => void;

  onSkip?: (seconds: number) => void;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: () => void;
  onFullscreen?: () => void;

  onEpisodeSelect?: (episode: ProgramChapter) => void;
  onHideControls?: () => void;
  onSidebarVisibilityChange?: (isOpen: boolean) => void;

  onRestartChapter?: () => void;
  onNextChapter?: () => void;
  hasNextChapter?: boolean;
  adCuepoints?: { timeSeconds: number; vastUrls: string[] }[];
  playedCuepoints?: number[];
}

const PlayerControlsComponent = ({
  seekTime = 0,
  previewSeekTime = null,
  loadedTime = 0,
  duration = 0,
  playing,
  visible,
  isLive = false,
  volume = 1,
  muted = false,
  episodes = [],
  currentEpisodeKey,
  onPlayButtonClick,
  onSeek,
  onSkip,
  onVolumeChange,
  onMuteToggle,
  onFullscreen,
  onEpisodeSelect,
  onHideControls,
  onSidebarVisibilityChange,
  onRestartChapter,
  onNextChapter,
  hasNextChapter = false,
  adCuepoints,
  playedCuepoints,
}: PlayerControlsProps) => {
  const [isChaptersSidebarOpen, setIsChaptersSidebarOpen] = useState(false);

  useEffect(() => {
    if (!visible && isChaptersSidebarOpen) {
      setIsChaptersSidebarOpen(false);
    }
  }, [visible, isChaptersSidebarOpen]);

  useEffect(() => {
    if (onSidebarVisibilityChange) {
      onSidebarVisibilityChange(isChaptersSidebarOpen);
    }
  }, [isChaptersSidebarOpen, onSidebarVisibilityChange]);

  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        visibility: visible ? "visible" : "hidden",
        zIndex: 998,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: isLive ? "40px" : "50px",
          left: 0,
          right: 0,
          padding: "0 55px",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "transparent",
            minHeight: isLive ? "auto" : "94px",
            transition: "opacity 0.3s ease",
          }}
        >
          <Seekbar
            seekTime={seekTime}
            previewSeekTime={previewSeekTime}
            loadedTime={loadedTime}
            duration={duration}
            isLive={isLive}
            playing={playing}
            volume={volume}
            muted={muted}
            onSeek={onSeek}
            onPlayPause={onPlayButtonClick}
            onSkip={onSkip}
            onVolumeChange={onVolumeChange}
            onMuteToggle={onMuteToggle}
            onFullscreen={onFullscreen}
            onRestartChapter={onRestartChapter}
            onNextChapter={onNextChapter}
            hasNextChapter={hasNextChapter}
            adCuepoints={adCuepoints}
            playedCuepoints={playedCuepoints}
          />
        </div>

        {/* Botones Flotantes Arriba del Seekbar */}
        <div className={styles.floatingButtonsContainer}
        >
          {/* Episodios y Reinicio Solo si NO es VIVO
          {!isLive && (
            <>
              <PlayerOptionButton
                onClick={() => onSeek && onSeek(0)}
                icon={
                  <img
                    src={iconosReiniciar}
                    alt="Reiniciar episodio"
                    width={26}
                    height={26}
                  />
                }
              />

              {episodes.length > 0 && (
                <PlayerOptionButton
                  onClick={() => setIsChaptersSidebarOpen(true)}
                  icon={
                    <img
                      src={iconosFila}
                      alt="Episodios"
                      width={26}
                      height={26}
                    />
                  }
                />
              )}
            </>
          )} */}

          {/* <PlayerQualityButton
            value={currentQuality}
            qualities={availableQualities}
            onChange={onQualityChange}
          /> */}
        </div>
      </div>

      {episodes.length > 0 && (
        <EpisodeSidebar
          episodes={episodes}
          currentEpisodeKey={currentEpisodeKey}
          visible={isChaptersSidebarOpen}
          onClose={() => setIsChaptersSidebarOpen(false)}
          onCloseAll={() => {
            setIsChaptersSidebarOpen(false);
            if (onHideControls) onHideControls();
          }}
          onEpisodeSelect={(episode) => {
            setIsChaptersSidebarOpen(false);
            if (episode.key !== currentEpisodeKey && onEpisodeSelect) {
              onEpisodeSelect(episode);
            } else if (onHideControls) {
              onHideControls();
            }
          }}
        />
      )}
    </div>
  );
};

export const PlayerControls = React.memo(PlayerControlsComponent);
