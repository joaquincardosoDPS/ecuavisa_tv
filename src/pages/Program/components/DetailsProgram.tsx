import type { Program } from "@/interfaces/catalog.interface";
import { useConfigStore } from "@/features/config/useConfigStore";
import styles from "./DetailsProgram.module.css";

interface DetailsProgramProps {
  programDetail: Program;
  /** Opcional: si la API expone horario de emisión, se muestra en la fila "Horarios". */
  schedule?: string;
}

function formatActors(actors?: string): string {
  if (!actors) return "";
  return actors
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean)
    .join(", ");
}

function DetailsProgram({ programDetail, schedule }: DetailsProgramProps) {
  const appName = useConfigStore((s) => s.config?.name);

  // Total de temporadas: la mayor temporada entre todos los segmentos
  const totalSeasons =
    programDetail.segments?.reduce(
      (max, seg) => Math.max(max, seg.max_temp || seg.all_temp?.length || 0),
      0
    ) || 0;

  const totalChapters = programDetail["max-cap"]?.chapter;

  const temporadasValue =
    totalSeasons > 0
      ? `${totalSeasons} temporada${totalSeasons > 1 ? "s" : ""}${
          totalChapters
            ? ` - ${totalChapters} capítulo${totalChapters > 1 ? "s" : ""}`
            : ""
        }`
      : "";

  const rows: { label: string; value: string }[] = [
    { label: "Programa", value: programDetail.title },
    { label: "Canal", value: appName || "Ecuavisa play" },
    { label: "Temporadas", value: temporadasValue },
    { label: "Reparto", value: formatActors(programDetail.actors) },
    ...(schedule ? [{ label: "Horarios", value: schedule }] : []),
  ].filter((row) => row.value);

  return (
    <div className={styles.detailsContainer}>
      <h3 className={styles.synopsisTitle}>Sinopsis</h3>
      <p className={styles.description}>
        {programDetail.description || programDetail.description_short}
      </p>
      <div className={styles.infoList}>
        {rows.map((row) => (
          <div key={row.label} className={styles.infoRow}>
            <span className={styles.infoLabel}>{row.label}</span>
            <span className={styles.infoValue}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsProgram;


