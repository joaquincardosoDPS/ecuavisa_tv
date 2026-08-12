// src/utils/applyConfigToCSS.ts

function hexToRgb(hex: string): string | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

// Aplica la configuración dinámica del cliente a las variables CSS de :root
export function applyConfigToCSS(config: Record<string, string>) {
    if (!config) return;
    const root = document.documentElement;

    // Colores
    const colorKeys = [
        "clr-primary", "clr-secondary", "clr-primary-title", "clr-secondary-title",
        "clr-primary-button", "clr-secondary-button", "clr-primary-subtitle", "clr-secondary-subtitle",
        "clr-primary-text", "clr-secondary-text", "clr-text-primary-button", "clr-text-secondary-button",
        "clr-text-tertiary-button", "clr-icon", "clr-edit", "foc-primary", "foc-secondary", "foc-tertiary",
        "epg-selected", "epg-accent" // adding common ones just in case
    ];

    colorKeys.forEach(key => {
        if (config[key]) {
            root.style.setProperty(`--${key}`, config[key]);
            const rgb = hexToRgb(config[key]);
            if (rgb) {
                root.style.setProperty(`--${key}-rgb`, rgb);
            }
        }
    });

    // Fuentes
    if (config["font-family-title"]) root.style.setProperty('--font-family-title', config["font-family-title"]);
    if (config["font-family-text"]) root.style.setProperty('--font-family-text', config["font-family-text"]);
    if (config["font-family-button"]) root.style.setProperty('--font-family-button', config["font-family-button"]);
    if (config["font-family-subtitle"]) root.style.setProperty('--font-family-subtitle', config["font-family-subtitle"]);
    if (config["font-size-title"]) root.style.setProperty('--font-size-title', config["font-size-title"]);
    if (config["font-size-subtitle"]) root.style.setProperty('--font-size-subtitle', config["font-size-subtitle"]);
    if (config["font-size-text"]) root.style.setProperty('--font-size-text', config["font-size-text"]);
    if (config["font-size-subtext"]) root.style.setProperty('--font-size-subtext', config["font-size-subtext"]);
    if (config["font-title"]) root.style.setProperty('--font-title', config["font-title"]);
    if (config["font-subtitle"]) root.style.setProperty('--font-subtitle', config["font-subtitle"]);
    if (config["font-text"]) root.style.setProperty('--font-text', config["font-text"]);
    if (config["font-weight-title"]) root.style.setProperty('--font-weight-title', config["font-weight-title"]);
    if (config["font-weight-subtitle"]) root.style.setProperty('--font-weight-subtitle', config["font-weight-subtitle"]);
    if (config["font-weight-text"]) root.style.setProperty('--font-weight-text', config["font-weight-text"]);
    if (config["font-weight-subtext"]) root.style.setProperty('--font-weight-subtext', config["font-weight-subtext"]);

    // Gradientes
    if (config["grad-banner"]) root.style.setProperty('--grad-banner', config["grad-banner"]);
    if (config["grad-sidebar"]) root.style.setProperty('--grad-sidebar', config["grad-sidebar"]);

}
