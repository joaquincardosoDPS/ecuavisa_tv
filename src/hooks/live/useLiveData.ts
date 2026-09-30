import { catalogService } from '@/services/catalogService';
import { useQuery } from '@tanstack/react-query';
import { useGlobalEpg } from './useGlobalEpg';


export const useLiveData = () => {

    const playlistPremiumQuery = useQuery({
        queryKey: ['home', 'playlist-premium'],
        queryFn: () => catalogService.getPlaylistPremium(),
        staleTime: 1000 * 60 * 5,
    });

    const epgQuery = useGlobalEpg();

    return {
        playlistPremium: playlistPremiumQuery.data?.data || [],
        epg: epgQuery.data || [],
        isLoading: playlistPremiumQuery.isLoading || epgQuery.isLoading,
        isError: playlistPremiumQuery.isError || epgQuery.isError
    };
};
