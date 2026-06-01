import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import type { Program } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

/** Cuántos cards antes del final dispara la carga */
const PREFETCH_THRESHOLD = 3;

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
    isFetchingNextPage?: boolean;
    hasNextPage?: boolean;
    fetchNextPage?: () => void;
    onRowFocused?: () => void;
}

function RelatedProgramsContainer({
    programs,
    isLoading = false,
    isFetchingNextPage = false,
    hasNextPage = false,
    fetchNextPage,
}: RelatedProgramsContainerProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAM-RELATED',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
    });

    /** REGLA F5.1: scroll al card enfocado con margen inferior + prefetch */
    const handleCardFocus = useCallback((index: number) => {
        const grid = gridRef.current;
        const scrollContainer = grid?.parentElement;
        if (grid && scrollContainer) {
            const children = grid.children;
            if (index >= 0 && index < children.length) {
                const child = children[index] as HTMLElement;
                const containerRect = scrollContainer.getBoundingClientRect();
                const childRect = child.getBoundingClientRect();

                // Si el card queda abajo del área visible (o muy pegado al borde)
                const bottomMargin = 80; // px de margen extra abajo
                const overflowBottom = (childRect.bottom + bottomMargin) - containerRect.bottom;
                if (overflowBottom > 0) {
                    scrollContainer.scrollTop += overflowBottom;
                }

                // Si el card queda arriba del área visible
                const overflowTop = containerRect.top - childRect.top;
                if (overflowTop > 0) {
                    scrollContainer.scrollTop -= overflowTop + bottomMargin;
                }
            }
        }

        // Prefetch cuando el foco llega a los últimos N cards
        if (hasNextPage && fetchNextPage && index >= programs.length - PREFETCH_THRESHOLD) {
            fetchNextPage();
        }
    }, [hasNextPage, fetchNextPage, programs.length]);

    if (isLoading) {
        return <p className={styles.statusText}>Cargando programas relacionados...</p>;
    }

    if (programs.length === 0) {
        return (
            <p className={styles.emptyText}>
                No hay sugerencias disponibles.
            </p>
        );
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.relatedGrid}>
                <div ref={gridRef} className={styles.relatedGridInner}>
                    {programs.map((program, index) => (
                        <RelatedCard
                            key={program.id}
                            program={program}
                            focusKey={`PROGRAM-RELATED-${program.id}-${index}`}
                            onCardFocus={() => handleCardFocus(index)}
                        />
                    ))}
                    {isFetchingNextPage && (
                        <p className={styles.statusText}>Cargando más...</p>
                    )}
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default RelatedProgramsContainer;
