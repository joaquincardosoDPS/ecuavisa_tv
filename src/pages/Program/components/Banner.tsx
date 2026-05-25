import type { Chapter, Program } from "@/interfaces/catalog.interface";
import InfoBanner from "./InfoBanner";
import InfoBannerSingle from "./InfoBannerSingle";
import styles from "../ProgramPage.module.css";

interface BannerBackgroundProps {
  program: Program;
  /** Valor negativo de scroll (0 = arriba, negativo = scrolleado) */
  scrollY?: number;
}

/** Fondo fijo del banner — debe renderizarse FUERA del pageScroller */
export function BannerBackground({ program, scrollY = 0 }: BannerBackgroundProps) {
  const bgImg =
    program?.image_slider?.big ||
    program?.image_background?.big ||
    program?.image_land?.big;

  // Calcular opacidad del overlay: 0 en top, ~0.85 cuando scroll completo
  const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
  const progress = Math.min(1, Math.abs(scrollY) / vh);
  const overlayOpacity = progress * 0.85;

  return (
    <div className={styles.bannerWrapper}>
      {bgImg && (
        <div
          className={styles.bannerImage}
          style={{ backgroundImage: `url(${bgImg})` }}
        />
      )}
      <div className={styles.bannerGradientLeft} />
      <div className={styles.bannerGradientBottom} />
      {/* Overlay dinámico — REGLA 1.2: solo opacity para animar */}
      <div
        className={styles.bannerOverlay}
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}

interface BannerProps {
  program: Program;
  isSingle?: boolean;
  chapter?: Chapter;
  onBannerFocused?: () => void;
}

/** Contenido del banner (info + botones) — dentro del pageScroller */
function Banner({
  program,
  isSingle = false,
  chapter,
  onBannerFocused,
}: BannerProps) {
  return (
    <>
      {!isSingle ? (
        <InfoBanner program={program} onBannerFocused={onBannerFocused} />
      ) : (
        <InfoBannerSingle
          program={program}
          chapter={chapter}
          onBannerFocused={onBannerFocused}
        />
      )}
    </>
  );
}

export default Banner;
