import React from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import iconoVolverRaw from "@/assets/img/icons/iconos-volver.svg?raw";

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
  isLive: _isLive = false,
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
        color: "var(--clr-primary-text)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* Botón Volver */}
        <button
          ref={ref}
          onClick={onBackClick}
          style={{
            width: "64px",
            height: "64px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            outline: "none",
            padding: 0,
            flexShrink: 0,
            background: "none",
            border: "none",
            color: focused ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
            transition: "color 0.15s ease",
            borderRadius: "50%",
          }}
        >
          <span
            style={{ display: "inline-flex", width: 28, height: 28 }}
            dangerouslySetInnerHTML={{
              __html: iconoVolverRaw
                .replace(/width="[^"]*"/, 'width="28"')
                .replace(/height="[^"]*"/, 'height="28"'),
            }}
          />
        </button>

        {/* Textos */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            pointerEvents: "none",
            maxWidth: "60vw",
            marginLeft: "10px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontWeight: 500,
              fontSize: "1.8rem",
              lineHeight: 1,
            }}
          >
            {title}
          </h1>
          {description && (
            <h2
              style={{
                fontWeight: 500,
                fontSize: "1.3rem",
                opacity: 0.9,
              }}
            >
              {description}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export const PlayerTopBar = React.memo(PlayerTopBarComponent);
