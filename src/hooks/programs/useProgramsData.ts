import { useState, useEffect, useCallback, useMemo } from 'react';
import { useFetchPaginated } from '../shared/useFetchPaginated';
import { catalogService } from '@/services/catalogService';
import type { Program, Category } from '@/interfaces/catalog.interface';

/* ── Helper de imagen ── */

/** Extrae la mejor imagen grande para el banner (prioriza image_background.big) */
function getBannerImage(program: Program): string {
    const p = program as any;
    const extractBig = (img: any): string => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        if (Array.isArray(img) && img.length > 0) {
            const first = img[0];
            if (typeof first === 'string') return first;
            if (typeof first === 'object') return first.big || first.normal || first.medium || first.default || first.small || '';
        }
        if (typeof img === 'object') {
            return img.big || img.normal || img.medium || img.default || img.small || '';
        }
        return '';
    };
    return (
        extractBig(p.image_background) ||
        extractBig(p.image_slider) ||
        extractBig(p.image_land) ||
        p.image ||
        ''
    );
}

const PAGE_LIMIT = 10;

/* ── Hook de datos con scroll infinito ── */

export const useProgramsData = () => {
    const {
        data: allCategories,
        isLoading,
        isLoadingMore: isFetchingNextPage,
        isError,
        hasMore: hasNextPage,
        loadMore: fetchNextPage,
    } = useFetchPaginated<Category>(
        (pg, limit) => catalogService.getCategories({ page: pg, limit }),
        [],
        { limit: PAGE_LIMIT, hasMoreStrategy: 'last_page' },
    );

    // Filtrar categorías vacías
    const filteredCategories = useMemo(
        () => allCategories.filter((c) => c.programs && c.programs.length > 0),
        [allCategories],
    );

    /* Estado del programa activo para el banner */
    const [activeProgram, setActiveProgram] = useState<Program | null>(null);
    const [bannerImageUrl, setBannerImageUrl] = useState('');

    /* Primer programa como default */
    useEffect(() => {
        if (!activeProgram && filteredCategories.length > 0) {
            const first = filteredCategories[0].programs[0] as Program;
            setActiveProgram(first);
            setBannerImageUrl(getBannerImage(first));
        }
    }, [filteredCategories, activeProgram]);

    /** Actualiza el programa activo del banner (al hacer foco en un card) */
    const setActiveBannerProgram = useCallback((program: Program) => {
        setActiveProgram(program);
        setBannerImageUrl(getBannerImage(program));
    }, []);

    return {
        filteredCategories,
        activeProgram,
        bannerImageUrl,
        setActiveBannerProgram,
        isLoading,
        isError,
        // Infinite scroll
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};
