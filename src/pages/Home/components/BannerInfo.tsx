import type { Program, Event } from "@/interfaces/catalog.interface";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { getEventStatus } from "@/utils/eventStatus";
import { PlayButton } from "@/components/icons/play-button";
import { InfoCircle } from "@/components/icons/info-circle";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import styles from "../Home.module.css";

interface BannerInfoProps { 
  program: Program | Event; 
  isBannerFocused?: boolean;
}

export function BannerInfo({ program, isBannerFocused }: BannerInfoProps) {
  const navigate = useNavigate();
  if (!program) return null;
  const isEvent = "type" in program;
  const eventData = isEvent ? (program as Event) : null;
  const eventStatus = isEvent && eventData ? getEventStatus(eventData) : null;

  const handleClick = () => {
    if (isEvent && eventData) {
      if (eventData.skip_view && eventData.program_associated?.key) navigate(`/programas/${eventData.program_associated.key}`);
      else navigate(`/eventos/${eventData.key}`);
    } else {
      navigate(`/programas/${program.key}`);
    }
  };

  const { ref: playRef, focused: playFocused } = useCarouselFocus({
    focusKey: `banner-play-${program.id}`,
    isBanner: true,
    onEnterPress: handleClick,
    onArrowPress: (direction) => {
      if (direction === 'left') {
        setFocus('banner-arrow-left');
        return false;
      }
      if (direction === 'right') {
        setFocus(`banner-info-${program.id}`);
        return false;
      }
      if (direction === 'down') {
        setFocus('zone-live-epg');
        return false;
      }
      if (direction === 'up') {
        setFocus('zone-header');
        return false;
      }
      return true;
    }
  });

  const { ref: infoRef, focused: infoFocused } = useCarouselFocus({
    focusKey: `banner-info-${program.id}`,
    isBanner: true,
    onEnterPress: handleClick,
    onArrowPress: (direction) => {
      if (direction === 'left') {
        setFocus(`banner-play-${program.id}`);
        return false;
      }
      if (direction === 'right') {
        setFocus('banner-arrow-right');
        return false;
      }
      if (direction === 'down') {
        setFocus('zone-live-epg');
        return false;
      }
      if (direction === 'up') {
        setFocus('zone-header');
        return false;
      }
      return true;
    }
  });

  return (
    <div className={styles.infoRoot}>
      {eventStatus && (
        <span className={styles.eventBadge} style={{ backgroundColor: eventStatus.bgColor, color: eventStatus.textColor }}>
          {eventStatus.label}
        </span>
      )}
      <div className={styles.infoMeta}>
        {program.image_logo?.medium && (
          <div className={styles.logoWrap}>
            <img src={program.image_logo.default} alt={program.title} className={styles.logoImg} />
          </div>
        )}
        <div>
          <h2 className={styles.infoTitle}>{program.title}</h2>
          <p className={styles.infoDesc}>{program.description_short}</p>
        </div>
      </div>
      <div className={styles.infoBtns}>
        <Button ref={playRef} variant="primary" onClick={handleClick} tabIndex={isBannerFocused ? 0 : -1} focused={playFocused}>
          <PlayButton width={30} height={30} className={styles.playbuttonStyle1} /> Ver en vivo
        </Button>
        <Button ref={infoRef} variant="primary" onClick={handleClick} tabIndex={isBannerFocused ? 0 : -1} focused={infoFocused}>
          <InfoCircle width={30} height={30} className={styles.infocircleStyle2} /> Informacion
        </Button>
      </div>
    </div>
  );
}
