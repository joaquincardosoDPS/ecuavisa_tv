import type { Chapter, Program } from "@/interfaces/catalog.interface";
import type { HistoryItem } from "@/interfaces/history.interface";
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
  // Prioridad del original: image_slider > image_land > image_port
  const getImageUrl = (imgSet: any): string => {
    if (!imgSet) return '';
    const priority = ['big', 'normal', 'medium', 'default', 'small'];
    for (const size of priority) {
      if (imgSet[size]?.trim()) return imgSet[size].trim();
    }
    return '';
  };

  const bgImg =
    getImageUrl(program?.image_slider) ||
    getImageUrl(program?.image_land) ||
    getImageUrl((program as any)?.image_port) ||
    '';

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
  continueWatchingItem?: HistoryItem | null;
}

/** Contenido del banner (info + botones) — dentro del pageScroller */
function Banner({
  program,
  isSingle = false,
  chapter,
  onBannerFocused,
  continueWatchingItem,
}: BannerProps) {
  return (
    <>
      {!isSingle ? (
        <InfoBanner program={program} onBannerFocused={onBannerFocused} continueWatchingItem={continueWatchingItem} />
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
