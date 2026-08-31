import axios from 'axios';
import { RUDO_VOD_ADS, CLIENT } from '@/config-global';
import { VmapParser, type ParsedVmapData } from '@/utils/vmapParser';

/**
 * Cuepoint de un ad break (midroll) con su timestamp y URLs VAST.
 */
export interface AdBreakCuepoint {
    timeSeconds: number;
    vastUrls: string[];
}

function parseTimeOffset(offset: string): number {
    const match = offset.match(/^(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?$/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = parseInt(match[3], 10);
    const millis = match[4] ? parseInt(match[4].padEnd(3, '0').slice(0, 3), 10) : 0;
    return hours * 3600 + minutes * 60 + seconds + millis / 1000;
}

export const adsService = {
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

    getPrerollVastUrl: (parsed: ParsedVmapData): string | undefined => {
        if (!parsed.hasAds || parsed.prerollAds.length === 0) return undefined;
        const vastUrl = parsed.prerollAds[0].adSource.adTagUri;
        return vastUrl || undefined;
    },

    getAllPrerollVastUrls: (parsed: ParsedVmapData): string[] => {
        if (!parsed.hasAds || parsed.prerollAds.length === 0) return [];
        return parsed.prerollAds
            .map((ad) => ad.adSource.adTagUri)
            .filter((url): url is string => !!url);
    },

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

    getPostrollVastUrls: (parsed: ParsedVmapData): string[] => {
        if (!parsed.hasAds || parsed.postrollAds.length === 0) return [];
        return parsed.postrollAds
            .map((ad) => ad.adSource.adTagUri)
            .filter((url): url is string => !!url);
    },
};
