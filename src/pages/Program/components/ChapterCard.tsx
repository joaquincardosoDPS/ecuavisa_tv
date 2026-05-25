import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate } from 'react-router-dom';
import type { Chapter } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

interface ChapterCardProps {
    chapter: Chapter;
    index: number;
    programKey: string;
    focusKey: string;
    showChapter?: boolean;
    onCardFocus?: () => void;
}

/**
 * Tarjeta de capítulo para TV — basada en el modelo web.
 * REGLA F4.2: el estado focused se consume solo aquí (nivel más bajo).
 * REGLA F6.1: hover = focused
 * REGLA F6.2: click = enter
 */
function ChapterCard({
    chapter,
    programKey,
    focusKey,
    showChapter = true,
    onCardFocus,
}: ChapterCardProps) {
    const navigate = useNavigate();

    const handlePress = () => {
        navigate(
            `/play/${programKey}/${chapter.key_segment}/${chapter.season}/${chapter.chapter}`,
        );
    };

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: handlePress,
        onFocus: () => onCardFocus?.(),
    });

    const imageSrc = chapter.image_land?.default || chapter.image;

    return (
        <div
            ref={ref}
            className={styles.chapterCard}
            data-focuskey={focusKey}
            onClick={handlePress}
        >
            {/* Thumbnail 16:9 */}
            <div className={`${styles.chapterThumb} ${focused ? styles.focused : ''}`}>
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
            </div>

            {/* Info debajo de la imagen */}
            <div className={styles.chapterInfo}>
                {showChapter ? (
                    <>
                        <p className={styles.chapterNumber}>Capítulo {chapter.chapter}</p>
                        <p className={styles.chapterTitle}>{chapter.title}</p>
                    </>
                ) : (
                    <p className={styles.chapterNumber}>{chapter.title}</p>
                )}
            </div>
        </div>
    );
}

export default ChapterCard;
