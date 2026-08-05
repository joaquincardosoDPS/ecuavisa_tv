import type { Program } from "@/interfaces/catalog.interface";
import ProgramGrid from "@/components/ProgramCard/ProgramGrid";
import styles from "./RelatedProgramsContainer.module.css";

interface RelatedProgramsContainerProps {
  programs: Program[];
  isLoading?: boolean;
}

function RelatedProgramsContainer({ programs, isLoading = false }: RelatedProgramsContainerProps) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <p className={styles.loadingText}>Cargando programas relacionados...</p>
      ) : programs.length > 0 ? (
        <ProgramGrid programs={programs} cols={5} />
      ) : (
        <p className={styles.emptyText}>
          No hay programas relacionados disponibles.
        </p>
      )}
    </div>
  );
}

export default RelatedProgramsContainer;
