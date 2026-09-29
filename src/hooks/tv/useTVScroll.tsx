import { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';

interface TVScrollActions {
  scrollToNode: (node: HTMLElement, isBanner?: boolean) => void;
  /** Vuelve la vista al tope (scrollY = 0). Útil al enfocar tabs/filas superiores. */
  resetScroll: () => void;
  /** Ref que cada página pone en el div que se desplaza (el que recibe el transform). */
  containerRef: RefObject<HTMLDivElement | null>;
}

/**
 * Respaldo para páginas sin TVScrollProvider (ej. detalle de programa, que
 * scrollea de forma nativa): centra el nodo con el scroll del documento para
 * que el D-Pad no deje el foco fuera de pantalla.
 */
function scrollNodeIntoView(node: HTMLElement, isBanner = false) {
  if (isBanner) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const margin = 96;
  const rect = node.getBoundingClientRect();
  const isAbove = rect.top < margin;
  const isBelow = rect.bottom > window.innerHeight - margin;
  if (!isAbove && !isBelow) return;

  const target = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
  window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
}

// Acciones y valor separados: si `scrollY` viajara en el mismo contexto, cada
// tarjeta suscrita (useCarouselFocus) se re-renderizaría en cada paso de scroll.
const TVScrollActionsContext = createContext<TVScrollActions>({
  scrollToNode: scrollNodeIntoView,
  resetScroll: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  containerRef: { current: null },
});
const TVScrollYContext = createContext(0);

/**
 * Durante una transición CSS, getComputedStyle devuelve el valor animado actual:
 * con él se deduce el tope real del contenedor aunque la animación esté a mitad
 * de camino, así el destino no se desvía al pulsar rápido.
 */
function currentTranslateY(container: HTMLElement): number {
  const transform = getComputedStyle(container).transform;
  if (!transform || transform === 'none') return 0;
  const values = transform.slice(transform.indexOf('(') + 1, -1).split(',').map(Number);
  if (values.length === 6) return values[5];
  if (values.length === 16) return values[13];
  return 0;
}

/**
 * Límite inferior del scroll: al alinear el fondo del contenedor con el fondo
 * del viewport no se puede seguir desplazando hacia el vacío. Se calcula desde
 * el layout (no desde el transform) para que sea estable durante la animación.
 */
function bottomLimit(container: HTMLElement): number {
  const layoutTop = container.getBoundingClientRect().top - currentTranslateY(container);
  return Math.min(0, window.innerHeight - layoutTop - container.offsetHeight);
}

/** Normaliza el delta de la rueda a píxeles (Firefox puede reportar líneas o páginas). */
function wheelDelta(event: WheelEvent): number {
  if (event.deltaMode === 1) return event.deltaY * 16;
  if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

export function TVScrollProvider({ children, wheelEnabled = true }: { children: ReactNode; wheelEnabled?: boolean }) {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToNode = useCallback((node: HTMLElement, isBanner = false) => {
    if (isBanner) {
      setScrollY(0);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    // El offset dentro del contenedor es indiferente al transform aplicado (los
    // dos rects se desplazan juntos y se cancela al restar); el tope de layout
    // se deduce del transform animado actual.
    const offsetInContainer = nodeRect.top - containerRect.top;
    const layoutTop = containerRect.top - currentTranslateY(container);
    const target = Math.max(
      bottomLimit(container),
      Math.min(0, window.innerHeight / 2 - offsetInContainer - nodeRect.height / 2 - layoutTop)
    );

    setScrollY((prev) => (Math.abs(target - prev) < 1 ? prev : target));
  }, []);

  const resetScroll = useCallback(() => setScrollY(0), []);

  // El scroll del documento queda fuera de juego: la rueda (Magic Mouse, Magic
  // Remote, trackpad) mueve el mismo `scrollY` que el D-Pad. De lo contrario la
  // ventana queda desplazada y las flechas calculan sobre un layout ya movido,
  // así que la vista no vuelve a subir. `wheelEnabled` permite ceder el control
  // cuando la página muestra un overlay a pantalla completa (ej: player del Home).
  useEffect(() => {
    if (!wheelEnabled) return;

    const handleWheel = (event: WheelEvent) => {
      const container = containerRef.current;
      // Un modal abierto bloquea el scroll del fondo (Modal/ExitModal/RestrictionModal)
      if (!container || document.body.style.overflow === 'hidden') return;

      const delta = wheelDelta(event);
      if (!delta) return;
      event.preventDefault();

      const min = bottomLimit(container);
      setScrollY((prev) => Math.max(min, Math.min(0, prev - delta)));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [wheelEnabled]);

  // Heredar la posición de la página anterior descuadraría el cálculo del D-Pad.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const actions = useMemo(() => ({ scrollToNode, resetScroll, containerRef }), [scrollToNode, resetScroll]);

  return (
    <TVScrollActionsContext.Provider value={actions}>
      <TVScrollYContext.Provider value={scrollY}>
        {children}
      </TVScrollYContext.Provider>
    </TVScrollActionsContext.Provider>
  );
}

/** Acciones estables: los consumidores no se re-renderizan al hacer scroll. */
export function useTVScroll() {
  return useContext(TVScrollActionsContext);
}

/** Solo para el contenedor que aplica el transform de scroll. */
export function useTVScrollY() {
  return useContext(TVScrollYContext);
}
