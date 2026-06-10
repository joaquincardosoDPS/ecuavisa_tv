import { fetchAppConfig } from '../../services/configService';
import { useConfigStore } from '../../features/config/useConfigStore';
import { useAuthStore } from '../../features/auth/authStore';
import { registerTVKeys } from '../../utils/platform';
import { applyConfigToCSS } from '../../utils/applyConfigToCSS';
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

            // Aplicar colores/fuentes de la API a CSS (con soporte ponyfill para webOS 3)
            applyConfigToCSS(configData);

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

