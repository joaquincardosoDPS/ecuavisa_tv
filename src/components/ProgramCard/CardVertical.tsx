import type { Program, Event } from "@/interfaces/catalog.interface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RankingIcon from "@/assets/img/icons/iconos-ranking.svg";
import { getEventStatus } from "@/utils/eventStatus";
import { formatEventFullDate } from "@/utils/formatDate";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import type { EmblaCarouselType } from "embla-carousel";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import RestrictionBadge from "@/components/ui/RestrictionBadge";
import { isContentRestricted } from "@/utils/restriction";
import styles from "./ProgramCard.module.css";

interface CardVerticalProps {
  program: Program | Event;
  format?: string;
  index: number;
  emblaApi?: EmblaCarouselType | null;
  parentFocusKey?: string;
  autoFocusFirst?: boolean;
}

function CardVertical({ program, format, index, emblaApi, parentFocusKey, autoFocusFirst }: CardVerticalProps) {
  const navigate = useNavigate();
  const isEvent = format === "event";
  const isRanking = format === "ranking";
  const eventData = isEvent ? (program as Event) : null;
  const programData = !isEvent ? (program as Program) : null;
  const imageSrc = isEvent ? eventData?.image_port?.small : programData?.image_port?.small;
  const eventStatus = isEvent && eventData ? getEventStatus(eventData) : null;
  const showDate = eventStatus !== null && eventStatus.label === "Próximamente";

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

  const focusKey = `${parentFocusKey}-item-${program.id}`;
  const { ref, focused } = useCarouselFocus({
    focusKey,
    index,
    emblaApi: emblaApi ?? undefined,
    onEnterPress: handleClick,
  });

  useEffect(() => {
    if (autoFocusFirst) {
      const timeout = setTimeout(() => {
        console.log("[CardVertical] Auto-focusing first card:", focusKey);
        setFocus(focusKey);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [autoFocusFirst, focusKey]);

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={ref}
        tabIndex={0}
        className={`${[styles.cardImg, styles.cardImgVertical].join(" ")} ${styles.verticalImageContainer} ${focused ? styles.focused : ''}`}
        onClick={handleClick}
      >
        {isRanking && index != null && (
          <div className={styles.rankingBadge}>
            <img src={RankingIcon} alt="" className={styles.rankingIconImage} />
            <span className={styles.rankingNumber}>{index + 1}</span>
          </div>
        )}

        {eventStatus && (
          <span className={styles.badge} style={{ backgroundColor: eventStatus.bgColor, color: eventStatus.textColor }}>
            {eventStatus.label}
          </span>
        )}

        {showDate && (
          <div className={styles.dateBanner}>
            {formatEventFullDate(eventData!.gmt0_unlocked)}
          </div>
        )}

        {imageSrc ? (
          <img src={imageSrc} alt={program.title} draggable={false} loading="lazy" />
        ) : (
          <div className={styles.cardImgFallback}>
            <span className={styles.cardImgFallbackText}>{program.title}</span>
          </div>
        )}
        {!isEvent && (
          <RestrictionBadge show={isContentRestricted(programData?.restriction)} />
        )}
      </div>
    </div>
  );
}

export default CardVertical;
