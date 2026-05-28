import { useRef } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_FOCUS_KEY } from "@/layout/sidebar/constants";
import type { HistoryItem } from "@/interfaces/history.interface";
import styles from "./ContinueWatchingCarousel.module.css";

interface ContinueWatchingCarouselProps {
  items: HistoryItem[];
  onRowFocused?: () => void;
}

/** Convierte "HH:MM:SS" a segundos */
function parseDuration(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 1; // fallback para evitar div/0
}

function ContinueWatchingCard({
  item,
  focusKey,
  index,
  onCardFocus,
}: {
  item: HistoryItem;
  focusKey: string;
  index: number;
  onCardFocus?: () => void;
}) {
  const navigate = useNavigate();

  const imgSrc =
    item.image_land?.small || item.image_land?.normal || item.image_land?.big || item.image_land?.default || item.image;

  const totalSec = Number((item as any).duration_seg) || parseDuration(item.duration);
  const savedSec = Number(item.time) || 0;
  const progress = Math.min(100, (savedSec / totalSec) * 100);

  const handlePress = () => {
    navigate(`/play/${item.key_program}/${item.key_segment}/${item.season}/${item.chapter}`, {
      state: { resumeTime: item.time },
    });
  };

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: handlePress,
    onFocus: () => onCardFocus?.(),
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) {
        setFocus(SIDEBAR_FOCUS_KEY);
        return false;
      }
      return true;
    },
  });

  const classList = [styles.card, focused && styles.focused]
    .filter(Boolean)
    .join(" ");

  // Título con info de temporada/capítulo
  let title = item.title || '';
  if ((item as any).chapter) {
    const season = (item as any).season ? `T${(item as any).season} ` : '';
    title += ` ${season}E${(item as any).chapter}`;
  }

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={ref}
        className={classList}
        data-focuskey={focusKey}
        onClick={handlePress}
        onMouseEnter={() => setFocus(focusKey)}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={item.title}
            className={styles.image}
            draggable={false}
            decoding="async"
          />
        ) : (
          <div className={styles.fallback}>
            <span className={styles.fallbackText}>{item.title}</span>
          </div>
        )}

        {/* Barra de progreso superpuesta */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Título debajo del card */}
      {title && (
        <span className={styles.cardTitle}>{title}</span>
      )}
    </div>
  );
}

function ContinueWatchingCarousel({
  items,
  onRowFocused,
}: ContinueWatchingCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const { ref, focusKey } = useFocusable({
    focusKey: "CW-ROW",
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    onFocus: () => onRowFocused?.(),
  });

  /** Centra el card horizontalmente en el track */
  const scrollToCard = (cardKey: string) => {
    const track = trackRef.current;
    if (!track) return;
    const wrapper = track.parentElement;
    if (!wrapper) return;
    const child = track.querySelector(
      `[data-focuskey="${cardKey}"]`,
    ) as HTMLElement | null;
    if (!child) return;
    const wrapperWidth = wrapper.offsetWidth;
    const targetX = child.offsetLeft - wrapperWidth / 2 + child.offsetWidth / 2;
    const maxScroll = track.scrollWidth - wrapperWidth;
    track.style.transform = `translateX(-${Math.max(0, Math.min(targetX, maxScroll))}px)`;
  };

  if (items.length === 0) return null;

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Seguir Viendo</h2>
        <div ref={ref} className={styles.wrapper}>
          <div ref={trackRef} className={styles.track}>
            {items.map((item, i) => (
              <ContinueWatchingCard
                key={item.slug}
                item={item}
                index={i}
                focusKey={`cw-${item.slug}`}
                onCardFocus={() => scrollToCard(`cw-${item.slug}`)}
              />
            ))}
            <div className={styles.endSpacer} />
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default ContinueWatchingCarousel;
