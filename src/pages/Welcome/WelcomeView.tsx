import { QRCodeSVG } from 'qrcode.react'
import Button from '@/components/ui/Button'
import logoSrc from '@/assets/img/logo.svg'
import panelSrc from '@/assets/img/panel.png'
import styles from './WelcomeView.module.css'

const REGISTER_URL = 'https://www.ecuavisa.com'

function WelcomeView() {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <img src={logoSrc} alt="Ecuavisa" className={styles.logo} />
                <h3 className={styles.subtitle}>
                    Accede ahora a nuestra app y disfruta nuestro contenido 24/7
                </h3>
                <Button variant="secondary" className={styles.button}>Iniciar sesión</Button>
                <p className={styles.text}>¿No tienes una cuenta?</p>
                <p className={styles.text}>
                    Regístrate en <span className={styles.link}>www.ecuavisa.com</span>
                </p>
                <p className={styles.text}>o escanea el código QR:</p>
                <div className={styles.qr}>
                    <QRCodeSVG
                        value={REGISTER_URL}
                        size={112}
                        bgColor="transparent"
                        fgColor="#ffffff"
                        level="M"
                    />
                </div>
            </div>
            <div className={styles.panel}>
                <img src={panelSrc} alt="" className={styles.panelImg} />
                <div className={styles.panelOverlay} />
            </div>
        </div>
    )
}

export default WelcomeView