

import styles from './Spinner.module.css';

export function Spinner() {
    return (
        <div className={styles.container}>
            <div className={styles.track}></div>
            <div className={styles.spinner}></div>
        </div>
    );
}
