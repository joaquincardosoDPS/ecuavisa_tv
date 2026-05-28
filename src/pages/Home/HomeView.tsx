import { useEffect, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useHomeData } from '@/hooks/useHomeData';
import { usePageScroll } from '@/hooks/usePageScroll';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import Banner from './components/Banner';
import HomeLiveGrid from './components/HomeLiveGrid';
import HomeCardCarrousel from './components/HomeCardCarrousel';
import CarrouselContainerHome from './components/CarrouselContainerHome';
import ContinueWatchingCarousel from './components/ContinueWatchingCarousel';
import styles from './HomeView.module.css';
import { useAppInitialization } from '@/hooks/useAppInitilization';

function HomeView() {
    const { scrollRef, scrollToSection, scrollToTop } = usePageScroll();

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
        liveSignals,
        continueWatching,
        isLoading,
        isError,
    } = useHomeData();

    const { data } = useAppInitialization()

    const makeRowFocusHandler = useCallback((sectionId: string) => {
        return () => scrollToSection(sectionId);
    }, [scrollToSection]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.container}>
                {isLoading ? (
                    <FullScreenSpinner />
                ) : isError || !slider ? (
                    <div className={styles.errorContainer}>
                        <p className={styles.errorText}>
                            Error al cargar el catálogo.
                        </p>
                    </div>
                ) : (
                <div ref={scrollRef} className={styles.scrollContainer}>
                    <Banner
                        slider={slider}
                        onPlayFocused={scrollToTop}
                    />

                    <div className={styles.carouselsWrapper}>
                        {/* Nuestras Señales (canales en vivo) */}
                        {liveSignals.length > 0 && (
                            <HomeLiveGrid
                                signals={liveSignals}
                                onRowFocused={makeRowFocusHandler('live-signals')}
                            />
                        )}

                        {recommended.length > 0 && (
                            <div
                                className={styles.sectionRecommended}
                                data-section="recommended"
                            >
                                <h2 className={styles.sectionTitle}>
                                    {data?.data?.nombre_recomendados || "Destacados"}
                                </h2>
                                <HomeCardCarrousel
                                    programs={recommended}
                                    orientation="vertical"
                                    categorySlug="recomendados"
                                    categoryTitle={data?.data?.nombre_recomendados || "Destacados"}
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
                )}
            </div>
        </FocusContext.Provider>
    );
}

export default HomeView;