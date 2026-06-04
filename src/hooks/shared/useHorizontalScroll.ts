import { useRef, useCallback } from 'react';

/**
 * Hook reutilizable para scroll horizontal via transform: translateX.
 * Centra el elemento enfocado horizontalmente dentro del track.
 * (Sigue REGLA F5.1 — scroll via transform, no nativo)
 */
export function useHorizontalScroll() {
    const trackRef = useRef<HTMLDivElement>(null);

    /** Centra el card identificado por focusKey en el viewport del wrapper */
    const scrollToCard = useCallback((cardFocusKey: string) => {
        const track = trackRef.current;
        if (!track) return;

        const wrapper = track.parentElement;
        if (!wrapper) return;

        const child = track.querySelector(
            `[data-focuskey="${cardFocusKey}"]`,
        ) as HTMLElement | null;
        if (!child) return;

        const wrapperWidth = wrapper.offsetWidth;
        const childLeft = child.offsetLeft;
        const childWidth = child.offsetWidth;

        const targetX = childLeft - (wrapperWidth / 2) + (childWidth / 2);
        const maxScroll = track.scrollWidth - wrapperWidth;
        const clampedX = Math.max(0, Math.min(targetX, maxScroll));

        track.style.transform = `translateX(-${clampedX}px)`;
    }, []);

    return { trackRef, scrollToCard };
}
