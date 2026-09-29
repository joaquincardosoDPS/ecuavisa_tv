import api from './api';
import { RUDO_PPV_LINK_CLIENT, RUDO_PPV_LINK_URL, RUDO_PPV_URL } from '@/config-global';

export interface PpvData {
    subscription_active: boolean;
    programs: string[];
}

interface PpvResponse {
    status: string;
    code: number;
    msj: string;
    data?: PpvData;
}

interface PpvLinkResponse {
    status: string;
    code?: number;
    msj?: string;
    data?: unknown;
}

export interface PpvLinkParams {
    /** Token de sesión del usuario */
    token: string;
    /** Key del programa (key_program) */
    keyProgram: string;
}

const LINK_KEYS = ['url', 'link', 'ppv_link', 'link_ppv', 'payment_url', 'link_pago'];

/** El API puede devolver la URL suelta o anidada en `data`, con nombres variables. */
function extractLink(payload: unknown, depth = 0): string | null {
    if (typeof payload === 'string') return payload.startsWith('http') ? payload : null;
    if (!payload || typeof payload !== 'object' || depth > 3) return null;

    const record = payload as Record<string, unknown>;

    for (const key of [...LINK_KEYS, 'data']) {
        const link = extractLink(record[key], depth + 1);
        if (link) return link;
    }

    for (const value of Object.values(record)) {
        const link = extractLink(value, depth + 1);
        if (link) return link;
    }

    return null;
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

    /** URL de pago del programa para el QR del modal de contenido de pago. */
    getLink: async ({ token, keyProgram }: PpvLinkParams): Promise<string | null> => {
        const { data } = await api.post<PpvLinkResponse>(RUDO_PPV_LINK_URL, {
            token,
            client: RUDO_PPV_LINK_CLIENT,
            key_program: keyProgram,
        });
        return extractLink(data);
    },
};
