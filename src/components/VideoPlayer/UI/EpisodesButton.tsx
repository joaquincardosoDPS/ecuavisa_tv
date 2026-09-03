import React from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import styles from "./EpisodesButton.module.css";

interface EpisodesButtonProps {
  onClick?: () => void;
  hasNextChapter?: boolean;
}

const EpisodesButtonComponent = ({ onClick, hasNextChapter = false }: EpisodesButtonProps) => {
  const { ref, focused } = useFocusable({
    focusKey: "PLAYER-BTN-EPISODES",
    onEnterPress: () => onClick?.(),
    onArrowPress: (direction) => {
      if (direction === "left") {
        setFocus(hasNextChapter ? "PLAYER-BTN-CHAPTER-NEXT" : "PLAYER-BTN-SKIP-FWD");
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
      if (direction === "right") {
        setFocus("PLAYER-BTN-VOLUME");
        return false;
      }
      return false;
    },
  });

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${styles.button} ${focused ? styles.focused : ""}`}
      title="Ver todos los capítulos"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
      </svg>
    </button>
  );
};

export const EpisodesButton = React.memo(EpisodesButtonComponent);
