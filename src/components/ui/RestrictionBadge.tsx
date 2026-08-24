import styles from "./RestrictionBadge.module.css";

interface RestrictionBadgeProps {
    /** Muestra la etiqueta solo si es true. */
    show: boolean;
    /** Clase extra para reposicionar/reescalar la etiqueta (ej. banner). */
    className?: string;
}

/**
 * Etiqueta tipo "pill" para contenido restringido (capítulos pagados).
 * El contenedor padre debe ser `position: relative`.
 */
function RestrictionBadge({ show, className }: RestrictionBadgeProps) {
    if (!show) return null;

    return (
        <span className={[styles.badge, className].filter(Boolean).join(" ")}>
            CAPÍTULOS PAGADOS
        </span>
    );
}

export default RestrictionBadge;
