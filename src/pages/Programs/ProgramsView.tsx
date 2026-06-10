import { useEffect, useRef, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useProgramsData } from '@/hooks/programs/useProgramsData';
import { useProgramsNavigation } from '@/hooks/programs/useProgramsNavigation';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import HomeCardCarrousel from '@/pages/Home/components/HomeCardCarrousel';
import SelectBanner from '@/pages/Category/SelectBanner';
import { usePageScroll } from '@/hooks/shared/usePageScroll';
import type { Program, Category } from '@/interfaces/catalog.interface';
import styles from './ProgramsView.module.css';

/** Cuántas categorías antes del final disparan la carga de la siguiente página */
const PREFETCH_THRESHOLD = 2;

function ProgramsView() {
    const initialFocusSet = useRef(false);

    /* ── Hook de scroll por translateY (compatible webOS 1-3) ── */
    const { scrollRef, scrollToSection } = usePageScroll();

    /* ── Hooks de datos y navegación ── */
    const {
        filteredCategories,
        activeProgram,
        bannerImageUrl,
        setActiveBannerProgram,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useProgramsData();

    const { goToProgramOrEvent, goToCategory } = useProgramsNavigation();

    /* ── UI / Foco ── */
    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAMS',
        saveLastFocusedChild: true,
        trackChildren: true,
        autoRestoreFocus: true,
    });

    /* Foco inicial */
    useEffect(() => {
        if (initialFocusSet.current) return;
        if (filteredCategories.length > 0) {
            const firstCat = filteredCategories[0];
            const firstProgramId = firstCat.programs[0]?.id;
            if (firstProgramId) {
                setTimeout(() => {
                    setFocus(`programs-${firstCat.key}-${firstProgramId}`);
                }, 200);
                initialFocusSet.current = true;
            }
        }
    }, [filteredCategories]);

    /* Scroll vertical al foco — usa translateY (REGLA 1.2 / F5.1) */
    const handleRowFocused = useCallback((sectionId: string, categoryIndex: number) => {
        scrollToSection(sectionId, 'start', window.innerHeight * 0.53);

        // Prefetch cuando el foco llega a las últimas categorías
        if (
            hasNextPage &&
            !isFetchingNextPage &&
            categoryIndex >= filteredCategories.length - PREFETCH_THRESHOLD
        ) {
            fetchNextPage();
        }
    }, [scrollToSection, hasNextPage, isFetchingNextPage, filteredCategories.length, fetchNextPage]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.container}>
                {isLoading ? (
                    <FullScreenSpinner />
                ) : isError ? (
                    <div className={styles.errorContainer}>
                        <p className={styles.errorText}>
                            Error al cargar los programas.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Banner fijo */}
                        <div className={styles.bannerFixed}>
                            <div className={styles.bannerInner}>
                                <SelectBanner
                                    program={activeProgram}
                                    imageUrl={bannerImageUrl}
                                />
                            </div>
                        </div>

                        {/* Contenedor con translateY (sin scroll nativo) */}
                        <div ref={scrollRef} className={styles.scrollContainer}>
                            <div className={styles.carouselsWrapper}>
                                {filteredCategories.map((category: Category, index: number) => {
                                    const sectionId = `programs-${category.key}`;
                                    return (
                                        <div
                                            key={category.key}
                                            data-section={sectionId}
                                            className={styles.section}
                                        >
                                            <h2 className={styles.sectionTitle}>{category.title}</h2>
                                            <HomeCardCarrousel
                                                programs={category.programs}
                                                orientation="horizontal"
                                                categorySlug={category.key}
                                                focusKeyPrefix={sectionId}
                                                onRowFocused={() => handleRowFocused(sectionId, index)}
                                                onProgramFocused={(p) => {
                                                    if (p) setActiveBannerProgram(p as Program);
                                                }}
                                                onProgramPress={goToProgramOrEvent}
                                                onViewMorePress={() => goToCategory(category.key, category.title)}
                                            />
                                        </div>
                                    );
                                })}
                                {isFetchingNextPage && (
                                    <div className={styles.loadingMore}>
                                        <FullScreenSpinner />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </FocusContext.Provider>
    );
}

export default ProgramsView;
