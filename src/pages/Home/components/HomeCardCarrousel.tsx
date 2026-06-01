import { useRef, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate } from 'react-router-dom';
import type { Program, Event } from '@/interfaces/catalog.interface';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import HomeCardHorizontal from './HomeCardHorizontal';
import HomeCardVertical from './HomeCardVertical';
import styles from './HomeCard.module.css';

interface ViewMoreCardProps {
    focusKey: string;
    categorySlug: string;
    categoryTitle?: string;
    isVertical: boolean;
    onCardFocus: () => void;
}

/** Componente extraído para evitar re-mount en cada render */
function ViewMoreCard({ focusKey, categorySlug, categoryTitle, isVertical, onCardFocus }: ViewMoreCardProps) {
    const navigate = useNavigate();

    const goToCategory = () => navigate(`/categoria/${categorySlug}`, {
        state: { title: categoryTitle },
    });

    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: goToCategory,
        onFocus: () => onCardFocus(),
    });

    const classList = [
        styles.viewMore,
        isVertical ? styles.vertical : styles.horizontal,
        focused && styles.focused,
    ].filter(Boolean).join(' ');

    return (
        <div
            ref={ref}
            className={classList}
            data-focuskey={focusKey}
            onClick={goToCategory}
            onMouseEnter={() => setFocus(focusKey)}
        >
            <span className={styles.viewMoreText}>
                Ver Más <span className={styles.viewMoreArrow}>{'>'}</span>
            </span>
        </div>
    );
}

interface HomeCardCarrouselProps {
    programs: (Program | Event)[];
    orientation?: 'horizontal' | 'vertical';
    categorySlug?: string;
    categoryTitle?: string;
    format?: string;
    focusKeyPrefix: string;
    /** Callback cuando la fila recibe foco (para scroll vertical del padre) */
    onRowFocused?: () => void;
    /** Callback cuando un card individual recibe foco */
    onProgramFocused?: (program?: Program | Event) => void;
}

function HomeCardCarrousel({
    programs,
    orientation = 'horizontal',
    categorySlug,
    categoryTitle,
    format,
    focusKeyPrefix,
    onRowFocused,
    onProgramFocused,
}: HomeCardCarrouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const isVertical = orientation === 'vertical';

    const { ref, focusKey } = useFocusable({
        focusKey: focusKeyPrefix,
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onRowFocused?.(),
    });

    /** centra el card enfocado horizontalmente en el track */
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

    const viewMoreKey = `${focusKeyPrefix}-viewmore`;

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.wrapper}>
                <div ref={trackRef} className={styles.track}>
                    {programs.map((program, index) => {
                        const cardKey = `${focusKeyPrefix}-${program.id}`;
                        const goToSidebar = index === 0
                            ? () => setFocus(SIDEBAR_FOCUS_KEY)
                            : undefined;
                        const handleCardFocus = () => {
                            scrollToCard(cardKey);
                            onProgramFocused?.(program);
                        };
                        return isVertical ? (
                            <HomeCardVertical
                                key={program.id}
                                program={program}
                                format={format}
                                index={index}
                                focusKey={cardKey}
                                onCardFocus={handleCardFocus}
                                onArrowLeft={goToSidebar}
                            />
                        ) : (
                            <HomeCardHorizontal
                                key={program.id}
                                program={program}
                                format={format}
                                focusKey={cardKey}
                                onCardFocus={handleCardFocus}
                                onArrowLeft={goToSidebar}
                            />
                        );
                    })}

                    {categorySlug && categorySlug !== "recomendados" && (
                        <ViewMoreCard
                            focusKey={viewMoreKey}
                            categorySlug={categorySlug}
                            categoryTitle={categoryTitle}
                            isVertical={isVertical}
                            onCardFocus={() => {
                                scrollToCard(viewMoreKey);
                                onProgramFocused?.();
                            }}
                        />
                    )}

                    <div className={styles.endSpacer} />
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default HomeCardCarrousel;
