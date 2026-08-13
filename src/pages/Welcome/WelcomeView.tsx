import { useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
    FocusContext,
    setFocus,
    useFocusable,
} from '@noriginmedia/norigin-spatial-navigation'
import Button from '@/components/ui/Button'
import logoSrc from '@/assets/img/logo.svg'
import panelSrc from '@/assets/img/panel.png'
import styles from './WelcomeView.module.css'
import { useNavigate } from 'react-router-dom'

const REGISTER_URL = 'https://www.ecuavisa.com'

function WelcomeView() {
    const { ref: pageRef, focusKey: pageFocusKey } = useFocusable({
        focusKey: 'zone-welcome',
    })
    const navigate = useNavigate();

    const { ref: buttonRef, focused } = useFocusable<HTMLButtonElement>({
        focusKey: 'welcome-btn-login',
        onArrowPress: () => false,
        onEnterPress: () => navigate('/auth/login'),
    })

    useEffect(() => {
        setFocus('welcome-btn-login')
    }, [])

    return (
        <FocusContext.Provider value={pageFocusKey}>
            <div ref={pageRef} className={styles.page}>
                <div className={styles.content}>
                    <img src={logoSrc} alt="Ecuavisa" className={styles.logo} />
                    <h3 className={styles.subtitle}>
                        Accede ahora a nuestra app y disfruta nuestro contenido 24/7
                    </h3>
                    <Button
                        ref={buttonRef}
                        variant="secondary"
                        focused={focused}
                        className={styles.button}
                        onClick={() => navigate('/auth/login')}
                    >
                        Iniciar sesión
                    </Button>
                    <p className={styles.text}>¿No tienes una cuenta?</p>
                    <p className={styles.text}>
                        Regístrate en <span className={styles.link}>www.ecuavisa.com</span>
                    </p>
                    <p className={styles.text}>o escanéa el código QR:</p>
                    <div className={styles.qr}>
                        <QRCodeSVG
                            value={REGISTER_URL}
                            size={150}
                            bgColor="fff"
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
        </FocusContext.Provider>
    )
}

export default WelcomeView