import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FocusContext,
  useFocusable,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { eventService } from '@/services/eventService';
import { useFetch } from '@/hooks/useFetch';
import { usePageScroll } from '@/hooks/usePageScroll';
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('relacionados');

  // ── Data fetching ──

  const { data: eventResponse, isLoading: isLoadingEvent } = useFetch(
    () => eventService.getEvent(slug!),
    [slug],
    { enabled: !!slug },
  );

  const event = eventResponse?.data ?? null;
  const categorySlug = event?.category?.slug;

  const { data: eventsResponse, isLoading: isLoadingEvents } = useFetch(
    () => eventService.getAll({ slug_exclude: slug || '', category: categorySlug }),
    [slug, categorySlug],
    { enabled: !!categorySlug },
  );

  const events = eventsResponse?.data ?? [];
  const isLoading = isLoadingEvent || isLoadingEvents;

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
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  // ── Callbacks ──

  const handleTabsFocused = useCallback(() => {
    scrollToSection('content', 'start', window.innerHeight * 0.25);
  }, [scrollToSection]);

  const trackRef = useRef<HTMLDivElement>(null);

  const handleCardFocus = useCallback((cardFocusKey: string) => {
    // Horizontal scroll within carousel track
    const track = trackRef.current;
    if (track) {
      const wrapper = track.parentElement;
      if (wrapper) {
        const child = track.querySelector(
          `[data-focuskey="${cardFocusKey}"]`,
        ) as HTMLElement | null;
        if (child) {
          const wrapperWidth = wrapper.offsetWidth;
          const childLeft = child.offsetLeft;
          const childWidth = child.offsetWidth;
          const targetX = childLeft - (wrapperWidth / 2) + (childWidth / 2);
          const maxScroll = track.scrollWidth - wrapperWidth;
          const clampedX = Math.max(0, Math.min(targetX, maxScroll));
          track.style.transform = `translateX(-${clampedX}px)`;
        }
      }
    }

    // Vertical page scroll to keep cards visible
    const scroller = scrollRef.current;
    if (scroller) {
      const card = scroller.querySelector(
        `[data-focuskey="${cardFocusKey}"]`,
      ) as HTMLElement | null;
      scrollToElement(card);
    }
  }, [scrollRef, scrollToElement]);

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
              />

              <EventTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onTabsFocused={handleTabsFocused}
              />

              <div className={styles.contentArea}>
                {activeTab === 'relacionados' && (
                  events.length > 0 ? (
                    <div className={styles.eventsWrapper}>
                      <div ref={trackRef} className={styles.eventsTrack}>
                        {events.map((ev: Event, idx: number) => {
                          const cardKey = `EVENT-CARD-${idx}`;
                          return (
                            <EventCard
                              key={`${ev.key}-${idx}`}
                              event={ev}
                              focusKey={cardKey}
                              onCardFocus={() => handleCardFocus(cardKey)}
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

