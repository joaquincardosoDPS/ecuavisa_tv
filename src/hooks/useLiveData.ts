import { catalogService } from '@/services/catalogService';
import { useFetch } from './useFetch';

export const useLiveData = () => {
    const playlistPremiumQuery = useFetch(
        () => catalogService.getPlaylistPremium(),
        [],
    );

    const epgQuery = useFetch(
        () => catalogService.getChannelList(),
        [],
    );

    return {
        playlistPremium: playlistPremiumQuery.data?.data || [],
        epg: epgQuery.data || [],
        isLoading: playlistPremiumQuery.isLoading || epgQuery.isLoading,
        isError: playlistPremiumQuery.isError || epgQuery.isError,
    };
};
