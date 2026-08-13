import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import type { AdBreakCuepoint } from '@/services/adsService';

interface UseAdBreaksProps {
    midrollCuepoints: AdBreakCuepoint[];
    postrollVastUrls: string[];
    currentTime: number;
    duration: number;
    isEnded: boolean;
    isLive: boolean;
    initialSeconds?: number;
}

interface ActiveAdBreak {
    vastUrls: string[];
    type: 'midroll' | 'postroll';
}

interface UseAdBreaksResult {
    activeAdBreak: ActiveAdBreak | null;
    isAdBreakActive: boolean;
    onAdBreakFinished: () => void;
    playedCuepointsArray: number[];
    resumeAfterAdTime: number | null;
}

const NATURAL_TOLERANCE = 1.5;
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

    const playedCuepointsRef = useRef<Set<number>>(new Set());
    const lastCheckedTimeRef = useRef<number>(0);
    const postrollPlayedRef = useRef(false);
    const resumeAfterAdTimeRef = useRef<number | null>(null);

    const [playedCuepointsVersion, setPlayedCuepointsVersion] = useState(0);

    useEffect(() => {
        playedCuepointsRef.current = new Set();
        postrollPlayedRef.current = false;
        resumeAfterAdTimeRef.current = null;
        setActiveAdBreak(null);
        setPlayedCuepointsVersion(0);

        // Los midrolls anteriores al punto de reanudación no deben dispararse
        lastCheckedTimeRef.current = initialSeconds ?? 0;
    }, [midrollCuepoints, initialSeconds]);

    const playedCuepointsArray = useMemo(() => {
        void playedCuepointsVersion;
        return Array.from(playedCuepointsRef.current);
    }, [playedCuepointsVersion]);

    useEffect(() => {
        if (isLive || activeAdBreak !== null || midrollCuepoints.length === 0) return;
        if (duration <= 0 || currentTime <= 0) return;

        const lastTime = lastCheckedTimeRef.current;
        const timeDelta = currentTime - lastTime;

        if (timeDelta <= 0) {
            lastCheckedTimeRef.current = currentTime;
            return;
        }

        const isSeek = timeDelta > SEEK_THRESHOLD;

        const unplayedInRange = midrollCuepoints.filter((cp) => {
            if (playedCuepointsRef.current.has(cp.timeSeconds)) return false;

            if (isSeek) {
                return cp.timeSeconds > lastTime && cp.timeSeconds <= currentTime;
            } else {
                return (
                    cp.timeSeconds >= lastTime &&
                    cp.timeSeconds <= currentTime &&
                    Math.abs(currentTime - cp.timeSeconds) < NATURAL_TOLERANCE
                );
            }
        });

        if (unplayedInRange.length > 0) {
            const cuepoint = unplayedInRange[0];
            playedCuepointsRef.current.add(cuepoint.timeSeconds);
            setPlayedCuepointsVersion((v) => v + 1);

            if (isSeek) {
                resumeAfterAdTimeRef.current = currentTime;
            } else {
                resumeAfterAdTimeRef.current = null;
            }

            setActiveAdBreak({ vastUrls: cuepoint.vastUrls, type: 'midroll' });
            return;
        }

        lastCheckedTimeRef.current = currentTime;
    }, [currentTime, duration, isLive, activeAdBreak, midrollCuepoints]);

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
    }, [currentTime]);

    return {
        activeAdBreak,
        isAdBreakActive: activeAdBreak !== null,
        onAdBreakFinished,
        playedCuepointsArray,
        resumeAfterAdTime: resumeAfterAdTimeRef.current,
    };
}
