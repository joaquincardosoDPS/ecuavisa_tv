import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Event } from "@/interfaces/catalog.interface";
import Button from "@/components/ui/Button";
import styles from "./Banner.module.css";

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

  if (!event) return null;

  const handlePlay = () => {
    if (event.live_associated?.key) {
      navigate(`/en-vivo?signal=${event.live_associated.key}`);
    } else if (event.program_associated?.key) {
      navigate(`/programas/${event.program_associated.key}`);
    }
  };

  const bgImg = event?.image_background?.big || event?.image_land.big;
  const logoCat = event?.category?.image_logo?.default;
  const logoEvent = event?.image_logo?.default;
  const isLive = !!event?.live_associated?.key;
  const classification = event?.classification;
  let categoryName = Array.isArray(event.category) ? event.category[0].name : event.category?.name || "";

  const eventDate = new Date(event?.gmt0_unlocked?.replace(" ", "T") + "Z");
  const now = new Date();
  const eventStatus = now < eventDate ? `Próximamente - ${eventDate.toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit", year: "numeric" })}, ${eventDate.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false })}` : isLive ? "En vivo ahora" : null;

  return (
    <>
      <div className={styles.bannerFixed}>
        <div className={styles.bannerBg} style={{ backgroundImage: `url(${bgImg})` }} />
        <div className={styles.gradientLeft} />
        <div className={styles.gradientBottom} />
        <div className={styles.bannerScrollFade} style={{ opacity: scrollOpacity * 0.9 }} />
      </div>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContent}>
          {eventStatus && (
            <span className={styles.eventStatusBadge} style={{ backgroundColor: now < eventDate ? '#FFA500' : '#e11d48', color: now < eventDate ? '#000' : '#fff' }}>
              {eventStatus}
            </span>
          )}
          {logoEvent && (
            <img src={logoEvent} alt={event.title} className={styles.logoImage} />
          )}
          <div className={styles.classificationContainer}>
            {classification && (
              <span className={styles.classificationBadge}>
                {classification}
              </span>
            )}
          </div>
          <Button variant="primary" showArrow onClick={handlePlay}>Ver ahora</Button>
          <div className={styles.categoryContainer}>
            {logoCat && <img src={logoCat} alt="" className={styles.categoryLogo} />}
            <span className={styles.categoryName}>{categoryName}</span>
          </div>
          <h1 className={styles.eventTitle}>{event.title}</h1>
          <p className={styles.eventDescription}>{event.description_short}</p>
        </div>
      </div>
    </>
  );
}
export default Banner;
