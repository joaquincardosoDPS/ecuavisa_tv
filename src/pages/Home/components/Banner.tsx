import { useState, useCallback } from 'react';
import type { Program } from '@/interfaces/catalog.interface';
import { BannerInfo } from './BannerInfo';
import styles from './Banner.module.css';

interface BannerProps {
    slider: Program[];
    /** @deprecated No longer used — kept for API compat */
    scrollY?: number;
    /** Callback cuando el botón Play recibe foco */
    onPlayFocused?: () => void;
}

function Banner({ slider, onPlayFocused }: BannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!slider || slider.length === 0) return null;

    const mainProgram = slider[currentIndex] || slider[0];
    const total = slider.length;
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === total - 1;

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
    }, [total]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    return (
        <div className={styles.wrapper}>
            {/* Imagen de fondo con fade */}
            <div className={styles.bgImageWrapper}>
                <img
                    src={mainProgram.image_slider?.big || mainProgram.image_land?.default}
                    alt={mainProgram.title}
                    className={styles.bgImage}
                    decoding="async"
                    key={mainProgram.id}
                />
            </div>

            {/* Gradiente overlay */}
            <div className={styles.overlay} />

            {/* Contenido (logo, descripción, botón) */}
            <div className={styles.content}>
                <BannerInfo
                    program={mainProgram}
                    onPlayFocused={onPlayFocused}
                    onSlideNext={isLast ? undefined : goNext}
                    onSlidePrev={isFirst ? undefined : goPrev}
                    isFirstSlide={isFirst}
                />
            </div>

            {/* Flechas — solo para magic mouse (sin foco) */}
            {total > 1 && (
                <>
                    <button
                        className={styles.arrowBtn + ' ' + styles.arrowLeft}
                        onClick={goPrev}
                        type="button"
                        tabIndex={-1}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <button
                        className={styles.arrowBtn + ' ' + styles.arrowRight}
                        onClick={goNext}
                        type="button"
                        tabIndex={-1}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots indicadores */}
            {total > 1 && (
                <div className={styles.dots}>
                    {slider.map((_, i) => (
                        <span
                            key={i}
                            className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
                            onClick={() => setCurrentIndex(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Banner;