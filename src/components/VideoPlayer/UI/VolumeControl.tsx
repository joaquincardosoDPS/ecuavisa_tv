import React, { useState } from "react";
import iconoVolumenRaw from "@/assets/img/icons/iconos-volumen.svg?raw";
import styles from "./VolumeControl.module.css";

interface VolumeControlProps {
  volume?: number;
  muted?: boolean;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: () => void;
}

const resizeSvg = (raw: string, size: number) =>
  raw.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`);

const VolumeControlComponent = ({
  volume = 1,
  muted = false,
  onVolumeChange,
  onMuteToggle,
}: VolumeControlProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} className={styles.volumeContainer}
    >
      {/* Botón de mute */}
      <button
        onClick={onMuteToggle}
        className={styles.muteButton}
        style={{
          color: isHovered ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
          opacity: muted ? 0.5 : 1,
        }}
        title={muted ? "Activar sonido" : "Silenciar"}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: resizeSvg(iconoVolumenRaw, 28),
          }} className={styles.volumeIconSpan}
        />
      </button>

      {/* Slider vertical flotante */}
      <div
        className={styles.sliderFloat}
        style={{
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? "auto" : "none",
        }}
      >
        <div className={styles.volumeSliderWrapper}
        >
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) =>
            onVolumeChange && onVolumeChange(parseFloat(e.target.value))
          }
          title="Volumen" className={styles.volumeSliderInput}
        />
        </div>
      </div>
    </div>
  );
};

export const VolumeControl = React.memo(VolumeControlComponent);
