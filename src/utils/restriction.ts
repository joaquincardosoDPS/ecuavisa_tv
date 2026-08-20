/**
 * Normaliza el campo `restriction` (string o número) de capítulos y programas.
 * Convención del backend: "1" / 1 = contenido restringido (bloqueado).
 */
export function isContentRestricted(restriction?: string | number | null): boolean {
    if (restriction === undefined || restriction === null) return false;
    return String(restriction) === "1";
}
