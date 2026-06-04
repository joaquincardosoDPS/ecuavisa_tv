import axios from 'axios';
import { RUDO_VOD_ADS, CLIENT } from '@/config-global';
import { VmapParser, type ParsedVmapData } from '@/utils/vmapParser';

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
};
