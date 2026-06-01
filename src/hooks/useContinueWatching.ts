import { useEffect, useState, useMemo } from 'react';
import { historyService } from '@/services/historyService';
import { useAuthStore } from '@/features/auth/authStore';
import type { HistoryItem } from '@/interfaces/history.interface';

interface ContinueWatchingResult {
    /** Primer item NO finalizado — para el botón "Reanudar" */
    item: HistoryItem | null;
    /** Todos los items del historial del programa */
    items: HistoryItem[];
    /** Mapa indexado por chapter key para lookup O(1) */
    progressMap: Map<string, HistoryItem>;
    isLoading: boolean;
}

export function useContinueWatching(
    programKey: string,
    segment?: string | null,
    season?: number | null,
): ContinueWatchingResult {
    const token = useAuthStore((s) => s.token);
    const activeProfile = useAuthStore((s) => s.activeProfile);
    const [items, setItems] = useState<HistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const enabled = !!token && !!activeProfile && !!programKey;

    useEffect(() => {
        if (!enabled) return;
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            try {
                const response = await historyService.getAll({
                    token: token!,
                    profile: activeProfile!.id,
                    program: programKey,
                    ...(segment ? { segment } : {}),
                    ...(season !== undefined && season !== null ? { season } : {}),
                    limit: 50,
                });
                if (!cancelled) {
                    setItems(response.data || []);
                }
            } catch {
                if (!cancelled) setItems([]);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, [programKey, segment, season, token, activeProfile?.id, enabled]);

    // Para "Reanudar": primer item NO finalizado
    const item = useMemo(
        () => items.find((i) => i.end === 0) ?? null,
        [items],
    );

    const progressMap = useMemo(() => {
        const map = new Map<string, HistoryItem>();
        for (const historyItem of items) {
            map.set(historyItem.key, historyItem);
        }
        return map;
    }, [items]);

    return { item, items, progressMap, isLoading };
}
