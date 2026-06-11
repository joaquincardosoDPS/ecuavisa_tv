import { useCallback, useEffect, useRef } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import type { Program } from '@/interfaces/catalog.interface';
import type { FavoriteItem } from '@/interfaces/favorites.interface';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
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
    /** Indica si hay más páginas disponibles */
    hasMore?: boolean;
    isLoadingMore?: boolean;
    onLoadMore?: () => void;
    /** Callback al presionar un card */
    onProgramPress?: (programKey: string) => void;
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
    onProgramPress,
}: ProgramGridProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const { ref, focusKey } = useFocusable({
        focusKey: focusKeyPrefix,
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onRowFocused?.(),
    });

    /* ── Refs para estabilizar callbacks ──
     * Evita que los callbacks cambien de referencia al cargar más items,
     * lo que causaría re-renderizado de todos los cards memoizados. */
    const hasMoreRef = useRef(hasMore);
    hasMoreRef.current = hasMore;

    const isLoadingMoreRef = useRef(isLoadingMore);
    isLoadingMoreRef.current = isLoadingMore;

    const onLoadMoreRef = useRef(onLoadMore);
    onLoadMoreRef.current = onLoadMore;

    const programsLenRef = useRef(programs.length);
    programsLenRef.current = programs.length;

    /** Columnas del grid — la última fila dispara la carga */
    const PREFETCH_COLUMNS = 4;

    /**
     * Scroll nativo: detectar proximidad al fondo para cargar más.
     * Mismo patrón que CategoryView — umbral de 300px.
     */
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        if (
            el.scrollHeight - el.scrollTop - el.clientHeight < 300 &&
            hasMoreRef.current &&
            !isLoadingMoreRef.current &&
            onLoadMoreRef.current
        ) {
            onLoadMoreRef.current();
        }
    }, []);

    /**
     * Al enfocar un card:
     * 1. Scroll into view — asegurar que sea visible.
     * 2. Prefetch — si el foco llega a la última fila, cargar la siguiente página.
     *
     * Todas las dependencias volátiles se leen desde refs,
     * así el callback nunca cambia de referencia.
     */
    const handleCardFocus = useCallback((cardFocusKey: string, index: number) => {
        /* ── Prefetch: última fila → cargar más (se ejecuta siempre) ── */
        const currentRow = Math.floor(index / PREFETCH_COLUMNS);
        const lastRow = Math.floor((programsLenRef.current - 1) / PREFETCH_COLUMNS);

        if (
            hasMoreRef.current &&
            !isLoadingMoreRef.current &&
            onLoadMoreRef.current &&
            currentRow >= lastRow
        ) {
            onLoadMoreRef.current();
        }

        /* ── Scroll into view ── */
        const container = scrollRef.current;
        if (!container) return;

        const child = container.querySelector(
            `[data-focuskey="${cardFocusKey}"]`,
        ) as HTMLElement | null;
        if (!child) return;

        const containerRect = container.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();

        const isAbove = childRect.top < containerRect.top;
        const isBelow = childRect.bottom > containerRect.bottom;

        if (isAbove || isBelow) {
            const offset = childRect.top - containerRect.top - 10;
            container.scrollBy({ top: offset, behavior: 'smooth' });
        }
    }, []);

    /**
     * Fallback: si todo el contenido cabe en pantalla sin necesidad de scroll,
     * el onScroll nunca se dispara. En ese caso cargamos automáticamente
     * la siguiente página para llenar la vista.
     */
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        if (
            container.scrollHeight <= container.clientHeight &&
            hasMore &&
            !isLoadingMore &&
            onLoadMore
        ) {
            onLoadMore();
        }
    }, [programs.length, hasMore, isLoadingMore, onLoadMore]);

    if (isLoading) {
        return <p className={styles.statusText}>{loadingText}</p>;
    }

    if (isError) {
        return <p className={styles.errorText}>{errorText}</p>;
    }

    if (programs.length === 0) {
        return null;
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.gridOuter}>
                <div
                    ref={scrollRef}
                    className={styles.scrollArea}
                    onScroll={handleScroll}
                >
                    <div className={styles.grid}>
                        {programs.map((item, index) => {
                            const program = toProgram(item);
                            const cardKey = `${focusKeyPrefix}-${program.id}`;
                            return (
                                <AlternativeCard
                                    key={program.id}
                                    program={program}
                                    focusKey={cardKey}
                                    index={index}
                                    onCardFocus={handleCardFocus}
                                    onPress={onProgramPress}
                                />
                            );
                        })}
                    </div>

                    {/* Spinner de carga al final — fuera del grid para no afectar layout */}
                    {isLoadingMore && (
                        <div className={styles.loadingMoreSpinner}>
                            <FullScreenSpinner />
                        </div>
                    )}
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default ProgramGrid;
