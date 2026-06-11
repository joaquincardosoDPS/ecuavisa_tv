import { Spinner } from "./Spinner";
import styles from './FullScreenSpinner.module.css';

interface FullScreenSpinnerProps {
    /** Si true, muestra el logo encima del spinner (para splash screen) */
    showLogo?: boolean;
    logo?: string;
}

export function FullScreenSpinner({ showLogo, logo }: FullScreenSpinnerProps) {
    return (
        <div className={styles.overlay}>
            {showLogo && logo && (
                <img src={logo} alt="Logo" className={styles.logo} draggable={false} />
            )}
            <Spinner />
        </div>
    );
}
