import { useEffect, useRef } from 'react';
import { setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { isInputAction } from '@/utils/keyCodes';

interface UsePlayerKeyboardOptions {
    onBack: () => void;
    isUIVisible: boolean;
    showUI: () => void;
    isLive?: boolean;
    playingAds?: boolean;
    pipMode?: boolean;
    isPlaying?: boolean;
    pause?: () => void;
    focusKeys?: {
        playPause?: string;
        seekbar?: string;
    };
    enabled?: boolean;
}

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

const DEFAULT_FOCUS_KEYS = {
    playPause: 'PLAYER-BTN-PLAYPAUSE',
    seekbar: 'PLAYER-SEEKBAR-THUMB',
};

export function usePlayerKeyboard(options: UsePlayerKeyboardOptions): void {
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

        const showAndGuard = (): void => {
            controlsJustShownRef.current = true;
            showUIRef.current();
            setTimeout(() => {
                controlsJustShownRef.current = false;
            }, 150);
        };

        const handleKeyDown = (e: KeyboardEvent): void => {
            if (playingAdsRef.current) return;

            if (isInputAction(e, 'Back')) {
                e.preventDefault();
                e.stopPropagation();
                onBackRef.current();
                return;
            }

            if (pipModeRef.current) return;

            if (!isUIVisible) {
                const isConfirm = isInputAction(e, 'Enter') || isInputAction(e, 'PlayPause');
                if (isConfirm) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isPlayingRef.current && pauseRef.current) {
                        pauseRef.current();
                    }
                    showAndGuard();
                    setTimeout(() => setFocus(getPlayPauseKey()), 50);
                    return;
                }

                const code = e.keyCode;
                if ((code === ARROW_LEFT || code === ARROW_RIGHT) && !isLiveRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    showAndGuard();
                    setTimeout(() => setFocus(getSeekbarKey()), 50);
                    return;
                }

                if (code === ARROW_UP || code === ARROW_DOWN) {
                    e.preventDefault();
                    e.stopPropagation();
                    showAndGuard();
                    setTimeout(() => setFocus(getPlayPauseKey()), 50);
                    return;
                }
            }

            if (controlsJustShownRef.current) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            showUIRef.current();
        };

        window.addEventListener('keydown', handleKeyDown, true);

        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [enabled, isUIVisible]);
}
