import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useProgramsData } from '@/hooks/useProgramsData';
import { usePageScroll } from '@/hooks/usePageScroll';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import CardCarrousel from '@/components/ProgramCard/CardCarrousel';
import type { Program, Category } from '@/interfaces/catalog.interface';
import styles from './ProgramsView.module.css';

function ProgramsView() {
    const { scrollRef, applyScroll, currentScrollY } = usePageScroll();
    const initialFocusSet = useRef(false);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAMS',
        saveLastFocusedChild: true,
        trackChildren: true,
    });

    const { categories, isLoading, isError } = useProgramsData();

    /* Categorías con programas — memoizado para evitar re-renders */
    const filteredCategories = useMemo(
        () => categories.filter((c: Category) => c.programs && c.programs.length > 0),
        [categories],
    );

    /* Estado del programa activo para el banner */
    const [activeProgram, setActiveProgram] = useState<Program | null>(null);

    /* Primer programa como default */
    useEffect(() => {
        if (!activeProgram && filteredCategories.length > 0) {
            setActiveProgram(filteredCategories[0].programs[0] as Program);
        }
    }, [filteredCategories, activeProgram]);

    /* Foco inicial: primer card del primer carrusel (solo una vez) */
    useEffect(() => {
        if (initialFocusSet.current) return;
        if (filteredCategories.length > 0) {
            const firstCat = filteredCategories[0];
            const firstProgramId = firstCat.programs[0]?.id;
            if (firstProgramId) {
                setFocus(`programs-${firstCat.key}-${firstProgramId}`);
                initialFocusSet.current = true;
            }
        }
    }, [filteredCategories]);

    /* Imagen de fondo del banner */
    const [bgImages, setBgImages] = useState<{ src: string; loaded: boolean }[]>([]);

    const currentBgSrc =
        activeProgram?.image_slider?.big ||
        activeProgram?.image_background?.big ||
        activeProgram?.image_land?.big ||
        '';

    const logo = activeProgram?.image_logo?.normal || activeProgram?.image_logo?.default;

    useEffect(() => {
        if (!currentBgSrc) return;

        setBgImages(prev => {
            const lastImage = prev[prev.length - 1];
            if (lastImage && lastImage.src === currentBgSrc) return prev;

            const lastLoaded = prev.filter(img => img.loaded).slice(-1);
            const isAlreadyCached = prev.some(img => img.src === currentBgSrc && img.loaded);

            return [...lastLoaded, { src: currentBgSrc, loaded: isAlreadyCached }];
        });
    }, [currentBgSrc]);

    /**
     * Scroll vertical centrado en la zona visible (debajo del banner).
     * Usa getBoundingClientRect + currentScrollY para calcular la posición absoluta.
     */
    const handleCardFocused = useCallback((sectionId: string, program?: Program) => {
        if (program) {
            setActiveProgram(program);
        }

        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const section = scrollContainer.querySelector(
            `[data-section="${sectionId}"]`,
        ) as HTMLElement | null;
        if (!section) return;

        const vh = window.innerHeight;
        const sectionRect = section.getBoundingClientRect();
        const currentScroll = currentScrollY.current;

        const sectionCenterAbsolute = sectionRect.top + currentScroll + sectionRect.height / 2;
        const visibleMidpoint = vh * 0.65;
        const targetY = sectionCenterAbsolute - visibleMidpoint;
        applyScroll(targetY);
    }, [applyScroll, scrollRef, currentScrollY]);

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
                        <div className={styles.bannerArea}>
                            {bgImages.map(img => (
                                <img
                                    key={img.src}
                                    src={img.src}
                                    alt=""
                                    onLoad={() => {
                                        setBgImages(prev =>
                                            prev.map(i =>
                                                i.src === img.src ? { ...i, loaded: true } : i,
                                            ),
                                        );
                                    }}
                                    className={`${styles.bannerImage} ${img.loaded ? styles.loaded : styles.loading}`}
                                    style={{ backgroundColor: 'var(--clr-primary)' }}
                                    decoding="async"
                                />
                            ))}
                            <div className={styles.gradientLeft} />
                            <div className={styles.gradientBottom} />

                            {/* Información del programa */}
                            <div className={styles.bannerInfo}>
                                {logo ? (
                                    <img
                                        src={logo}
                                        alt={activeProgram?.title || ''}
                                        className={styles.bannerLogo}
                                    />
                                ) : (
                                    <h1 className={styles.bannerTitle}>
                                        {activeProgram?.title}
                                    </h1>
                                )}

                                {activeProgram?.description_short && (
                                    <p className={styles.bannerDescription}>
                                        {activeProgram.description_short}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div ref={scrollRef} className={styles.scrollContainer}>
                            <div className={styles.carouselsWrapper}>
                                {filteredCategories.map((category: Category) => {
                                    const sectionId = `programs-${category.key}`;
                                    return (
                                        <div
                                            key={category.key}
                                            data-section={sectionId}
                                            className={styles.section}
                                        >
                                            <h2 className={styles.sectionTitle}>{category.title}</h2>
                                            <CardCarrousel
                                                programs={category.programs}
                                                orientation="horizontal"
                                                categorySlug={category.key}
                                                categoryTitle={category.title}
                                                focusKeyPrefix={sectionId}
                                                onProgramFocused={(p) =>
                                                    handleCardFocused(sectionId, p as Program | undefined)
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </FocusContext.Provider>
    );
}

export default ProgramsView;
