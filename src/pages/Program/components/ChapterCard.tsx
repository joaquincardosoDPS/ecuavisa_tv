import { useState } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import type { Chapter } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

interface ChapterCardProps {
    chapter: Chapter;
    index: number;
    programKey: string;
    focusKey: string;
    showChapter?: boolean;
    onCardFocus?: () => void;
    resumeTime?: number;
    onPress?: (chapter: Chapter, resumeTime?: number) => void;
}

/** Convierte "HH:MM:SS" o "MM:SS" a minutos */
function durationToMinutes(duration: any): string {
    if (!duration) return '--';
    const parts = String(duration).split(':');
    if (parts.length === 3) {
        return Math.round(
            parseInt(parts[0], 10) * 60 +
            parseInt(parts[1], 10) +
            parseInt(parts[2], 10) / 60
        ).toString();
    } else if (parts.length === 2) {
        return Math.round(
            parseInt(parts[0], 10) +
            parseInt(parts[1], 10) / 60
        ).toString();
    }
    return parts[0] || '--';
}

function ChapterCard({
    chapter,
    programKey,
    focusKey,
    showChapter = true,
    onCardFocus,
    resumeTime,
    onPress,
}: ChapterCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handlePress = () => {
        onPress?.(chapter, resumeTime);
    };

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: handlePress,
        onFocus: () => onCardFocus?.(),
    });

    const imageSrc = (chapter as any).image_land?.normal
        || (chapter as any).image_land?.default
        || chapter.image;

    const duration = durationToMinutes((chapter as any).duration);
    const showTimeBar = (chapter as any).duration_seg && (chapter as any).time;

    // Título: "chapter - title" si active_number, sino solo "title"
    const titleText = showChapter && chapter.chapter
        ? `${chapter.chapter} - ${chapter.title}`
        : chapter.title || '';

    return (
        <div
            ref={ref}
            className={styles.chapterCard}
            data-focuskey={focusKey}
            onClick={handlePress}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Thumbnail */}
            <div className={`${styles.chapterThumb} ${(focused || isHovered) ? styles.focused : ''}`}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={chapter.title}
                        className={styles.chapterThumbImg}
                        draggable={false}
                        decoding="async"
                    />
                ) : (
                    <div className={styles.chapterThumbPlaceholder} />
                )}

                {/* TimeBar dentro del thumbnail */}
                {showTimeBar && (
                    <div className={styles.chapterTimeBar} style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                    }}>
                        <div className={styles.chapterTimeBarInner}>
                            <div
                                className={styles.chapterTimeBarFill}
                                style={{
                                    width: `${Math.min(100, ((chapter as any).time / (chapter as any).duration_seg) * 100)}%`
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Info al lado de la imagen */}
            <div className={styles.chapterInfo}>
                {/* Fila: título + duración */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 2,
                }}>
                    <p className={styles.chapterNumber}>{titleText}</p>
                    <span className={styles.chapterDuration}>{duration} min</span>
                </div>

                {/* Descripción del capítulo */}
                <p className={styles.chapterTitle}>
                    {(chapter as any).description || 'Descripción no disponible'}
                </p>
            </div>
        </div>
    );
}

export default ChapterCard;
