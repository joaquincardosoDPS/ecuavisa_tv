import { useEffect } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useSearchData } from '@/hooks/search/useSearchData';
import { useSearchNavigation } from '@/hooks/search/useSearchNavigation';
import { OnScreenKeyboard } from '@/components/ui/OnScreenKeyboard';
import ProgramGrid from '@/components/ProgramCard/ProgramGrid';
import styles from './SearchView.module.css';

function SearchView() {
    /* ── Hooks de datos y navegación ── */
    const {
        query,
        debouncedQuery,
        programs,
        isLoading,
        isLoadingMore,
        isError,
        hasMore,
        loadMore,
        appendChar,
        deleteChar,
        clearQuery,
    } = useSearchData();

    const { goToProgram } = useSearchNavigation();

    /* ── UI / Foco ── */
    const { ref, focusKey } = useFocusable({
        focusKey: 'SEARCH',
        saveLastFocusedChild: true,
        trackChildren: true,
    });

    /* Foco inicial en el teclado */
    useEffect(() => {
        setFocus('SEARCH-KB');
    }, []);

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
                            onInput={appendChar}
                            onSearch={() => {/* ya busca con debounce */ }}
                            onDelete={deleteChar}
                            onClear={clearQuery}
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
                                onProgramPress={goToProgram}
                            />
                        )}
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default SearchView;
