import { useNavigate } from 'react-router-dom';
import type { Program, Chapter } from '@/interfaces/catalog.interface';
import type { HistoryItem } from '@/interfaces/history.interface';

export function useProgramNavigation() {
    const navigate = useNavigate();

    /** Navega al player para reproducir */
    const goToPlayer = (
        programKey: string,
        segmentKey: string,
        season: number | string,
        chapter: number | string,
        resumeTime?: number,
    ) => {
        navigate(
            `/play/${programKey}/${segmentKey}/${season}/${chapter}`,
            resumeTime !== undefined ? { state: { resumeTime } } : undefined,
        );
    };

    /** Navega al player reanudando desde historial */
    const goToPlayerResume = (programKey: string, item: HistoryItem) => {
        navigate(
            `/play/${programKey}/${item.key_segment}/${item.season}/${item.chapter}`,
            { state: { resumeTime: item.time } },
        );
    };

    /** Navega al player desde el banner */
    const goToPlayerFromBanner = (
        program: Program,
        continueWatchingItem?: HistoryItem | null,
    ) => {
        if (continueWatchingItem) {
            goToPlayerResume(program.key, continueWatchingItem);
        } else {
            const firstSegment = program.segments?.[0];
            if (firstSegment) {
                const firstSeason = firstSegment.all_temp?.[0] ?? 1;
                goToPlayer(program.key, firstSegment.key, firstSeason, 1);
            }
        }
    };

    /** Navega al player desde el banner single */
    const goToPlayerFromBannerSingle = (
        program: Program,
        chapter?: Chapter,
        continueWatchingItem?: HistoryItem | null,
    ) => {
        if (continueWatchingItem) {
            goToPlayerResume(program.key, continueWatchingItem);
        } else if (chapter) {
            goToPlayer(program.key, chapter.key_segment, chapter.season, chapter.chapter);
        }
    };

    /** Navega a la vista de detalle de otro programa */
    const goToProgram = (programKey: string) => {
        navigate(`/programas/${programKey}`);
    };

    return {
        goToPlayer,
        goToPlayerResume,
        goToPlayerFromBanner,
        goToPlayerFromBannerSingle,
        goToProgram,
    };
}
