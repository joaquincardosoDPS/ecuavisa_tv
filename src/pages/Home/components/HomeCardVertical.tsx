import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import type { Program, Event } from '@/interfaces/catalog.interface';
import { getEventStatus } from '@/utils/eventStatus';
import { formatEventDate } from '../homeHelpers';
import RankingIcon from '@/assets/img/icons/iconos-ranking.svg';
import styles from './HomeCard.module.css';

interface HomeCardVerticalProps {
    program: Program | Event;
    format?: string;
    index?: number;
    focusKey: string;
    onCardFocus?: () => void;
    onArrowLeft?: () => void;
    /** Callback de navegación — inyectado desde el padre (useHomeNavigation) */
    onPress?: () => void;
}

function HomeCardVertical({ program, format, index, focusKey, onCardFocus, onArrowLeft, onPress }: HomeCardVerticalProps) {
    const isEvent = format === 'event';
    const isRanking = format === 'ranking';
    const eventData = isEvent ? (program as Event) : null;
    const programData = !isEvent ? (program as Program) : null;

    const imageSrc = isEvent
        ? eventData?.image_port?.small
        : programData?.image_port?.small;

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
        styles.vertical,
        focused && styles.focused,
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.cardWrapper}>
            <div ref={ref} className={classList} data-focuskey={focusKey} onClick={onPress}>
                {/* Ranking badge */}
                {isRanking && index != null && (
                    <div className={styles.rankingBadge}>
                        <img src={RankingIcon} alt="" className={styles.rankingIcon} />
                        <span className={styles.rankingNumber}>{index + 1}</span>
                    </div>
                )}

                {/* Event status badge */}
                {eventStatus && (
                    <span
                        className={styles.eventBadge}
                        style={{ backgroundColor: `var(${eventStatus.colorVar})` }}
                    >
                        {eventStatus.label}
                    </span>
                )}

                {/* Event date overlay at bottom */}
                {showDate && eventData && (
                    <div className={styles.eventDateOverlay}>
                        {formatEventDate(eventData.gmt0_unlocked)}
                    </div>
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
            <span className={`${styles.cardTitle} ${styles.cardTitleVertical}`}>
                {program.title}
            </span>
        </div>
    );
}

export default HomeCardVertical;
