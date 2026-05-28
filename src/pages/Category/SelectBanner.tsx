import { useState, useRef } from 'react';
import type { Program } from '@/interfaces/catalog.interface';
import styles from './SelectBanner.module.css';

interface SelectBannerProps {
    program: Program | null;
    imageUrl?: string;
}

/** Extrae la mejor URL del logo */
function getLogoUrl(program: Program | null): string {
    if (!program) return '';

    const imgData = (program as any).image_logo;
    if (!imgData) return '';

    const getUrlFromEntry = (entry: any): string => {
        if (!entry) return '';
        if (typeof entry === 'string') return entry;
        const candidates = ['big', 'medium', 'normal', 'default', 'small'];
        for (const key of candidates) {
            if (entry[key] && typeof entry[key] === 'string') return entry[key];
        }
        return '';
    };

    if (Array.isArray(imgData)) {
        for (const item of imgData) {
            const url = getUrlFromEntry(item);
            if (url) return url;
        }
        return '';
    }

    if (typeof imgData === 'object') {
        return getUrlFromEntry(imgData);
    }

    if (typeof imgData === 'string') return imgData;

    return '';
}

/** Extrae una URL de un objeto de imagen */
function extractImageUrl(imgData: any): string {
    if (!imgData) return '';
    if (typeof imgData === 'string') return imgData;

    const candidates = ['big', 'normal', 'medium', 'default', 'small'];

    // Si es array, buscar en cada entrada
    if (Array.isArray(imgData)) {
        for (const entry of imgData) {
            const url = extractImageUrl(entry);
            if (url) return url;
        }
        return '';
    }

    // Si es objeto, buscar por key
    if (typeof imgData === 'object') {
        for (const key of candidates) {
            if (imgData[key] && typeof imgData[key] === 'string') return imgData[key];
        }
    }

    return '';
}

/** Extrae la imagen landscape del programa */
function getBgImage(program: Program | null): string {
    if (!program) return '';
    return (
        extractImageUrl(program.image_land) ||
        extractImageUrl(program.image_slider) ||
        extractImageUrl((program as any).image_port) ||
        (program as any).image ||
        ''
    );
}

function SelectBanner({ program, imageUrl }: SelectBannerProps) {
    const [bgLoaded, setBgLoaded] = useState(false);
    const prevBgRef = useRef('');

    const bgImage = imageUrl || getBgImage(program);
    const logoUrl = getLogoUrl(program);

    // Reset síncrono: si la URL cambió, resetear bgLoaded antes de que onLoad pueda disparar
    if (bgImage !== prevBgRef.current) {
        prevBgRef.current = bgImage;
        if (bgLoaded) setBgLoaded(false);
    }

    return (
        <div className={styles.banner}>
            {/* Imagen de fondo con fade-in */}
            {bgImage && (
                <img
                    src={bgImage}
                    alt={program?.title || 'background'}
                    onLoad={() => setBgLoaded(true)}
                    className={`${styles.bannerImage} ${bgLoaded ? styles.bannerImageVisible : styles.bannerImageHidden}`}
                    draggable={false}
                />
            )}

            {/* Gradient overlay */}
            <div className={styles.bannerGradient} />

            {/* Logo del programa */}
            {logoUrl && (
                <img
                    src={logoUrl}
                    alt={program?.title || 'logo'}
                    className={styles.bannerLogo}
                    draggable={false}
                />
            )}

            {/* Descripción corta */}
            <p
                className={styles.bannerDescription}
                style={{ top: logoUrl ? '250px' : '200px' }}
            >
                {program?.description_short || ''}
            </p>
        </div>
    );
}

export default SelectBanner;
