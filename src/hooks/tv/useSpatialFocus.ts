import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

interface UseSpatialFocusOptions {
  focusKey?: string;
  onEnterPress?: () => void;
  /** Al recibir foco, centra el nodo en pantalla si está fuera del viewport. */
  scrollOnFocus?: boolean;
  /** Margen (px) desde el borde del viewport para decidir si hace falta scroll. */
  edgeMargin?: number;
}

/**
 * Envoltorio de useFocusable para páginas SIN TVScrollProvider
 * (ej: página de Programa). Al recibir foco hace scroll suave del nodo
 * al centro del viewport si el elemento está (parcialmente) fuera de pantalla,
 * para que el movimiento con flechas fluya entre elementos muy separados.
 */
export function useSpatialFocus({
  focusKey,
  onEnterPress,
  scrollOnFocus = true,
  edgeMargin = 96,
}: UseSpatialFocusOptions = {}) {
  const { ref, focused, focusKey: generatedFocusKey } = useFocusable({
    focusKey,
    onFocus: (layout) => {
      if (!scrollOnFocus || !layout.node) return;
      const node = layout.node as HTMLElement;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
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
  });

  return { ref, focused, focusKey: generatedFocusKey };
}
