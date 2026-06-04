import { useAuthStore } from '@/features/auth/authStore';
import { profileService } from '@/services/profileService';
import { useFetch } from '../shared/useFetch';
import type { Profile } from '@/interfaces/profile.interface';

/**
 * Hook de datos compartido para las vistas de perfiles (ProfilesView, WhoIsThereView).
 * Centraliza token, profiles fetch y verificación de auth.
 */
export function useProfilesData() {
    const token = useAuthStore((s) => s.token);

    const { data: profilesResponse, isLoading, isError } = useFetch(
        () => profileService.getAll(token!),
        [token],
        { enabled: !!token },
    );

    const profiles: Profile[] = profilesResponse?.data || [];

    /** Selecciona un perfil como activo en el store */
    const selectProfile = (profile: Profile) => {
        useAuthStore.getState().setActiveProfile(profile);
    };

    /** Cierra sesión */
    const logout = () => {
        useAuthStore.getState().logout();
    };

    return {
        token,
        profiles,
        isLoading,
        isError,
        selectProfile,
        logout,
    };
}
