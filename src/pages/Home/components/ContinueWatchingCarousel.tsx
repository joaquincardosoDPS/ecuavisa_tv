import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { SIDEBAR_FOCUS_KEY } from "@/layout/sidebar/constants";
import { useHorizontalScroll } from "@/hooks/shared/useHorizontalScroll";
import type { HistoryItem } from "@/interfaces/history.interface";
import { getWatchProgress, getContinueWatchingTitle, getContinueWatchingImage } from "../homeHelpers";
import styles from "./ContinueWatchingCarousel.module.css";

interface ContinueWatchingCarouselProps {
  items: HistoryItem[];
  onRowFocused?: () => void;
  /** Callback de navegación — inyectado desde el padre */
  onItemPress?: (item: HistoryItem) => void;
}

function ContinueWatchingCard({
  item,
  focusKey,
  index,
  onCardFocus,
  onPress,
}: {
  item: HistoryItem;
  focusKey: string;
  index: number;
  onCardFocus?: () => void;
  onPress?: () => void;
}) {
  const imgSrc = getContinueWatchingImage(item);
  const progress = getWatchProgress(item);
  const title = getContinueWatchingTitle(item);

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: () => onPress?.(),
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

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={ref}
        className={classList}
        data-focuskey={focusKey}
        onClick={onPress}
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
  onItemPress,
}: ContinueWatchingCarouselProps) {
  const { trackRef, scrollToCard } = useHorizontalScroll();

  const { ref, focusKey } = useFocusable({
    focusKey: "CW-ROW",
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    onFocus: () => onRowFocused?.(),
  });

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
                onPress={() => onItemPress?.(item)}
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
