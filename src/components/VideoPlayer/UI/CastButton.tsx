import React, { useState } from "react";
import iconoCast from "@/assets/img/icons/iconos-cast.svg";
import styles from "./CastButton.module.css";

interface CastButtonProps {
  onClick?: () => void;
}

const CastButtonComponent = ({ onClick }: CastButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Transmitir" className={styles.buttonStyle1}
    >
      <img
        src={iconoCast}
        alt="Transmitir"
        width={22}
        height={22}
        style={{
          filter: hovered ? "brightness(1.38)" : "none",
          transition: "filter 0.15s ease",
        }}
      />
    </button>
  );
};

export const CastButton = React.memo(CastButtonComponent);
