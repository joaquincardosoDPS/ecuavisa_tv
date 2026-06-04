import { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
    useFocusable,
    FocusContext,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { useLoginData } from '@/hooks/auth/useLoginData';
import { useAuthNavigation } from '@/hooks/auth/useAuthNavigation';
import { useConfigStore } from '@/features/config/useConfigStore';
import { isInputAction } from '@/utils/keycodes';
import logoFallback from '@/assets/img/logo.svg';
import styles from './LoginView.module.css';

const LOGIN_FOCUS_KEY = 'sn:login';

function LoginView() {
    const configLogo = useConfigStore((s) => s.config?.logo);
    const activationUrl = useConfigStore(
        (s) => s.config?.['url-tv-vincular'] || 'https://www.latina.pe/activacion',
    );

    /* ── Hooks de datos y navegación ── */
    const { goBack, goToWhoIsThere } = useAuthNavigation();
    const { deviceData, isLoading, error } = useLoginData(goToWhoIsThere);

    /* ── Foco ── */
    const { ref: containerRef, focusKey } = useFocusable({
        focusKey: LOGIN_FOCUS_KEY,
        trackChildren: true,
        isFocusBoundary: true,
    });

    const { ref: backBtnRef, focused: backBtnFocused } = useFocusable({
        focusKey: 'sn:login-back-btn',
        onEnterPress: goBack,
    });

    useEffect(() => {
        const timer = setTimeout(() => setFocus('sn:login-back-btn'), 300);
        return () => clearTimeout(timer);
    }, []);

    // Back key → go back
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (isInputAction(e, 'Back')) {
                e.preventDefault();
                e.stopPropagation();
                goBack();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [goBack]);

    const backBtnClass = [styles.backBtn, backBtnFocused && styles.focused]
        .filter(Boolean)
        .join(' ');

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={containerRef} className={styles.container}>
                {/* Row 1: Back button */}
                <div className={styles.backRow}>
                    <button
                        ref={backBtnRef}
                        className={backBtnClass}
                        onClick={goBack}
                        onMouseEnter={() => setFocus('sn:login-back-btn')}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                </div>

                {/* Row 2: Logo centered */}
                <div className={styles.logoRow}>
                    <img
                        src={configLogo || logoFallback}
                        alt="Logo"
                        className={styles.logo}
                    />
                </div>

                {/* Row 3: Body — code + QR */}
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