import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate } from 'react-router-dom';
import type { Program, Event } from '@/interfaces/catalog.interface';
import { getEventStatus } from '@/utils/eventStatus';
import styles from './HomeCard.module.css';

interface HomeCardHorizontalProps {
    program: Program | Event;
    format?: string;
    focusKey: string;
    onCardFocus?: () => void;
    onArrowLeft?: () => void;
}

function HomeCardHorizontal({ program, format, focusKey, onCardFocus, onArrowLeft }: HomeCardHorizontalProps) {
    const navigate = useNavigate();

    const isEvent = format === 'event';
    const eventData = isEvent ? (program as Event) : null;
    const programData = !isEvent ? (program as Program) : null;

    const imageSrc = isEvent
        ? eventData?.image_land?.small
        : programData?.image_land?.small;

    const eventStatus = isEvent && eventData ? getEventStatus(eventData) : null;
    const showDate = eventStatus !== null && eventStatus.label === 'Próximamente';

    /* REGLA F6.2: click = Enter */
    const handlePress = () => {
        if (isEvent && eventData) {
            if (eventData.skip_view && eventData.program_associated?.key) {
                navigate(`/programas/${eventData.program_associated.key}`);
            } else {
                navigate(`/eventos/${eventData.key}`);
            }
        } else {
            navigate(`/programas/${program.key}`);
        }
    };

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: handlePress,
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
            <div ref={ref} className={classList} data-focuskey={focusKey} onClick={handlePress}>
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
                        {(() => {
                            const d = new Date(eventData.gmt0_unlocked.replace(' ', 'T') + 'Z');
                            const date = d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'long' });
                            const time = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
                            return `${date}, ${time} hrs`;
                        })()}
                    </span>
                    <span className={styles.eventDateTitle}>{program.title}</span>
                </div>
            )}
        </div>
    );
}

export default HomeCardHorizontal;
