import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/authStore';
import { ppvService } from '@/services/ppvService';

export const ppvLinkQueryKey = (token: string | null, keyProgram?: string | null) => [
    'ppv-link',
    token,
    keyProgram,
];

/**
 * URL de pago del programa para el QR del paywall. Solo se consulta con el modal
 * abierto (`enabled`): la grilla monta muchos `RestrictionModal` a la vez.
 * Sin `staleTime`: el link trae un token_ott propio y debe pedirse fresco.
 */
export function usePpvLink(keyProgram?: string | null, enabled = true) {
    const token = useAuthStore((s) => s.token);

    const query = useQuery({
        queryKey: ppvLinkQueryKey(token, keyProgram),
        queryFn: () => ppvService.getLink({ token: token!, keyProgram: keyProgram! }),
        enabled: Boolean(enabled && token && keyProgram),
        staleTime: 0,
        retry: 1,
    });

    return { ppvLink: query.data ?? null };
}
