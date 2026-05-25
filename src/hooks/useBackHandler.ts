import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentFocusKey, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { isInputAction } from '@/utils/keycodes';
import { exitApp } from '@/utils/platform';

export function useBackHandler(onExitRequest?: (currentFocusKey: string) => void) {
    const navigate = useNavigate();
    const savedFocusRef = useRef<string>('');

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isInputAction(e, 'Back')) return;

        e.preventDefault();
        e.stopPropagation();

        // Si hay historial, simplemente retrocedemos.
        const historyIndex = window.history.state?.idx ?? 0;
        if (historyIndex > 0) {
            navigate(-1);
            return;
        }

        // Si no hay más historial, pedimos salida.
        if (onExitRequest) {
            savedFocusRef.current = getCurrentFocusKey();
            onExitRequest(savedFocusRef.current);
        } else {
            exitApp();
        }
    }, [navigate, onExitRequest]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    /** Restaura el foco al cancelar la salida */
    const restoreFocus = useCallback(() => {
        if (savedFocusRef.current) {
            setFocus(savedFocusRef.current);
        }
    }, []);

    return { restoreFocus };
}
