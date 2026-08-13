import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useTVScroll } from './useTVScroll';
import type { EmblaCarouselType } from 'embla-carousel';

interface UseCarouselFocusProps {
  focusKey?: string;
  isBanner?: boolean;
  index?: number;
  emblaApi?: EmblaCarouselType;
  onEnterPress?: () => void;
  onArrowPress?: (direction: string) => boolean;
  onFocus?: () => void;
}

export function useCarouselFocus({
  focusKey,
  isBanner = false,
  index,
  emblaApi,
  onEnterPress,
  onArrowPress,
  onFocus
}: UseCarouselFocusProps = {}) {
  const { scrollToNode } = useTVScroll();

  const { ref, focused, focusKey: generatedFocusKey } = useFocusable({
    focusKey,
    onFocus: (_layout, _extraProps, details) => {
      console.log(`✅ [FOCUS DEBUG] Enfocado -> key: ${focusKey}, generado: ${generatedFocusKey}, index: ${index}, isBanner: ${isBanner}`, details);
      
      // 1. Center vertically on the screen using our context
      if (ref.current) {
        scrollToNode(ref.current, isBanner);
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
      if (onArrowPress) {
        return onArrowPress(direction);
      }
      // Bloqueamos la navegación hacia la izquierda si estamos en el primer elemento
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
