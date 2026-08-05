import styles from "./Spinner.module.css";

interface SpinnerProps {
    className?: string;
    size?: string;
}

export function Spinner({ className, size = "3rem" }: SpinnerProps) {
    return (
        <div className={[styles.wrapper, className].filter(Boolean).join(" ")} style={{ width: size, height: size }}>
            <div className={[styles.ring, styles.ringOuter].join(" ")} />
            <div className={[styles.ring, styles.ringInner].join(" ")} />
        </div>
    );
}
