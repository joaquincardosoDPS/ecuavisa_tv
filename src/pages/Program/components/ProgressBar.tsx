import styles from '../ProgramPage.module.css';

interface ProgressBarProps {
    duration: string;
    time: number;
}

/**
 * Barra de progreso para "Seguir Viendo".
 * duration viene en formato "hh:mm:ss", time es segundos reproducidos.
 */
function ProgressBar({ duration, time }: ProgressBarProps) {
    const parts = duration.split(':').map(Number);
    const totalSeconds =
        (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);

    if (totalSeconds <= 0) return null;

    const percentage = Math.min((time / totalSeconds) * 100, 100);

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBarOuter}>
                <div
                    className={styles.progressBarInner}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;
