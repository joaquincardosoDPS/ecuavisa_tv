import { eventService } from '@/services/eventService';
import { useFetch } from '../shared/useFetch';
import type { Event } from '@/interfaces/catalog.interface';

/**
 * Hook de datos para la vista de detalle de evento.
 * Centraliza el fetching del evento y los eventos relacionados.
 */
export function useEventData(slug: string | undefined) {
    const { data: eventResponse, isLoading: isLoadingEvent } = useFetch(
        () => eventService.getEvent(slug!),
        [slug],
        { enabled: !!slug },
    );

    const event: Event | null = eventResponse?.data ?? null;
    const categorySlug = event?.category?.slug;

    const { data: eventsResponse, isLoading: isLoadingEvents } = useFetch(
        () => eventService.getAll({ slug_exclude: slug || '', category: categorySlug }),
        [slug, categorySlug],
        { enabled: !!categorySlug },
    );

    const relatedEvents: Event[] = eventsResponse?.data ?? [];
    const isLoading = isLoadingEvent || isLoadingEvents;

    return {
        event,
        relatedEvents,
        isLoading,
    };
}
