import { useState, useEffect } from 'react';
import axios from 'axios';
import { CLIENT, RUDO_SESSION } from '@/config-global';

interface SessionData {
    name: string;
    last_name: string;
    email: string;
    gender?: string;
}

/**
 * Hook de datos para AccountInfoView.
 * Centraliza el fetching de datos de sesión del usuario.
 */
export function useAccountData() {
    const [session, setSession] = useState<SessionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        const token = localStorage.getItem('auth_token') || '';

        if (!token) {
            setIsLoading(false);
            setError('No hay sesión activa.');
            return;
        }

        setIsLoading(true);
        setError('');

        axios
            .post(RUDO_SESSION, `client=${CLIENT}&token=${token}&_t=${Date.now()}`, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
            .then((response) => {
                if (cancelled) return;
                const data = response.data;
                if (data.status === 'error') {
                    setError(data.msj || 'Error al cargar la sesión.');
                } else if (data.user) {
                    setSession({
                        name: data.user.name || '',
                        last_name: data.user.last_name || '',
                        email: data.user.email || '',
                        gender: data.user.gender || '',
                    });
                }
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : 'Error al cargar la sesión.');
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => { cancelled = true; };
    }, []);

    return { session, isLoading, error };
}
