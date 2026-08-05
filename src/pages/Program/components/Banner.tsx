import type { Chapter, Program } from "@/interfaces/catalog.interface";
import { useEffect, useState } from "react";
import InfoBanner from "./InfoBanner";
import InfoBannerSingle from "./InfoBannerSingle";
import styles from "../Program.module.css";

function Banner({ program, isSingle = false, chapter, firstChapter }: { program: Program; isSingle?: boolean; chapter?: Chapter; firstChapter?: Chapter | null }) {
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const opacity = Math.min(scroll / 500, 1);
      setScrollOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgImg = program?.image_background?.big || program?.image_land?.big || program?.image_slider?.big;

  return (
    <>
      <div className={styles.bannerFixed}>
        <div className={styles.bannerBg} style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "top right", backgroundRepeat: "no-repeat" }} />
        <div className={styles.bannerGradLeft} />
        <div className={styles.bannerGradBottom} />
        <div className={styles.bannerScrollFade} style={{ opacity: scrollOpacity * 0.9 }} />
      </div>
      {!isSingle ? (
        <InfoBanner program={program} firstChapter={firstChapter} />
      ) : (
        <InfoBannerSingle program={program} chapter={chapter} />
      )}
    </>
  );
}

export default Banner;
