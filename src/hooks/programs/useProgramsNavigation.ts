import { useNavigate } from 'react-router-dom';
import type { Program, Event } from '@/interfaces/catalog.interface';

export function useProgramsNavigation() {
    const navigate = useNavigate();

    /** Navega a programa o evento según formato */
    const goToProgramOrEvent = (program: Program | Event, format?: string) => {
        const isEvent = format === 'event';
        if (isEvent) {
            const eventData = program as Event;
            if (eventData.skip_view && eventData.program_associated?.key) {
                navigate(`/programas/${eventData.program_associated.key}`);
            } else {
                navigate(`/eventos/${eventData.key}`);
            }
        } else {
            navigate(`/programas/${program.key}`);
        }
    };

    /** Navega a la vista de categoría */
    const goToCategory = (slug: string, title?: string) => {
        navigate(`/categoria/${slug}`, { state: { title } });
    };

    return { goToProgramOrEvent, goToCategory };
}
