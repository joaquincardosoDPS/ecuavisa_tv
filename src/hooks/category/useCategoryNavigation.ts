import { useNavigate } from 'react-router-dom';
import type { Program } from '@/interfaces/catalog.interface';

/**
 * Hook de navegación para la vista de categoría.
 */
export function useCategoryNavigation() {
    const navigate = useNavigate();

    /** Navega al detalle de un programa */
    const goToProgram = (program: Program) => {
        navigate(`/programas/${program.key}`, { state: { program } });
    };

    return { goToProgram };
}
