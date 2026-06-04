import { useEffect, useCallback } from 'react';
import {
    FocusContext,
    useFocusable,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { useCategoryData } from '@/hooks/category/useCategoryData';
import { useCategoryNavigation } from '@/hooks/category/useCategoryNavigation';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import type { Program } from '@/interfaces/catalog.interface';
import SelectBanner from './SelectBanner';
import styles from './CategoryView.module.css';

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

/* ── Card individual ── */
function CategoryCard({
    program,
    focusKey,
    isFirstRow,
    onProgramFocus,
    onPress,
}: {
    program: Program;
    focusKey: string;
    isFirstRow?: boolean;
    onProgramFocus?: (p: Program) => void;
    onPress?: (program: Program) => void;
}) {
    const imgSrc = getCardImage(program);

    const handlePress = () => {
        onPress?.(program);
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
                container?.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (container && banner) {
                const bannerHeight = banner.getBoundingClientRect().height;
                const elRect = el.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
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
    /* ── Hooks de datos y navegación ── */
    const {
        slug,
        categoryTitle,
        programs,
        isLoading,
        isLoadingMore,
        isError,
        hasMore,
        loadMore,
        selectedProgram,
        bannerImageUrl,
        setActiveBannerProgram,
    } = useCategoryData();

    const { goToProgram } = useCategoryNavigation();

    /* ── Foco ── */
    const { ref, focusKey } = useFocusable({
        focusKey: 'CATEGORY',
        saveLastFocusedChild: true,
        trackChildren: true,
    });

    /* Foco inicial */
    useEffect(() => {
        if (!isLoading && programs.length > 0) {
            setTimeout(() => setFocus('CAT-GRID-0'), 150);
        }
    }, [isLoading, programs.length]);

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
                {/* Banner del programa seleccionado — sticky */}
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
                                onProgramFocus={setActiveBannerProgram}
                                onPress={goToProgram}
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
