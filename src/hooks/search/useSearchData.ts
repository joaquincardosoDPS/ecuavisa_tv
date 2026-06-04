import { useState, useCallback } from 'react';
import { useDebounce } from '../shared/useDebounce';
import { useFetchPaginated } from '../shared/useFetchPaginated';
import { catalogService } from '@/services/catalogService';
import type { Program } from '@/interfaces/catalog.interface';

const SEARCH_LIMIT = 12;

/**
 * Hook de datos para la vista de búsqueda.
 * Centraliza el debounce, fetching paginado y carga de más resultados.
 */
export function useSearchData() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);

    const hasQuery = debouncedQuery.trim().length > 0;

    const {
        data: programs,
        isLoading,
        isLoadingMore,
        isError,
        hasMore,
        loadMore,
    } = useFetchPaginated<Program>(
        (pg, limit) => catalogService.searchPrograms({ search: debouncedQuery, limit, page: pg }),
        [debouncedQuery],
        { limit: SEARCH_LIMIT, enabled: hasQuery, hasMoreStrategy: 'length' },
    );

    /** Agrega un carácter al query */
    const appendChar = useCallback((char: string) => {
        setQuery((prev) => prev + char);
    }, []);

    /** Borra el último carácter */
    const deleteChar = useCallback(() => {
        setQuery((prev) => prev.slice(0, -1));
    }, []);

    /** Limpia todo el query */
    const clearQuery = useCallback(() => {
        setQuery('');
    }, []);

    return {
        query,
        debouncedQuery,
        programs: hasQuery ? programs : [],
        isLoading,
        isLoadingMore,
        isError,
        hasMore,
        loadMore,
        appendChar,
        deleteChar,
        clearQuery,
    };
}
