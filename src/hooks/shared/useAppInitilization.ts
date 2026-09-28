// src/hooks/shared/useAppInitilization.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAppConfig } from '../../services/configService';
import { useConfigStore } from '../../features/config/useConfigStore';
import { useAuthStore } from '../../features/auth/authStore';
import { initGtag } from './useGoogleAnalytics';
import { useEffect, useRef } from 'react';

// rgba() requiere el color en canales separados ("r, g, b"), no el hex original
function hexToRgb(hex: string): string | null {
    const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthand, (_m, r, g, b) => r + r + g + g + b + b);
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return match
        ? `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`
        : null;
}

export const useAppInitialization = () => {
    const setConfig = useConfigStore((state) => state.setConfig);
    const sessionChecked = useRef(false);

    const query = useQuery({
        queryKey: ['app-config'],
        queryFn: fetchAppConfig,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (query.data?.data) {
            const configData = query.data.data;
            setConfig(configData);

            // Título del sitio
            if (configData.name) {
                document.title = configData.name;
            }


            // Injecta variables CSS dinámicamente
            const root = document.documentElement;

            Object.entries(configData).forEach(([key, value]) => {
                // Filtra solo las propiedades de estilo
                if (
                    key.startsWith('clr-') ||
                    key.startsWith('foc-') ||
                    key.startsWith('grad-')
                ) {
                    root.style.setProperty(`--${key}`, value as string);
                    const rgb = hexToRgb(value as string);
                    if (rgb) {
                        root.style.setProperty(`--${key}-rgb`, rgb);
                    }
                }
            });

            // Inicializar Google Analytics si el cliente tiene key-analytics configurado
            const analyticsKey = configData["key-analytics"];
            if (analyticsKey) {
                initGtag(analyticsKey);
            }

            // Validar sesión una vez al cargar la app
            if (!sessionChecked.current) {
                sessionChecked.current = true;
                const { token, validateSession } = useAuthStore.getState();
                if (token) {
                    validateSession();
                }
            }
        }
    }, [query.data, setConfig]);

    return query;
};

