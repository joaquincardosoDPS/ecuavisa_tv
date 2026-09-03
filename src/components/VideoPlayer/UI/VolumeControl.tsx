import React, { useState } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import iconoVolumenRaw from "@/assets/img/icons/iconos-volumen.svg?raw";
import styles from "./VolumeControl.module.css";

interface VolumeControlProps {
  muted?: boolean;
  onMuteToggle?: () => void;
}

const resizeSvg = (raw: string, size: number) =>
  raw.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`);

const VolumeControlComponent = ({
  muted = false,
  onMuteToggle,
}: VolumeControlProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { ref, focused } = useFocusable({
    focusKey: "PLAYER-BTN-VOLUME",
    onEnterPress: () => onMuteToggle?.(),
    onArrowPress: (direction) => {
      if (direction === "left") {
        setFocus("PLAYER-BTN-EPISODES");
        return false;
      }
      if (direction === "right") {
        setFocus("PLAYER-BTN-FULLSCREEN");
        return false;
      }
      if (direction === "up") {
        setFocus("PLAYER-BTN-BACK");
        return false;
      }
      if (direction === "down") {
        setFocus("PLAYER-SEEKBAR-THUMB");
        return false;
      }
      return true;
    },
  });

  const isActive = isHovered || focused;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} className={styles.volumeContainer}
    >
      {/* Botón de mute */}
      <button
        onClick={onMuteToggle}
        className={styles.muteButton}
        style={{
          color: isActive ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
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
    </div>
  );
};

export const VolumeControl = React.memo(VolumeControlComponent);
