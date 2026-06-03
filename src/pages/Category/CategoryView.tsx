import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
    FocusContext,
    useFocusable,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { catalogService } from '@/services/catalogService';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import type { Program } from '@/interfaces/catalog.interface';
import SelectBanner from './SelectBanner';
import styles from './CategoryView.module.css';

const PAGE_LIMIT = 20;

/** Extrae URL de imagen landscape de un programa */
function getCardImage(program: Program): string {
    return (
        (program.image_land && typeof program.image_land === 'object' && !Array.isArray(program.image_land)
            ? (program.image_land.small || program.image_land.normal || program.image_land.big || program.image_land.default)
            : '') ||
        (program as any).image ||
        ''
    );
}

/** Extrae la mejor imagen grande para el banner (prioriza image_background.big) */
function getBannerImage(program: Program): string {
    const p = program as any;

    // Helper: extrae la URL más grande de un ImageSet (objeto o array)
    const extractBig = (img: any): string => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        if (Array.isArray(img) && img.length > 0) {
            const first = img[0];
            if (typeof first === 'string') return first;
            if (typeof first === 'object') return first.big || first.normal || first.medium || first.default || first.small || '';
        }
        if (typeof img === 'object') {
            return img.big || img.normal || img.medium || img.default || img.small || '';
        }
        return '';
    };

    return (
        extractBig(p.image_background) ||
        extractBig(p.image_slider) ||
        extractBig(p.image_land) ||
        p.image ||
        ''
    );
}

/* ── Card individual (idéntico al original) ── */
function CategoryCard({
    program,
    focusKey,
    isFirstRow,
    onProgramFocus,
}: {
    program: Program;
    focusKey: string;
    isFirstRow?: boolean;
    onProgramFocus?: (p: Program) => void;
}) {
    const navigate = useNavigate();

    const imgSrc = getCardImage(program);

    const handlePress = () => {
        navigate(`/programas/${program.key}`, { state: { program } });
    };

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: handlePress,
        onFocus: () => {
            onProgramFocus?.(program);
            const el = ref.current as HTMLElement;
            if (!el) return;
            
            const container = el.closest('[class*="container"]') as HTMLElement;
            const banner = document.querySelector('[class*="stickyBanner"]') as HTMLElement;

            if (isFirstRow) {
                // Primera fila: volver al tope para mostrar el título
                container?.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (container && banner) {
                const bannerHeight = banner.getBoundingClientRect().height;
                const elRect = el.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                // Posicionar la fila justo debajo del banner (fila anterior queda oculta)
                const targetTop = bannerHeight + 10;
                const currentTop = elRect.top - containerRect.top;
                const offset = currentTop - targetTop;
                
                if (Math.abs(offset) > 20) {
                    container.scrollBy({
                        top: offset,
                        behavior: 'smooth'
                    });
                }
            }
        },
    });

    const cardClass = [styles.card, focused && styles.focused]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={styles.cardWrapper}>
            <div
                ref={ref}
                className={cardClass}
                data-focuskey={focusKey}
                onClick={handlePress}
                onMouseEnter={() => { setFocus(focusKey); onProgramFocus?.(program); }}
            >
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={program.title}
                        className={styles.cardImage}
                        draggable={false}
                        decoding="async"
                    />
                ) : (
                    <div className={styles.cardFallback}>
                        <span className={styles.cardFallbackText}>
                            {program.title}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Vista de categoría ── */
function CategoryView() {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();

    const navTitle =
        (location.state as { title?: string })?.title || '';
    const [categoryTitle, setCategoryTitle] = useState(navTitle);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [bannerImageUrl, setBannerImageUrl] = useState('');

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
                setHasMore(1 < (res.last_page || 1));

                if (results.length > 0 && !categoryTitle) {
                    setCategoryTitle(
                        results[0].name_category || slug,
                    );
                }

                if (results.length > 0) {
                    setSelectedProgram(results[0]);
                    setBannerImageUrl(getBannerImage(results[0]));
                    setTimeout(
                        () => setFocus(`CAT-GRID-0`),
                        150,
                    );
                }
            })
            .catch(() => {
                if (!cancelled) setIsError(true);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    /* Cargar más */
    const loadMore = useCallback(() => {
        if (isLoadingMore || !hasMore || !slug) return;

        const nextPage = page + 1;
        setIsLoadingMore(true);

        catalogService
            .searchPrograms({
                category: slug,
                limit: PAGE_LIMIT,
                page: nextPage,
            })
            .then((res) => {
                const results = res.data || [];
                setPrograms((prev) => [...prev, ...results]);
                setPage(nextPage);
                setHasMore(nextPage < (res.last_page || 1));
            })
            .catch(() => {
                /* silencioso */
            })
            .finally(() => {
                setIsLoadingMore(false);
            });
    }, [slug, page, hasMore, isLoadingMore]);

    /* Detectar scroll al fondo para cargar más */
    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            const el = e.currentTarget;
            if (
                el.scrollHeight - el.scrollTop - el.clientHeight < 300 &&
                hasMore &&
                !isLoadingMore
            ) {
                loadMore();
            }
        },
        [hasMore, isLoadingMore, loadMore],
    );

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
            <div
                ref={ref}
                className={styles.container}
                onScroll={handleScroll}
            >
                {/* Banner del programa seleccionado — sticky como el original */}
                <div className={styles.stickyBanner}>
                    <SelectBanner program={selectedProgram} imageUrl={bannerImageUrl} />
                </div>

                {/* Título de categoría */}
                <h1 className={styles.categoryTitle}>{categoryTitle || slug}</h1>

                {programs.length === 0 ? (
                    <p className={styles.emptyText}>
                        No hay programas en esta categoría.
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {programs.map((program, i) => (
                            <CategoryCard
                                key={program.id || program.key}
                                program={program}
                                focusKey={`CAT-GRID-${i}`}
                                isFirstRow={i < 4}
                                onProgramFocus={(p) => {
                                    setSelectedProgram(p);
                                    setBannerImageUrl(getBannerImage(p));
                                }}
                            />
                        ))}
                    </div>
                )}

                {isLoadingMore && (
                    <div className={styles.loadingMore}>
                        <FullScreenSpinner />
                    </div>
                )}
            </div>
        </FocusContext.Provider>
    );
}

export default CategoryView;
