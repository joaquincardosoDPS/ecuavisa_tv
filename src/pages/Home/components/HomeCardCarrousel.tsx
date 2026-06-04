import { useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import type { Program, Event } from '@/interfaces/catalog.interface';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import { useHorizontalScroll } from '@/hooks/shared/useHorizontalScroll';
import HomeCardHorizontal from './HomeCardHorizontal';
import HomeCardVertical from './HomeCardVertical';
import styles from './HomeCard.module.css';

interface ViewMoreCardProps {
    focusKey: string;
    isVertical: boolean;
    onCardFocus: () => void;
    onPress: () => void;
}

/** Componente extraído para evitar re-mount en cada render */
function ViewMoreCard({ focusKey, isVertical, onCardFocus, onPress }: ViewMoreCardProps) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: onPress,
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
            onClick={onPress}
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
    /** Callback de navegación para cards — inyectado desde el padre */
    onProgramPress?: (program: Program | Event, format?: string) => void;
    /** Callback de navegación para "Ver Más" */
    onViewMorePress?: () => void;
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
    onProgramPress,
    onViewMorePress,
}: HomeCardCarrouselProps) {
    const { trackRef, scrollToCard } = useHorizontalScroll();

    const isVertical = orientation === 'vertical';

    const { ref, focusKey } = useFocusable({
        focusKey: focusKeyPrefix,
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        onFocus: () => onRowFocused?.(),
    });

    const viewMoreKey = `${focusKeyPrefix}-viewmore`;

    const handleViewMorePress = useCallback(() => {
        if (onViewMorePress) {
            onViewMorePress();
        }
    }, [onViewMorePress]);

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
                        const handlePress = () => {
                            onProgramPress?.(program, format);
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
                                onPress={handlePress}
                            />
                        ) : (
                            <HomeCardHorizontal
                                key={program.id}
                                program={program}
                                format={format}
                                focusKey={cardKey}
                                onCardFocus={handleCardFocus}
                                onArrowLeft={goToSidebar}
                                onPress={handlePress}
                            />
                        );
                    })}

                    {categorySlug && categorySlug !== "recomendados" && (
                        <ViewMoreCard
                            focusKey={viewMoreKey}
                            isVertical={isVertical}
                            onCardFocus={() => {
                                scrollToCard(viewMoreKey);
                                onProgramFocused?.();
                            }}
                            onPress={handleViewMorePress}
                        />
                    )}

                    <div className={styles.endSpacer} />
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default HomeCardCarrousel;
