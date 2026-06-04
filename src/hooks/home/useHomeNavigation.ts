import { useNavigate } from 'react-router-dom';
import type { Program, Event, LiveSignal } from '@/interfaces/catalog.interface';
import type { HistoryItem } from '@/interfaces/history.interface';

export function useHomeNavigation() {
    const navigate = useNavigate();

    /** Navega a detalle de programa */
    const goToProgram = (program: Program) => {
        navigate(`/programas/${program.key}`, { state: { program } });
    };

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

    /** Navega al player en vivo */
    const goToLive = (signal: LiveSignal) => {
        navigate('/live', { state: { selectedKeyLive: signal.key_live } });
    };

    /** Navega al player con resume para seguir viendo */
    const goToContinueWatching = (item: HistoryItem) => {
        navigate(`/play/${item.key_program}/${item.key_segment}/${(item as any).season}/${(item as any).chapter}`, {
            state: { resumeTime: item.time },
        });
    };

    return { goToProgram, goToProgramOrEvent, goToCategory, goToLive, goToContinueWatching };
}
