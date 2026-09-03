import React from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import iconoRetrocederRaw from "@/assets/img/icons/iconos-retroceder.svg?raw";
import iconoAvanzarRaw from "@/assets/img/icons/iconos-avanzar.svg?raw";
import styles from "./SkipButton.module.css";

interface SkipButtonProps {
  /** Segundos a saltar: negativo para retroceder, positivo para avanzar */
  seconds: number;
  onClick?: () => void;
  /** Si existe un capítulo siguiente: define el destino de la flecha derecha desde el botón de avanzar. */
  hasNextChapter?: boolean;
}

const resizeSvg = (raw: string, size: number) =>
  raw.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`);

const SkipButtonComponent = ({ seconds, onClick, hasNextChapter = false }: SkipButtonProps) => {
  const isForward = seconds > 0;
  const label = isForward
    ? `Avanzar ${Math.abs(seconds)} segundos`
    : `Retroceder ${Math.abs(seconds)} segundos`;

  const { ref, focused } = useFocusable({
    focusKey: `PLAYER-BTN-SKIP-${isForward ? "FWD" : "REW"}`,
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
        setFocus(isForward ? "PLAYER-BTN-PLAYPAUSE" : "PLAYER-BTN-CHAPTER-RESTART");
        return false;
      }
      if (direction === "right") {
        if (isForward) {
          setFocus(hasNextChapter ? "PLAYER-BTN-CHAPTER-NEXT" : "PLAYER-BTN-EPISODES");
        } else {
          setFocus("PLAYER-BTN-PLAYPAUSE");
        }
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
      title={label}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: resizeSvg(isForward ? iconoAvanzarRaw : iconoRetrocederRaw, 32),
        }} className={styles.iconWrapper}
      />
    </button>
  );
};

export const SkipButton = React.memo(SkipButtonComponent);
