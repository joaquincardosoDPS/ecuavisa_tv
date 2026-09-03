import useEmblaCarousel from "embla-carousel-react";
import type { Program, Event } from "@/interfaces/catalog.interface";
import type { EmblaOptionsType } from "embla-carousel";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import CardHorizontal from "./CardHorizontal";
import CardVertical from "./CardVertical";
import styles from "./ProgramCard.module.css";

interface CardCarrouselProps {
  programs: (Program | Event)[];
  orientation?: "horizontal" | "vertical";
  hasIconImage?: boolean;
  categorySlug?: string;
  /** Título humano de la categoría; se pasa al navegar a "Ver más" para
   *  que la página de categoría muestre el nombre real y no la key. */
  categoryTitle?: string;
  format?: string;
  autoFocusFirst?: boolean;
}

function CardCarrousel({ programs, orientation = "horizontal", hasIconImage = false, categorySlug, categoryTitle, format, autoFocusFirst }: CardCarrouselProps) {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" } as EmblaOptionsType);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const focusKey = `carousel-${categorySlug || 'unknown'}-${format || 'unknown'}`;
  const { focusKey: generatedFocusKey, ref } = useFocusable({
    focusKey,
    saveLastFocusedChild: true,
  });

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

  const isVertical = orientation === "vertical";
  const arrowTop = isVertical
    ? "calc(var(--card-w-vertical, 15vw) * 3 / 4)"
    : "calc(var(--card-w-horizontal, 15vw) * 9 / 32)";

  // El botón "Ver más" solo aparece con 10 programas; suma un ítem al carrusel.
  const showViewMore = programs.length === 10 && !!categorySlug && format !== "ranking";
  const totalItems = programs.length + (showViewMore ? 1 : 0);

  return (
    <FocusContext.Provider value={generatedFocusKey}>
      <div ref={ref} className={styles.carouselWrapper}>
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className={[styles.carouselArrow, styles.carouselArrowLeft, canScrollPrev ? styles.canScroll : ""].join(" ")}
          style={{ top: arrowTop }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className={[styles.carouselArrow, styles.carouselArrowRight, canScrollNext ? styles.canScroll : ""].join(" ")}
          style={{ top: arrowTop }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        <div ref={emblaRef} className={styles.carouselViewport}>
          <div className={styles.carouselTrack}>
            {programs.map((program, index) => {
              const itemFormat = "type" in program ? "event" : format;
              return isVertical
                ? <CardVertical key={program.id} program={program} format={itemFormat} index={index} totalItems={totalItems} emblaApi={emblaApi} parentFocusKey={generatedFocusKey} autoFocusFirst={autoFocusFirst && index === 0} />
                : <CardHorizontal key={program.id} program={program} format={itemFormat} index={index} totalItems={totalItems} emblaApi={emblaApi} parentFocusKey={generatedFocusKey} autoFocusFirst={autoFocusFirst && index === 0} />;
            })}
            {showViewMore && (() => {
              const viewMoreIndex = programs.length;
              const goToCategory = () =>
                navigate(`/categoria/${categorySlug}`, { state: { categoryTitle } });
              const { ref: viewMoreRef, focused: viewMoreFocused } = useCarouselFocus({
                focusKey: `${focusKey}-view-more`,
                index: viewMoreIndex,
                totalItems,
                emblaApi: emblaApi ?? undefined,
                onEnterPress: goToCategory,
                onArrowPress: (direction) => {
                  const lastProgram = programs[programs.length - 1];
                  if (!lastProgram) return true;
                  const towardAdjacent = isVertical ? direction === "up" : direction === "left";
                  if (towardAdjacent) {
                    setFocus(`${generatedFocusKey}-item-${lastProgram.id}`);
                    return false;
                  }
                  return true;
                },
              });

              return (
                <div
                  ref={viewMoreRef}
                  tabIndex={0}
                  onClick={goToCategory}
                  className={`${styles.cardImg} ${styles.viewMoreCard} ${isVertical ? styles.viewMoreCardVertical : styles.viewMoreCardHorizontal} ${viewMoreFocused ? styles.focused : ''}`}
                >
                  <span className={styles.viewMoreText}>Ver Más</span>
                </div>
              );
            })()}
            <div className={styles.carouselSpacer} style={{ width: hasIconImage ? "31.25rem" : "4rem" }} />
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default CardCarrousel;
