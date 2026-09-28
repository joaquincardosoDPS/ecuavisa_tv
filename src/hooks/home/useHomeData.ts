import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { catalogService } from '@/services/catalogService';

export const useHomeData = () => {
    const sliderQuery = useQuery({
        queryKey: ['home', 'slider'],
        queryFn: () => catalogService.getSlider(),
        // El catálogo cambia poco: sin esto, volver al Home refetchea todo y re-renderiza las filas.
        staleTime: 1000 * 60 * 5,
    });

    const categoriesQuery = useInfiniteQuery({
        queryKey: ['home', 'categories'],
        queryFn: ({ pageParam }) => catalogService.getCategories({ page: pageParam, show_event: true, show_ranking: true }),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPageParam < lastPage.last_page) return lastPageParam + 1;
            return undefined;
        },
    });

    const playlistPremiumQuery = useQuery({
        queryKey: ['home', 'playlist-premium'],
        queryFn: () => catalogService.getPlaylistPremium(),
        staleTime: 1000 * 60 * 5,
    });

    const recommendedQuery = useQuery({
        queryKey: ['home', 'recommended'],
        queryFn: () => catalogService.getRecommendedPrograms(),
        staleTime: 1000 * 60 * 5,
    });

    const categories = categoriesQuery.data?.pages.flatMap((page) => page.data) ?? [];

    return {
        slider: sliderQuery.data?.data || [],
        categories,
        playlistPremium: playlistPremiumQuery.data?.data || [],
        recommended: recommendedQuery.data?.data || [],
        isLoading: sliderQuery.isLoading || categoriesQuery.isLoading || playlistPremiumQuery.isLoading || recommendedQuery.isLoading,
        isError: sliderQuery.isError || categoriesQuery.isError || playlistPremiumQuery.isError || recommendedQuery.isError,
        fetchNextPage: categoriesQuery.fetchNextPage,
        hasNextPage: categoriesQuery.hasNextPage,
        isFetchingNextPage: categoriesQuery.isFetchingNextPage,
    };
};
