import { fetchAppConfig } from '../../services/configService';
import { useConfigStore } from '../../features/config/useConfigStore';
import { useAuthStore } from '../../features/auth/authStore';
import { registerTVKeys } from '../../utils/platform';
import { useEffect, useRef } from 'react';
import { useFetch } from './useFetch';

export const useAppInitialization = () => {
    const setConfig = useConfigStore((state) => state.setConfig);
    const sessionChecked = useRef(false);

    const query = useFetch(() => fetchAppConfig(), []);

    useEffect(() => {
        if (query.data?.data) {
            const configData = query.data.data;
            setConfig(configData);
            registerTVKeys();

            if (configData.name) {
                document.title = configData.name;
            }

            const root = document.documentElement;
            Object.entries(configData).forEach(([key, value]) => {
                if (
                    key.startsWith('clr-') ||
                    key.startsWith('foc-') ||
                    key.startsWith('grad-')
                ) {
                    root.style.setProperty(`--${key}`, value as string);
                }
            });

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
