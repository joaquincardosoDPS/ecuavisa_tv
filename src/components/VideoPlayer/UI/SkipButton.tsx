import React from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import iconoRetrocederRaw from "@/assets/img/icons/iconos-retroceder.svg?raw";
import iconoAvanzarRaw from "@/assets/img/icons/iconos-avanzar.svg?raw";
import styles from "./SkipButton.module.css";

interface SkipButtonProps {
  /** Segundos a saltar: negativo para retroceder, positivo para avanzar */
  seconds: number;
  onClick?: () => void;
}

const resizeSvg = (raw: string, size: number) =>
  raw.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`);

const SkipButtonComponent = ({ seconds, onClick }: SkipButtonProps) => {
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
        setFocus(isForward ? "PLAYER-BTN-CHAPTER-NEXT" : "PLAYER-BTN-PLAYPAUSE");
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
        color: focused ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
        transition: "color 0.15s ease",
        outline: "none",
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
