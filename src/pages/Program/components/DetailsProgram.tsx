import type { Program } from "@/interfaces/catalog.interface";
import styles from "./DetailsProgram.module.css";

function DetailsProgram({ programDetail }: { programDetail: Program }) {
  const yearProduction = programDetail.anio_production;
  const genders = programDetail.genders?.map((gender) => gender.name).join(", ");
  const casting = programDetail.actors || "";

  return (
    <div className={styles.detailsContainer}>
      <h3 className={styles.synopsisTitle}>
        Sinopsis
      </h3>
      <div className={styles.detailsContent}>
        <div className={styles.descriptionWrapper}>
          <p className={styles.descriptionText}>
            {programDetail.description || programDetail.description_short}
          </p>
        </div>
        <div>
          <div className={`${styles.metaText} ${styles.metaTextSpace}`}>
            <h3>Año:</h3>
            <p>{yearProduction}</p>
          </div>
          <div className={styles.metaText}>
            <h3>Géneros:</h3>
            <p>{genders}</p>
          </div>
        </div>
        <div className={styles.metaText}>
          <h3>Elenco:</h3>
          <p>{casting}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsProgram;


