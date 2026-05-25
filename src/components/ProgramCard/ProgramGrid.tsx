import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import type { Program } from '@/interfaces/catalog.interface';
import type { FavoriteItem } from '@/interfaces/favorites.interface';
import { useTrackScroll } from '@/hooks/useTrackScroll';
import { Button } from '@/components/ui/Button';
import AlternativeCard from './AlternativeCard';
import styles from './ProgramGrid.module.css';

type GridItem = Program | FavoriteItem;

function isProgram(item: GridItem): item is Program {
    return 'segments' in item;
}

function toProgram(item: GridItem): Program {
    if (isProgram(item)) return item;
    return item as unknown as Program;
}

interface ProgramGridProps {
    programs: GridItem[];
    isLoading?: boolean;
    isError?: boolean;
    loadingText?: string;
    errorText?: string;
    focusKeyPrefix?: string;
    /** Callback cuando la grilla recibe foco (para scroll vertical del padre) */
    onRowFocused?: () => void;
    /** Muestra botón "Cargar más" */
    hasMore?: boolean;
    isLoadingMore?: boolean;
    onLoadMore?: () => void;
}

function ProgramGrid({
    programs,
    isLoading = false,
    isError = false,
    loadingText = 'Cargando...',
    errorText = 'Error al cargar',
    focusKeyPrefix = 'GRID',
    onRowFocused,
    hasMore = false,
    isLoadingMore = false,
    onLoadMore,
}: ProgramGridProps) {
    const { trackRef, scrollToChild } = useTrackScroll({
        direction: 'vertical',
        enableWheel: true,
    });

    const { ref, focusKey } = useFocusable({
        focusKey: focusKeyPrefix,
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onRowFocused?.(),
    });

    if (isLoading) {
        return <p className={styles.statusText}>{loadingText}</p>;
    }

    if (isError) {
        return <p className={styles.errorText}>{errorText}</p>;
    }

    if (programs.length === 0) {
        return null;
    }

    const loadMoreKey = `${focusKeyPrefix}-loadmore`;

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.gridOuter}>
                <div ref={trackRef} className={styles.grid}>
                    {programs.map((item) => {
                        const program = toProgram(item);
                        const cardKey = `${focusKeyPrefix}-${program.id}`;
                        return (
                            <AlternativeCard
                                key={program.id}
                                program={program}
                                focusKey={cardKey}
                                onCardFocus={() => scrollToChild(cardKey)}
                            />
                        );
                    })}

                    {/* Botón cargar más */}
                    {hasMore && onLoadMore && (
                        <div className={styles.loadMoreWrapper}>
                            <Button
                                focusKey={loadMoreKey}
                                variant="secondary"
                                onPress={onLoadMore}
                                onFocused={() => scrollToChild(loadMoreKey)}
                            >
                                {isLoadingMore ? 'Cargando...' : 'Cargar más'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default ProgramGrid;
