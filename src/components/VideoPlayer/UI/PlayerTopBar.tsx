import React, { useState } from "react";
import iconoVolverRaw from "@/assets/img/icons/iconos-volver.svg?raw";
import styles from "./PlayerTopBar.module.css";

interface PlayerTopBarProps {
  title: string;
  description?: string;
  isVisible: boolean;
  isLive?: boolean;
  onBackClick?: () => void;
}

const PlayerTopBarComponent = ({
  title,
  description,
  isVisible,
  onBackClick,
}: PlayerTopBarProps) => {
  const [backHovered, setBackHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 44,
        left: 40,
        right: 40,
        zIndex: 2001,
        visibility: isVisible ? "visible" : "hidden",
        pointerEvents: isVisible ? "auto" : "none",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "10px",
        color: "var(--clr-primary-text)",
      }}
    >
      <div className={styles.leftSection}
      >
        {/* Botón Volver */}
        <button
          onClick={onBackClick}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            width: "56px",
            height: "56px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            outline: "none",
            padding: 0,
            flexShrink: 0,
            background: "none",
            border: "none",
            color: backHovered ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
            transition: "color 0.15s ease",
          }}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: iconoVolverRaw
                .replace(/width="[^"]*"/, 'width="20"')
                .replace(/height="[^"]*"/, 'height="20"'),
            }} className={styles.iconSpan}
          />
        </button>

        {/* Textos */}
        <div className={styles.textContainer}
        >
          <h1 className={styles.title}
          >
            {title}
          </h1>
          {description && (
            <h2 className={styles.description}
            >
              {description}
            </h2>
          )}
        </div>
      </div>
      <div className={styles.rightSection}
      >
        {/* <CastButton />
        <SubtitlesButton /> */}
      </div>
    </div>
  );
};

export const PlayerTopBar = React.memo(PlayerTopBarComponent);
