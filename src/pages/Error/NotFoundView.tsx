import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useHomeData } from "@/hooks/home/useHomeData";
import styles from "./NotFoundView.module.css";

function NotFoundView() {
  const navigate = useNavigate();
  const { recommended } = useHomeData();

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.mainHeading}>Lo sentimos,</h2>
      <h2 className={styles.subHeading}>no encontramos el contenido que buscas.</h2>
      <p className={styles.messageText}>
        Te recomendamos volver al home o revisar algunos de estos programas que te podrían interesar.
      </p>
      <Button variant="secondary" onClick={() => navigate("/")} className={styles.homeButton}>Volver al home</Button>
      
      <div className={styles.recommendationsSection}>
        <h3 className={styles.recommendationsTitle}>Te recomendamos</h3>
        <div className={styles.recommendationsGrid}>
          {recommended.slice(0, 4).map((program) => (
            <div
              key={program.key}
              onClick={() => navigate(`/programas/${program.key}`)} className={styles.programCard}
            >
              {program.image_land?.medium && (
                <img src={program.image_land.medium} alt={program.title} loading="lazy" className={styles.programImage} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default NotFoundView;
