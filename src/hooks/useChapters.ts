import { useState, useEffect, useCallback } from 'react';
import { catalogService } from '@/services/catalogService';

export const useChapters = (slug: string, season: number | null, segmentSlug: string | null, limit: number = 20) => {
    const [pages, setPages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

    const enabled = !!slug && season !== null && !!segmentSlug;

    // Carga inicial y reset al cambiar parámetros
    useEffect(() => {
        if (!enabled) return;
        let cancelled = false;

        const fetchFirst = async () => {
            setIsLoading(true);
            setIsError(false);
            setPages([]);
            setCurrentPage(1);

            try {
                const result = await catalogService.getChapters({
                    program: slug,
                    season: season!,
                    segment: segmentSlug!,
                    page: 1,
                    limit,
                });
                if (!cancelled) {
                    setPages([result]);
                    const totalPages = result.last_page || 0;
                    setHasNextPage(1 < totalPages);
                }
            } catch {
                if (!cancelled) setIsError(true);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchFirst();
        return () => { cancelled = true; };
    }, [slug, season, segmentSlug, enabled, limit]);

    const fetchNextPage = useCallback(async () => {
        if (!enabled || !hasNextPage || isFetchingNextPage) return;
        setIsFetchingNextPage(true);

        const nextPage = currentPage + 1;
        try {
            const result = await catalogService.getChapters({
                program: slug,
                season: season!,
                segment: segmentSlug!,
                page: nextPage,
                limit,
            });
            setPages((prev) => [...prev, result]);
            setCurrentPage(nextPage);
            const totalPages = result.last_page || 0;
            setHasNextPage(nextPage < totalPages);
        } catch {
            setIsError(true);
        } finally {
            setIsFetchingNextPage(false);
        }
    }, [enabled, hasNextPage, isFetchingNextPage, currentPage, slug, season, segmentSlug, limit]);


    return {
        chapters: pages.length > 0 ? { pages } : undefined,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    };
};
