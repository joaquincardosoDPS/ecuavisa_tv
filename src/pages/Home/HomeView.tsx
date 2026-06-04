import { useEffect, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useHomeData } from '@/hooks/home/useHomeData';
import { useHomeNavigation } from '@/hooks/home/useHomeNavigation';
import { usePageScroll } from '@/hooks/shared/usePageScroll';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import Banner from './components/Banner';
import HomeLiveGrid from './components/HomeLiveGrid';
import HomeCardCarrousel from './components/HomeCardCarrousel';
import CarrouselContainerHome from './components/CarrouselContainerHome';
import ContinueWatchingCarousel from './components/ContinueWatchingCarousel';
import styles from './HomeView.module.css';

function HomeView() {
    const {
        slider,
        categories,
        recommended,
        liveSignals,
        continueWatching,
        recommendedTitle,
        isLoading,
        isError,
    } = useHomeData();

    const {
        goToProgram,
        goToProgramOrEvent,
        goToCategory,
        goToLive,
        goToContinueWatching,
    } = useHomeNavigation();

    const { scrollRef, scrollToSection, scrollToTop } = usePageScroll();

    const { ref, focusKey } = useFocusable({
        focusKey: 'HOME',
        saveLastFocusedChild: true,
        trackChildren: true,
    });

    useEffect(() => {
        setFocus('BANNER-PLAY');
    }, []);

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
                            onProgramPress={goToProgram}
                        />

                        <div className={styles.carouselsWrapper}>
                            {/* Nuestras Señales (canales en vivo) */}
                            {liveSignals.length > 0 && (
                                <HomeLiveGrid
                                    signals={liveSignals}
                                    onRowFocused={makeRowFocusHandler('live-signals')}
                                    onSignalPress={goToLive}
                                />
                            )}

                            {recommended.length > 0 && (
                                <div
                                    className={styles.sectionRecommended}
                                    data-section="recommended"
                                >
                                    <h2 className={styles.sectionTitle}>
                                        {recommendedTitle}
                                    </h2>
                                    <HomeCardCarrousel
                                        programs={recommended}
                                        orientation="vertical"
                                        categorySlug="recomendados"
                                        categoryTitle={recommendedTitle}
                                        focusKeyPrefix="recommended"
                                        onRowFocused={makeRowFocusHandler('recommended')}
                                        onProgramPress={goToProgramOrEvent}
                                    />
                                </div>
                            )}

                            {/* Seguir Viendo */}
                            {continueWatching.length > 0 && (
                                <div data-section="continue-watching">
                                    <ContinueWatchingCarousel
                                        items={continueWatching}
                                        onRowFocused={makeRowFocusHandler('continue-watching')}
                                        onItemPress={goToContinueWatching}
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
                                                onProgramPress={goToProgramOrEvent}
                                                onViewMorePress={goToCategory}
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