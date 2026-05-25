import { Spinner } from "./Spinner";
import styles from './FullScreenSpinner.module.css';

export function FullScreenSpinner() {
    return (
        <div className={styles.overlay}>
            <Spinner />
        </div>
    );
}
