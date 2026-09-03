import React, { useEffect } from "react";
import { useFocusable, setFocus, getCurrentFocusKey } from "@noriginmedia/norigin-spatial-navigation";
import iconoRewindRaw from "@/assets/img/icons/iconos-rewind.svg?raw";
import iconoNextRaw from "@/assets/img/icons/iconos-next.svg?raw";
import styles from "./ChapterButton.module.css";

type ChapterAction = "restart" | "next";

interface ChapterButtonProps {
  action: ChapterAction;
  onClick?: () => void;
  disabled?: boolean;
}

const prepareSvg = (raw: string, size: number) =>
  raw
    .replace(/width="[^"]*"/, `width="${size}"`)
    .replace(/height="[^"]*"/, `height="${size}"`)
    .replace(/fill="white"/g, 'fill="currentColor"');

const ChapterButtonComponent = ({
  action,
  onClick,
  disabled = false,
}: ChapterButtonProps) => {
  const isNext = action === "next";
  const label = isNext ? "Siguiente capítulo" : "Reiniciar capítulo";
  const focusKey = `PLAYER-BTN-CHAPTER-${isNext ? "NEXT" : "RESTART"}`;

  const { ref, focused } = useFocusable({
    focusKey,
    focusable: !disabled,
    onEnterPress: () => {
      if (!disabled) onClick?.();
    },
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
        if (isNext) {
          setFocus("PLAYER-BTN-SKIP-FWD");
        }
        return false;
      }
      if (direction === "right") {
        if (isNext) {
          setFocus("PLAYER-BTN-EPISODES");
        } else {
          setFocus("PLAYER-BTN-SKIP-REW");
        }
        return false;
      }
      return true;
    },
  });

  // Si el capítulo siguiente deja de existir mientras este botón está enfocado,
  // el nodo queda como foco "muerto" (focusable: false sin foco visual).
  useEffect(() => {
    if (disabled && getCurrentFocusKey() === focusKey) {
      setFocus(isNext ? "PLAYER-BTN-EPISODES" : "PLAYER-BTN-SKIP-REW");
    }
  }, [disabled, focusKey, isNext]);

  return (
    <button
      ref={ref}
      onClick={() => { if (!disabled) onClick?.(); }}
      disabled={disabled}
      className={styles.button}
      style={{
        cursor: disabled ? "default" : "pointer",
        color: disabled
          ? "rgba(255, 255, 255, 0.3)"
          : focused
            ? "var(--foc-primary)"
            : "var(--clr-text-primary-button)",
        opacity: disabled ? 0.35 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
      title={label}
    >
      <span
        className={styles.iconSpan}
        dangerouslySetInnerHTML={{
          __html: prepareSvg(isNext ? iconoNextRaw : iconoRewindRaw, 28),
        }}
      />
    </button>
  );
};

export const ChapterButton = React.memo(ChapterButtonComponent);
