import { useNavigate } from 'react-router-dom';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import type { Program } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

interface RelatedCardProps {
    program: Program;
    focusKey: string;
    onCardFocus?: () => void;
}

/** Card individual de programa recomendado — layout horizontal como el original */
function RelatedCard({ program, focusKey, onCardFocus }: RelatedCardProps) {
    const navigate = useNavigate();
    const imageSrc = program.image_land?.small;

    const handleSelect = () => {
        navigate(`/programas/${program.key}`);
    };

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: handleSelect,
        onFocus: () => onCardFocus?.(),
    });

    return (
        <div
            ref={ref}
            className={`${styles.relatedCard} ${focused ? styles.relatedCardFocused : ''}`}
            onClick={handleSelect}
            data-focuskey={focusKey}
        >
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={program.title}
                    className={styles.relatedCardImg}
                    draggable={false}
                    decoding="async"
                />
            ) : (
                <div className={styles.relatedCardFallback}>
                    <span className={styles.relatedCardFallbackText}>{program.title}</span>
                </div>
            )}
        </div>
    );
}

interface RelatedProgramsContainerProps {
    programs: Program[];
    isLoading?: boolean;
    onRowFocused?: () => void;
}

function RelatedProgramsContainer({
    programs,
    isLoading = false,
}: RelatedProgramsContainerProps) {
    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-RELATED',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
    });

    // Limitar a 8 programas como el original
    const limitedPrograms = programs.slice(0, 8);

    if (isLoading) {
        return <p className={styles.statusText}>Cargando programas relacionados...</p>;
    }

    if (limitedPrograms.length === 0) {
        return (
            <p className={styles.emptyText}>
                No hay sugerencias disponibles.
            </p>
        );
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.relatedGrid}>
                {limitedPrograms.map((program, index) => (
                    <RelatedCard
                        key={program.id}
                        program={program}
                        focusKey={`PROGRAM-RELATED-${program.id}-${index}`}
                    />
                ))}
            </div>
        </FocusContext.Provider>
    );
}

export default RelatedProgramsContainer;
