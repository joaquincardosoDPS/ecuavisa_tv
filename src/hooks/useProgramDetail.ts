import { catalogService } from '@/services/catalogService';
import { useFetch } from './useFetch';

export const useProgramDetail = (slug: string) => {
    const programQuery = useFetch(
        () => catalogService.getProgramDetail(slug),
        [slug],
        { enabled: !!slug },
    );

    return {
        data: programQuery.data?.data,
        isLoading: programQuery.isLoading,
        isError: programQuery.isError,
    };
};
