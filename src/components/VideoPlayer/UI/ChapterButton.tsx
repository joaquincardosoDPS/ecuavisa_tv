import React from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import iconoRewindRaw from "@/assets/img/icons/iconos-rewind.svg?raw";
import iconoNextRaw from "@/assets/img/icons/iconos-next.svg?raw";

type ChapterAction = "restart" | "next";

interface ChapterButtonProps {
  /** Tipo de acción: reiniciar capítulo o siguiente capítulo */
  action: ChapterAction;
  /** Callback al presionar el botón */
  onClick?: () => void;
  /** Si true, el botón se muestra deshabilitado (opacidad reducida, sin interacción) */
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
        if (!isNext) {
          setFocus("PLAYER-BTN-SKIP-REW");
        }
        return false;
      }
      return true;
    },
  });

  return (
    <button
      ref={ref}
      onClick={() => { if (!disabled) onClick?.(); }}
      disabled={disabled}
      style={{
        background: "none",
        border: "none",
        cursor: disabled ? "default" : "pointer",
        padding: "8px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: disabled
          ? "rgba(255, 255, 255, 0.3)"
          : focused
            ? "var(--foc-primary)"
            : "var(--clr-text-primary-button)",
        outline: "none",
        transition: "color 0.15s ease, opacity 0.15s ease",
        opacity: disabled ? 0.35 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
      title={label}
    >
      <span
        style={{ display: "inline-flex", width: 28, height: 28 }}
        dangerouslySetInnerHTML={{
          __html: prepareSvg(isNext ? iconoNextRaw : iconoRewindRaw, 28),
        }}
      />
    </button>
  );
};

export const ChapterButton = React.memo(ChapterButtonComponent);

