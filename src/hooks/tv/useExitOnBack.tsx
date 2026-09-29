import { useCallback, useEffect, useRef, useState } from "react";
import { SpatialNavigation, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import ExitModal from "@/components/ui/ExitModal";
import { isInputAction } from "@/utils/keyCodes";

interface UseExitOnBackOptions {
  /** Bloquea el cartel mientras la vista tenga algo abierto (player, overlay, carga). */
  disabled?: boolean;
  /** Foco al que volver al cancelar si el foco previo ya no existe. */
  fallbackFocusKey?: string;
}

/**
 * Cartel de salida (REGLA 4.1) para las vistas raíz del menú: con Back se pide
 * confirmación en lugar de dejar que el navegador cierre la app por su cuenta.
 * Devuelve el modal para renderizarlo dentro de la vista.
 */
export function useExitOnBack({
  disabled = false,
  fallbackFocusKey = "navbar-home",
}: UseExitOnBackOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const lastFocusKeyRef = useRef<string | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    const lastKey = lastFocusKeyRef.current;
    // El modal desmonta su propio foco al cerrar: restaurar el foco previo
    // después del desmontaje para no competir con la limpieza de norigin.
    setTimeout(() => {
      if (lastKey && SpatialNavigation.doesFocusableExist(lastKey)) {
        setFocus(lastKey);
      } else if (SpatialNavigation.doesFocusableExist(fallbackFocusKey)) {
        setFocus(fallbackFocusKey);
      }
    }, 120);
  }, [fallbackFocusKey]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isInputAction(e, "Back")) return;
      if (disabled || isOpen) return;
      e.preventDefault();
      e.stopPropagation();
      lastFocusKeyRef.current = SpatialNavigation.getCurrentFocusKey();
      setIsOpen(true);
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [disabled, isOpen]);

  const modal = <ExitModal isOpen={isOpen} onCancel={close} />;

  return { isOpen, close, modal };
}
