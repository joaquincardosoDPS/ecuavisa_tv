import { useEffect, useCallback } from 'react';
import {
    FocusContext,
    useFocusable,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { useCategoryData } from '@/hooks/category/useCategoryData';
import { useCategoryNavigation } from '@/hooks/category/useCategoryNavigation';
import { usePageScroll } from '@/hooks/shared/usePageScroll';
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
    onProgramFocus,
    onPress,
    onCardFocused,
}: {
    program: Program;
    focusKey: string;
    onProgramFocus?: (p: Program) => void;
    onPress?: (program: Program) => void;
    onCardFocused?: () => void;
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
            onCardFocused?.();
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

/** Cuántos cards antes del final disparan la carga */
const PREFETCH_THRESHOLD = 6;

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

    /* ── Scroll por translateY (compatible webOS 1-3) ── */
    const { scrollRef, applyScroll, currentScrollY } = usePageScroll();

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

    /* Scroll al card enfocado + prefetch */
    const handleCardFocused = useCallback((index: number) => {
        const container = scrollRef.current;
        if (!container) return;

        const card = container.querySelector(
            `[data-focuskey="CAT-GRID-${index}"]`,
        ) as HTMLElement | null;

        if (card) {
            const cardRect = card.getBoundingClientRect();

            // Calcular la altura real del banner fijo
            const bannerEl = document.querySelector('[class*="stickyBanner"]') as HTMLElement | null;
            const bannerBottom = bannerEl
                ? bannerEl.getBoundingClientRect().bottom
                : window.innerHeight * 0.55;

            // Si el card está cortado por el banner o por el viewport inferior
            if (cardRect.top < bannerBottom + 5 || cardRect.bottom > window.innerHeight - 20) {
                const targetTop = bannerBottom + 10;
                const delta = cardRect.top - targetTop;
                applyScroll(currentScrollY.current + delta);
            }
        }

        // Prefetch cuando el foco llega a los últimos N cards
        if (
            hasMore &&
            !isLoadingMore &&
            index >= programs.length - PREFETCH_THRESHOLD
        ) {
            loadMore();
        }
    }, [scrollRef, applyScroll, currentScrollY, hasMore, isLoadingMore, programs.length, loadMore]);

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
                {/* Banner del programa seleccionado — fixed */}
                <div className={styles.stickyBanner}>
                    <SelectBanner program={selectedProgram} imageUrl={bannerImageUrl} />
                </div>

                {/* Contenido con translateY */}
                <div ref={scrollRef} className={styles.scrollContent}>
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
                                    onProgramFocus={setActiveBannerProgram}
                                    onPress={goToProgram}
                                    onCardFocused={() => handleCardFocused(i)}
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
            </div>
        </FocusContext.Provider>
    );
}

export default CategoryView;
