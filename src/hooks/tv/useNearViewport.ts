import { useEffect, useState } from 'react';

/**
 * Indica si el nodo está como máximo a 1 pantalla de distancia (arriba o abajo).
 *
 * Las filas del Home se quedan montadas al hacer scroll, así que sin esto cada
 * tarjeta mantiene su imagen decodificada en memoria aunque esté fuera de vista,
 * que es lo que termina ahogando a la TV. Cuanto menor el margen, menos imágenes
 * decodificadas vivas al mismo tiempo.
 *
 * Devuelve un `ref` de callback (no un RefObject) para volver a observar el nodo
 * cuando la fila se monta después de su estado de carga.
 */
export function useNearViewport(initiallyNear = false) {
  const [isNear, setIsNear] = useState(initiallyNear);
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!node) return;

    // TV antiguas (Tizen 2.4 / webOS 3) no traen IntersectionObserver: ahí se
    // dejan las imágenes siempre montadas, como antes.
    if (typeof IntersectionObserver === 'undefined') {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { rootMargin: '100% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return { ref: setNode, isNear };
}
