import { useState, useEffect, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
    useFocusable,
    FocusContext,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { useAuthNavigation } from '@/hooks/auth/useAuthNavigation';
import { useConfigStore } from '@/features/config/useConfigStore';
import { useAuthStore } from '@/features/auth/authStore';
import { isInputAction } from '@/utils/keycodes';
import logoFallback from '@/assets/img/logo.svg';
import styles from './RegisterView.module.css';

const REGISTER_FOCUS_KEY = 'sn:register';

function RegisterView() {
    const configLogo = useConfigStore((s) => s.config?.logo);
    const activationUrl = useConfigStore(
        (s) => s.config?.['url-tv-vincular'] || 'https://latina.pe/activacion',
    );
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    const [showExitDialog, setShowExitDialog] = useState(false);
    const [exitSelection, setExitSelection] = useState<'cancel' | 'exit'>('cancel');

    /* ── Hook de navegación ── */
    const { goToLogin, goToLive } = useAuthNavigation();

    // If already authenticated, redirect away
    useEffect(() => {
        if (isAuthenticated) goToLive();
    }, [isAuthenticated, goToLive]);

    // Focus context for the page
    const { ref: containerRef, focusKey } = useFocusable({
        focusKey: REGISTER_FOCUS_KEY,
        trackChildren: true,
        isFocusBoundary: true,
    });

    // "Iniciar sesión" button
    const { ref: loginBtnRef, focused: loginBtnFocused } = useFocusable({
        focusKey: 'sn:register-login-btn',
        onEnterPress: goToLogin,
    });

    // Auto-focus login button on mount
    useEffect(() => {
        const timer = setTimeout(() => setFocus('sn:register-login-btn'), 300);
        return () => clearTimeout(timer);
    }, []);

    // Back key → show exit dialog 
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (showExitDialog) {
                if (e.key === 'ArrowLeft' || e.keyCode === 37) {
                    setExitSelection('cancel');
                } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
                    setExitSelection('exit');
                } else if (e.key === 'Enter' || e.keyCode === 13) {
                    if (exitSelection === 'exit') {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const w = window as any;
                            if (w.tizen?.application) {
                                w.tizen.application.getCurrentApplication().exit();
                            } else if (w.webOS?.platformBack) {
                                w.webOS.platformBack();
                            }
                        } catch {
                            window.close();
                        }
                    } else {
                        setShowExitDialog(false);
                        setFocus('sn:register-login-btn');
                    }
                } else if (isInputAction(e, 'Back')) {
                    e.preventDefault();
                    setShowExitDialog(false);
                    setFocus('sn:register-login-btn');
                }
                return;
            }

            if (isInputAction(e, 'Back')) {
                e.preventDefault();
                e.stopPropagation();
                setShowExitDialog(true);
            }
        },
        [showExitDialog, exitSelection],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const loginBtnClass = [
        styles.loginBtn,
        loginBtnFocused && styles.focused,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={containerRef} className={styles.container}>
                {/* ── Header (Logo + Iniciar sesión button) ── */}
                <div className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <img
                            src={configLogo || logoFallback}
                            alt="Logo"
                            className={styles.logo}
                        />
                    </div>
                    <div className={styles.loginBtnWrapper}>
                        <button
                            ref={loginBtnRef}
                            className={loginBtnClass}
                            onClick={goToLogin}
                            onMouseEnter={() => setFocus('sn:register-login-btn')}
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </div>

                {/* ── Body (text + QR) ── */}
                <div className={styles.body}>
                    {/* Left — text */}
                    <div className={styles.textColumn}>
                        <h2 className={styles.mainTitle}>
                            Suscríbete Y Descubre
                        </h2>
                        <p className={styles.subtitle}>
                            ¿No tienes una Cuenta?
                        </p>
                        <p className={styles.subtitleSmall}>
                            Escanea el código QR para iniciar tu registro.
                        </p>
                    </div>

                    {/* Right — QR code */}
                    <div className={styles.qrColumn}>
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

            {/* ── Exit dialog ── */}
            {showExitDialog && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialog}>
                        <img
                            src={configLogo || logoFallback}
                            alt="Logo"
                            className={styles.dialogLogo}
                        />
                        <h2 className={styles.dialogTitle}>¿Salir app?</h2>
                        <p className={styles.dialogSubtitle}>
                            ¿Estás seguro de que deseas salir?
                        </p>
                        <div className={styles.dialogActions}>
                            <button
                                className={`${styles.dialogBtn} ${exitSelection === 'cancel' ? styles.focused : ''}`}
                                onClick={() => {
                                    setShowExitDialog(false);
                                    setFocus('sn:register-login-btn');
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                className={`${styles.dialogBtn} ${exitSelection === 'exit' ? styles.focused : ''}`}
                                onClick={() => window.close()}
                            >
                                Sí, Salir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </FocusContext.Provider>
    );
}

export default RegisterView;
