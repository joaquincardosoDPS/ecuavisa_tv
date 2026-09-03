import { useEffect } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Button from "./Button";
import { isInputAction } from "@/utils/keyCodes";
import { exitApp } from "@/utils/platform";
import styles from "./ExitModal.module.css";

const CANCEL_KEY = "exit-modal-btn-cancel";
const CONFIRM_KEY = "exit-modal-btn-exit";

interface ExitModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

function ExitModal({ isOpen, onCancel }: ExitModalProps) {
  const { ref: cancelRef, focused: cancelFocused } = useFocusable({
    focusKey: CANCEL_KEY,
    isFocusBoundary: true,
    onEnterPress: onCancel,
    // El foco queda atrapado entre ambos botones: no hay destinos fuera del modal.
    onArrowPress: (direction) => {
      if (direction === "right") {
        setFocus(CONFIRM_KEY);
        return false;
      }
      return false;
    },
  });

  const { ref: confirmRef, focused: confirmFocused } = useFocusable({
    focusKey: CONFIRM_KEY,
    isFocusBoundary: true,
    onEnterPress: () => exitApp(),
    onArrowPress: (direction) => {
      if (direction === "left") {
        setFocus(CANCEL_KEY);
        return false;
      }
      return false;
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInputAction(e, "Back")) {
        e.preventDefault();
        e.stopPropagation();
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    document.body.style.overflow = "hidden";

    // Foco inicial en "Cancelar" (opción segura por defecto)
    const t = setTimeout(() => {
      try {
        setFocus(CANCEL_KEY);
      } catch {
        // el botón puede no estar registrado aún
      }
    }, 120);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className={styles.panel}>
        <p className={styles.title}>¿Salir de la aplicación?</p>
        <p className={styles.message}>
          Se cerrará la aplicación y dejarás de ver tu contenido.
        </p>
        <div className={styles.actions}>
          <div ref={cancelRef} className={styles.btnWrap}>
            <Button variant="tertiary" onClick={onCancel} focused={cancelFocused} className={styles.btnFlex}>
              Cancelar
            </Button>
          </div>
          <div ref={confirmRef} className={styles.btnWrap}>
            <Button variant="secondary" onClick={() => exitApp()} focused={confirmFocused} className={styles.btnFlex}>
              Salir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExitModal;
