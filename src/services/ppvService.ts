import api from './api';
import { RUDO_PPV_URL } from '@/config-global';

interface PpvData {
    subscription_active: boolean;
    programs: string[];
}

interface PpvResponse {
    status: string;
    code: number;
    msj: string;
    data?: PpvData;
}

/**
 * Contenido comprado por el usuario (PPV): trae los slugs de los programas
 * adquiridos para desbloquear su reproducción.
 */
export const ppvService = {
    getPurchased: async (token: string): Promise<PpvResponse> => {
        const { data } = await api.post<PpvResponse>(RUDO_PPV_URL, { token });
        return data;
    },
};
