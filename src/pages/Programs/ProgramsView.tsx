import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useProgramsData } from '@/hooks/useProgramsData';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import HomeCardCarrousel from '@/pages/Home/components/HomeCardCarrousel';
import SelectBanner from '@/pages/Category/SelectBanner';
import type { Program, Category } from '@/interfaces/catalog.interface';
import styles from './ProgramsView.module.css';

/** Extrae la mejor imagen grande para el banner (prioriza image_background.big) */
function getBannerImage(program: Program): string {
    const p = program as any;
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

function ProgramsView() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialFocusSet = useRef(false);

    const { ref, focusKey } = useFocusable({
        focusKey: 'PROGRAMS',
        saveLastFocusedChild: true,
        trackChildren: true,
        autoRestoreFocus: true,
    });

    const { categories, isLoading, isError } = useProgramsData();

    const filteredCategories = useMemo(
        () => categories.filter((c: Category) => c.programs && c.programs.length > 0),
        [categories],
    );

    /* Estado del programa activo para el banner */
    const [activeProgram, setActiveProgram] = useState<Program | null>(null);
    const [bannerImageUrl, setBannerImageUrl] = useState('');

    /* Primer programa como default */
    useEffect(() => {
        if (!activeProgram && filteredCategories.length > 0) {
            const first = filteredCategories[0].programs[0] as Program;
            setActiveProgram(first);
            setBannerImageUrl(getBannerImage(first));
        }
    }, [filteredCategories, activeProgram]);

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

    /* Scroll vertical nativo — posiciona la sección visible debajo del banner (51vh) */
    const handleCardFocused = useCallback((sectionId: string) => {
        const container = containerRef.current;
        if (!container) return;

        const section = container.querySelector(
            `[data-section="${sectionId}"]`,
        ) as HTMLElement | null;
        if (!section) return;

        const bannerHeight = window.innerHeight * 0.53; // 53vh (banner + margin)
        const sectionRect = section.getBoundingClientRect();
        const vh = window.innerHeight;

        // Solo scrollear si la sección no está completamente visible
        // Zona visible: desde bannerHeight hasta el fondo del viewport
        if (sectionRect.top < bannerHeight || sectionRect.bottom > vh) {
            // Posicionar la sección justo debajo del banner con un pequeño offset
            const targetScrollTop = section.offsetTop - bannerHeight + container.offsetTop;
            container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
        }
    }, []);

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
                        {/* Banner fijo — idéntico al original */}
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
                                {filteredCategories.map((category: Category) => {
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
                                                categoryTitle={category.title}
                                                focusKeyPrefix={sectionId}
                                                onRowFocused={() => handleCardFocused(sectionId)}
                                                onProgramFocused={(p) => {
                                                    if (p) {
                                                        setActiveProgram(p as Program);
                                                        setBannerImageUrl(getBannerImage(p as Program));
                                                    }
                                                }}
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
