import { useEffect, useRef } from 'react';
import { setFocus } from '@noriginmedia/norigin-spatial-navigation';

interface UsePlayerKeyboardOptions {
  /** Callback when Back/Return is pressed */
  onBack: () => void;
  /** Whether the player UI overlay is currently visible */
  isUIVisible: boolean;
  /** Callback to show the UI and reset auto-hide timer */
  showUI: () => void;
  /** If true, disables seek with left/right arrows (live has no seekbar) */
  isLive?: boolean;
  /** If true, ignores all keyboard events (ads playing) */
  playingAds?: boolean;
  /** If true, only handles Back key, delegates rest to Norigin */
  pipMode?: boolean;
  /** Whether video is currently playing */
  isPlaying?: boolean;
  /** Pause callback (called when Enter shows UI during playback) */
  pause?: () => void;
  /** Configurable Norigin focus keys */
  focusKeys?: {
    playPause?: string;
    seekbar?: string;
  };
  /** When false, the keyboard handler is not attached. Default: true */
  enabled?: boolean;
}

// Back keyCodes: ESC(27), Backspace(8), Samsung Return(10009), LG Back(461)
const BACK_CODES = [27, 8, 10009, 461];

// Enter(13) / Space(32)
const CONFIRM_CODES = [13, 32];

// Left(37), Right(39)
const HORIZONTAL_CODES = [37, 39];

// Up(38), Down(40)
const VERTICAL_CODES = [38, 40];

const DEFAULT_FOCUS_KEYS = {
  playPause: 'PLAYER-BTN-PLAYPAUSE',
  seekbar: 'PLAYER-SEEKBAR-THUMB',
};

/**
 * Hook compartido de teclado/D-pad para players de Smart TV.
 * Usado por VideoPlayer (VOD) y LivePlayer (Live).
 *
 * - Back/Return → llama `onBack` (Samsung 10009, LG 461, ESC, Backspace)
 * - Con UI oculta, cualquier tecla de navegación la muestra
 * - Enter/Espacio con UI oculta → pausa + muestra UI + foco en play/pause
 * - Flechas Izq/Der con UI oculta (solo VOD) → muestra UI + foco en seekbar
 * - Guard anti-doble keypress: evita que Norigin procese la misma tecla
 *   que mostró la UI
 */
export function usePlayerKeyboard(options: UsePlayerKeyboardOptions): void {
  // Refs estables para evitar re-suscripciones del event listener 
  const onBackRef = useRef(options.onBack);
  onBackRef.current = options.onBack;

  const showUIRef = useRef(options.showUI);
  showUIRef.current = options.showUI;

  const pauseRef = useRef(options.pause);
  pauseRef.current = options.pause;

  const isPlayingRef = useRef(options.isPlaying);
  isPlayingRef.current = options.isPlaying;

  const isLiveRef = useRef(options.isLive);
  isLiveRef.current = options.isLive;

  const playingAdsRef = useRef(options.playingAds);
  playingAdsRef.current = options.playingAds;

  const pipModeRef = useRef(options.pipMode);
  pipModeRef.current = options.pipMode;

  const focusKeysRef = useRef(options.focusKeys);
  focusKeysRef.current = options.focusKeys;

  // Guard anti-doble keypress
  const controlsJustShownRef = useRef(false);

  const enabled = options.enabled !== undefined ? options.enabled : true;
  const { isUIVisible } = options;

  useEffect(() => {
    if (!enabled) return;

    const getPlayPauseKey = (): string => {
      const keys = focusKeysRef.current;
      return (keys && keys.playPause) ? keys.playPause : DEFAULT_FOCUS_KEYS.playPause;
    };

    const getSeekbarKey = (): string => {
      const keys = focusKeysRef.current;
      return (keys && keys.seekbar) ? keys.seekbar : DEFAULT_FOCUS_KEYS.seekbar;
    };

    /**
     * Muestra la UI y activa el guard anti-doble keypress.
     * Después de 150ms se libera para que Norigin retome la navegación.
     */
    const showAndGuard = (): void => {
      controlsJustShownRef.current = true;
      showUIRef.current();
      setTimeout(() => {
        controlsJustShownRef.current = false;
      }, 150);
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
      const code = e.keyCode;

      // Ads reproduciéndose → ignorar todo
      if (playingAdsRef.current) return;

      // Back/Return → siempre manejado
      if (BACK_CODES.indexOf(code) !== -1) {
        e.preventDefault();
        e.stopPropagation();
        onBackRef.current();
        return;
      }

      // PiP mode → delegar todo excepto Back a Norigin
      if (pipModeRef.current) return;

      // UI oculta → revelar con cualquier tecla de navegación
      if (!isUIVisible) {
        // Enter / Espacio: pausar + mostrar UI + foco en play/pause
        if (CONFIRM_CODES.indexOf(code) !== -1) {
          e.preventDefault();
          e.stopPropagation();
          if (isPlayingRef.current && pauseRef.current) {
            pauseRef.current();
          }
          showAndGuard();
          setTimeout(() => setFocus(getPlayPauseKey()), 50);
          return;
        }

        // Izquierda / Derecha (solo VOD): mostrar UI + foco en seekbar
        if (HORIZONTAL_CODES.indexOf(code) !== -1 && !isLiveRef.current) {
          e.preventDefault();
          e.stopPropagation();
          showAndGuard();
          setTimeout(() => setFocus(getSeekbarKey()), 50);
          return;
        }

        // Arriba / Abajo: mostrar UI + foco en play/pause
        if (VERTICAL_CODES.indexOf(code) !== -1) {
          e.preventDefault();
          e.stopPropagation();
          showAndGuard();
          setTimeout(() => setFocus(getPlayPauseKey()), 50);
          return;
        }
      }

      // Guard: consumir el keypress que acaba de mostrar la UI
      if (controlsJustShownRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // UI visible → dejar que Norigin maneje la navegación, solo resetear timer
      showUIRef.current();
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [enabled, isUIVisible]);
}
