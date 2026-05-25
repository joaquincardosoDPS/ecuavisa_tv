import { useEffect, useCallback, useState } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useHomeData } from '@/hooks/useHomeData';
import { usePageScroll } from '@/hooks/usePageScroll';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import Banner from './components/Banner';
import CardCarrousel from '@/components/ProgramCard/CardCarrousel';
import CarrouselContainerHome from './components/CarrouselContainerHome';
import ContinueWatchingCarousel from './components/ContinueWatchingCarousel';
import styles from './HomeView.module.css';
import { useAppInitialization } from '@/hooks/useAppInitilization';

function HomeView() {
    // scrollY para pasar al Banner (efecto parallax con portal)
    const [scrollY, setScrollY] = useState(0);

    const { scrollRef, scrollToSection, scrollToTop } = usePageScroll({
        onScroll: setScrollY,
    });

    const { ref, focusKey } = useFocusable({
        focusKey: 'HOME',
        saveLastFocusedChild: true,
        trackChildren: true,
    });

    /* Foco inicial en el botón Play del Banner (REGLA F4.1) */
    useEffect(() => {
        setFocus('BANNER-PLAY');
    }, []);

    const {
        slider,
        categories,
        recommended,
        continueWatching,
        isLoading,
        isError,
    } = useHomeData();

    const { data } = useAppInitialization()

    const makeRowFocusHandler = useCallback((sectionId: string) => {
        return () => scrollToSection(sectionId);
    }, [scrollToSection]);

    if (isLoading) {
        return <FullScreenSpinner />;
    }

    if (isError || !slider) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorText}>
                    Error al cargar el catálogo.
                </p>
            </div>
        );
    }

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.container}>
                <div ref={scrollRef} className={styles.scrollContainer}>
                    <Banner
                        slider={slider}
                        scrollY={scrollY}
                        onPlayFocused={scrollToTop}
                    />

                    <div className={styles.carouselsWrapper}>
                        {/* Recomendados */}
                        {slider.length > 1 && (
                            <div
                                className={styles.sectionRecommended}
                                data-section="destacados"
                            >
                                <h2 className={styles.sectionTitle}>
                                    {data?.data?.nombre_slider || "Destacados"}
                                </h2>
                                <CardCarrousel
                                    programs={slider.slice(1)}
                                    focusKeyPrefix="destacados"
                                    onRowFocused={makeRowFocusHandler('destacados')}
                                />
                            </div>
                        )}
                        {recommended.length > 0 && (
                            <div
                                className={styles.sectionRecommended}
                                data-section="recommended"
                            >
                                <h2 className={styles.sectionTitle}>
                                    {data?.data?.nombre_recomendados || "Recomendados para ti"}
                                </h2>
                                <CardCarrousel
                                    programs={recommended}
                                    focusKeyPrefix="recommended"
                                    onRowFocused={makeRowFocusHandler('recommended')}
                                />
                            </div>
                        )}

                        {/* Seguir Viendo */}
                        {continueWatching.length > 0 && (
                            <div data-section="continue-watching">
                                <ContinueWatchingCarousel
                                    items={continueWatching}
                                    onRowFocused={makeRowFocusHandler('continue-watching')}
                                />
                            </div>
                        )}

                        {/* Listado de categorías */}
                        {categories.map(
                            (category: any) =>
                                category.programs?.length > 0 && (
                                    <div
                                        key={category.key}
                                        data-section={`cat-${category.key}`}
                                    >
                                        <CarrouselContainerHome
                                            category={category}
                                            onRowFocused={makeRowFocusHandler(`cat-${category.key}`)}
                                        />
                                    </div>
                                ),
                        )}
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default HomeView;