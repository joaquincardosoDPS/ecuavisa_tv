import { useState, useRef, useCallback, useEffect } from 'react';

interface UseUIVisibilityOptions {
    autoHideMs?: number;
    preventHide?: boolean;
}

interface UseUIVisibilityReturn {
    isUIVisible: boolean;
    setIsUIVisible: (visible: boolean) => void;
    resetUIVisibility: () => void;
}

export function useUIVisibility(options?: UseUIVisibilityOptions): UseUIVisibilityReturn {
    const autoHideMs = (options && options.autoHideMs !== undefined) ? options.autoHideMs : 4000;
    const preventHide = (options && options.preventHide !== undefined) ? options.preventHide : false;

    const [isUIVisible, setIsUIVisible] = useState(true);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
