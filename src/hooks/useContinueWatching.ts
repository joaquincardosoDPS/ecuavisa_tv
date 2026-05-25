import { useEffect, useState } from 'react';
import { historyService } from '@/services/historyService';
import { useAuthStore } from '@/features/auth/authStore';
import type { HistoryItem } from '@/interfaces/history.interface';

interface ContinueWatchingResult {
    item: HistoryItem | null;
    isLoading: boolean;
}

export function useContinueWatching(programKey: string): ContinueWatchingResult {
    const token = useAuthStore((s) => s.token);
    const activeProfile = useAuthStore((s) => s.activeProfile);
    const [item, setItem] = useState<HistoryItem | null>(null);
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
                    end: 0,
                    limit: 1,
                });
                if (!cancelled) {
                    const data = response.data || [];
                    setItem(data.length > 0 ? data[0] : null);
                }
            } catch {
                if (!cancelled) setItem(null);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, [programKey, token, activeProfile?.id, enabled]);

    return { item, isLoading };
}
