import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services/catalogService';
import type { EPGChannel } from '@/interfaces/catalog.interface';

/**
 * EPG global (canales + programación) compartido por la grilla del Home y la
 * vista En vivo: una sola key para no descargar el JSON dos veces al navegar.
 * Se refresca cada 10 min (en TV no conviene re-descargar ni re-renderizar antes).
 */
export function useGlobalEpg() {
    return useQuery<EPGChannel[]>({
        queryKey: ['global-epg'],
        queryFn: () => catalogService.getChannelList(),
        staleTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 10,
        refetchIntervalInBackground: false,
    });
}
