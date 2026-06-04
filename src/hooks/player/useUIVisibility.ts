import { useState, useRef, useCallback, useEffect } from 'react';

interface UseUIVisibilityOptions {
  /** Milliseconds before auto-hiding the UI. Default: 4000 */
  autoHideMs?: number;
  /** When true, prevents auto-hide (e.g. sidebar is open) */
  preventHide?: boolean;
}

interface UseUIVisibilityReturn {
  /** Whether the UI controls are currently visible */
  isUIVisible: boolean;
  /** Manually set visibility */
  setIsUIVisible: (visible: boolean) => void;
  /** Show UI + restart the auto-hide timer */
  resetUIVisibility: () => void;
}

/**
 * Hook compartido para gestión de visibilidad de controles del player.
 * Usado por VideoPlayer (VOD) y LivePlayer (Live).
 *
 * Auto-oculta los controles después de `autoHideMs` milisegundos.
 * Se resetea con movimiento de mouse .
 */
export function useUIVisibility(options?: UseUIVisibilityOptions): UseUIVisibilityReturn {
  const autoHideMs = (options && options.autoHideMs !== undefined) ? options.autoHideMs : 4000;
  const preventHide = (options && options.preventHide !== undefined) ? options.preventHide : false;

  const [isUIVisible, setIsUIVisible] = useState(true);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs para evitar stale closures en el callback de mousemove
  const preventHideRef = useRef(preventHide);
  preventHideRef.current = preventHide;

  const autoHideMsRef = useRef(autoHideMs);
  autoHideMsRef.current = autoHideMs;

  const resetUIVisibility = useCallback(() => {
    setIsUIVisible(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (!preventHideRef.current) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsUIVisible(false);
      }, autoHideMsRef.current);
    }
  }, []);

  // Limpiar timer cuando preventHide cambia a true; reiniciar cuando cambia a false
  useEffect(() => {
    if (preventHide) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    } else if (isUIVisible) {
      resetUIVisibility();
    }
  }, [preventHide]); // eslint-disable-line react-hooks/exhaustive-deps

  // On mount: iniciar auto-hide + escuchar mousemove
  useEffect(() => {
    if (isUIVisible && !hideTimeoutRef.current) {
      resetUIVisibility();
    }

    window.addEventListener('mousemove', resetUIVisibility);

    return () => {
      window.removeEventListener('mousemove', resetUIVisibility);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [resetUIVisibility, isUIVisible]);

  return {
    isUIVisible,
    setIsUIVisible,
    resetUIVisibility,
  };
}
