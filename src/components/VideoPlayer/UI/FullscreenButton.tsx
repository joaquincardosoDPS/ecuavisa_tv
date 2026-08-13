import React, { useState } from "react";
import iconoFullscreenRaw from "@/assets/img/icons/iconos-fullscreen.svg?raw";
import styles from "./FullscreenButton.module.css";

interface FullscreenButtonProps {
  onClick?: () => void;
}

const resizeSvg = (raw: string, size: number) =>
  raw.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`);

const FullscreenButtonComponent = ({ onClick }: FullscreenButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.button}
      style={{
        color: hovered ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
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
