import styles from '../ProgramPage.module.css';

interface ProgressBarProps {
    duration: string;
    time: number;
}

/** Formatea segundos a "Xh Xmin" o "Xmin" */
function formatRemaining(seconds: number): string {
    if (seconds <= 0) return '0min';
    const h = Math.floor(seconds / 3600);
    const m = Math.ceil((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}min`;
    return `${m}min`;
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
    const remaining = Math.max(totalSeconds - time, 0);

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBarOuter}>
                <div
                    className={styles.progressBarInner}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className={styles.progressRemaining}>
                {formatRemaining(remaining)} restantes
            </span>
        </div>
    );
}

export default ProgressBar;
