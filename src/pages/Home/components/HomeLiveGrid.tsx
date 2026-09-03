import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EPGChannel, EPGEvent } from "@/interfaces/catalog.interface";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import logoSvg from "@/assets/img/logo.svg";
import styles from "./HomeLiveGrid.module.css";


const EPG_URL = 'https://assets.rudo.video/assets/ecuavisa/playlists/global_epg.json';

function getCurrentEvent(events: EPGEvent[]): EPGEvent | null {
  const now = new Date();
  for (const ev of events) {
    const begin = new Date(ev.beginTime);
    const end = new Date(ev.endTime);
    if (begin <= now && now < end) return ev;
  }
  return null;
}

function getProgress(event: EPGEvent): number {
  const now = new Date();
  const begin = new Date(event.beginTime);
  const end = new Date(event.endTime);
  if (now < begin) return 0;
  if (now > end) return 100;
  return ((now.getTime() - begin.getTime()) / (end.getTime() - begin.getTime())) * 100;
}

function EPGCard({ channel, event, index, totalItems, emblaApi, onPress }: { channel: EPGChannel; event: EPGEvent; index: number; totalItems?: number; emblaApi?: EmblaCarouselType; onPress?: () => void }) {
  const progress = getProgress(event);
  const coverImage = event.pictures?.poster || event.pictures?.photo || event.pictures?.cover || event.pictures?.background || "";

  const { ref, focused } = useCarouselFocus({
    focusKey: `epg-${channel.key_live}`,
    index,
    totalItems,
    emblaApi,
    onEnterPress: onPress,
    onArrowPress: (direction) => {
      if (direction === 'up') {
        setFocus('zone-banner');
        return false;
      }
      return true;
    }
  });

  return (
    <div ref={ref} className={[styles.cardWrapper, focused ? styles.focused : ''].join(" ")} onClick={onPress}>
      <div className={styles.cardImageContainer}>
        {coverImage ? (
          <img src={coverImage} alt={event.title} className={styles.cardImage} />
        ) : (
          <div className={styles.titleWrapper}>
            <span className={styles.fallbackTitle}>{event.title}</span>
          </div>
        )}
        <img src={logoSvg} alt="Logo" className={styles.logo} />
        {progress > 0 && progress < 100 && (
          <span className={styles.badge}>
            <span className={styles.dot} />
            En Vivo
          </span>
        )}
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.channelName}>{channel.channel}</p>
        <p className={styles.eventTitle}>{event.title}</p>
      </div>
    </div>
  );
}

function HomeLiveGrid() {
  const navigate = useNavigate();
  const { data: channels, isLoading } = useQuery<EPGChannel[]>({
    queryKey: ["global-epg"],
    queryFn: async () => (await axios.get<EPGChannel[]>(EPG_URL)).data,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
  });

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
    focusKey: 'zone-live-epg',
    saveLastFocusedChild: true,
  });

  if (isLoading || !channels || channels.length === 0) return null;

  // Solo se renderizan los canales con evento en curso; sus índices en el
  // carrusel (y en embla) deben ser consecutivos para el scroll y el bloqueo.
  const liveItems = channels
    .map((ch) => ({ ch, event: getCurrentEvent(ch.events) }))
    .filter((x): x is { ch: EPGChannel; event: EPGEvent } => x.event !== null);

  return (
    <FocusContext.Provider value={generatedFocusKey}>
      <div data-section="live-epg" className={styles.liveGridContainer}>
        <h2 className={styles.gridTitle}>Noticias</h2>
        <div ref={ref} className={styles.carouselWrapper}>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className={styles.carouselArrowLeft + " " + styles.carouselArrow}
            style={{ opacity: canScrollPrev ? 1 : 0, cursor: canScrollPrev ? "pointer" : "default" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className={styles.carouselArrowRight + " " + styles.carouselArrow}
            style={{ opacity: canScrollNext ? 1 : 0, cursor: canScrollNext ? "pointer" : "default" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
          <div ref={emblaRef} className={styles.emblaViewport}>
            <div className={styles.emblaContainer}>
              {liveItems.map(({ ch, event }, index) => (
                <EPGCard key={ch.key_live} channel={ch} event={event} index={index} totalItems={liveItems.length} emblaApi={emblaApi} onPress={() => navigate(`/live?signal=${ch.key_live}`)} />
              ))}
              <div className={styles.carouselSpacer} />
            </div>
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default HomeLiveGrid;
