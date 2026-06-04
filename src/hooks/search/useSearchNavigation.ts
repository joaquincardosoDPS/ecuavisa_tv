import { useNavigate } from 'react-router-dom';

/**
 * Hook de navegación para la vista de búsqueda.
 */
export function useSearchNavigation() {
    const navigate = useNavigate();

    /** Navega al detalle de un programa */
    const goToProgram = (programKey: string) => {
        navigate(`/programas/${programKey}`);
    };

    return { goToProgram };
}
