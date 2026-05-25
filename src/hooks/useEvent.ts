import { useState, useEffect } from 'react';
import { eventService } from '@/services/eventService';

export const useEvent = (slug?: string) => {
    const [event, setEvent] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!slug) return;
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const eventRes = await eventService.getEvent(slug);
                const eventData = eventRes?.data ?? null;

                if (cancelled) return;
                setEvent(eventData);

                // Cargar eventos relacionados si hay categoría
                const category = eventData?.category?.slug;
                if (category) {
                    const eventsRes = await eventService.getAll({
                        slug_exclude: slug,
                        category,
                    });
                    if (!cancelled) {
                        setEvents(eventsRes?.data ?? []);
                    }
                }
            } catch {
                if (!cancelled) setIsError(true);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, [slug]);

    return { events, event, isLoading, isError };
};