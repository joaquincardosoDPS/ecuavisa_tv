import { useNavigate } from 'react-router-dom';

/**
 * Hook de navegación para las vistas de MiLatina.
 */
export function useMiLatinaNavigation() {
    const navigate = useNavigate();

    /** Navega a información de cuenta */
    const goToAccountInfo = () => {
        navigate('/mi-latina/cuenta', { replace: true });
    };

    /** Navega atrás */
    const goBack = () => {
        navigate(-1);
    };

    /** Navega a /mi-latina */
    const goToMiLatina = () => {
        navigate('/mi-latina', { replace: true });
    };

    /** Logout y redirige al home */
    const goToHomeAfterLogout = () => {
        navigate('/', { replace: true });
    };

    return { goToAccountInfo, goBack, goToMiLatina, goToHomeAfterLogout };
}
