import { memo, useCallback } from 'react';
import type { Chapter } from '../types';
import styles from "./NextEpisodeOverlay.module.css";

interface NextEpisodeOverlayProps {
    episode: Chapter;
    onSelect: (episode: Chapter) => void;
    countdown?: number;
    controlsVisible?: boolean;
}

export const NEXT_EPISODE_FOCUS_KEY = 'next-episode-overlay';

const NextEpisodeOverlayComponent = ({ episode, onSelect, countdown, controlsVisible }: NextEpisodeOverlayProps) => {

    const bottomPosition = controlsVisible ? '12vw' : '4vw';

    const handleSelect = useCallback(() => {
        onSelect(episode);
    }, [onSelect, episode]);

    return (
        <div className={styles.overlay} style={{
            bottom: bottomPosition,
        }}>
            <div
                className={styles.card}
                onClick={handleSelect}
            >
                <div className={styles.overlayTitle}>
                    A continuación
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={episode.image || ""}
                            alt={episode.title}
                            loading="lazy" className={styles.thumbnailImage}
                        />
                        {countdown !== undefined && countdown > 0 && (
                            <div className={styles.countdownText}>
                                En {countdown} segundos
                            </div>
                        )}
                    </div>

                    <div className={styles.episodeTitle}>
                        {episode.title}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const NextEpisodeOverlay = memo(NextEpisodeOverlayComponent);
export default NextEpisodeOverlay;
