import { useRef, useCallback, useEffect } from 'react';

type ScrollDirection = 'vertical' | 'horizontal';

interface UseTrackScrollOptions {
    /** Dirección del scroll: 'vertical' (default) o 'horizontal' */
    direction?: ScrollDirection;
    /** Si true, registra wheel listener en el wrapper (default: false) */
    enableWheel?: boolean;
}

interface UseTrackScrollReturn {
    /** Ref para el track (el div que recibe translateX/Y) */
    trackRef: React.RefObject<HTMLDivElement | null>;
    /** Aplica un desplazamiento absoluto en px */
    applyScroll: (offset: number) => void;
    /** Centra un hijo identificado por data-focuskey={key} */
    scrollToChild: (focusKey: string) => void;
    /** Ref al valor de scroll actual */
    currentOffset: React.RefObject<number>;
}

/**
 * Hook reutilizable para scroll interno de tracks (grids, listas horizontales).
 *
 * El track debe estar dentro de un wrapper con overflow: hidden.
 * El hook aplica `transform: translateX(-Npx)` o `translateY(-Npx)`
 * al trackRef para centrar el hijo enfocado.
 *
 * Uso típico:
 * ```tsx
 * const { trackRef, scrollToChild } = useTrackScroll({ direction: 'vertical' });
 *
 * <div className={styles.gridOuter}>         // overflow: hidden
 *   <div ref={trackRef} className={styles.grid}>  // will-change: transform
 *     {items.map(item => (
 *       <Card onCardFocus={() => scrollToChild(item.focusKey)} />
 *     ))}
 *   </div>
 * </div>
 * ```
 */
export function useTrackScroll(options: UseTrackScrollOptions = {}): UseTrackScrollReturn {
    const { direction = 'vertical', enableWheel = false } = options;

    const trackRef = useRef<HTMLDivElement>(null);
    const currentOffset = useRef(0);

    const isHorizontal = direction === 'horizontal';

    /** Aplica un desplazamiento absoluto, clampeado al máximo scrollable */
    const applyScroll = useCallback((offset: number) => {
        const track = trackRef.current;
        if (!track) return;

        const wrapper = track.parentElement;
        if (!wrapper) return;

        const wrapperSize = isHorizontal ? wrapper.offsetWidth : wrapper.offsetHeight;
        const trackSize = isHorizontal ? track.scrollWidth : track.scrollHeight;
        const maxScroll = Math.max(0, trackSize - wrapperSize);
        const clamped = Math.max(0, Math.min(offset, maxScroll));

        currentOffset.current = clamped;

        track.style.transform = isHorizontal
            ? `translateX(-${clamped}px)`
            : `translateY(-${clamped}px)`;
    }, [isHorizontal]);

    /** Centra un hijo identificado por data-focuskey dentro del track */
    const scrollToChild = useCallback((focusKey: string) => {
        const track = trackRef.current;
        if (!track) return;

        const wrapper = track.parentElement;
        if (!wrapper) return;

        const child = track.querySelector(
            `[data-focuskey="${focusKey}"]`,
        ) as HTMLElement | null;
        if (!child) return;

        const wrapperSize = isHorizontal ? wrapper.offsetWidth : wrapper.offsetHeight;
        const childOffset = isHorizontal ? child.offsetLeft : child.offsetTop;
        const childSize = isHorizontal ? child.offsetWidth : child.offsetHeight;

        const targetOffset = childOffset - (wrapperSize / 2) + (childSize / 2);
        applyScroll(targetOffset);
    }, [isHorizontal, applyScroll]);

    /** Wheel listener opcional */
    useEffect(() => {
        if (!enableWheel) return;

        const wrapper = trackRef.current?.parentElement;
        if (!wrapper) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = isHorizontal ? e.deltaX || e.deltaY : e.deltaY;
            applyScroll(currentOffset.current + delta);
        };

        wrapper.addEventListener('wheel', handleWheel, { passive: false });
        return () => wrapper.removeEventListener('wheel', handleWheel);
    }, [applyScroll, enableWheel, isHorizontal]);

    return {
        trackRef,
        applyScroll,
        scrollToChild,
        currentOffset,
    };
}
