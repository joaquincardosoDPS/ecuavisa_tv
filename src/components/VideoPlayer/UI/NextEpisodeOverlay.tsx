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
        <div style={{
            position: 'absolute',
            bottom: bottomPosition,
            right: '4vw',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            animation: 'fadeIn 0.4s ease-out forwards',
            transition: 'bottom 0.3s ease',
        }}>
            <style>{`
                .next-episode-card {
                    display: flex;
                    flex-direction: column;
                    padding: 1.2vw;
                    border-radius: 0.6vw;
                    background: linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(10,10,10,0.95) 100%);
                    border: 0.2vw solid transparent;
                    box-shadow: 0 1vw 2vw rgba(0,0,0,0.5);
                    cursor: pointer;
                    transition: border 0.2s ease, transform 0.2s ease;
                    transform: scale(1);
                    width: 32vw;
                    box-sizing: border-box;
                }
                .next-episode-card.focused, .next-episode-card:focus, .next-episode-card:focus-visible {
                    border: 0.2vw solid #FA6428;
                    transform: scale(1.05);
                    outline: none;
                }
            `}</style>
            <div
                className="next-episode-card"
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
