import { useNavigate } from 'react-router-dom';

/**
 * Hook de navegación para la vista Mi Lista.
 */
export function useMyListNavigation() {
    const navigate = useNavigate();

    /** Navega al detalle de un programa */
    const goToProgram = (programKey: string) => {
        navigate(`/programas/${programKey}`);
    };

    /** Navega al login */
    const goToLogin = () => {
        navigate('/auth/login');
    };

    /** Navega a la búsqueda (desde lista vacía) */
    const goToSearch = () => {
        navigate('/buscar');
    };

    return { goToProgram, goToLogin, goToSearch };
}
