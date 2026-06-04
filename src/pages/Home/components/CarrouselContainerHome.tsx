import type { Category, Program, Event } from '@/interfaces/catalog.interface';
import HomeCardCarrousel from './HomeCardCarrousel';
import styles from './CarrouselContainerHome.module.css';

interface CarrouselContainerProps {
    category: Category;
    onRowFocused?: () => void;
    /** Callback de navegación para cards */
    onProgramPress?: (program: Program | Event, format?: string) => void;
    /** Callback de navegación para "Ver Más" */
    onViewMorePress?: (slug: string, title?: string) => void;
}

function CarrouselContainerHome({ category, onRowFocused, onProgramPress, onViewMorePress }: CarrouselContainerProps) {
    const bgImage = category.image_background_category?.default;
    const iconImage = category.image_logo_category?.medium;
    const hasBgImage = Boolean(bgImage && bgImage !== '');
    const hasIconImage = Boolean(iconImage && iconImage !== '');
    const format = category.format;

    const finalOrientation =
        format === 'ranking'
            ? 'vertical'
            : category.image_orientation === 'portrait'
                ? 'vertical'
                : 'horizontal';

    if (category.programs.length === 0) return null;

    const sectionClass = [
        styles.section,
        hasBgImage && styles.hasBg,
    ].filter(Boolean).join(' ');

    const bgStyle = (bgImage && finalOrientation === 'vertical')
        ? {
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%), url(${bgImage})`,
        }
        : {};

    return (
        <div className={sectionClass} style={bgStyle}>
            {/* Título: solo si NO hay icono lateral, o si es horizontal */}
            {(!hasIconImage || finalOrientation === 'horizontal') && (
                <h2 className={styles.sectionTitle}>{category.title}</h2>
            )}

            <div className={styles.row}>
                {/* Logo lateral para categorías verticales con icono */}
                {hasIconImage && finalOrientation === 'vertical' && (
                    <div className={styles.logoSide}>
                        <img
                            src={category.image_logo_category.medium}
                            alt={`${category.title} logo`}
                            className={styles.logoImage}
                        />
                        <h2 className={styles.logoTitle}>{category.title}</h2>
                    </div>
                )}

                <div className={styles.carouselWrapper}>
                    <HomeCardCarrousel
                        programs={category.programs}
                        orientation={finalOrientation}
                        categorySlug={category.key}
                        categoryTitle={category.title}
                        format={format}
                        focusKeyPrefix={`cat-${category.key}`}
                        onRowFocused={onRowFocused}
                        onProgramPress={onProgramPress}
                        onViewMorePress={() => onViewMorePress?.(category.key, category.title)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CarrouselContainerHome;
