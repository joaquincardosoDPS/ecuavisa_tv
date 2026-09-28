

export type Platform = 'tizen' | 'webos' | 'hisense' | 'web';

declare const tizen: {
  application: {
    getCurrentApplication(): { exit(): void };
  };
  tvinputdevice?: {
    registerKey(key: string): void;
  };
  power: {
    request(resource: string, state: string): void;
    release(resource: string): void;
  };
} | undefined;

declare const webOS: {
  setWindowProperty?(key: string, value: string): void;
} | undefined;

/**
 * Detecta la plataforma actual basándose en APIs globales y user-agent.
 */
export function getPlatform(): Platform {
    const ua = navigator.userAgent.toLowerCase();
    if (typeof tizen !== 'undefined' && tizen?.application) return 'tizen';
    // LG puede reportar "webOS" o "Web0S" (con cero) en el user-agent según modelo/versión
    if (typeof webOS !== 'undefined' || ua.includes('webos') || ua.includes('web0s')) return 'webos';
    if (ua.includes('hisense')) return 'hisense';
    return 'web';
}

/**
 * Detecta el dispositivo para analytics y para el parámetro `platform`
 * del redirector DPS (Mango). Devuelve un nombre legible por plataforma.
 */
export function getPlatformAnalytics(): string {
    const ua = navigator.userAgent.toLowerCase();

    if (typeof tizen !== 'undefined' || ua.includes('tizen')) return 'Samsung';
    if (typeof webOS !== 'undefined' || ua.includes('webos') || ua.includes('web0s')) return 'LG';
    if (ua.includes('hisense') || ua.includes('vidaa')) return 'Hisense';
    if (ua.includes('roku')) return 'Roku';
    if (ua.includes('android') && (ua.includes('tv') || ua.includes('atv'))) return 'AndroidTV';

    return 'desktop';
}

/**
 * Cierra la aplicación invocando la API nativa del SO del televisor.
 */
export function exitApp(): void {
    const platform = getPlatform();

    switch (platform) {
        case 'tizen':
            try { tizen!.application.getCurrentApplication().exit(); } catch { /* noop */ }
            break;
        case 'webos':
            // Doc oficial LG: las apps con popup de salida propio deben cerrar
            // con window.close() (requiere disableBackHistoryAPI: true en
            // appinfo.json, ya configurado en platforms/webos/appinfo.json)
            try { window.close(); } catch { /* noop */ }

            // Fallback: si window.close() fue ignorado silenciosamente por la
            // versión de webOS, procesar el Back con el objeto nativo de la
            // plataforma (PalmSystem/webOSSystem se inyectan sin necesidad de
            // webOSTV.js): webOS 6+ muestra el diálogo de salida del sistema;
            // webOS 5.0 o inferior lanza el Home launcher. El timer nunca se
            // ejecuta si la app ya se cerró con window.close().
            setTimeout(() => {
                try {
                    const win = window as Window & {
                        PalmSystem?: { platformBack?: () => void };
                        webOSSystem?: { platformBack?: () => void };
                    };
                    const native = [win.webOSSystem, win.PalmSystem].find(
                        (obj) => typeof obj?.platformBack === 'function',
                    );
                    native?.platformBack?.();
                } catch { /* noop */ }
            }, 500);
            break;
        case 'hisense':
            try { window.close(); } catch { /* noop */ }
            break;
        default:
            // En browser, cerrar la pestaña (solo funciona si fue abierta por script)
            try { window.close(); } catch { /* noop */ }
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
                tizen!.tvinputdevice?.registerKey(key);
            });
        } catch { /* noop — API may not exist on all platforms */ }
    }
}

let wakeLock: { release(): Promise<void> } | null = null;

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
                wakeLock = await (navigator as Navigator & { wakeLock: { request(type: string): Promise<{ release(): Promise<void> }> } }).wakeLock.request('screen');
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
                tizen!.power.request("SCREEN", "SCREEN_NORMAL");
            } else {
                tizen!.power.release("SCREEN");
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
            const webOSSystem = (window as Window & { webOSSystem?: { keepAlive(v: boolean): void }; PalmSystem?: { keepAlive(v: boolean): void } }).webOSSystem
              || (window as Window & { PalmSystem?: { keepAlive(v: boolean): void } }).PalmSystem;
            if (webOSSystem && webOSSystem.keepAlive) {
                webOSSystem.keepAlive(awake);
            }
        } catch { /* noop */ }
    }
}
