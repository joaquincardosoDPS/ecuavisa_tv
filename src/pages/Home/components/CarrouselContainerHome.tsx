import type { Category } from "@/interfaces/catalog.interface";
import CardCarrousel from "../../../components/ProgramCard/CardCarrousel";
import styles from "../Home.module.css";

interface CarrouselContainerProps { category: Category; }

function CarrouselContainer({ category }: CarrouselContainerProps) {
	const bgImage = category.image_background_category?.default;
	const IconImage = category.image_logo_category?.medium;
	const hasBgImage = Boolean(bgImage && bgImage !== "");
	const hasIconImage = Boolean(IconImage && IconImage !== "");
	const format = category.format;

	const finalOrientation = format === "ranking"
		? "vertical"
		: format === "event" && hasBgImage
			? "horizontal"
			: category.image_orientation === "portrait"
				? "vertical"
				: "horizontal";

	if (category.programs.length === 0) return null;

	return (
		<div
			className={[styles.homeCarouselSection, hasBgImage ? styles.homeCarouselWithBg : ""].join(" ")}
			style={bgImage ? {
				backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%), url(${bgImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			} : undefined}
		>
			{(!hasIconImage || finalOrientation === "horizontal") && (
				<h2 className={styles.homeCarouselTitle}>{category.title}</h2>
			)}

			{hasIconImage && finalOrientation === "vertical" ? (
				<div className={styles.homeIconRow}>
					<div className={styles.homeIconBox}>
						<img src={category.image_logo_category.medium} alt={`${category.title} logo`} className={styles.homeIconImg} />
						<h2 className={styles.homeIconTitle}>{category.title}</h2>
					</div>
					<div className={styles.homeCarouselWrap}>
						<CardCarrousel programs={category.programs} orientation={finalOrientation} hasIconImage={hasIconImage} categorySlug={category.key} categoryTitle={category.title} format={format} />
					</div>
				</div>
			) : (
				<CardCarrousel programs={category.programs} orientation={finalOrientation} hasIconImage={hasIconImage} categorySlug={category.key} categoryTitle={category.title} format={format} />
			)}
		</div>
	);
}

export default CarrouselContainer;
