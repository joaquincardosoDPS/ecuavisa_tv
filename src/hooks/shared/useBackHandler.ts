import { useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentFocusKey, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { isInputAction } from '@/utils/keycodes';
import { exitApp } from '@/utils/platform';

/** Rutas principales del sidebar — Back muestra exit modal */
const MAIN_ROUTES = ['/live', '/home', '/buscar', '/programas', '/mi-lista'];

function isMainRoute(pathname: string): boolean {
    return MAIN_ROUTES.some(
        (route) => pathname === route || pathname === route + '/',
    );
}

export function useBackHandler(onExitRequest?: (currentFocusKey: string) => void) {
    const navigate = useNavigate();
    const location = useLocation();
    const savedFocusRef = useRef<string>('');

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isInputAction(e, 'Back')) return;

        e.preventDefault();
        e.stopPropagation();

        // En vistas principales del sidebar → siempre exit modal
        if (isMainRoute(location.pathname)) {
            if (onExitRequest) {
                savedFocusRef.current = getCurrentFocusKey();
                onExitRequest(savedFocusRef.current);
            } else {
                exitApp();
            }
            return;
        }

        // En vistas de programa (/programas/{slug}) → volver a la lista
        if (location.pathname.startsWith('/programas/')) {
            navigate('/programas', { replace: true });
            return;
        }

        // En sub-vistas (perfiles, cuenta, etc.) → retroceder
        navigate(-1);
    }, [navigate, onExitRequest, location.pathname]);

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
