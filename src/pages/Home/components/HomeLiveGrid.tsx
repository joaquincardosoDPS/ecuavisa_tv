import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FocusContext,
    useFocusable,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import type { LiveSignal } from '@/interfaces/catalog.interface';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import styles from './HomeLiveGrid.module.css';

/* ── Card individual de canal ── */
interface ChannelCardProps {
    signal: LiveSignal;
    focusKey: string;
    onCardFocus: () => void;
    onArrowLeft?: () => void;
}

function ChannelCard({ signal, focusKey, onCardFocus, onArrowLeft }: ChannelCardProps) {
    const navigate = useNavigate();

    const handlePress = () => {
        navigate('/live', { state: { selectedKeyLive: signal.key_live } });
    };

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: handlePress,
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
            onClick={handlePress}
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
}

function HomeLiveGrid({ signals, onRowFocused }: HomeLiveGridProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const { ref, focusKey } = useFocusable({
        focusKey: 'HOME-LIVE-GRID',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onRowFocused?.(),
    });

    const scrollToCard = useCallback((cardFocusKey: string) => {
        const track = trackRef.current;
        if (!track) return;
        const wrapper = track.parentElement;
        if (!wrapper) return;

        const child = track.querySelector(
            `[data-focuskey="${cardFocusKey}"]`,
        ) as HTMLElement | null;
        if (!child) return;

        const wrapperWidth = wrapper.offsetWidth;
        const childLeft = child.offsetLeft;
        const childWidth = child.offsetWidth;

        const targetX = childLeft - (wrapperWidth / 2) + (childWidth / 2);
        const maxScroll = track.scrollWidth - wrapperWidth;
        const clampedX = Math.max(0, Math.min(targetX, maxScroll));

        track.style.transform = `translateX(-${clampedX}px)`;
    }, []);

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
