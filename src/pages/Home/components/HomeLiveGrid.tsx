import {
    FocusContext,
    useFocusable,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import type { LiveSignal } from '@/interfaces/catalog.interface';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import { useHorizontalScroll } from '@/hooks/shared/useHorizontalScroll';
import styles from './HomeLiveGrid.module.css';

/* ── Card individual de canal ── */
interface ChannelCardProps {
    signal: LiveSignal;
    focusKey: string;
    onCardFocus: () => void;
    onArrowLeft?: () => void;
    /** Callback de navegación — inyectado desde el padre */
    onPress?: () => void;
}

function ChannelCard({ signal, focusKey, onCardFocus, onArrowLeft, onPress }: ChannelCardProps) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: () => onPress?.(),
        onFocus: () => onCardFocus(),
        onArrowPress: (direction) => {
            if (direction === 'left' && onArrowLeft) {
                onArrowLeft();
                return false;
            }
            return true;
        },
    });

    const classList = [
        styles.channelCard,
        focused && styles.focused,
    ].filter(Boolean).join(' ');

    return (
        <div
            ref={ref}
            className={classList}
            data-focuskey={focusKey}
            onClick={onPress}
            onMouseEnter={() => setFocus(focusKey)}
        >
            {/* Background image del canal */}
            {signal.background_image && (
                <img
                    src={signal.background_image}
                    alt=""
                    className={styles.channelBg}
                    draggable={false}
                    decoding="async"
                />
            )}

            {/* Inner box */}
            <div className={styles.channelInner}>
                {/* Restricción */}
                {signal.restriction === 'premium' && (
                    <div className={styles.restrictedOverlay}>
                        <svg className={styles.lockIcon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                        </svg>
                    </div>
                )}

                {/* Badge En Vivo */}
                <span className={styles.liveBadge}>En Vivo</span>
            </div>
        </div>
    );
}

/* ── Grid de señales en vivo ── */
interface HomeLiveGridProps {
    signals: LiveSignal[];
    onRowFocused?: () => void;
    /** Callback de navegación — inyectado desde el padre */
    onSignalPress?: (signal: LiveSignal) => void;
}

function HomeLiveGrid({ signals, onRowFocused, onSignalPress }: HomeLiveGridProps) {
    const { trackRef, scrollToCard } = useHorizontalScroll();

    const { ref, focusKey } = useFocusable({
        focusKey: 'HOME-LIVE-GRID',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onRowFocused?.(),
    });

    if (!signals || signals.length === 0) return null;

    return (
        <div className={styles.section} data-section="live-signals">
            <h2 className={styles.sectionTitle}>Nuestras Señales</h2>
            <FocusContext.Provider value={focusKey}>
                <div ref={ref} className={styles.wrapper}>
                    <div ref={trackRef} className={styles.track}>
                        {signals.map((signal, index) => {
                            const cardKey = `home-live-${signal.key || index}`;
                            const goToSidebar = index === 0
                                ? () => setFocus(SIDEBAR_FOCUS_KEY)
                                : undefined;
                            return (
                                <ChannelCard
                                    key={signal.key || index}
                                    signal={signal}
                                    focusKey={cardKey}
                                    onCardFocus={() => scrollToCard(cardKey)}
                                    onArrowLeft={goToSidebar}
                                    onPress={() => onSignalPress?.(signal)}
                                />
                            );
                        })}
                        <div className={styles.endSpacer} />
                    </div>
                </div>
            </FocusContext.Provider>
        </div>
    );
}

export default HomeLiveGrid;
