import { useState, useEffect, useCallback, useRef } from 'react';
import api from '@/services/api';
import { RUDO_DEVICE_CODE_URL, RUDO_DEVICE_VERIFY_URL } from '@/config-global';
import { profileService } from '@/services/profileService';
import { useAuthStore } from '@/features/auth/authStore';

interface DeviceCodeData {
    code_tv: string;
    expires: string;
    token_tv: string;
}

interface DeviceCodeResponse {
    status: string;
    code: number;
    msj: string;
    data: DeviceCodeData;
}

interface DeviceVerifyResponse {
    status: string;
    code: number;
    msj: string;
    user?: {
        id: string;
        email: string;
        name: string;
        last_name?: string | null;
        token: string;
        [key: string]: unknown;
    };
}

/**
 * Hook de datos para LoginView.
 * Centraliza device code pairing + polling de verificación.
 */
export function useLoginData(onLoginSuccess: () => void) {
    const [deviceData, setDeviceData] = useState<DeviceCodeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const codeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const verifyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Ref para el callback para evitar re-crear checkAuthentication cada render
    const onLoginSuccessRef = useRef(onLoginSuccess);
    onLoginSuccessRef.current = onLoginSuccess;

    const fetchDeviceCode = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { data } = await api.post<DeviceCodeResponse>(RUDO_DEVICE_CODE_URL, {});
            if (data.status === 'ok' && data.data && data.data.code_tv) {
                setDeviceData(data.data);
                localStorage.setItem('token_tv', data.data.token_tv);
            } else {
                setError(data.msj || 'Error al obtener el código');
            }
        } catch {
            setError('No se pudo conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkAuthentication = useCallback(async () => {
        try {
            const token_tv = localStorage.getItem('token_tv');
            if (!token_tv) return;

            const { data } = await api.post<DeviceVerifyResponse>(RUDO_DEVICE_VERIFY_URL, {
                token_tv,
            });

            if (data.status === 'ok' && data.user?.token) {
                console.log('[Auth] Device verified, user:', data.user.email);
                useAuthStore.getState().login(data.user.token, data.user);
                localStorage.removeItem('token_tv');

                try {
                    const profilesRes = await profileService.getAll(data.user.token);
                    const profiles = profilesRes?.data || [];
                    if (profiles.length > 0) {
                        useAuthStore.getState().setActiveProfile(profiles[0]);
                        console.log('[Auth] Default profile set:', profiles[0].name_perfil);
                    }
                } catch (err) {
                    console.warn('[Auth] Could not fetch profiles after login:', err);
                }

                onLoginSuccessRef.current();
            }
        } catch {
            /* Silenciar errores de polling */
        }
    }, []); // Sin dependencia de onLoginSuccess — usa ref

    useEffect(() => {
        fetchDeviceCode();
        codeIntervalRef.current = setInterval(() => fetchDeviceCode(), 30_000);
        verifyIntervalRef.current = setInterval(() => checkAuthentication(), 5_000);

        return () => {
            if (codeIntervalRef.current) clearInterval(codeIntervalRef.current);
            if (verifyIntervalRef.current) clearInterval(verifyIntervalRef.current);
        };
    }, [fetchDeviceCode, checkAuthentication]);

    return { deviceData, isLoading, error };
}
