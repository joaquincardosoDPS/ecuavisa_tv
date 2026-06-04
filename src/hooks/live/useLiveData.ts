import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { catalogService } from '@/services/catalogService';
import { useFetch } from '../shared/useFetch';
import type { LiveSignal, EPGChannel, EPGEvent } from '@/interfaces/catalog.interface';

/** Busca el evento EPG actual para una señal */
function getCurrentEvent(signal: LiveSignal | null, epg: EPGChannel[]): EPGEvent | null {
    if (!signal) return null;
    const channel = epg.find((ch) => ch.key_live === signal.key_live);
    if (!channel) return null;
    const now = new Date();
    return (
        channel.events.find((ev) => {
            const begin = new Date(ev.beginTime);
            const end = new Date(ev.endTime);
            return begin <= now && end > now;
        }) ?? null
    );
}

/**
 * Hook de datos para la vista Live.
 * Centraliza fetching de playlist/EPG, selección de señal y evento actual.
 */
export const useLiveData = () => {
    const location = useLocation();

    /* ── Fetching ── */
    const playlistPremiumQuery = useFetch(
        () => catalogService.getPlaylistPremium(),
        [],
    );

    const epgQuery = useFetch(
        () => catalogService.getChannelList(),
        [],
    );

    const playlistPremium: LiveSignal[] = playlistPremiumQuery.data?.data || [];
    const epg: EPGChannel[] = epgQuery.data || [];
    const isLoading = playlistPremiumQuery.isLoading || epgQuery.isLoading;
    const isError = playlistPremiumQuery.isError || epgQuery.isError;

    /* ── Selección de señal ── */
    const initialKeyLive = (location.state as any)?.selectedKeyLive || null;
    const [selectedKeyLive, setSelectedKeyLive] = useState<string | null>(initialKeyLive);

    // Seleccionar primera señal al cargar (solo si no viene preseleccionada)
    useEffect(() => {
        if (playlistPremium.length > 0 && !selectedKeyLive) {
            const firstActive = playlistPremium.find((s) => s.active);
            if (firstActive) setSelectedKeyLive(firstActive.key_live);
        }
    }, [playlistPremium, selectedKeyLive]);

    // Señal seleccionada (objeto completo)
    const selectedSignal = useMemo(
        () =>
            playlistPremium.find((s) => s.key_live === selectedKeyLive) ??
            playlistPremium.find((s) => s.active) ??
            null,
        [playlistPremium, selectedKeyLive],
    );

    // Evento EPG actual
    const currentEvent = useMemo(
        () => getCurrentEvent(selectedSignal, epg),
        [selectedSignal, epg],
    );

    const now = useMemo(() => new Date(), [epg]);

    /** Seleccionar una señal por key_live */
    const selectSignal = useCallback((keyLive: string) => {
        setSelectedKeyLive(keyLive);
    }, []);

    return {
        playlistPremium,
        epg,
        isLoading,
        isError,
        selectedSignal,
        selectedKeyLive,
        currentEvent,
        now,
        selectSignal,
        setSelectedKeyLive,
    };
};
