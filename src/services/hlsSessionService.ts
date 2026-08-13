export interface HlsSessionParams {
    dpssid: string;
    ndvc: string;
    sid: string;
}

export async function getHlsSessionParams(): Promise<HlsSessionParams> {
    const STORAGE_DPSSID = 'dps_session_dpssid';
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
    } catch {
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
