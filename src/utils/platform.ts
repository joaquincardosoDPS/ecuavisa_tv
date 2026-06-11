

export type Platform = 'tizen' | 'webos' | 'hisense' | 'web';

declare const tizen: any;
declare const webOS: any;

/**
 * Detecta la plataforma actual basándose en APIs globales y user-agent.
 */
export function getPlatform(): Platform {
    if (typeof tizen !== 'undefined' && tizen?.application) return 'tizen';
    if (typeof webOS !== 'undefined' || navigator.userAgent.toLowerCase().includes('webos')) return 'webos';
    if (navigator.userAgent.toLowerCase().includes('hisense')) return 'hisense';
    return 'web';
}

/**
 * Cierra la aplicación invocando la API nativa del SO del televisor.
 */
export function exitApp(): void {
    const platform = getPlatform();

    switch (platform) {
        case 'tizen':
            try { tizen.application.getCurrentApplication().exit(); } catch { /* noop */ }
            break;
        case 'webos':
            try {
                if (typeof webOS !== 'undefined' && webOS.platformBack) {
                    webOS.platformBack();
                } else {
                    window.close();
                }
            } catch {
                window.close();
            }
            break;
        default:
            window.close();
            break;
    }
}

/**
 * Registra las teclas multimedia en plataformas que lo requieran (Tizen).
 * Debe llamarse una vez al montar la app.
 */
export function registerTVKeys(): void {
    const platform = getPlatform();

    if (platform === 'tizen') {
        try {
            const supportedKeys = [
                'MediaPlay', 'MediaPause', 'MediaPlayPause', 'MediaStop',
                'MediaFastForward', 'MediaRewind',
                'ChannelUp', 'ChannelDown',
                'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue',
            ];
            supportedKeys.forEach((key) => {
                tizen.tvinputdevice?.registerKey(key);
            });
        } catch {
        }
    }
}

let wakeLock: any = null;

/**
 * Solicita mantener la pantalla encendida (evita el screensaver por inactividad).
 * Util para la vista de Live o reproductores que no están en pantalla completa.
 */
export async function keepScreenAwake(awake: boolean): Promise<void> {
    const platform = getPlatform();

    // 1. Intentar API estándar HTML5 (WakeLock API)
    if ('wakeLock' in navigator) {
        try {
            if (awake && !wakeLock) {
                wakeLock = await (navigator as any).wakeLock.request('screen');
            } else if (!awake && wakeLock) {
                await wakeLock.release();
                wakeLock = null;
            }
        } catch (err) {
            console.warn("WakeLock API error:", err);
        }
    }

    // 2. APIs nativas de Smart TV
    if (platform === 'tizen') {
        try {
            if (awake) {
                tizen.power.request("SCREEN", "SCREEN_NORMAL");
            } else {
                tizen.power.release("SCREEN");
            }
        } catch { /* noop */ }
    } else if (platform === 'webos') {
        try {
            if (typeof webOS !== 'undefined') {
                if (webOS.setWindowProperty) {
                    webOS.setWindowProperty("keepAlive", awake ? "true" : "false");
                }
            }
            
            // WebOS fallback for older versions using webOSSystem
            const webOSSystem = (window as any).webOSSystem || (window as any).PalmSystem;
            if (webOSSystem && webOSSystem.keepAlive) {
                webOSSystem.keepAlive(awake);
            }
        } catch { /* noop */ }
    }
}
