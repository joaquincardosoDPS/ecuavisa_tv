import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import { favoritesService } from '@/services/favoritesService';

export function useFavorite(programSlug: string) {
    const token = useAuthStore((s) => s.token);
    const activeProfile = useAuthStore((s) => s.activeProfile);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const isEnabled = !!token && !!activeProfile;

    // Verificar si está en favoritos al montar
    useEffect(() => {
        if (!isEnabled) return;
        let cancelled = false;

        const check = async () => {
            try {
                const response = await favoritesService.validate(
                    token!,
                    activeProfile!.id,
                    programSlug,
                );
                if (!cancelled) {
                    setIsFavorited(response.status === 'ok' && response.data.length > 0);
                }
            } catch {
                // Si falla la validación, asumimos que no es favorito
            }
        };

        check();
        return () => { cancelled = true; };
    }, [token, activeProfile?.id, programSlug, isEnabled]);

    const toggleFavorite = useCallback(async () => {
        if (!token || !activeProfile || isToggling) return;
        setIsToggling(true);
        try {
            if (isFavorited) {
                await favoritesService.delete(token, activeProfile.id, programSlug);
                setIsFavorited(false);
            } else {
                await favoritesService.add(token, activeProfile.id, programSlug);
                setIsFavorited(true);
            }
        } catch (err) {
            console.error('[useFavorite] Toggle error:', err);
        } finally {
            setIsToggling(false);
        }
    }, [token, activeProfile, programSlug, isFavorited, isToggling]);

    return {
        isFavorited,
        isToggling,
        isEnabled,
        toggleFavorite,
    };
}
