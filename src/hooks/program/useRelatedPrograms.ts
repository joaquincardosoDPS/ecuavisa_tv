import { useState, useEffect, useCallback } from 'react';
import { catalogService } from '@/services/catalogService';
import type { Program } from '@/interfaces/catalog.interface';

const LIMIT = 8;

export const useRelatedPrograms = (programKey: string, category: string) => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const enabled = !!programKey;

    // Carga inicial y reset al cambiar programa
    useEffect(() => {
        if (!enabled) return;
        let cancelled = false;

        const fetchFirst = async () => {
            setIsLoading(true);
            setPrograms([]);
            setCurrentPage(1);

            try {
                const result = await catalogService.searchPrograms({
                    slug_exclude: programKey,
                    category,
                    page: 1,
                    limit: LIMIT,
                });
                if (!cancelled) {
                    setPrograms(result.data ?? []);
                    const totalPages = result.last_page || 0;
                    setHasNextPage(1 < totalPages);
                }
            } catch {
                // silently fail
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchFirst();
        return () => { cancelled = true; };
    }, [programKey, category, enabled]);

    const fetchNextPage = useCallback(async () => {
        if (!enabled || !hasNextPage || isFetchingNextPage) return;
        setIsFetchingNextPage(true);

        const nextPage = currentPage + 1;
        try {
            const result = await catalogService.searchPrograms({
                slug_exclude: programKey,
                category,
                page: nextPage,
                limit: LIMIT,
            });
            setPrograms((prev) => [...prev, ...(result.data ?? [])]);
            setCurrentPage(nextPage);
            const totalPages = result.last_page || 0;
            setHasNextPage(nextPage < totalPages);
        } catch {
            // silently fail
        } finally {
            setIsFetchingNextPage(false);
        }
    }, [enabled, hasNextPage, isFetchingNextPage, currentPage, programKey, category]);

    return {
        programs,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    };
};
