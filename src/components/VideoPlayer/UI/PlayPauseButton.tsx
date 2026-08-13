import React from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import iconoPlayRaw from "@/assets/img/icons/iconos-play.svg?raw";
import iconoPauseRaw from "@/assets/img/icons/iconos-pause.svg?raw";
import styles from "./PlayPauseButton.module.css";

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
      if (direction === "left") {
        setFocus("PLAYER-BTN-SKIP-REW");
        return false;
      }
      if (direction === "right") {
        setFocus("PLAYER-BTN-SKIP-FWD");
        return false;
      }
      return true;
    },
  });

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={styles.button}
      style={{
        color: focused ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
      }}
      title={playing ? "Pausar" : "Ver ahora"}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: resizeSvg(playing ? iconoPauseRaw : iconoPlayRaw, 28),
        }} className={styles.iconWrapper}
      />
    </button>
  );
};

export const PlayPauseButton = React.memo(PlayPauseButtonComponent);
