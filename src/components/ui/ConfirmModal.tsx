import { useEffect } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Modal from "./Modal";
import Button from "./Button";
import { isInputAction } from "@/utils/keyCodes";
import styles from "./ConfirmModal.module.css";

const CANCEL_KEY = "confirm-modal-btn-cancel";
const CONFIRM_KEY = "confirm-modal-btn-confirm";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loadingLabel?: string;
  isLoading?: boolean;
}

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loadingLabel = "Procesando...",
  isLoading = false,
}: ConfirmModalProps) {
  const { ref: cancelRef, focused: cancelFocused } = useFocusable({
    focusKey: CANCEL_KEY,
    focusable: isOpen,
    isFocusBoundary: true,
    onEnterPress: onClose,
    // El foco queda atrapado entre ambos botones del modal.
    onArrowPress: (direction) => {
      if (direction === "right") setFocus(CONFIRM_KEY);
      return false;
    },
  });

  const { ref: confirmRef, focused: confirmFocused } = useFocusable({
    focusKey: CONFIRM_KEY,
    focusable: isOpen,
    isFocusBoundary: true,
    onEnterPress: () => {
      if (!isLoading) onConfirm();
    },
    onArrowPress: (direction) => {
      if (direction === "left") setFocus(CANCEL_KEY);
      return false;
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInputAction(e, "Back")) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);

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
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.body}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <div ref={cancelRef} className={styles.btnWrap}>
            <Button variant="tertiary" onClick={onClose} className={styles.btnFlex} focused={cancelFocused}>
              {cancelLabel}
            </Button>
          </div>
          <div ref={confirmRef} className={styles.btnWrap}>
            <Button
              variant="secondary"
              onClick={onConfirm}
              disabled={isLoading}
              className={styles.btnFlex}
              focused={confirmFocused}
            >
              {isLoading ? loadingLabel : confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
