import { useFetchPaginated } from '../shared/useFetchPaginated';
import { useAuthStore } from '@/features/auth/authStore';
import { favoritesService } from '@/services/favoritesService';
import type { FavoriteItem } from '@/interfaces/favorites.interface';

const FAVORITES_LIMIT = 12;

/**
 * Hook de datos para la vista Mi Lista.
 * Centraliza fetching de favoritos con paginación infinita.
 */
export function useMyListData() {
    const token = useAuthStore((s) => s.token);
    const activeProfile = useAuthStore((s) => s.activeProfile);

    const isAuthenticated = !!token && !!activeProfile;

    const {
        data: favorites,
        isLoading,
        isLoadingMore,
        isError,
        hasMore,
        page,
        loadMore,
    } = useFetchPaginated<FavoriteItem>(
        (pg, limit) => favoritesService.getAll(token!, activeProfile!.id, pg, limit),
        [token, activeProfile],
        { limit: FAVORITES_LIMIT, enabled: isAuthenticated, hasMoreStrategy: 'length' },
    );

    return {
        favorites,
        page,
        isLoading,
        isLoadingMore,
        isError,
        errorMsg: isError ? 'Error al cargar favoritos.' : '',
        hasMore,
        loadMore,
        isAuthenticated,
    };
}
