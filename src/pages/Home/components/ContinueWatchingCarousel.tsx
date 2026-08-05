import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HistoryItem as ContinueWatchingItem } from "@/interfaces/history.interface";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import styles from "./ContinueWatchingCarousel.module.css";

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return hrs > 0 ? `${hrs} hrs ${mins} min` : `${mins} min`;
}

interface ContinueWatchingProps { items: ContinueWatchingItem[]; }

function ContinueWatchingCard({ item, index, emblaApi, onPress }: { item: ContinueWatchingItem, index: number, emblaApi?: EmblaCarouselType, onPress: () => void }) {
  const imgSrc = item.image_land?.medium || item.image_land?.default || item.image;
  const progress = item.duration_seg > 0 ? Math.min(100, (item.time / item.duration_seg) * 100) : 0;

  const { ref, focused } = useCarouselFocus({
    focusKey: `continue-${item.slug}`,
    index,
    emblaApi,
    onEnterPress: onPress,
  });

  return (
    <div ref={ref} tabIndex={0} onClick={onPress} className={[styles.cardWrapper, focused ? styles.focused : ''].join(" ")}>
      <div className={styles.cardImageContainer}>
        {imgSrc ? (
          <img src={imgSrc} alt={item.title} className={styles.cardImage} draggable={false} decoding="async" />
        ) : (
          <div className={styles.titleWrapper}>
            <span className={styles.fallbackTitle}>{item.title}</span>
          </div>
        )}
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.programName}>{item.name_program}</p>
        <p className={styles.eventTitle}>{item.title}</p>
        <p className={styles.duration}>{formatDuration(item.duration_seg)}</p>
      </div>
    </div>
  );
}

function ContinueWatchingCarousel({ items }: ContinueWatchingProps) {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" } as EmblaOptionsType);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); emblaApi.off("reInit", onSelect); };
  }, [emblaApi, onSelect]);

  const { focusKey: generatedFocusKey, ref } = useFocusable({
    focusKey: 'zone-continue-watching',
    saveLastFocusedChild: true,
  });

  if (!items || items.length === 0) return null;

  return (
    <FocusContext.Provider value={generatedFocusKey}>
      <div data-section="continue-watching" className={styles.carouselContainer}>
        <h2 className={styles.carouselTitle}>Seguir Viendo</h2>
        <div ref={ref} className={styles.carouselWrapper}>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            style={{ position: "absolute", left: 0, transform: "translate(-50%, -50%)", zIndex: 20, width: "3rem", height: "3rem", borderRadius: "9999px", backgroundColor: "rgba(var(--clr-primary-rgb), 0.6)", backdropFilter: "blur(4px)", border: "1px solid color-mix(in srgb, var(--clr-primary-title) 20%, transparent)", color: "var(--clr-primary-title)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", opacity: canScrollPrev ? 1 : 0, cursor: canScrollPrev ? "pointer" : "default", top: "calc(15vw * 9 / 32)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            style={{ position: "absolute", right: "3rem", transform: "translateY(-50%)", zIndex: 20, width: "3rem", height: "3rem", borderRadius: "9999px", backgroundColor: "rgba(var(--clr-primary-rgb), 0.6)", backdropFilter: "blur(4px)", border: "1px solid color-mix(in srgb, var(--clr-primary-title) 20%, transparent)", color: "var(--clr-primary-title)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", opacity: canScrollNext ? 1 : 0, cursor: canScrollNext ? "pointer" : "default", top: "calc(15vw * 9 / 32)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
          <div ref={emblaRef} className={styles.emblaViewport}>
            <div className={styles.emblaContainer}>
              {items.map((item, index) => (
                <ContinueWatchingCard key={item.slug} item={item} index={index} emblaApi={emblaApi} onPress={() => navigate(`/play/${item.key_program}/${item.key_segment}/${item.season}/${item.chapter}`, { state: { resumeTime: item.time } })} />
              ))}
              <div className={styles.carouselSpacer} />
            </div>
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}
export default ContinueWatchingCarousel;
