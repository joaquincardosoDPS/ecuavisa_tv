import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/authStore';
import { ppvService } from '@/services/ppvService';

/**
 * Programas comprados (PPV) del usuario autenticado.
 * `subscription_active` viaja en la sesión (user del login/device_verify/validate).
 * Solo si la suscripción está activa se consulta el endpoint (trae los slugs
 * comprados) y se desbloquea ese contenido aunque esté restringido ("1").
 */
export function usePurchasedPrograms() {
    const token = useAuthStore((s) => s.token);
    const subscriptionActive = Boolean(useAuthStore((s) => s.user)?.subscription_active);

    const query = useQuery({
        queryKey: ['ppv', token],
        queryFn: async () => {
            const response = await ppvService.getPurchased(token!);
            if (response.status === 'error' || !response.data) {
                throw new Error(response.msj || 'Error al obtener los programas comprados');
            }
            return response.data;
        },
        // Solo se consulta el endpoint si hay sesión con suscripción activa.
        enabled: !!token && subscriptionActive,
    });

    const purchasedSlugs = useMemo(
        () => new Set<string>(query.data?.programs ?? []),
        [query.data]
    );

    // Un programa comprado solo desbloquea si la sesión tiene suscripción activa.
    const hasPurchased = useCallback(
        (slug: string) => subscriptionActive && purchasedSlugs.has(slug),
        [subscriptionActive, purchasedSlugs]
    );

    return {
        purchasedSlugs,
        subscriptionActive,
        hasPurchased,
        isLoading: query.isLoading,
    };
}
