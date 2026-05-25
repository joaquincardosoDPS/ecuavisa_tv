import React from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import iconoPlayRaw from "@/assets/img/icons/iconos-play.svg?raw";
import iconoPauseRaw from "@/assets/img/icons/iconos-pause.svg?raw";

interface PlayPauseButtonProps {
  playing?: boolean;
  onClick?: () => void;
}

const resizeSvg = (raw: string, size: number) =>
  raw.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`);

const PlayPauseButtonComponent = ({
  playing = false,
  onClick,
}: PlayPauseButtonProps) => {
  const { ref, focused } = useFocusable({
    focusKey: "PLAYER-BTN-PLAYPAUSE",
    onEnterPress: () => onClick?.(),
    onArrowPress: (direction) => {
      if (direction === "down") {
        setFocus("PLAYER-SEEKBAR-THUMB");
        return false;
      }
      if (direction === "up") {
        setFocus("PLAYER-BTN-BACK");
        return false;
      }
      return true;
    },
  });

  return (
    <button
      ref={ref}
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        color: focused ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
        outline: "none",
        transition: "color 0.15s ease",
      }}
      title={playing ? "Pausar" : "Reproducir"}
    >
      <span
        style={{ display: "inline-flex", width: 28, height: 28 }}
        dangerouslySetInnerHTML={{
          __html: resizeSvg(playing ? iconoPauseRaw : iconoPlayRaw, 28),
        }}
      />
    </button>
  );
};

export const PlayPauseButton = React.memo(PlayPauseButtonComponent);
