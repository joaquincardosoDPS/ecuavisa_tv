import { useNavigate } from 'react-router-dom';
import type { Chapter } from '@/components/VideoPlayer/types';

/**
 * Hook de navegación para las vistas del Player.
 */
export function usePlayerNavigation() {
    const navigate = useNavigate();

    /** Navega a un episodio específico */
    const goToEpisode = (programKey: string, episode: Chapter, segment?: string) => {
        const seg = episode.key_segment || segment || '';
        navigate(`/play/${programKey}/${seg}/${episode.season}/${episode.chapter}`);
    };

    return { goToEpisode };
}
