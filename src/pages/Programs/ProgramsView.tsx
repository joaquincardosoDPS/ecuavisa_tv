import { useEffect, useRef, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useProgramsData } from '@/hooks/programs/useProgramsData';
import { useProgramsNavigation } from '@/hooks/programs/useProgramsNavigation';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import HomeCardCarrousel from '@/pages/Home/components/HomeCardCarrousel';
import SelectBanner from '@/pages/Category/SelectBanner';
import type { Program, Category } from '@/interfaces/catalog.interface';
import styles from './ProgramsView.module.css';

/** Cuántas categorías antes del final disparan la carga de la siguiente página */
const PREFETCH_THRESHOLD = 2;

function ProgramsView() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialFocusSet = useRef(false);

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

    /* Scroll vertical nativo — posiciona la sección visible debajo del banner (53vh) */
    const handleCardFocused = useCallback((sectionId: string, categoryIndex: number) => {
        const container = containerRef.current;
        if (!container) return;

        const section = container.querySelector(
            `[data-section="${sectionId}"]`,
        ) as HTMLElement | null;
        if (!section) return;

        const bannerHeight = window.innerHeight * 0.53;
        const sectionRect = section.getBoundingClientRect();
        const vh = window.innerHeight;

        if (sectionRect.top < bannerHeight || sectionRect.bottom > vh) {
            const targetScrollTop = section.offsetTop - bannerHeight + container.offsetTop;
            container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
        }

        // Prefetch cuando el foco llega a las últimas categorías
        if (
            hasNextPage &&
            !isFetchingNextPage &&
            categoryIndex >= filteredCategories.length - PREFETCH_THRESHOLD
        ) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, filteredCategories.length, fetchNextPage]);

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

                        {/* Scroll nativo con categorías */}
                        <div ref={containerRef} className={styles.scrollContainer}>
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
                                                onRowFocused={() => handleCardFocused(sectionId, index)}
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
