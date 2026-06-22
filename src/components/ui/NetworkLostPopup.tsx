import { useNetworkStatus } from '@/hooks/shared/useNetworkStatus';
import styles from './NetworkLostPopup.module.css';

/**
 * Toast no-bloqueante de conexión perdida.
 * Aparece en la esquina superior derecha cuando se pierde la red.
 * Se oculta automáticamente al reconectarse.
 * No bloquea la interacción del usuario (pointer-events: none).
 *
 * Montado a nivel de App.tsx para cubrir TODAS las pantallas
 * incluyendo Login, Register y WhoIsThere (requisito CO-CN-02).
 */
export function NetworkLostPopup() {
    const isOnline = useNetworkStatus();

    const classList = [
        styles.toast,
        isOnline && styles.hidden,
    ].filter(Boolean).join(' ');

    return (
        <div className={classList}>
            {/* Ícono de wifi desconectado — SVG inline para compatibilidad */}
            <div className={styles.icon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 11l2-2c-3.73-3.73-8.87-5.15-13.7-4.31l2.58 2.58c3.3-.02 6.61 1.22 9.12 3.73zm-2 2a9.895 9.895 0 0 0-4.63-2.77l2.97 2.97L19 13zm-4 4l-3 3-3-3a4.237 4.237 0 0 1 6 0zM3.41 1.64L2 3.05 5.05 6.1C3.59 6.83 2.22 7.79 1 9l2 2c1.23-1.23 2.65-2.16 4.17-2.78l2.24 2.24A9.823 9.823 0 0 0 5 13l2 2a6.999 6.999 0 0 1 4.89-2.06l7.08 7.08 1.41-1.41L3.41 1.64z" />
                </svg>
            </div>

            <div className={styles.textWrap}>
                <p className={styles.title}>Sin conexión a internet</p>
                <p className={styles.subtitle}>Verifica tu conexión de red</p>
            </div>
        </div>
    );
}
