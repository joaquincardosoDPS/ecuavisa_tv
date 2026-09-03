import React, { useState } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import iconoFullscreenRaw from "@/assets/img/icons/iconos-fullscreen.svg?raw";
import styles from "./FullscreenButton.module.css";

interface FullscreenButtonProps {
  onClick?: () => void;
}

const resizeSvg = (raw: string, size: number) =>
  raw.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`);

const FullscreenButtonComponent = ({ onClick }: FullscreenButtonProps) => {
  const [hovered, setHovered] = useState(false);

  const { ref, focused } = useFocusable({
    focusKey: "PLAYER-BTN-FULLSCREEN",
    onEnterPress: () => onClick?.(),
    onArrowPress: (direction) => {
      if (direction === "left") {
        setFocus("PLAYER-BTN-VOLUME");
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
      return false;
    },
  });

  const isActive = hovered || focused;

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.button}
      style={{
        color: isActive ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
      }}
      title="Pantalla completa"
    >
      <span
        dangerouslySetInnerHTML={{
          __html: resizeSvg(iconoFullscreenRaw, 28),
        }} className={styles.iconWrapper}
      />
    </button>
  );
};

export const FullscreenButton = React.memo(FullscreenButtonComponent);
