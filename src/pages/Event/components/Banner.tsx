import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Event } from "@/interfaces/catalog.interface";
import Button from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { PlayButton } from "@/components/icons/play-button";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import styles from "@/pages/Program/Program.module.css";
import eventStyles from "./Banner.module.css";

function Banner({ event }: { event: Event | null }) {
  const navigate = useNavigate();
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const threshold = 500;
      setScrollOpacity(Math.min(scroll / threshold, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const playFocusKey = `event-play-${event?.key ?? "none"}`;

  const handlePlay = () => {
    if (!event) return;
    if (event.live_associated?.key) {
      navigate(`/en-vivo?signal=${event.live_associated.key}`);
    } else if (event.program_associated?.key) {
      navigate(`/programas/${event.program_associated.key}`);
    }
  };

  const { ref: playRef, focused: playFocused } = useSpatialFocus({
    focusKey: playFocusKey,
    onEnterPress: handlePlay,
  });

  // Foco inicial en "Ver ahora"
  useEffect(() => {
    if (!event) return;
    const timeout = setTimeout(() => {
      setFocus(playFocusKey);
    }, 150);
    return () => clearTimeout(timeout);
  }, [playFocusKey, event]);

  if (!event) return null;

  const bgImg = event?.image_background?.big || event?.image_land.big;
  const logoCat = event?.category?.image_logo?.default;
  const logoEvent = event?.image_logo?.default;
  const isLive = !!event?.live_associated?.key;
  const classification = event?.classification;
  const categoryName = Array.isArray(event.category) ? event.category[0].name : event.category?.name || "";

  const eventDate = new Date(event?.gmt0_unlocked?.replace(" ", "T") + "Z");
  const now = new Date();
  const eventStatus = now < eventDate ? `Próximamente - ${eventDate.toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit", year: "numeric" })}, ${eventDate.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false })}` : isLive ? "En vivo ahora" : null;

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: -10, backgroundColor: "var(--clr-primary)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImg})`, backgroundSize: "100% auto", backgroundPosition: "top center", backgroundRepeat: "no-repeat" }} />
        <div className={eventStyles.gradientLeft} />
        <div className={eventStyles.gradientBottom} />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "var(--clr-primary)", transition: "opacity 0.075s", opacity: scrollOpacity * 0.9 }} />
      </div>
      <div className={styles.infoWrap}>
        <div className={styles.backWrap}>
          <BackButton />
        </div>
        <div className={styles.infoContent}>
          {eventStatus && (
            <span
              className={eventStyles.eventBadge}
              style={{ backgroundColor: now < eventDate ? '#FFA500' : '#e11d48', color: now < eventDate ? '#000' : '#fff' }}
            >
              {eventStatus}
            </span>
          )}
          {logoEvent && (
            <div className={styles.logoBox}>
              <img src={logoEvent} alt={event.title} className={styles.logoImg} />
            </div>
          )}
          <h1 className={styles.programTitle}>{event.title}</h1>
          <p className={styles.programDesc}>{event.description_short}</p>
          <div className={styles.actionsRow}>
            <div ref={playRef} tabIndex={0} className={playFocused ? styles.focused : undefined}>
              <Button
                variant="primary"
                onClick={handlePlay}
                className="uppercase"
                style={{
                  backgroundColor: "var(--clr-primary-title)",
                  color: "var(--clr-primary)",
                  borderColor: "transparent",
                  borderRadius: "9999px",
                  padding: "0.85rem 2rem",
                }}
              >
                <PlayButton width={22} height={22} className={styles.playIcon} />
                Ver ahora
              </Button>
            </div>
          </div>
          <div className={eventStyles.metaWrap}>
            {classification && (
              <span className={eventStyles.classificationBadge}>{classification}</span>
            )}
            {(logoCat || categoryName) && (
              <div className={eventStyles.categoryContainer}>
                {logoCat && <img src={logoCat} alt="" className={eventStyles.categoryLogo} />}
                <span className={eventStyles.categoryName}>{categoryName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Banner;



