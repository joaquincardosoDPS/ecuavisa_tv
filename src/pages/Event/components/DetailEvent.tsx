import type { Event } from "@/interfaces/catalog.interface";
import { useConfigStore } from "@/features/config/useConfigStore";
// Mismo diseño que el detalle de los programas (DetailsProgram)
import styles from "@/pages/Program/components/DetailsProgram.module.css";

function formatEventSchedule(gmt0?: string): string {
    if (!gmt0) return "";
    const d = new Date(gmt0.replace(" ", "T") + "Z");
    return `${d.toLocaleDateString("es-CL", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}, ${d.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false })} hrs`;
}

function DetailEvent({ event }: { event: Event }) {
    const appName = useConfigStore((s) => s.config?.name);
    const categoryName = event.category?.name || "";

    const rows: { label: string; value: string }[] = [
        { label: "Programa", value: event.title },
        { label: "Canal", value: appName || "Ecuavisa play" },
        ...(categoryName ? [{ label: "Categoría", value: categoryName }] : []),
        ...(event.classification ? [{ label: "Clasificación", value: event.classification }] : []),
        ...(event.gmt0_unlocked ? [{ label: "Fecha y hora", value: formatEventSchedule(event.gmt0_unlocked) }] : []),
    ].filter((row) => row.value);

    return (
        <div className={styles.detailsContainer}>
            <h3 className={styles.synopsisTitle}>Sinopsis</h3>
            <p className={styles.description}>
                {event.description || event.description_short}
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
export default DetailEvent;
