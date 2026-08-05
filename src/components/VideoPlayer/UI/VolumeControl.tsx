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
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isHovered ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
          opacity: muted ? 0.5 : 1,
          transition: "color 0.15s ease, opacity 0.15s ease",
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
        style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          paddingBottom: "12px",
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? "auto" : "none",
          transition: "opacity 0.2s ease",
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
