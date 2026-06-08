import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import type { AdBreakCuepoint } from '@/services/adsService';

interface UseAdBreaksProps {
  /** Midroll cuepoints extraídos del VMAP */
  midrollCuepoints: AdBreakCuepoint[];
  /** URLs VAST de postroll */
  postrollVastUrls: string[];
  /** Tiempo actual de reproducción (de useHlsStream) */
  currentTime: number;
  /** Duración total del video */
  duration: number;
  /** Si el video terminó naturalmente */
  isEnded: boolean;
  /** Si es contenido en vivo (no aplican ad breaks) */
  isLive: boolean;
  /** Tiempo inicial de reanudación — los midrolls antes de este punto se ignoran */
  initialSeconds?: number;
}

interface ActiveAdBreak {
  vastUrls: string[];
  type: 'midroll' | 'postroll';
}

interface UseAdBreaksResult {
  /** Ad break actualmente activo (null si no hay ad reproduciéndose) */
  activeAdBreak: ActiveAdBreak | null;
  /** Si hay un ad break activo */
  isAdBreakActive: boolean;
  /** Llamar cuando el VastPlayer termina el ad */
  onAdBreakFinished: () => void;
  /** Array de tiempos de cuepoints ya reproducidos (para markers del seekbar) */
  playedCuepointsArray: number[];
  /** Tiempo al que se debe hacer seek después de que termine el ad (seek-triggered) */
  resumeAfterAdTime: number | null;
}

/** Tolerancia en segundos para detectar que el playback cruzó un cuepoint */
const NATURAL_TOLERANCE = 1.5;
/** Umbral para detectar un salto de seek vs progresión natural */
const SEEK_THRESHOLD = 2;

export function useAdBreaks({
  midrollCuepoints,
  postrollVastUrls,
  currentTime,
  duration,
  isEnded,
  isLive,
  initialSeconds,
}: UseAdBreaksProps): UseAdBreaksResult {
  const [activeAdBreak, setActiveAdBreak] = useState<ActiveAdBreak | null>(null);

  // Refs para evitar re-renders innecesarios
  const playedCuepointsRef = useRef<Set<number>>(new Set());
  const lastCheckedTimeRef = useRef<number>(0);
  const postrollPlayedRef = useRef(false);
  const resumeAfterAdTimeRef = useRef<number | null>(null);

  // Estado para forzar re-render cuando cambian los playedCuepoints (para seekbar)
  const [playedCuepointsVersion, setPlayedCuepointsVersion] = useState(0);

  // Reset cuando cambian los cuepoints (nuevo episodio)
  useEffect(() => {
    playedCuepointsRef.current = new Set();
    postrollPlayedRef.current = false;
    resumeAfterAdTimeRef.current = null;
    setActiveAdBreak(null);
    setPlayedCuepointsVersion(0);

    // Inicializar lastCheckedTime al punto de reanudación para que
    // los midrolls anteriores al resume no se disparen.
    lastCheckedTimeRef.current = initialSeconds ?? 0;
  }, [midrollCuepoints, initialSeconds]);

  // Array estable de cuepoints jugados para el seekbar
  const playedCuepointsArray = useMemo(() => {
    // playedCuepointsVersion se usa para invalidar el memo
    void playedCuepointsVersion;
    return Array.from(playedCuepointsRef.current);
  }, [playedCuepointsVersion]);

  // Detección de midrolls (natural playback + seek)
  useEffect(() => {
    if (isLive || activeAdBreak !== null || midrollCuepoints.length === 0) return;
    if (duration <= 0 || currentTime <= 0) return;

    const lastTime = lastCheckedTimeRef.current;
    const timeDelta = currentTime - lastTime;

    // Solo procesar progresión hacia adelante
    if (timeDelta <= 0) {
      lastCheckedTimeRef.current = currentTime;
      return;
    }

    // Determinar si es un seek (salto grande) o playback natural
    const isSeek = timeDelta > SEEK_THRESHOLD;

    // Buscar cuepoints no jugados entre lastTime y currentTime
    const unplayedInRange = midrollCuepoints.filter((cp) => {
      if (playedCuepointsRef.current.has(cp.timeSeconds)) return false;

      if (isSeek) {
        // Para seeks: cualquier cuepoint entre lastTime y currentTime
        return cp.timeSeconds > lastTime && cp.timeSeconds <= currentTime;
      } else {
        // Para playback natural: cuepoint dentro de la tolerancia del currentTime
        return (
          cp.timeSeconds >= lastTime &&
          cp.timeSeconds <= currentTime &&
          Math.abs(currentTime - cp.timeSeconds) < NATURAL_TOLERANCE
        );
      }
    });

    if (unplayedInRange.length > 0) {
      // Tomar el primer cuepoint no jugado (más cercano al inicio)
      const cuepoint = unplayedInRange[0];
      playedCuepointsRef.current.add(cuepoint.timeSeconds);
      setPlayedCuepointsVersion((v) => v + 1);

      // Si fue un seek, guardar la posición de destino para reanudar después del ad
      if (isSeek) {
        resumeAfterAdTimeRef.current = currentTime;
      } else {
        resumeAfterAdTimeRef.current = null;
      }

      setActiveAdBreak({ vastUrls: cuepoint.vastUrls, type: 'midroll' });
      return; // No actualizar lastCheckedTime — se actualizará al terminar el ad
    }

    lastCheckedTimeRef.current = currentTime;
  }, [currentTime, duration, isLive, activeAdBreak, midrollCuepoints]);

  // Detección de postroll
  useEffect(() => {
    if (isLive || activeAdBreak !== null) return;
    if (!isEnded) return;
    if (postrollPlayedRef.current) return;
    if (postrollVastUrls.length === 0) return;

    postrollPlayedRef.current = true;
    resumeAfterAdTimeRef.current = null;
    setActiveAdBreak({ vastUrls: postrollVastUrls, type: 'postroll' });
  }, [isEnded, isLive, activeAdBreak, postrollVastUrls]);

  const onAdBreakFinished = useCallback(() => {
    const resumeTime = resumeAfterAdTimeRef.current;
    resumeAfterAdTimeRef.current = null;
    lastCheckedTimeRef.current = resumeTime ?? currentTime;
    setActiveAdBreak(null);
    // resumeTime se expone vía ref para que VideoPlayer haga seek
  }, [currentTime]);

  return {
    activeAdBreak,
    isAdBreakActive: activeAdBreak !== null,
    onAdBreakFinished,
    playedCuepointsArray,
    resumeAfterAdTime: resumeAfterAdTimeRef.current,
  };
}
