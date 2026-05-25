import { useState, useEffect, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { catalogService } from '@/services/catalogService';
import { OnScreenKeyboard } from '@/components/ui/OnScreenKeyboard';
import ProgramGrid from '@/components/ProgramCard/ProgramGrid';
import type { Program } from '@/interfaces/catalog.interface';
import styles from './SearchView.module.css';

const SEARCH_LIMIT = 12;

function SearchView() {
    const [query, setQuery] = useState('');
    const [programs, setPrograms] = useState<Program[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isError, setIsError] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const { ref, focusKey } = useFocusable({
        focusKey: 'SEARCH',
        saveLastFocusedChild: true,
        trackChildren: true,
    });

    /* Foco inicial en el teclado */
    useEffect(() => {
        setFocus('SEARCH-KB');
    }, []);

    /* Búsqueda inicial con debounce — resetea paginación */
    useEffect(() => {
        if (debouncedQuery.trim().length === 0) {
            setPrograms([]);
            setPage(1);
            setHasMore(false);
            return;
        }

        let cancelled = false;
        setIsLoading(true);
        setIsError(false);
        setPage(1);

        catalogService
            .searchPrograms({ search: debouncedQuery, limit: SEARCH_LIMIT, page: 1 })
            .then((res) => {
                if (!cancelled) {
                    const results = res.data || [];
                    setPrograms(results);
                    setHasMore(results.length >= SEARCH_LIMIT);
                }
            })
            .catch(() => {
                if (!cancelled) setIsError(true);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => { cancelled = true; };
    }, [debouncedQuery]);

    /* Cargar más resultados */
    const loadMore = useCallback(() => {
        if (isLoadingMore || !hasMore) return;

        const nextPage = page + 1;
        setIsLoadingMore(true);

        catalogService
            .searchPrograms({ search: debouncedQuery, limit: SEARCH_LIMIT, page: nextPage })
            .then((res) => {
                const results = res.data || [];
                setPrograms((prev) => [...prev, ...results]);
                setPage(nextPage);
                setHasMore(results.length >= SEARCH_LIMIT);

                /* Mover foco al primer resultado nuevo (REGLA F4.1) */
                if (results.length > 0) {
                    const firstNewId = results[0].id;
                    setTimeout(() => {
                        setFocus(`SEARCH-RESULTS-${firstNewId}`);
                    }, 100);
                }
            })
            .catch(() => {
                /* silencioso — el usuario puede reintentar */
            })
            .finally(() => {
                setIsLoadingMore(false);
            });
    }, [debouncedQuery, page, hasMore, isLoadingMore, programs.length]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.container}>
                {/* Input de texto (display only) */}
                <div className={styles.inputWrapper}>
                    <div className={styles.inputDisplay}>
                        {query || (
                            <span className={styles.placeholder}>
                                Ingresa tu búsqueda...
                            </span>
                        )}
                    </div>
                </div>

                {/* Contenido: teclado (25%) + resultados (75%) */}
                <div className={styles.content}>
                    <div className={styles.keyboardPanel}>
                        <OnScreenKeyboard
                            focusKeyPrefix="SEARCH-KB"
                            onInput={(char) => setQuery((prev) => prev + char)}
                            onSearch={() => {/* ya busca con debounce */ }}
                            onDelete={() => setQuery((prev) => prev.slice(0, -1))}
                            onClear={() => setQuery('')}
                        />
                    </div>

                    <div className={styles.resultsPanel}>
                        {debouncedQuery.trim().length === 0 ? (
                            <p className={styles.hint}>
                                Usa el teclado para buscar programas
                            </p>
                        ) : (
                            <ProgramGrid
                                programs={programs}
                                isLoading={isLoading}
                                isError={isError}
                                loadingText="Buscando..."
                                errorText="Error al buscar"
                                focusKeyPrefix="SEARCH-RESULTS"
                                hasMore={hasMore}
                                isLoadingMore={isLoadingMore}
                                onLoadMore={loadMore}
                            />
                        )}
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default SearchView;
