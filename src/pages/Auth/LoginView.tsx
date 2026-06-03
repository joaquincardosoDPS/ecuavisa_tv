import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
    useFocusable,
    FocusContext,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import api from '@/services/api';
import { RUDO_DEVICE_CODE_URL, RUDO_DEVICE_VERIFY_URL } from '@/config-global';
import { profileService } from '@/services/profileService';
import { useConfigStore } from '@/features/config/useConfigStore';
import { useAuthStore } from '@/features/auth/authStore';
import { isInputAction } from '@/utils/keycodes';
import logoFallback from '@/assets/img/logo.svg';
import styles from './LoginView.module.css';

interface DeviceCodeData {
    code_tv: string;
    expires: string;
    token_tv: string;
}

interface DeviceCodeResponse {
    status: string;
    code: number;
    msj: string;
    data: DeviceCodeData;
}

interface DeviceVerifyResponse {
    status: string;
    code: number;
    msj: string;
    user?: {
        id: string;
        email: string;
        name: string;
        last_name?: string | null;
        token: string;
        [key: string]: unknown;
    };
}

const LOGIN_FOCUS_KEY = 'sn:login';

function LoginView() {
    const navigate = useNavigate();
    const configLogo = useConfigStore((s) => s.config?.logo);
    const activationUrl = useConfigStore(
        (s) => s.config?.['url-tv-vincular'] || 'https://www.latina.pe/activacion',
    );
    const [deviceData, setDeviceData] = useState<DeviceCodeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const codeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const verifyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Focus context
    const { ref: containerRef, focusKey } = useFocusable({
        focusKey: LOGIN_FOCUS_KEY,
        trackChildren: true,
        isFocusBoundary: true,
    });

    // Back button (same as original: useFocusable with onEnterPress → navigate(-1))
    const { ref: backBtnRef, focused: backBtnFocused } = useFocusable({
        focusKey: 'sn:login-back-btn',
        onEnterPress: () => navigate(-1),
    });

    // Auto-focus back button on mount
    useEffect(() => {
        const timer = setTimeout(() => setFocus('sn:login-back-btn'), 300);
        return () => clearTimeout(timer);
    }, []);

    // Back key → go back (same as original BackButton component)
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (isInputAction(e, 'Back')) {
                e.preventDefault();
                e.stopPropagation();
                navigate(-1);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [navigate]);

    // ── Device code pairing logic ──
    const fetchDeviceCode = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { data } = await api.post<DeviceCodeResponse>(RUDO_DEVICE_CODE_URL, {});
            if (data.status === 'ok' && data.data && data.data.code_tv) {
                setDeviceData(data.data);
                localStorage.setItem('token_tv', data.data.token_tv);
            } else {
                setError(data.msj || 'Error al obtener el código');
            }
        } catch {
            setError('No se pudo conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkAuthentication = useCallback(async () => {
        try {
            const token_tv = localStorage.getItem('token_tv');
            if (!token_tv) return;

            const { data } = await api.post<DeviceVerifyResponse>(RUDO_DEVICE_VERIFY_URL, {
                token_tv,
            });

            if (data.status === 'ok' && data.user?.token) {
                console.log('[Auth] Device verified, user:', data.user.email);
                useAuthStore.getState().login(data.user.token, data.user);
                localStorage.removeItem('token_tv');

                try {
                    const profilesRes = await profileService.getAll(data.user.token);
                    const profiles = profilesRes?.data || [];
                    if (profiles.length > 0) {
                        useAuthStore.getState().setActiveProfile(profiles[0]);
                        console.log('[Auth] Default profile set:', profiles[0].name_perfil);
                    }
                } catch (err) {
                    console.warn('[Auth] Could not fetch profiles after login:', err);
                }

                navigate('/whoisthere', { replace: true });
            }
        } catch {
            /* Silenciar errores de polling */
        }
    }, [navigate]);

    useEffect(() => {
        fetchDeviceCode();
        codeIntervalRef.current = setInterval(() => fetchDeviceCode(), 30_000);
        verifyIntervalRef.current = setInterval(() => checkAuthentication(), 5_000);

        return () => {
            if (codeIntervalRef.current) clearInterval(codeIntervalRef.current);
            if (verifyIntervalRef.current) clearInterval(verifyIntervalRef.current);
        };
    }, [fetchDeviceCode, checkAuthentication]);

    const backBtnClass = [styles.backBtn, backBtnFocused && styles.focused]
        .filter(Boolean)
        .join(' ');

    return (
        <FocusContext.Provider value={focusKey}>
            {/* Stack direction="column" spacing={4} */}
            <div ref={containerRef} className={styles.container}>
                {/* Row 1: Back button (Box width: 100%, justify: flex-start) */}
                <div className={styles.backRow}>
                    <button
                        ref={backBtnRef}
                        className={backBtnClass}
                        onClick={() => navigate(-1)}
                        onMouseEnter={() => setFocus('sn:login-back-btn')}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                </div>

                {/* Row 2: Logo centered (flexGrow: 1, height: 0) */}
                <div className={styles.logoRow}>
                    <img
                        src={configLogo || logoFallback}
                        alt="Logo"
                        className={styles.logo}
                    />
                </div>

                {/* Row 3: Body — Stack direction="row" spacing={2} flexGrow={1} */}
                <div className={styles.body}>
                    {/* DeviceCodeAuth */}
                    <div className={styles.codeColumn}>
                        <p className={styles.codeText}>
                            Para iniciar sesion, debe vincular su televisor en el sitio web. Visite
                        </p>
                        <p className={styles.codeUrl}>
                            {activationUrl}
                        </p>
                        {isLoading ? (
                            <div className={styles.codeLoading}>
                                <div className={styles.spinner} />
                            </div>
                        ) : deviceData ? (
                            <div className={styles.codeChip}>
                                {deviceData.code_tv}
                            </div>
                        ) : null}
                        {error && <p className={styles.errorText}>{error}</p>}
                    </div>

                    {/* AuthDivider */}
                    <div className={styles.divider}>
                        <div className={styles.dividerLine} />
                        <span className={styles.dividerText}>o</span>
                        <div className={styles.dividerLine} />
                    </div>

                    {/* QrAuth */}
                    <div className={styles.qrColumn}>
                        <p className={styles.qrText}>
                            Escanee el siguiente código QR
                        </p>
                        <p className={styles.qrTextBottom}>
                            usando tu móvil:
                        </p>
                        <div className={styles.qrContainer}>
                            <QRCodeSVG
                                value={activationUrl}
                                size={300}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="M"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default LoginView;