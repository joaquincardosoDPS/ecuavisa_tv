import { createPortal } from 'react-dom';
import type { Program } from '@/interfaces/catalog.interface';
import { BannerInfo } from './BannerInfo';
import styles from './Banner.module.css';

interface BannerProps {
    slider: Program[];
    /** translateY actual del scrollContainer (para mover el fondo en sync) */
    scrollY?: number;
    /** Callback cuando el botón Play recibe foco */
    onPlayFocused?: () => void;
}

function Banner({ slider, scrollY = 0, onPlayFocused }: BannerProps) {
    if (!slider || slider.length === 0) return null;

    const mainProgram = slider[0];

    const background = (
        <section
            className={styles.background}
            style={{ transform: `translateY(${scrollY}px)` }}
        >
            <div className={styles.bgImageWrapper}>
                <img
                    src={mainProgram.image_slider?.big || mainProgram.image_land?.default}
                    alt={mainProgram.title}
                    className={styles.bgImage}
                    decoding="async"
                />
                <div className={styles.overlayTop} />
                <div className={styles.overlayBottom} />
                <div className={styles.overlayLeft} />
            </div>
        </section>
    );

    return (
        <>
            {createPortal(background, document.body)}

            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <BannerInfo program={mainProgram} onPlayFocused={onPlayFocused} />
                </div>
            </div>
        </>
    );
}

export default Banner;