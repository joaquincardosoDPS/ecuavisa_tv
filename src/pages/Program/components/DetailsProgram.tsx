import type { Program } from "@/interfaces/catalog.interface";
import styles from "./DetailsProgram.module.css";

function DetailsProgram({ programDetail }: { programDetail: Program }) {
  const yearProduction = programDetail.anio_production;
  const genders = programDetail.genders?.map((gender) => gender.name).join(", ");
  const casting = programDetail.actors || "";
  const dimColor = "color-mix(in srgb, var(--clr-primary-title) 60%, transparent)";

  return (
    <div className={styles.detailsContainer}>
      <h3 className={styles.synopsisTitle}>
        Sinopsis
      </h3>
      <div className={styles.detailsContent}>
        <div className={styles.descriptionWrapper}>
          <p style={{ color: dimColor, fontSize: "1.25rem", lineHeight: 1.8, fontWeight: 500 }}>
            {programDetail.description || programDetail.description_short}
          </p>
        </div>
        <div>
          <div style={{ color: dimColor, fontSize: "1.25rem", letterSpacing: "0.05em", fontWeight: 500, marginBottom: "0.75rem" }}>
            <h3>Año:</h3>
            <p>{yearProduction}</p>
          </div>
          <div style={{ color: dimColor, fontSize: "1.25rem", letterSpacing: "0.05em", fontWeight: 500 }}>
            <h3>Géneros:</h3>
            <p>{genders}</p>
          </div>
        </div>
        <div style={{ color: dimColor, fontSize: "1.25rem", letterSpacing: "0.05em", fontWeight: 500 }}>
          <h3>Elenco:</h3>
          <p>{casting}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsProgram;


