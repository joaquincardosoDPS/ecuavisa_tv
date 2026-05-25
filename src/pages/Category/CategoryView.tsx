import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { catalogService } from '@/services/catalogService';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import ProgramGrid from '@/components/ProgramCard/ProgramGrid';
import type { Program } from '@/interfaces/catalog.interface';
import styles from './CategoryView.module.css';

const PAGE_LIMIT = 12;

function CategoryView() {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const navTitle = (location.state as { title?: string })?.title || '';
    const [categoryTitle, setCategoryTitle] = useState(navTitle);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isError, setIsError] = useState(false);

    const { ref, focusKey } = useFocusable({
        focusKey: 'CATEGORY',
        saveLastFocusedChild: true,
        trackChildren: true,
    });

    /* Carga inicial */
    useEffect(() => {
        if (!slug) return;

        let cancelled = false;
        setIsLoading(true);
        setIsError(false);
        setPrograms([]);
        setPage(1);

        catalogService
            .searchPrograms({ category: slug, limit: PAGE_LIMIT, page: 1 })
            .then((res) => {
                if (cancelled) return;
                const results = res.data || [];
                setPrograms(results);
                setTotalRecords(res.total_records || 0);
                setHasMore(1 < (res.last_page || 1));

                if (results.length > 0 && !categoryTitle) {
                    setCategoryTitle(results[0].name_category || slug);
                }

                /* Foco inicial al primer card */
                if (results.length > 0) {
                    setTimeout(() => setFocus(`CAT-GRID-${results[0].id}`), 150);
                }
            })
            .catch(() => {
                if (!cancelled) setIsError(true);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => { cancelled = true; };
    }, [slug]);

    /* Cargar más */
    const loadMore = useCallback(() => {
        if (isLoadingMore || !hasMore || !slug) return;

        const nextPage = page + 1;
        setIsLoadingMore(true);

        catalogService
            .searchPrograms({ category: slug, limit: PAGE_LIMIT, page: nextPage })
            .then((res) => {
                const results = res.data || [];
                setPrograms((prev) => [...prev, ...results]);
                setPage(nextPage);
                setHasMore(nextPage < (res.last_page || 1));

                /* Foco al primer resultado nuevo */
                if (results.length > 0) {
                    setTimeout(() => {
                        setFocus(`CAT-GRID-${results[0].id}`);
                    }, 100);
                }
            })
            .catch(() => { /* silencioso */ })
            .finally(() => {
                setIsLoadingMore(false);
            });
    }, [slug, page, hasMore, isLoadingMore]);

    if (isLoading) {
        return <FullScreenSpinner />;
    }

    if (isError) {
        return (
            <div className={styles.container}>
                <p className={styles.errorText}>
                    Error al cargar los programas de esta categoría.
                </p>
            </div>
        );
    }


    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{categoryTitle || slug}</h1>
                    {totalRecords > 0 && (
                        <p className={styles.subtitle}>
                            {totalRecords} programa{totalRecords !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {programs.length === 0 ? (
                    <p className={styles.emptyText}>
                        No hay programas en esta categoría.
                    </p>
                ) : (
                    <ProgramGrid
                        programs={programs}
                        focusKeyPrefix="CAT-GRID"
                        hasMore={hasMore}
                        isLoadingMore={isLoadingMore}
                        onLoadMore={loadMore}
                    />
                )}
            </div>
        </FocusContext.Provider>
    );
}

export default CategoryView;
