import { catalogService } from '@/services/catalogService';
import { useQuery } from '@tanstack/react-query';


export const useLiveData = () => {

    const playlistPremiumQuery = useQuery({
        queryKey: ['home', 'playlist-premium'],
        queryFn: () => catalogService.getPlaylistPremium(),
        staleTime: 1000 * 60 * 5,
    });

    const epgQuery = useQuery({
        queryKey: ['live', 'epg'],
        queryFn: () => catalogService.getChannelList(),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
        refetchIntervalInBackground: false,
    });

    return {
        playlistPremium: playlistPremiumQuery.data?.data || [],
        epg: epgQuery.data || [],
        isLoading: playlistPremiumQuery.isLoading || epgQuery.isLoading,
        isError: playlistPremiumQuery.isError || epgQuery.isError
    };
};
