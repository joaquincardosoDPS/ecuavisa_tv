import Button from "@/components/ui/Button";
import styles from "./PlayerError.module.css";

interface PlayerErrorProps {
  error: string | null;
  onBack: () => void;
}

export function PlayerError({ error, onBack }: PlayerErrorProps) {
  return (
    <div className={styles.errorContainer}>
      <span>{error || "Contenido no disponible"}</span>
      <Button variant="tertiary" onClick={onBack} className={styles.backButton}>Volver</Button>
    </div>
  );
}
