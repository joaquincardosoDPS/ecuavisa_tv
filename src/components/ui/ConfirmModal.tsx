import Modal from "./Modal";
import Button from "./Button";
import styles from "./ConfirmModal.module.css";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.body}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant="tertiary" onClick={onClose} className={styles.btnFlex}>
            {cancelLabel}
          </Button>
          <Button variant="secondary" onClick={onConfirm} disabled={isLoading} className={styles.btnFlex}>
            {isLoading ? loadingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
