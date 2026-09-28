/**
 * Normaliza el campo `restriction` (string o número) de capítulos y programas.
 * Convención del backend: "1" / 1 = contenido restringido (bloqueado).
 */
export function isContentRestricted(restriction?: string | number | null): boolean {
    if (restriction === undefined || restriction === null) return false;
    return String(restriction) === "1";
}

/**
 * `subscription_active` puede llegar como booleano, número o texto según el
 * payload ("0", "false", 0, 1...). Coercionar con Boolean() daría true para
 * cualquier string no vacío —incluido "0"— y abriría el contenido de pago a
 * usuarios sin suscripción.
 */
export function isSubscriptionActive(value: unknown): boolean {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;
    if (typeof value === "string") return value === "1" || value.toLowerCase() === "true";
    return false;
}
