import { useNavigate } from 'react-router-dom';

/**
 * Hook de navegación para las vistas de autenticación.
 */
export function useAuthNavigation() {
    const navigate = useNavigate();

    /** Vuelve a la pantalla anterior */
    const goBack = () => {
        navigate(-1);
    };

    /** Navega a la pantalla de login */
    const goToLogin = () => {
        navigate('/auth/login');
    };

    /** Navega a la selección de perfiles tras login exitoso */
    const goToWhoIsThere = () => {
        navigate('/whoisthere', { replace: true });
    };

    /** Navega al live (si ya está autenticado) */
    const goToLive = () => {
        navigate('/live', { replace: true });
    };

    return { goBack, goToLogin, goToWhoIsThere, goToLive };
}
