import type { Program, Event } from "@/interfaces/catalog.interface";
import { useProgramsStore } from "@/features/programs/programsStore";
import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEventStatus } from "@/utils/eventStatus";
import { formatEventDayTime } from "@/utils/formatDate";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import type { EmblaCarouselType } from "embla-carousel";
import RestrictionOverlay from "@/components/ui/RestrictionOverlay";
import { isContentRestricted } from "@/utils/restriction";
import styles from "./ProgramCard.module.css";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";

interface CardHorizontalProps {
  program: Program | Event;
  format?: string;
  index: number;
  emblaApi?: EmblaCarouselType | null;
  parentFocusKey?: string;
  autoFocusFirst?: boolean;
}

function CardHorizontal({ program, format, index, emblaApi, parentFocusKey, autoFocusFirst }: CardHorizontalProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isProgramsView = pathname === "/programas";
  const isEvent = format === "event";
  const eventData = isEvent ? (program as Event) : null;
  const programData = !isEvent ? (program as Program) : null;
  const imageSrc = isEvent
    ? eventData?.image_land?.small || eventData?.image_background?.small
    : programData?.image_land?.small;
  const eventStatus = isEvent && eventData ? getEventStatus(eventData) : null;
  const showDate = eventStatus !== null && eventStatus.label === "Próximamente";
  const setActiveProgram = useProgramsStore((state) => state.setActiveProgram);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (isEvent && eventData) {
      if (eventData.skip_view && eventData.program_associated?.key) {
        navigate(`/programas/${eventData.program_associated.key}`);
      } else {
        navigate(`/eventos/${eventData.key}`);
      }
    } else {
      navigate(`/programas/${program.key}`);
    }
  };

  const handleFocusEnter = () => {
    if (!isProgramsView || isEvent) return;
    hoverTimeout.current = setTimeout(() => setActiveProgram(program as Program), 200);
  };

  const handleFocusLeave = () => {
    if (!isProgramsView) return;
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

  const focusKey = `${parentFocusKey}-item-${program.id}`;
  const { ref, focused } = useCarouselFocus({
    focusKey,
    index,
    emblaApi: emblaApi ?? undefined,
    onEnterPress: handleClick,
    onFocus: handleFocusEnter,
  });

  useEffect(() => {
    if (autoFocusFirst) {
      const timeout = setTimeout(() => {
        setFocus(focusKey);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [autoFocusFirst, focusKey]);

  return (
    <div className={`${styles.cardWrapper} ${styles.horizontalWrapper}`}>
      <div
        ref={ref}
        tabIndex={0}
        className={`${[styles.cardImg, styles.cardImgHorizontal].join(" ")} ${styles.horizontalImageContainer} ${focused ? styles.focused : ''}`}
        onMouseEnter={handleFocusEnter}
        onMouseLeave={handleFocusLeave}
        onFocus={handleFocusEnter}
        onBlur={handleFocusLeave}
        onClick={handleClick}
      >
        {eventStatus && (
          <span className={styles.badge} style={{ backgroundColor: eventStatus.bgColor, color: eventStatus.textColor }}>
            {eventStatus.label}
          </span>
        )}
        {imageSrc ? (
          <img src={imageSrc} alt={program.title} draggable={false} loading="lazy" />
        ) : (
          <div className={styles.cardImgFallback}>
            <span className={styles.cardImgFallbackText}>{program.title}</span>
          </div>
        )}
        {!isEvent && (
          <RestrictionOverlay show={isContentRestricted(programData?.restriction)} />
        )}
      </div>

      {showDate && (
        <div className={styles.cardMeta}>
          <p className={styles.cardTitle}>
            {formatEventDayTime(eventData!.gmt0_unlocked)}
          </p>
          <p className={styles.cardTitle}>{program.title}</p>
        </div>
      )}
      {isEvent && !showDate && eventData && (
        <div className={styles.cardMeta}>
          <p className={styles.cardTitle}>{program.title}</p>
          <p className={styles.cardSubtitle}>{eventData.category?.name || eventData.description_short || ""}</p>
        </div>
      )}
      {!isEvent && programData && (
        <div className={styles.cardMeta}>
          <p className={styles.cardTitle}>{program.title}</p>
          <p className={styles.cardSubtitle}>
            {(() => {
              const parts: string[] = [];
              const totalSeasons = programData.segments?.reduce((acc, seg) => acc + (seg.all_temp?.length || 0), 0) || 0;
              if (totalSeasons > 0) parts.push(`${totalSeasons} temporada${totalSeasons > 1 ? "s" : ""}`);
              if (programData["max-cap"]?.chapter) parts.push(`${programData["max-cap"].chapter} capítulo${programData["max-cap"].chapter > 1 ? "s" : ""}`);
              return parts.join(" · ") || programData.name_category;
            })()}
          </p>
        </div>
      )}
    </div>
  );
}

export default CardHorizontal;
