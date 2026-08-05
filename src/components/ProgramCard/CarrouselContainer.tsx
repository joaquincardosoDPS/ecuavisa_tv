import type { Category } from "@/interfaces/catalog.interface";
import CardCarrousel from "./CardCarrousel";
import styles from "./ProgramCard.module.css";

interface CarrouselContainerProps {
	category: Category;
}

function CarrouselContainer({ category }: CarrouselContainerProps) {
	if (!category.programs.length) return null;
	console.log("DEBUG: ", category)

	return (
		<div
			className={`${styles.containerSection} ${styles.categoryFontContainer}`}
		>
			<h2 className={styles.containerTitle}>{category.title}</h2>
			<div className={styles.carouselFlexContainer}>
				<div className={styles.carouselItemContainer}>
					<CardCarrousel programs={category.programs} categorySlug={category.key} />
				</div>
			</div>
		</div>
	);
}

export default CarrouselContainer;
