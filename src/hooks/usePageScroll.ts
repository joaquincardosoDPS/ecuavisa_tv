import { useRef, useCallback, useEffect } from 'react';

/**
 * Opciones para el scroll vertical de página.
 * REGLA F5.1: scroll via transform: translateY (sin scrollbar nativo).
 * REGLA 1.2: solo transform para animaciones.
 * REGLA F6.1: soporte para Magic Mouse (wheel).
 */
interface UsePageScrollOptions {
    /** Si true, se registra el listener de wheel en el parent del scrollRef (default: true) */
    enableWheel?: boolean;
    /** Callback invocado después de cada cambio de scroll con el offset actual (negativo) */
    onScroll?: (scrollY: number) => void;
}

type ScrollAlign = 'start' | 'center';

interface UsePageScrollReturn {
    /** Ref para el contenedor scrolleable (el div que recibe translateY) */
    scrollRef: React.RefObject<HTMLDivElement | null>;
    /** Aplica un desplazamiento absoluto en px */
    applyScroll: (y: number) => void;
    /** Posiciona un elemento en el viewport. align: 'start' = tope, 'center' = centrado (default). offset: px extra arriba (solo para 'start') */
    scrollToElement: (element: HTMLElement | null, align?: ScrollAlign, offset?: number) => void;
    /** Posiciona una sección (data-section={id}). align: 'start' = tope, 'center' = centrado (default). offset: px extra arriba (solo para 'start') */
    scrollToSection: (sectionId: string, align?: ScrollAlign, offset?: number) => void;
    /** Scroll a la posición 0 (banner) */
    scrollToTop: () => void;
    /** Ref al valor de scroll actual (para lecturas imperativas) */
    currentScrollY: React.RefObject<number>;
}

/**
 * Hook reutilizable para scroll vertical de página completa en Smart TV.
 *
 * Uso típico:
 * ```tsx
 * const { scrollRef, scrollToSection, scrollToTop } = usePageScroll();
 *
 * <div className={styles.container}>         // overflow: hidden; height: 100vh
 *   <div ref={scrollRef} className={styles.scrollContainer}>  // will-change: transform
 *     ...
 *   </div>
 * </div>
 * ```
 */
export function usePageScroll(options: UsePageScrollOptions = {}): UsePageScrollReturn {
    const { enableWheel = true, onScroll } = options;

    const scrollRef = useRef<HTMLDivElement>(null);
    const currentScrollY = useRef(0);

    /** Aplica un desplazamiento absoluto, clampeado a [0, maxScroll] */
    const applyScroll = useCallback((y: number) => {
        const container = scrollRef.current;
        if (!container) return;

        const viewportHeight = window.innerHeight;
        const maxScroll = Math.max(0, container.scrollHeight - viewportHeight);
        const clampedY = Math.max(0, Math.min(y, maxScroll));

        currentScrollY.current = clampedY;
        container.style.transform = `translateY(-${clampedY}px)`;
        onScroll?.(-clampedY);
    }, [onScroll]);

    /**
     * Posiciona un elemento en el viewport.
     * @param align 'start' = borde superior del elemento al tope del viewport,
     *              'center' = centro del elemento al centro del viewport (default)
     */
    const scrollToElement = useCallback((element: HTMLElement | null, align: ScrollAlign = 'center', offset: number = 0) => {
        const container = scrollRef.current;
        if (!container || !element) return;

        const vh = window.innerHeight;
        const rect = element.getBoundingClientRect();
        const currentScroll = currentScrollY.current;
        const margin = 20; // margen de tolerancia en px

        if (align === 'start') {
            // Solo scrollear si el top no está ya cerca de la posición deseada
            if (Math.abs(rect.top - offset) <= margin) {
                return;
            }
            const elementTopAbsolute = rect.top + currentScroll;
            applyScroll(elementTopAbsolute - offset);
        } else {
            // Solo scrollear si el elemento no está completamente visible
            if (rect.top >= margin && rect.bottom <= vh - margin) {
                return;
            }
            const elementCenterAbsolute = rect.top + currentScroll + rect.height / 2;
            const visibleMidpoint = vh * 0.5;
            applyScroll(elementCenterAbsolute - visibleMidpoint);
        }
    }, [applyScroll]);

    /** Posiciona una sección identificada por data-section={id} */
    const scrollToSection = useCallback((sectionId: string, align: ScrollAlign = 'center', offset: number = 0) => {
        const container = scrollRef.current;
        if (!container) return;

        const section = container.querySelector(
            `[data-section="${sectionId}"]`,
        ) as HTMLElement | null;

        scrollToElement(section, align, offset);
    }, [scrollToElement]);

    /** Scroll a la posición 0 */
    const scrollToTop = useCallback(() => {
        applyScroll(0);
    }, [applyScroll]);

    /** Wheel listener para Magic Mouse (REGLA F6.1) */
    useEffect(() => {
        if (!enableWheel) return;

        const container = scrollRef.current?.parentElement;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            applyScroll(currentScrollY.current + e.deltaY);
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [applyScroll, enableWheel]);

    return {
        scrollRef,
        applyScroll,
        scrollToElement,
        scrollToSection,
        scrollToTop,
        currentScrollY,
    };
}
