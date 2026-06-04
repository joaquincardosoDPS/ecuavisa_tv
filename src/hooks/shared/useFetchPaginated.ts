import { useState, useEffect, useCallback, useRef } from 'react';

interface PaginatedResponse<T> {
    data: T[];
    last_page?: number;
}

interface UseFetchPaginatedState<T> {
    /** Datos acumulados de todas las páginas */
    data: T[];
    /** Cargando la primera página */
    isLoading: boolean;
    /** Cargando una página siguiente */
    isLoadingMore: boolean;
    isError: boolean;
    /** Hay más páginas disponibles */
    hasMore: boolean;
    /** Página actual */
    page: number;
    /** Carga la siguiente página */
    loadMore: () => void;
    /** Resetea y recarga desde la página 1 */
    reset: () => void;
}

interface UseFetchPaginatedOptions {
    /** Cantidad de items por página */
    limit: number;
    /** Si false, no ejecuta la carga inicial (default: true) */
    enabled?: boolean;
    /**
     * Estrategia para determinar si hay más páginas:
     * - 'last_page': compara page actual con response.last_page (default)
     * - 'length': compara results.length >= limit
     */
    hasMoreStrategy?: 'last_page' | 'length';
}

/**
 * Hook genérico para fetching con paginación infinita.
 * Sigue el mismo estilo que useFetch pero soporta loadMore/hasMore.
 *
 * @param fetchFn - Función que recibe (page, limit) y retorna la respuesta paginada
 * @param deps - Dependencias que resetean la paginación al cambiar
 * @param options - Configuración (limit, enabled, hasMoreStrategy)
 */
export function useFetchPaginated<T>(
    fetchFn: (page: number, limit: number) => Promise<PaginatedResponse<T>>,
    deps: unknown[] = [],
    options: UseFetchPaginatedOptions,
): UseFetchPaginatedState<T> {
    const { limit, enabled = true, hasMoreStrategy = 'last_page' } = options;

    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(enabled);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchRef = useRef(fetchFn);
    fetchRef.current = fetchFn;

    const checkHasMore = useCallback(
        (currentPage: number, results: T[], response: PaginatedResponse<T>) => {
            if (hasMoreStrategy === 'length') {
                return results.length >= limit;
            }
            // 'last_page'
            return currentPage < (response.last_page || 1);
        },
        [hasMoreStrategy, limit],
    );

    // Carga inicial (página 1) — se re-ejecuta al cambiar deps
    useEffect(() => {
        if (!enabled) {
            setIsLoading(false);
            return;
        }

        let cancelled = false;
        setIsLoading(true);
        setIsError(false);
        setData([]);
        setPage(1);

        fetchRef.current(1, limit)
            .then((response) => {
                if (cancelled) return;
                const results = response.data || [];
                setData(results);
                setHasMore(checkHasMore(1, results, response));
            })
            .catch(() => {
                if (!cancelled) setIsError(true);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, limit, ...deps]);

    // Cargar siguiente página
    const loadMore = useCallback(() => {
        if (isLoadingMore || !hasMore) return;

        const nextPage = page + 1;
        setIsLoadingMore(true);

        fetchRef.current(nextPage, limit)
            .then((response) => {
                const results = response.data || [];
                setData((prev) => [...prev, ...results]);
                setPage(nextPage);
                setHasMore(checkHasMore(nextPage, results, response));
            })
            .catch(() => {
                /* silencioso — el usuario puede reintentar */
            })
            .finally(() => {
                setIsLoadingMore(false);
            });
    }, [page, hasMore, isLoadingMore, limit, checkHasMore]);

    // Reset manual
    const reset = useCallback(() => {
        setData([]);
        setPage(1);
        setHasMore(false);
        setIsError(false);
    }, []);

    return {
        data,
        isLoading,
        isLoadingMore,
        isError,
        hasMore,
        page,
        loadMore,
        reset,
    };
}
