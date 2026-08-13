import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

interface UseSpatialFocusOptions {
  focusKey?: string;
  onEnterPress?: () => void;
  onArrowPress?: (direction: string) => boolean;
  /** Al recibir foco, hace scroll del nodo en pantalla si está fuera del viewport. */
  scrollOnFocus?: boolean;
  /** Margen (px) desde el borde del viewport para decidir si hace falta scroll. */
  edgeMargin?: number;
  /** Cómo alinear el nodo al hacer scroll: 'center' (por defecto) | 'top' (lo deja cerca del borde superior para revelar el contenido de abajo). */
  position?: "center" | "top";
  /**
   * Selector de un elemento "ancla" (ej. contenedor de tabs). Si se define,
   * al enfocar el nodo se hace scroll para alinear ESE elemento arriba
   * (misma posición que cuando el foco está en el tab), en vez del propio nodo.
   */
  scrollAnchorSelector?: string;
}

/**
 * Envoltorio de useFocusable para páginas SIN TVScrollProvider
 * (ej: página de Programa). Al recibir foco hace scroll suave del nodo
 * al centro del viewport si el elemento está (parcialmente) fuera de pantalla,
 * para que el movimiento con flechas fluya entre elementos muy separados.
 * Con `position: 'top'` el nodo se posiciona arriba y se revela el contenido
 * inferior (útil para tabs/segmentos: al enfocarlos baja la vista como al
 * llegar a la segunda fila de capítulos).
 */
export function useSpatialFocus({
  focusKey,
  onEnterPress,
  scrollOnFocus = true,
  edgeMargin = 96,
  position = "center",
  scrollAnchorSelector,
  onArrowPress,
}: UseSpatialFocusOptions = {}) {
  const { ref, focused, focusKey: generatedFocusKey } = useFocusable({
    focusKey,
    onFocus: (layout) => {
      if (!scrollOnFocus || !layout.node) return;
      const node = layout.node as HTMLElement;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Alineación 'top': siempre posiciona el nodo cerca del borde superior
      // para revelar el contenido de abajo (tabs/segmentos: baja la vista
      // como al llegar a la segunda fila de capítulos).
      if (position === "top") {
        const targetY = window.scrollY + rect.top - edgeMargin;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        return;
      }
      // Ancla: alinea otro elemento (ej. las tabs) arriba, dejando la vista
      // igual que si el foco estuviera en el tab (sirve para la primera fila
      // de capítulos, tanto subiendo como bajando).
      if (scrollAnchorSelector) {
        const anchor = document.querySelector<HTMLElement>(scrollAnchorSelector);
        if (anchor) {
          const aRect = anchor.getBoundingClientRect();
          const targetY = window.scrollY + aRect.top - edgeMargin;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
          return;
        }
      }
      const isAbove = rect.top < edgeMargin;
      const isBelow = rect.bottom > viewportHeight - edgeMargin;
      if (isAbove || isBelow) {
        const targetY = window.scrollY + rect.top - viewportHeight / 2 + rect.height / 2;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      }
    },
    onEnterPress: () => {
      if (onEnterPress) onEnterPress();
    },
    onArrowPress: (direction) => {
      if (onArrowPress) return onArrowPress(direction);
      return true;
    }
  });

  return { ref, focused, focusKey: generatedFocusKey };
}
