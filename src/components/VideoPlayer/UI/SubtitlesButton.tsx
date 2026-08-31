import React, { useState } from "react";
import iconoSubtitle from "@/assets/img/icons/iconos-subtitle.svg";
import styles from "./SubtitlesButton.module.css";

interface SubtitlesButtonProps {
  active?: boolean;
  onClick?: () => void;
}

const SubtitlesButtonComponent = ({
  active = false,
  onClick,
}: SubtitlesButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={active ? "Desactivar subtítulos" : "Activar subtítulos"} className={styles.buttonStyle1}
    >
      <img
        src={iconoSubtitle}
        alt="Subtítulos"
        width={22}
        height={22}
        className={styles.iconImg}
        style={{
          filter: active || hovered ? "brightness(1.38)" : "none",
        }}
      />
    </button>
  );
};

export const SubtitlesButton = React.memo(SubtitlesButtonComponent);
