import type { Category } from "@/interfaces/catalog.interface";
import CardCarrousel from "./CardCarrousel";
import styles from "./ProgramCard.module.css";

interface CarrouselContainerProps {
	category: Category;
	autoFocusFirst?: boolean;
}

function CarrouselContainer({ category, autoFocusFirst }: CarrouselContainerProps) {
	if (!category.programs.length) return null;

	return (
		<div
			className={`${styles.containerSection} ${styles.categoryFontContainer}`}
		>
			<h2 className={styles.containerTitle}>{category.title}</h2>
			<div className={styles.carouselFlexContainer}>
				<div className={styles.carouselItemContainer}>
					<CardCarrousel programs={category.programs} categorySlug={category.key} categoryTitle={category.title} autoFocusFirst={autoFocusFirst} />
				</div>
			</div>
		</div>
	);
}

export default CarrouselContainer;
