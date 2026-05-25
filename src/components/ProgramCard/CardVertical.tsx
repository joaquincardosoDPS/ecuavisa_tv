import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate } from 'react-router-dom';
import type { Program, Event } from '@/interfaces/catalog.interface';
import { getEventStatus } from '@/utils/eventStatus';
import RankingIcon from '@/assets/img/icons/iconos-ranking.svg';
import styles from './ProgramCard.module.css';

interface CardVerticalProps {
    program: Program | Event;
    format?: string;
    index?: number;
    focusKey: string;
    onCardFocus?: () => void;
    onArrowLeft?: () => void;
}

function CardVertical({ program, format, index, focusKey, onCardFocus, onArrowLeft }: CardVerticalProps) {
    const navigate = useNavigate();

    const isEvent = format === 'event';
    const isRanking = format === 'ranking';
    const eventData = isEvent ? (program as Event) : null;
    const programData = !isEvent ? (program as Program) : null;

    const imageSrc = isEvent
        ? eventData?.image_port?.small
        : programData?.image_port?.small;

    const eventStatus = isEvent && eventData ? getEventStatus(eventData) : null;
    const showDate = eventStatus !== null && eventStatus.label === 'Próximamente';

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
        styles.vertical,
        focused && styles.focused,
    ].filter(Boolean).join(' ');

    return (
        <div ref={ref} className={classList} data-focuskey={focusKey} onClick={handlePress}>
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
                    {(() => {
                        const d = new Date(eventData.gmt0_unlocked.replace(' ', 'T') + 'Z');
                        const date = d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'long' });
                        const time = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
                        return `${date}, ${time} hrs`;
                    })()}
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
    );
}

export default CardVertical;
