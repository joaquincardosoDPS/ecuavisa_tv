import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services/catalogService';

/** Key compartida: el player reutiliza el detalle ya cargado por la página de programa. */
export const programDetailQueryKey = (slug: string) => ['programDetail', slug];

export const fetchProgramDetail = (slug: string) => catalogService.getProgramDetail(slug);

export const useProgramDetail = (slug: string) => {
    const programQuery = useQuery({
        queryKey: programDetailQueryKey(slug),
        queryFn: () => fetchProgramDetail(slug),
        enabled: !!slug, // Solo ejecuta si hay un slug válido
        staleTime: 1000 * 60 * 5, // 5 minutos de caché
    });

    return {
        data: programQuery.data?.data,
        isLoading: programQuery.isLoading,
        isError: programQuery.isError
    }
};
