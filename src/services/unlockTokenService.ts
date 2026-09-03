import api from './api';
import { RUDO_CHAPTER_UNLOCK_TOKEN_URL } from '@/config-global';

/** Token de video firmado que devuelve unlock_token (st/ts/e). */
export interface ProtectedToken {
    st: string;
    ts: number;
    e: number;
}

interface UnlockTokenData extends Partial<ProtectedToken> {
    access_token?: string;
    [key: string]: unknown;
}

interface UnlockTokenResponse {
    status: string;
    code?: number;
    msj?: string;
    data?: UnlockTokenData;
}

export interface UnlockTokenParams {
    /** Token de sesión del usuario */
    token: string;
    /** Key del video del capítulo (key_video) */
    keyVideo: string;
}

/**
 * Devuelve los parámetros firmados para la URL del m3u8 (st, ts, e)
 * o null si no hay token.
 */
export function setSignedParams(protectedToken: ProtectedToken | null | undefined): string | null {
    return protectedToken
        ? `st=${encodeURIComponent(protectedToken.st)}&ts=${protectedToken.ts}&e=${protectedToken.e}`
        : null;
}

/**
 * Access token de capítulos protegidos (PPV). Usa la API de Rudo: el
 * interceptor de `api` inyecta `client` automáticamente en cada POST.
 */
export const unlockTokenService = {
    get: async ({ token, keyVideo }: UnlockTokenParams): Promise<UnlockTokenResponse> => {
        const { data } = await api.post<UnlockTokenResponse>(RUDO_CHAPTER_UNLOCK_TOKEN_URL, {
            token,
            key_video: keyVideo,
        });
        return data;
    },
};
