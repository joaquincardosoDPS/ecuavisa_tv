import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import type { Program, Event } from '@/interfaces/catalog.interface';
import { getEventStatus } from '@/utils/eventStatus';
import { formatEventDate } from '../homeHelpers';
import styles from './HomeCard.module.css';

interface HomeCardHorizontalProps {
    program: Program | Event;
    format?: string;
    focusKey: string;
    onCardFocus?: () => void;
    onArrowLeft?: () => void;
    /** Callback de navegación — inyectado desde el padre (useHomeNavigation) */
    onPress?: () => void;
}

function HomeCardHorizontal({ program, format, focusKey, onCardFocus, onArrowLeft, onPress }: HomeCardHorizontalProps) {
    const isEvent = format === 'event';
    const eventData = isEvent ? (program as Event) : null;
    const programData = !isEvent ? (program as Program) : null;

    const imageSrc = isEvent
        ? eventData?.image_land?.small
        : programData?.image_land?.small;

    const eventStatus = isEvent && eventData ? getEventStatus(eventData) : null;
    const showDate = eventStatus !== null && eventStatus.label === 'Próximamente';

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: () => onPress?.(),
        onFocus: () => onCardFocus?.(),
        onArrowPress: (direction) => {
            if (direction === 'left' && onArrowLeft) {
                onArrowLeft();
                return false;
            }
            return true;
        },
    });

    const classList = [
        styles.card,
        styles.horizontal,
        focused && styles.focused,
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.cardWrapper}>
            <div ref={ref} className={classList} data-focuskey={focusKey} onClick={onPress}>
                {/* Event status badge */}
                {eventStatus && (
                    <span
                        className={styles.eventBadge}
                        style={{ backgroundColor: `var(${eventStatus.colorVar})` }}
                    >
                        {eventStatus.label}
                    </span>
                )}
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={program.title}
                        className={styles.image}
                        draggable={false}
                        decoding="async"
                    />
                ) : (
                    <div className={styles.fallback}>
                        <span className={styles.fallbackText}>{program.title}</span>
                    </div>
                )}
            </div>

            {/* Title below card */}
            <span className={`${styles.cardTitle} ${styles.cardTitleHorizontal}`}>
                {program.title}
            </span>

            {/* Event date info */}
            {showDate && eventData && (
                <div className={styles.eventDateInfo}>
                    <span className={styles.eventDateText}>
                        {formatEventDate(eventData.gmt0_unlocked)}
                    </span>
                    <span className={styles.eventDateTitle}>{program.title}</span>
                </div>
            )}
        </div>
    );
}

export default HomeCardHorizontal;
