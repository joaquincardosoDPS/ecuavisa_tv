import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  FocusContext,
  useFocusable,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { useEventData } from '@/hooks/event/useEventData';
import { useEventNavigation } from '@/hooks/event/useEventNavigation';
import { usePageScroll } from '@/hooks/shared/usePageScroll';
import { useHorizontalScroll } from '@/hooks/shared/useHorizontalScroll';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import { isInputAction } from '@/utils/keycodes';
import type { Event } from '@/interfaces/catalog.interface';
import { EventBannerBackground } from './components/EventBannerBackground';
import EventBannerContent from './components/EventBannerContent';
import EventTabs from './components/EventTabs';
import type { TabKey } from './components/EventTabs';
import EventCard from './components/EventCard';
import styles from './EventView.module.css';

function EventView() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<TabKey>('relacionados');

  // ── Hooks de datos y navegación ──
  const { event, relatedEvents, isLoading } = useEventData(slug);
  const { goToEventPlay, goToEvent, goBack } = useEventNavigation();

  // ── Focus container ──
  const { ref: containerRef, focusKey } = useFocusable({
    focusKey: 'EVENT-VIEW',
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // ── Page scroll ──
  const [scrollY, setScrollY] = useState(0);
  const { scrollRef, scrollToTop, scrollToSection, scrollToElement } = usePageScroll({
    onScroll: setScrollY,
  });

  // ── Horizontal scroll (reutilizable) ──
  const { trackRef, scrollToCard } = useHorizontalScroll();

  // ── Effects ──

  // Focus play button initially
  useEffect(() => {
    if (!isLoading && event) {
      setTimeout(() => setFocus('EVENT-PLAY'), 300);
    }
  }, [isLoading, event]);

  // Back key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isInputAction(e, 'Back')) {
        e.preventDefault();
        e.stopPropagation();
        goBack();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goBack]);

  // ── Callbacks ──

  const handleTabsFocused = useCallback(() => {
    scrollToSection('content', 'start', window.innerHeight * 0.25);
  }, [scrollToSection]);

  const handleCardFocus = useCallback((cardFocusKey: string) => {
    scrollToCard(cardFocusKey);

    // Vertical page scroll to keep cards visible
    const scroller = scrollRef.current;
    if (scroller) {
      const card = scroller.querySelector(
        `[data-focuskey="${cardFocusKey}"]`,
      ) as HTMLElement | null;
      scrollToElement(card);
    }
  }, [scrollToCard, scrollRef, scrollToElement]);

  const handlePlay = useCallback(() => {
    if (event) goToEventPlay(event);
  }, [event, goToEventPlay]);

  // ── Render ──

  const scrollOpacity = event
    ? Math.min(Math.abs(scrollY) / (window.innerHeight || 1080), 1) * 0.85
    : 0;

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={containerRef} className={styles.container}>
        {isLoading || !event ? (
          <FullScreenSpinner />
        ) : (
          <>
            <EventBannerBackground event={event} scrollOpacity={scrollOpacity} />

            <div ref={scrollRef} className={styles.scrollContainer}>
              <EventBannerContent
                event={event}
                onBannerFocused={scrollToTop}
                onPlay={handlePlay}
              />

              <EventTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onTabsFocused={handleTabsFocused}
              />

              <div className={styles.contentArea}>
                {activeTab === 'relacionados' && (
                  relatedEvents.length > 0 ? (
                    <div className={styles.eventsWrapper}>
                      <div ref={trackRef} className={styles.eventsTrack}>
                        {relatedEvents.map((ev: Event, idx: number) => {
                          const cardKey = `EVENT-CARD-${idx}`;
                          return (
                            <EventCard
                              key={`${ev.key}-${idx}`}
                              event={ev}
                              focusKey={cardKey}
                              onCardFocus={() => handleCardFocus(cardKey)}
                              onPress={goToEvent}
                            />
                          );
                        })}
                        <div className={styles.eventsEndSpacer} />
                      </div>
                    </div>
                  ) : (
                    <p className={styles.emptyText}>
                      No hay eventos relacionados disponibles.
                    </p>
                  )
                )}

                {activeTab === 'detalles' && (
                  <div className={styles.detailContainer}>
                    <div>
                      <h3 className={styles.detailSynopsisTitle}>Sinopsis</h3>
                      <p className={styles.detailSynopsis}>
                        {event.description || event.description_short}
                      </p>
                    </div>
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

export default EventView;
