import { useState, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useFetchPaginated } from '../shared/useFetchPaginated';
import { catalogService } from '@/services/catalogService';
import type { Program } from '@/interfaces/catalog.interface';

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

const PAGE_LIMIT = 20;

/**
 * Hook de datos para la vista de categoría.
 * Centraliza fetching paginado, banner program y título.
 */
export function useCategoryData() {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();

    const navTitle = (location.state as { title?: string })?.title || '';
    const [categoryTitle, setCategoryTitle] = useState(navTitle);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [bannerImageUrl, setBannerImageUrl] = useState('');

    const {
        data: programs,
        isLoading,
        isLoadingMore,
        isError,
        hasMore,
        loadMore,
    } = useFetchPaginated<Program>(
        async (pg, limit) => {
            const res = await catalogService.searchPrograms({ category: slug!, limit, page: pg });

            // Side effects solo en la primera página
            if (pg === 1) {
                const results = res.data || [];
                if (results.length > 0 && !categoryTitle) {
                    setCategoryTitle(results[0].name_category || slug!);
                }
                if (results.length > 0) {
                    setSelectedProgram(results[0]);
                    setBannerImageUrl(getBannerImage(results[0]));
                }
            }

            return res;
        },
        [slug],
        { limit: PAGE_LIMIT, enabled: !!slug, hasMoreStrategy: 'last_page' },
    );

    /** Actualiza el programa del banner al hacer foco en un card */
    const setActiveBannerProgram = useCallback((program: Program) => {
        setSelectedProgram(program);
        setBannerImageUrl(getBannerImage(program));
    }, []);

    return {
        slug,
        categoryTitle,
        programs,
        isLoading,
        isLoadingMore,
        isError,
        hasMore,
        loadMore,
        selectedProgram,
        bannerImageUrl,
        setActiveBannerProgram,
    };
}
