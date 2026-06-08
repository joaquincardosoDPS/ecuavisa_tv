import axios from 'axios';
import { RUDO_VOD_ADS, CLIENT } from '@/config-global';
import { VmapParser, type ParsedVmapData } from '@/utils/vmapParser';

/**
 * Cuepoint de un ad break (midroll) con su timestamp y URLs VAST.
 */
export interface AdBreakCuepoint {
    /** Posición del cuepoint en segundos desde el inicio del video */
    timeSeconds: number;
    /** URLs VAST para el waterfall de este ad break */
    vastUrls: string[];
}

/**
 * Convierte un timeOffset VMAP "HH:MM:SS.mmm" a segundos.
 * @example parseTimeOffset("00:10:00.000") → 600
 */
function parseTimeOffset(offset: string): number {
    const match = offset.match(/^(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?$/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = parseInt(match[3], 10);
    const millis = match[4] ? parseInt(match[4].padEnd(3, '0').slice(0, 3), 10) : 0;
    return hours * 3600 + minutes * 60 + seconds + millis / 1000;
}

/**
 * Servicio de publicidad VOD.
 * Consulta el endpoint VMAP de Rudo y parsea las URLs VAST reales.
 */
export const adsService = {
    /**
     * Obtiene y parsea la publicidad de un capítulo VOD.
     * @returns ParsedVmapData con las URLs VAST de Google Ad Manager, o null si falla.
     */
    getVodAds: async (chapterKey: string): Promise<ParsedVmapData | null> => {
        const url = `${RUDO_VOD_ADS}/${chapterKey}?client=${CLIENT}`;
        try {
            console.log('[AdsService] Consultando VMAP:', url);
            const response = await axios.get<string>(url);

            const parsed = VmapParser.parseVmapXml(response.data);
            console.log('[AdsService] VMAP parseado:', {
                hasAds: parsed.hasAds,
                prerolls: parsed.prerollAds.length,
                midrolls: parsed.midrollAds.length,
                postrolls: parsed.postrollAds.length,
            });

            return parsed;
        } catch (error) {
            console.warn('[AdsService] Error obteniendo ads:', error);
            return null;
        }
    },

    /**
     * Extrae TODAS las URLs VAST de preroll del VMAP parseado (waterfall).
     * El VastPlayer las intentará en secuencia hasta encontrar una que tenga ads.
     */
    getAllPrerollVastUrls: (parsed: ParsedVmapData): string[] => {
        if (!parsed.hasAds || parsed.prerollAds.length === 0) return [];
        return parsed.prerollAds
            .map((ad) => ad.adSource.adTagUri)
            .filter((url): url is string => !!url);
    },

    /**
     * Extrae los ad breaks de midroll como cuepoints ordenados por tiempo.
     * Cada cuepoint incluye su posición en segundos y las URLs VAST.
     */
    getMidrollAdBreaks: (parsed: ParsedVmapData): AdBreakCuepoint[] => {
        if (!parsed.hasAds || parsed.midrollAds.length === 0) return [];
        return parsed.midrollAds
            .map((ad) => ({
                timeSeconds: parseTimeOffset(ad.timeOffset),
                vastUrls: [ad.adSource.adTagUri].filter((url): url is string => !!url),
            }))
            .filter((cp) => cp.vastUrls.length > 0 && cp.timeSeconds > 0)
            .sort((a, b) => a.timeSeconds - b.timeSeconds);
    },

    /**
     * Extrae TODAS las URLs VAST de postroll del VMAP parseado (waterfall).
     */
    getPostrollVastUrls: (parsed: ParsedVmapData): string[] => {
        if (!parsed.hasAds || parsed.postrollAds.length === 0) return [];
        return parsed.postrollAds
            .map((ad) => ad.adSource.adTagUri)
            .filter((url): url is string => !!url);
    },
};
