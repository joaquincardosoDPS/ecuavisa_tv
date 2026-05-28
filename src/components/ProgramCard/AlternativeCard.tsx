import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate } from 'react-router-dom';
import type { Program } from '@/interfaces/catalog.interface';
import styles from './ProgramCard.module.css';

interface AlternativeCardProps {
    program: Program;
    focusKey: string;
    onCardFocus?: () => void;
}

function AlternativeCard({ program, focusKey, onCardFocus }: AlternativeCardProps) {
    const navigate = useNavigate();

    const imageSrc = program?.image_land?.small;

    const handlePress = () => {
        navigate(`/programas/${program.key}`);
    };

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: handlePress,
        onFocus: () => onCardFocus?.(),
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

export default AlternativeCard;
