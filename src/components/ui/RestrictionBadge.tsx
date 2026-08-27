import styles from "./RestrictionBadge.module.css";

interface RestrictionBadgeProps {
    /** Muestra la etiqueta solo si es true. */
    show: boolean;
    /** Clase extra para reposicionar/reescalar la etiqueta (ej. banner). */
    className?: string;
    /**
     * Posición del pill dentro del card:
     * - "top": arriba centrado (default, cards normales).
     * - "top-right": arriba corrido a la derecha (Top 10/ranking, para no tapar el número).
     * - "bottom": abajo centrado.
     */
    position?: "top" | "top-right" | "bottom";
}

const POSITION_CLASS: Record<NonNullable<RestrictionBadgeProps["position"]>, string> = {
    top: styles.top,
    "top-right": styles.topRight,
    bottom: styles.bottom,
};

/**
 * Etiqueta tipo "pill" para contenido restringido (capítulos pagados).
 * El contenedor padre debe ser `position: relative`.
 */
function RestrictionBadge({ show, className, position = "top" }: RestrictionBadgeProps) {
    if (!show) return null;

    return (
        <span className={[styles.badge, POSITION_CLASS[position], className].filter(Boolean).join(" ")}>
            CAPÍTULOS PAGADOS
        </span>
    );
}

export default RestrictionBadge;
