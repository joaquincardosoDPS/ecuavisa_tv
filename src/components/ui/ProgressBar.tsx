import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  duration: string;
  time: number;
}

function parseDuration(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 1;
}

function formatRemaining(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  return `${minutes}m`;
}

function ProgressBar({ duration, time }: ProgressBarProps) {
  const totalSeconds = parseDuration(duration);
  const progress = Math.min(100, (time / totalSeconds) * 100);
  const remainingSeconds = Math.max(0, totalSeconds - time);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
      <span className={styles.label}>{formatRemaining(remainingSeconds)} restantes</span>
    </div>
  );
}

export default ProgressBar;
