export type Platform = 'tizen' | 'webos' | 'hisense' | 'web';

interface TizenApplication {
    getCurrentApplication: () => { exit: () => void };
}

interface TizenApi {
    application?: TizenApplication;
    power?: {
        request: (resource: string, state: string) => void;
        release: (resource: string) => void;
    };
}

interface WebOSApi {
    platformBack?: () => void;
    setWindowProperty?: (key: string, value: string) => void;
}

interface WebOSSystemApi {
    keepAlive?: (awake: boolean) => void;
}

interface WakeLockSentinel {
    release: () => Promise<void>;
}

interface WakeLockNavigator {
    wakeLock?: {
        request: (type: 'screen') => Promise<WakeLockSentinel>;
    };
}

declare const tizen: TizenApi | undefined;
declare const webOS: WebOSApi | undefined;

export function getPlatform(): Platform {
    if (typeof tizen !== 'undefined' && tizen?.application) return 'tizen';
    if (typeof webOS !== 'undefined' || navigator.userAgent.toLowerCase().includes('webos')) return 'webos';
    if (navigator.userAgent.toLowerCase().includes('hisense')) return 'hisense';
    return 'web';
}

export function exitApp(): void {
    const platform = getPlatform();

    switch (platform) {
        case 'tizen':
            try { tizen?.application?.getCurrentApplication().exit(); } catch { /* noop */ }
            break;
        case 'webos':
            try { webOS?.platformBack?.(); } catch { /* noop */ }
            break;
        default:
            break;
    }
}

let wakeLock: WakeLockSentinel | null = null;

export async function keepScreenAwake(awake: boolean): Promise<void> {
    const platform = getPlatform();

    if ('wakeLock' in navigator) {
        try {
            const wakeLockNavigator = navigator as WakeLockNavigator;
            if (awake && !wakeLock && wakeLockNavigator.wakeLock) {
                wakeLock = await wakeLockNavigator.wakeLock.request('screen');
            } else if (!awake && wakeLock) {
                await wakeLock.release();
                wakeLock = null;
            }
        } catch (err) {
            console.warn("WakeLock API error:", err);
        }
    }

    if (platform === 'tizen') {
        try {
            if (awake) {
                tizen?.power?.request("SCREEN", "SCREEN_NORMAL");
            } else {
                tizen?.power?.release("SCREEN");
            }
        } catch { /* noop */ }
    } else if (platform === 'webos') {
        try {
            if (typeof webOS !== 'undefined' && webOS.setWindowProperty) {
                webOS.setWindowProperty("keepAlive", awake ? "true" : "false");
            }

            const webOSSystem = (window as Window & { webOSSystem?: WebOSSystemApi; PalmSystem?: WebOSSystemApi })
                .webOSSystem || (window as Window & { webOSSystem?: WebOSSystemApi; PalmSystem?: WebOSSystemApi }).PalmSystem;
            if (webOSSystem && webOSSystem.keepAlive) {
                webOSSystem.keepAlive(awake);
            }
        } catch { /* noop */ }
    }
}
