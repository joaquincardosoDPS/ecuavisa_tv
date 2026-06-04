import { useNavigate } from 'react-router-dom';
import type { Event } from '@/interfaces/catalog.interface';

/**
 * Hook de navegación centralizado para la vista de evento.
 * Agrupa navigate de EventView, EventBannerContent y EventCard.
 */
export function useEventNavigation() {
    const navigate = useNavigate();

    /** Navega al player en vivo */
    const goToLive = (signalKey: string) => {
        navigate('/live', { state: { signal: signalKey } });
    };

    /** Navega al detalle de un programa asociado */
    const goToProgram = (programKey: string) => {
        navigate(`/programas/${programKey}`);
    };

    /** Navega al detalle de otro evento */
    const goToEvent = (eventKey: string) => {
        navigate(`/eventos/${eventKey}`);
    };

    /** Play del evento: va a live si tiene señal, sino al programa asociado */
    const goToEventPlay = (event: Event) => {
        if (event.live_associated?.key) {
            goToLive(event.live_associated.key);
        } else if (event.program_associated?.key) {
            goToProgram(event.program_associated.key);
        }
    };

    /** Volver atrás */
    const goBack = () => {
        navigate(-1);
    };

    return { goToLive, goToProgram, goToEvent, goToEventPlay, goBack };
}
