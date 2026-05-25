import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import api from '@/services/api';
import { RUDO_DEVICE_CODE_URL, RUDO_DEVICE_VERIFY_URL } from '@/config-global';
import { profileService } from '@/services/profileService';
import { useConfigStore } from '@/features/config/useConfigStore';
import { useAuthStore } from '@/features/auth/authStore';
import { isInputAction } from '@/utils/keycodes';
import bgPrograms from '@/assets/img/bgPrograms.png';
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

function LoginView() {
    const navigate = useNavigate();
    const tvUrl = useConfigStore((s) => s.config?.['url-tv-vincular'] || 'https://www.chv.cl/tv');
    const bgImage = useConfigStore((s) => s.config?.background_image) || bgPrograms;
    const [deviceData, setDeviceData] = useState<DeviceCodeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /* Botón Back → volver al home (REGLA 4.1) */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (isInputAction(e, 'Back')) {
                e.preventDefault();
                e.stopPropagation();
                navigate('/home', { replace: true });
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [navigate]);

    const codeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const verifyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /**
     * Solicita un nuevo código de dispositivo a la API.
     */
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

    /**
     * Verifica si el usuario ya vinculó el dispositivo desde el móvil/web.
     * Hace polling cada 5 segundos.
     */
    const checkAuthentication = useCallback(async () => {
        try {
            const token_tv = localStorage.getItem('token_tv');
            if (!token_tv) return;

            const { data } = await api.post<DeviceVerifyResponse>(RUDO_DEVICE_VERIFY_URL, {
                token_tv,
            });

            if (data.status === 'ok' && data.user?.token) {
                /* Vinculación exitosa — guardar auth en LS */
                console.log('[Auth] Device verified, user:', data.user.email);
                useAuthStore.getState().login(data.user.token, data.user);
                localStorage.removeItem('token_tv');

                /* Cargar perfiles y setear el primero como activo */
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

                navigate('/perfiles', { replace: true });
            }
        } catch {
            /* Silenciar errores de polling */
        }
    }, [navigate]);

    /* Efecto inicial: obtener código + arrancar intervalos */
    useEffect(() => {
        fetchDeviceCode();

        /* Renovar código cada 30s */
        codeIntervalRef.current = setInterval(() => {
            fetchDeviceCode();
        }, 30_000);

        /* Verificar auth cada 5s */
        verifyIntervalRef.current = setInterval(() => {
            checkAuthentication();
        }, 5_000);

        return () => {
            if (codeIntervalRef.current) clearInterval(codeIntervalRef.current);
            if (verifyIntervalRef.current) clearInterval(verifyIntervalRef.current);
        };
    }, [fetchDeviceCode, checkAuthentication]);

    const qrUrl = deviceData
        ? `${tvUrl}?code=${deviceData.code_tv}`
        : '';

    return (
        <div className={styles.container}>
            {/* Panel izquierdo — instrucciones de vinculación */}
            <div className={styles.leftPanel}>
                <h1 className={styles.heading}>
                    Para iniciar sesión, debes vincular su televisor
                </h1>

                {/* Paso 1 — QR */}
                <div className={styles.step}>
                    <div className={styles.stepHeader}>
                        <span className={styles.stepNumber}>1</span>
                        <p className={styles.stepText}>
                            Visita {tvUrl.replace(/^https?:\/\//, '')} o Escanee el
                            siguiente código QR usando su móvil:
                        </p>
                    </div>
                    <div className={styles.stepBody}>
                        <div className={styles.qrWrapper}>
                            {isLoading ? (
                                <div style={{ width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className={styles.loadingText}>Cargando...</span>
                                </div>
                            ) : qrUrl ? (
                                <QRCodeSVG
                                    value={qrUrl}
                                    size={160}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="M"
                                />
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Paso 2 — Código */}
                <div className={styles.step}>
                    <div className={styles.stepHeader}>
                        <span className={styles.stepNumber}>2</span>
                        <p className={styles.stepText}>
                            Ingresa el siguiente código
                        </p>
                    </div>
                    <div className={styles.stepBody}>
                        {isLoading ? (
                            <span className={styles.loadingText}>Generando código...</span>
                        ) : deviceData ? (
                            <div className={styles.codeBox}>
                                {deviceData.code_tv}
                            </div>
                        ) : null}
                        {error && <p className={styles.errorText}>{error}</p>}
                    </div>
                </div>

                {/* Link alternativo */}
                <p className={styles.emailLink}>
                    O ingresa con tu correo electrónico
                </p>
            </div>

            {/* Panel derecho — mosaico de programas */}
            <div className={styles.rightPanel}>
                <img
                    src={bgImage}
                    // src={bgPrograms}
                    alt="Programas Chilevisión"
                    className={styles.mosaicImage}
                />
                <div className={styles.mosaicOverlay} />
            </div>
        </div>
    );
}

export default LoginView;