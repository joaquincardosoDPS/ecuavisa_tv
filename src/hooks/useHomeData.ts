import { catalogService } from '@/services/catalogService';
import { historyService } from '@/services/historyService';
import { useAuthStore } from '@/features/auth/authStore';
import { useFetch } from './useFetch';

export const useHomeData = () => {
    const token = useAuthStore((s) => s.token);
    const activeProfile = useAuthStore((s) => s.activeProfile);

    const sliderQuery = useFetch(
        () => catalogService.getSlider(),
        [],
    );

    const categoriesQuery = useFetch(
        () => catalogService.getCategories({ show_event: true, show_ranking: true }),
        [],
    );

    const recommendedQuery = useFetch(
        () => catalogService.getRecommendedPrograms(),
        [],
    );

    const liveSignalsQuery = useFetch(
        () => catalogService.getPlaylistPremium(),
        [],
    );

    const continueWatchingQuery = useFetch(
        () => historyService.getAll({
            token: token ?? '',
            profile: activeProfile?.id ?? '',
            end: 0,
            limit: 10,
        }),
        [token, activeProfile?.id],
        { enabled: !!token && !!activeProfile },
    );

    return {
        slider: sliderQuery.data?.data || [],
        categories: categoriesQuery.data?.data || [],
        recommended: recommendedQuery.data?.data || [],
        liveSignals: liveSignalsQuery.data?.data || [],
        continueWatching: continueWatchingQuery.data?.data || [],
        isLoading: sliderQuery.isLoading || categoriesQuery.isLoading || recommendedQuery.isLoading,
        isError: sliderQuery.isError || categoriesQuery.isError || recommendedQuery.isError,
    };
};
