import { useState, useEffect, useRef } from 'react';

const POLL_INTERVAL = 10000; // Verificar cada 10 segundos
const PING_TIMEOUT = 5000;  // Timeout de 5 segundos

/**
 * Hook que monitorea el estado de la conexión de red.
 *
 * Estrategia dual para máxima compatibilidad con Smart TVs:
 * 1. Escucha eventos nativos `online` / `offline` (respuesta instantánea)
 * 2. Polling periódico con fetch HEAD (fallback para TVs que no disparan eventos)
 *
 * Compatible con Chrome 38+ (webOS 1) y todos los Smart TVs.
 */
export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(
        typeof navigator !== 'undefined' ? navigator.onLine : true,
    );
    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        // ── 1. Eventos nativos (instantáneos cuando funcionan) ──
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // ── 2. Polling periódico (fallback para TVs legacy) ──
        const checkConnection = () => {
            // Intentar hacer fetch a un recurso mínimo
            // Usamos la propia app (favicon o /) para no depender de servidores externos
            const controller = typeof AbortController !== 'undefined'
                ? new AbortController()
                : null;

            const timeout = setTimeout(() => {
                if (controller) controller.abort();
            }, PING_TIMEOUT);

            fetch('/', {
                method: 'HEAD',
                cache: 'no-store',
                signal: controller?.signal,
            })
                .then(() => {
                    clearTimeout(timeout);
                    setIsOnline(true);
                })
                .catch(() => {
                    clearTimeout(timeout);
                    // Solo marcar offline si navigator también dice offline
                    // para evitar falsos negativos por CORS o errores del server
                    if (!navigator.onLine) {
                        setIsOnline(false);
                    }
                });
        };

        intervalRef.current = setInterval(checkConnection, POLL_INTERVAL);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return isOnline;
}
