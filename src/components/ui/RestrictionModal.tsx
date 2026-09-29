import { useEffect } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { QRCodeSVG } from "qrcode.react";
import Button from "./Button";
import { usePpvLink } from "@/hooks/program/usePpvLink";
import { useConfigStore } from "@/features/config/useConfigStore";
import styles from "./RestrictionModal.module.css";

const CLOSE_KEY = "restriction-modal-close";

/** Respaldo del QR y del texto cuando el API o la config no responden. */
const DEFAULT_PAYMENT_URL = "https://www.ecuavisa.com";

interface RestrictionModalContentProps {
  onClose: () => void;
  title: string;
  price: string;
  message: string;
  qrValue?: string;
}

function RestrictionModalContent({ onClose, title, price, message, qrValue }: RestrictionModalContentProps) {
  const { ref: closeRef, focused: closeFocused } = useFocusable({
    focusKey: CLOSE_KEY,
    isFocusBoundary: true,
    onEnterPress: onClose,
    // El botón "Cerrar" no debe poder moverse con las flechas: el foco queda fijo en él.
    onArrowPress: () => false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Foco inicial en "Cerrar" al abrir el modal
    const t = setTimeout(() => {
      try {
        setFocus(CLOSE_KEY);
      } catch (e) {
        // ignore
      }
    }, 120);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.panelWrap}>
        <div className={styles.lockBadge}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        </div>

        <div className={styles.panel}>
          
          <div className={styles.contentRow}>
            <div className={styles.textCol}>
            <p className={styles.title}>{title}</p>
              <p className={styles.price}>{price}</p>
              <p className={styles.message}>{message}</p>
            </div>
            {qrValue && (
              <div className={styles.qrCol}>
                <QRCodeSVG value={qrValue} size={112} bgColor="#ffffff" fgColor="#000000" level="M" />
              </div>
            )}
          </div>
          <div ref={closeRef}>
            <Button variant="secondary" onClick={onClose} className={styles.closeBtn} focused={closeFocused}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RestrictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  /** Texto resaltado del panel (por defecto la página de pago de la config). */
  price?: string;
  message?: string;
  /** URL que codifica el QR (link de compra del API). */
  qrValue?: string;
  /** Key del programa (key_program) con la que se pide la URL de pago al API. */
  programKey?: string | null;
}

function RestrictionModal({
  isOpen,
  onClose,
  title = "Contenido de pago",
  price,
  message = "Entra a nuestra página de pago para acceder a este contenido",
  qrValue,
  programKey,
}: RestrictionModalProps) {
  // El QR apunta al link de compra del programa; el texto muestra la página de
  // pago configurada por el cliente (`url_pago`), que es la misma para todos.
  const { ppvLink } = usePpvLink(programKey, isOpen);
  const configPaymentUrl = useConfigStore((s) => s.config?.url_pago);

  if (!isOpen) return null;
  return (
    <RestrictionModalContent
      onClose={onClose}
      title={title}
      price={price ?? configPaymentUrl ?? DEFAULT_PAYMENT_URL}
      message={message}
      qrValue={qrValue ?? ppvLink ?? DEFAULT_PAYMENT_URL}
    />
  );
}

export default RestrictionModal;
