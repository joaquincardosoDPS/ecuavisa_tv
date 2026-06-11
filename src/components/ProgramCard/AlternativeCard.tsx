import { memo } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import type { Program } from '@/interfaces/catalog.interface';
import styles from './ProgramCard.module.css';

interface AlternativeCardProps {
    program: Program;
    focusKey: string;
    index: number;
    onCardFocus?: (focusKey: string, index: number) => void;
    onPress?: (programKey: string) => void;
}

function AlternativeCard({ program, focusKey, index, onCardFocus, onPress }: AlternativeCardProps) {
    const imageSrc = program?.image_land?.small;

    const handlePress = () => {
        onPress?.(program.key);
    };

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: handlePress,
        onFocus: () => onCardFocus?.(focusKey, index),
    });

    const classList = [
        styles.card,
        styles.alternative,
        focused && styles.focused,
    ].filter(Boolean).join(' ');

    return (
        <div ref={ref} className={classList} data-focuskey={focusKey} onClick={handlePress}>
            <div className={styles.ratioBox}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={program.title}
                        className={styles.image}
                        draggable={false}
                        decoding="async"
                    />
                ) : (
                    <div className={styles.fallback}>
                        <span className={styles.fallbackText}>{program.title}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(AlternativeCard);


