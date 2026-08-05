import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useTVScroll } from './useTVScroll';
import type { EmblaCarouselType } from 'embla-carousel';

interface UseCarouselFocusProps {
  focusKey?: string;
  isBanner?: boolean;
  index?: number;
  emblaApi?: EmblaCarouselType;
  onEnterPress?: () => void;
}

export function useCarouselFocus({
  focusKey,
  isBanner = false,
  index,
  emblaApi,
  onEnterPress
}: UseCarouselFocusProps = {}) {
  const { scrollToNode } = useTVScroll();

  const { ref, focused, focusKey: generatedFocusKey } = useFocusable({
    focusKey,
    onFocus: () => {
      // 1. Center vertically on the screen using our context
      if (ref.current) {
        scrollToNode(ref.current, isBanner);
      }
      
      // 2. If it's a carousel item, scroll horizontally using embla
      if (emblaApi && index !== undefined) {
        emblaApi.scrollTo(index);
      }
    },
    onEnterPress: () => {
      if (onEnterPress) {
        onEnterPress();
      }
    }
  });

  return {
    ref,
    focused,
    focusKey: generatedFocusKey
  };
}
