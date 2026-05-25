import { catalogService } from '@/services/catalogService';
import { useFetch } from './useFetch';

export const useProgramsData = () => {
    const categoriesQuery = useFetch(
        () => catalogService.getCategories({ limit: 50 }),
        [],
    );

    return {
        categories: categoriesQuery.data?.data || [],
        isLoading: categoriesQuery.isLoading,
        isError: categoriesQuery.isError,
    };
};
