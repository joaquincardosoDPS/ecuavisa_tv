/**
 * Servicio de sesión HLS para el redirector DPS
 *
 * Gestiona dpssid (device persistent session ID) y sid (stream session ID)
 * para que el redirector DPS identifique dispositivos recurrentes (ndvc=0)
 * vs. nuevos (ndvc=1).
 */


export interface HlsSessionParams {
    dpssid: string;
    ndvc: string;
    sid: string;
}

/**
 * Obtiene o genera los parámetros de sesión HLS.
 * - dpssid: persistente en localStorage (se genera una sola vez por dispositivo)
 * - sid: único por cada llamada (identifica una sesión de stream individual)
 * - ndvc: '1' si el dpssid acaba de crearse, '0' si ya existía
 */
export async function getHlsSessionParams(): Promise<HlsSessionParams> {
    const STORAGE_DPSSID = 'dps_session_dpssid';
    // El código PHP usa $prefix y $prefixsid, permitimos pasarlos si en un futuro son requeridos.
    const sid = generateLocalId('');

    let dpssid = localStorage.getItem(STORAGE_DPSSID);
    let ndvc = '0';

    if (!dpssid) {
        dpssid = generateLocalId('');
        localStorage.setItem(STORAGE_DPSSID, dpssid);
        ndvc = '1';
    }

    return { dpssid, ndvc, sid };
}

// Genera un string hexadecimal local emulando bin2hex(random_bytes(16)) en PHP
function generateLocalId(prefix: string = ''): string {
    const size = 16;
    const array = new Uint8Array(size);

    if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(array);
    } else {
        for (let i = 0; i < size; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }
    }

    const hex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    return prefix + hex;
}

/**
 * Inyecta parámetros de sesión DPS a una URL de video.
 * Compatible con navegadores antiguos (Tizen 3.0 / Chromium 47).
 */
export function forceSessionParams(url: string, params: HlsSessionParams): string {
    if (!url || url === 'undefined' || url === 'null') return url;

    try {
        const urlObj = new URL(
            url.startsWith('http') ? url : window.location.origin + (url.startsWith('/') ? '' : '/') + url,
        );
        urlObj.searchParams.set('dpssid', params.dpssid);
        urlObj.searchParams.set('ndvc', params.ndvc);
        urlObj.searchParams.set('sid', params.sid);

        if (!url.startsWith('http')) {
            return urlObj.pathname + urlObj.search;
        }
        return urlObj.toString();
    } catch (_e) {
        // Fallback manual si el objeto URL falla en navegadores antiguos
        let newUrl = url;
        const entries = [
            `dpssid=${params.dpssid}`,
            `ndvc=${params.ndvc}`,
            `sid=${params.sid}`,
        ];
        entries.forEach(param => {
            const key = param.split('=')[0];
            const regex = new RegExp(`([?&])${key}=([^&]*)`, 'i');
            if (newUrl.match(regex)) {
                newUrl = newUrl.replace(regex, `$1${param}`);
            } else {
                newUrl += (newUrl.indexOf('?') > -1 ? '&' : '?') + param;
            }
        });
        return newUrl;
    }
}
