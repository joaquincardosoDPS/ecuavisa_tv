import type { Event } from '@/interfaces/catalog.interface';
import type { HistoryItem } from '@/interfaces/history.interface';

/**
 * Convierte "HH:MM:SS" a segundos.
 * Antes vivía inline en ContinueWatchingCarousel.
 */
export function parseDuration(duration: string): number {
    const parts = duration.split(':').map(Number);
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 1; // fallback para evitar div/0
}

/**
 * Calcula el porcentaje de progreso de un item de "seguir viendo".
 */
export function getWatchProgress(item: HistoryItem): number {
    const totalSec = Number((item as any).duration_seg) || parseDuration(item.duration);
    const savedSec = Number(item.time) || 0;
    return Math.min(100, (savedSec / totalSec) * 100);
}

/**
 * Formatea una fecha de evento para mostrar en cards.
 * Antes estaba como IIFE duplicada en HomeCardHorizontal y HomeCardVertical.
 */
export function formatEventDate(gmt0Unlocked: string): string {
    const d = new Date(gmt0Unlocked.replace(' ', 'T') + 'Z');
    const date = d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'long' });
    const time = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${date}, ${time} hrs`;
}

/**
 * Construye el título con info de temporada/capítulo para "seguir viendo".
 */
export function getContinueWatchingTitle(item: HistoryItem): string {
    let title = item.title || '';
    if ((item as any).chapter) {
        const season = (item as any).season ? `T${(item as any).season} ` : '';
        title += ` ${season}E${(item as any).chapter}`;
    }
    return title;
}

/**
 * Resuelve la mejor imagen landscape para un item de historial.
 */
export function getContinueWatchingImage(item: HistoryItem): string {
    return (
        item.image_land?.small ||
        item.image_land?.normal ||
        item.image_land?.big ||
        item.image_land?.default ||
        item.image ||
        ''
    );
}
