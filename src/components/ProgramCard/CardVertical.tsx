import type { Program, Event } from "@/interfaces/catalog.interface";
import { useNavigate } from "react-router-dom";
import RankingIcon from "@/assets/img/icons/iconos-ranking.svg";
import { getEventStatus } from "@/utils/eventStatus";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import type { EmblaCarouselType } from "embla-carousel";
import styles from "./ProgramCard.module.css";

interface CardVerticalProps {
  program: Program | Event;
  format?: string;
  index?: number;
  emblaApi?: EmblaCarouselType;
  parentFocusKey?: string;
}

function CardVertical({ program, format, index, emblaApi, parentFocusKey }: CardVerticalProps) {
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

  const { ref, focused } = useCarouselFocus({
    focusKey: `${parentFocusKey}-item-${program.id}`,
    index,
    emblaApi,
    onEnterPress: handleClick,
  });

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
            {(() => {
              const d = new Date(eventData!.gmt0_unlocked.replace(" ", "T") + "Z");
              const date = d.toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "long" });
              const time = d.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false });
              return `${date}, ${time} hrs`;
            })()}
          </div>
        )}

        {imageSrc ? (
          <img src={imageSrc} alt={program.title} draggable={false} loading="lazy" />
        ) : (
          <div className={styles.cardImgFallback}>
            <span className={styles.cardImgFallbackText}>{program.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardVertical;
