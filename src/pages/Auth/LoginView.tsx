import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useLoginData } from '@/hooks/auth/useLoginData';
import { useConfigStore } from '@/features/config/useConfigStore';
import { isInputAction } from '@/utils/keyCodes';
import bgLogin from '@/assets/img/panel.png';
import styles from './LoginView.module.css';

function LoginView() {
  const navigate = useNavigate();
  const tvUrl = useConfigStore((s) => s.config?.['url-tv-vincular'] || 'https://www.ecuavisa.com/tv');
  const bgImage = useConfigStore((s) => s.config?.background) || bgLogin;

  const { deviceData, isLoading, error } = useLoginData(() =>
    navigate('/', { replace: true })
  );

  /* Botón Back → volver a la pantalla de bienvenida (REGLA 4.1) */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isInputAction(e, 'Back')) {
        e.preventDefault();
        e.stopPropagation();
        navigate('/auth/welcome', { replace: true });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

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
              Visita {tvUrl.replace(/^https?:\/\//, '')} o escanee el
              siguiente código QR usando su móvil:
            </p>
          </div>
          <div className={styles.stepBody}>
            <div className={styles.qrWrapper}>
              {isLoading ? (
                <div className={styles.qrLoading}>
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
          alt="Programas"
          className={styles.mosaicImage}
        />
        <div className={styles.mosaicOverlay} />
      </div>
    </div>
  );
}

export default LoginView;