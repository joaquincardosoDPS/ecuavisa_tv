import { useNavigate } from 'react-router-dom';

/**
 * Hook de navegación para ProfilesView.
 */
export function useProfilesNavigation() {
    const navigate = useNavigate();

    /** Navega al home */
    const goToHome = () => {
        navigate('/home', { replace: true });
    };

    /** Navega a crear perfil */
    const goToCreateProfile = () => {
        navigate('/mi-latina/nuevo', { replace: true });
    };

    /** Navega a editar perfil */
    const goToEditProfile = (profileId: string) => {
        navigate(`/mi-latina/${profileId}`, { replace: true });
    };

    /** Navega a información de cuenta */
    const goToAccountInfo = () => {
        navigate('/mi-latina/cuenta', { replace: true });
    };

    return { goToHome, goToCreateProfile, goToEditProfile, goToAccountInfo };
}

/**
 * Hook de navegación para WhoIsThereView.
 */
export function useWhoIsThereNavigation() {
    const navigate = useNavigate();

    /** Navega al login */
    const goToLogin = () => {
        navigate('/auth/login', { replace: true });
    };

    /** Navega al live */
    const goToLive = () => {
        navigate('/live', { replace: true });
    };

    /** Navega a crear perfil */
    const goToCreateProfile = () => {
        navigate('/mi-latina/nuevo', { replace: true });
    };

    /** Navega a editar perfil */
    const goToEditProfile = (profileId: string) => {
        navigate(`/mi-latina/${profileId}`, { replace: true });
    };

    return { goToLogin, goToLive, goToCreateProfile, goToEditProfile };
}

/**
 * Hook de navegación para EditProfileView.
 */
export function useEditProfileNavigation() {
    const navigate = useNavigate();

    /** Navega a la lista de perfiles */
    const goToProfiles = () => {
        navigate('/mi-latina', { replace: true });
    };

    /** Navega a selección de avatar */
    const goToAvatarSelect = (currentAvatar: string | null, returnTo: string, currentName: string) => {
        navigate('/mi-latina/avatar', {
            state: { currentAvatar, returnTo, currentName },
        });
    };

    return { goToProfiles, goToAvatarSelect };
}

/**
 * Hook de navegación para AvatarSelectView.
 */
export function useAvatarSelectNavigation() {
    const navigate = useNavigate();

    /** Vuelve al edit profile con el avatar seleccionado */
    const goBackWithAvatar = (returnTo: string, selectedAvatar: string | null, currentName?: string, selectedAvatarUrl?: string | null) => {
        navigate(returnTo, {
            replace: true,
            state: { selectedAvatar, selectedAvatarUrl, currentName },
        });
    };

    return { goBackWithAvatar };
}
