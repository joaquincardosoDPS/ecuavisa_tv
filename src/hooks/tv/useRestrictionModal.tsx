import { useState } from "react";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import RestrictionModal from "@/components/ui/RestrictionModal";

/**
 * Hook reutilizable para bloquear la navegación a contenido restringido.
 * - `guard(restricted)`: si el contenido está restringido abre el modal y
 *   devuelve false (NO navegar); si no, devuelve true (navegar).
 * - `modal`: JSX del modal a renderizar en el componente.
 */
export function useRestrictionModal(returnFocusKey?: string) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
    if (returnFocusKey) {
      setTimeout(() => setFocus(returnFocusKey), 50);
    }
  };

  const guard = (restricted: boolean): boolean => {
    if (restricted) {
      setIsOpen(true);
      return false;
    }
    return true;
  };

  const modal = <RestrictionModal isOpen={isOpen} onClose={close} />;

  return { guard, modal };
}
