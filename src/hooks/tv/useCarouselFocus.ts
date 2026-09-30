import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useTVScroll } from './useTVScroll';
import type { EmblaCarouselType } from 'embla-carousel';
import type { RefObject } from 'react';

interface UseCarouselFocusProps {
  focusKey?: string;
  isBanner?: boolean;
  index?: number;
  /** Total de ítems del carrusel. Si se define, se bloquea la navegación
   *  hacia la derecha en el último ítem (y hacia la izquierda en el primero)
   *  para no saltar a otra sección. */
  totalItems?: number;
  emblaApi?: EmblaCarouselType;
  /** Bloque que se centra al recibir foco, si el elemento enfocable es solo un
   *  botón dentro de un bloque grande (ej. un evento de 50vh). */
  scrollAnchor?: RefObject<HTMLElement | null>;
  onEnterPress?: () => void;
  onArrowPress?: (direction: string) => boolean;
  onFocus?: () => void;
}

export function useCarouselFocus({
  focusKey,
  isBanner = false,
  index,
  totalItems,
  emblaApi,
  scrollAnchor,
  onEnterPress,
  onArrowPress,
  onFocus
}: UseCarouselFocusProps = {}) {
  const { scrollToNode } = useTVScroll();

  const { ref, focused, focusKey: generatedFocusKey } = useFocusable({
    focusKey,
    onFocus: () => {
      // 1. Center vertically on the screen using our context
      const node = scrollAnchor?.current ?? ref.current;
      if (node) {
        scrollToNode(node, isBanner);
      }
      
      // 2. If it's a carousel item, scroll horizontally using embla
      if (emblaApi && index !== undefined) {
        emblaApi.scrollTo(index);
      }
      
      // 3. Call custom onFocus
      if (onFocus) {
        onFocus();
      }
    },
    onEnterPress: () => {
      if (onEnterPress) {
        onEnterPress();
      }
    },
    onArrowPress: (direction) => {
      // Barreras del carrusel: bloquean antes del manejador custom para que
      // el foco se quede en el primer/último ítem y no salte a otra sección.
      if (totalItems !== undefined && index !== undefined) {
        if (direction === 'left' && index === 0) {
          return false;
        }
        if (direction === 'right' && index >= totalItems - 1) {
          return false;
        }
      }
      if (onArrowPress) {
        return onArrowPress(direction);
      }
      // Sin totalItems: bloquear solo la izquierda en el primer elemento
      // para evitar saltos inesperados hacia el banner o el header
      if (direction === 'left' && index === 0) {
        return false;
      }
      return true;
    }
  });

  return {
    ref,
    focused,
    focusKey: generatedFocusKey
  };
}
