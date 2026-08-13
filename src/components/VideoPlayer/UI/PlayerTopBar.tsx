import React from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
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
  const { ref, focused } = useFocusable({
    focusKey: "PLAYER-BTN-BACK",
    onEnterPress: () => onBackClick?.(),
    onArrowPress: (direction) => {
      if (direction === "up" || direction === "left" || direction === "right") return false;
      if (direction === "down") {
        setFocus("PLAYER-BTN-PLAYPAUSE");
        return false;
      }
      return true;
    },
  });

  return (
    <div
      className={styles.topBar}
      style={{
        visibility: isVisible ? "visible" : "hidden",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div className={styles.leftSection}
      >
        {/* Botón Volver */}
        <button
          ref={ref}
          onClick={onBackClick}
          className={styles.backButton}
          style={{
            color: focused ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
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
      </div>
    </div>
  );
};

export const PlayerTopBar = React.memo(PlayerTopBarComponent);
