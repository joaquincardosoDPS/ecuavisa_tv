// VideoPlayer Module — Types
// All types used by the VideoPlayer module are defined here.
// External consumers should import types from '@/components/VideoPlayer'.

import type { AdBreakCuepoint } from '@/services/adsService';

export type { AdBreakCuepoint } from '@/services/adsService';

export interface ImageSet {
    small: string;
    medium: string;
    normal: string;
    big: string;
    default: string;
}

/**
 * Capítulo del catálogo (API de catálogo)
 */
export interface Chapter {
    chapter: number;
    date_create: string;
    date_update: string;
    description: string;
    duration: string;
    image: string;
    /** El API puede no devolverla (ej. capítulos antiguos): usar siempre respaldo. */
    image_land?: ImageSet;
    key: string;
    /** Key del programa dueño del capítulo (key_program del API): se usa para el link de pago. */
    key_program?: string;
    key_segment: string;
    m3u8: string;
    name_program: string;
    name_segment: string;
    restriction: string;
    season: number;
    slug: string;
    title: string;
    title_complete: string;
}

/**
 * Capítulo simplificado (API de VOD/Programa)
 */
export interface ProgramChapter {
    id: string;
    key: string;
    title: string;
    image: string;
    link: string;
    duration?: string;
    restriction: string;
    /** Sin acceso (contenido de pago no comprado): se pinta el candado y no se puede seleccionar. */
    locked?: boolean;
    packs?: string[];
    description?: string;
    initialSeconds?: number;
}

/**
 * Props del componente VideoPlayer
 */
export interface VideoPlayerProps {
    src: string;
    title: string;
    description?: string;
    isLive?: boolean;
    vastUrl?: string;
    /** Array de URLs VAST pre-resueltas (waterfall de prerolls) */
    vastUrls?: string[];
    livetoken?: string;
    rudoKey?: string;
    autoplay?: boolean;
    onBack?: () => void;
    episodes?: Chapter[];
    currentEpisodeKey?: string;
    onEpisodeSelect?: (episode: Chapter) => void;
    /**
     * Keys de capítulos sin acceso (contenido de pago no comprado por el usuario).
     * El player los muestra con candado en el panel y, al seleccionarlos, abre el
     * modal de compra en vez de navegar. El dueño del módulo decide la regla:
     * el player no conoce suscripciones.
     */
    lockedEpisodes?: string[];
    hideUI?: boolean;
    onQualitiesChange?: (qualities: { value: string; label: string }[]) => void;
    onQualityChange?: (quality: string) => void;
    onAdsPlaying?: () => void;
    onAdsFinished?: () => void;
    /** Callback en cada timeupdate con currentTime y duration */
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    /** Callback cuando el video termina naturalmente */
    onEnded?: () => void;
    /** Activa el modo PiP visual (video encogido a esquina) */
    pipMode?: boolean;
    /** Fuerza los controles (TopBar + Controls) a permanecer visibles */
    forceControlsVisible?: boolean;
    programBackgroundImage?: string;
    initialSeconds?: number;
    /** Slug del capítulo para guardado de historial "Seguir viendo" */
    vodSlug?: string;
    /** Token del usuario autenticado */
    userToken?: string;
    /** ID del perfil activo */
    userProfile?: string;
    /** Callback para pasar al siguiente capítulo */
    onNextChapter?: () => void;
    /** Si hay un capítulo siguiente disponible */
    hasNextChapter?: boolean;
    /** Cuepoints de midroll con timestamps y URLs VAST */
    midrollCuepoints?: AdBreakCuepoint[];
    /** URLs VAST de postroll */
    postrollVastUrls?: string[];
}

export interface VodMediaInfo {
    m3u8: string;
    mp4?: string;
    duration: number;
    restriction: string;
    packs?: string[];
    vast?: string;
    title?: string;
    image?: string;
    show?: string;
}

export interface PlayerState {
    isPlaying: boolean;
    isLoading: boolean;
    currentTime: number;
    duration: number;
    playingAds: boolean;
}

export interface DeviceAdInfo {
    rdid: string;
    is_lat: string;
    idtype: string;
}
