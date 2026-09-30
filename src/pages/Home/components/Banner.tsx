import type { Program, Event } from "@/interfaces/catalog.interface";
import { BannerInfo } from "./BannerInfo";
import { memo, useState, useEffect } from "react";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import styles from "../Home.module.css";

interface BannerProps { slider: (Program | Event)[]; }

function BannerArrow({ direction, onClick, currentProgramId }: { direction: 'left' | 'right', onClick: () => void, currentProgramId: string | number }) {
	const { ref, focused } = useCarouselFocus({
		focusKey: `banner-arrow-${direction}`,
		isBanner: true,
		onEnterPress: onClick,
		onArrowPress: (dir) => {
			if (direction === 'left') {
				if (dir === 'left') return false;
				if (dir === 'right') {
					setFocus(`banner-play-${currentProgramId}`);
					return false;
				}
			}
			if (direction === 'right') {
				if (dir === 'right') return false;
				if (dir === 'left') {
					setFocus(`banner-play-${currentProgramId}`);
					return false;
				}
			}
			if (dir === 'down') {
				setFocus('zone-live-epg');
				return false;
			}
			if (dir === 'up') {
				setFocus('zone-header');
				return false;
			}
			return true;
		}
	});

	return (
		<button
			ref={ref}
			onClick={onClick}
			className={[
				styles.bannerArrow,
				direction === 'left' ? styles.bannerArrowLeft : styles.bannerArrowRight,
				focused ? styles.focused : ''
			].join(" ")}
		>
			<svg width="30" height="50" viewBox="8 5 8 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				{direction === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
			</svg>
		</button>
	);
}

function Banner({ slider }: BannerProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const total = slider?.length ?? 0;

	const { focusKey: generatedFocusKey } = useFocusable({
		focusKey: 'zone-banner',
		saveLastFocusedChild: true,
	});

	useEffect(() => {
		if (slider && slider.length > 0) {
			// Small timeout ensures elements are rendered before focusing
			const timeout = setTimeout(() => {
				setFocus(`banner-play-${slider[0].id}`);
			}, 100);
			return () => clearTimeout(timeout);
		}
	}, [slider]);

	if (!slider || slider.length === 0) return null;

	const prevIndex = (currentIndex - 1 + total) % total;
	const nextIndex = (currentIndex + 1) % total;

	return (
		<FocusContext.Provider value={generatedFocusKey}>
			<div className={styles.bannerRoot}>
				{/* Solo el slide actual y sus vecinos cargan imagen: evita decodificar
				    todas las portadas del banner al entrar al Home */}
				{slider.map((program, i) => {
					const shouldLoadImage = i === currentIndex || i === prevIndex || i === nextIndex;
					const cover = program.image_slider?.big || program.image_land?.big || program.image_land?.default;
					return (
					<div
						key={program.id}
						className={styles.bannerSlide}
						style={{
							// Sin portada no se pinta `url(undefined)`: la TV gasta una petición
							// condenada a 404 por cada slide sin imagen.
							backgroundImage: shouldLoadImage && cover ? `url(${cover})` : undefined,
							opacity: i === currentIndex ? 1 : 0,
							zIndex: i === currentIndex ? 1 : 0,
						}}
					>
						<div className={[styles.bannerOverlay, "banner-overlay"].join(" ")} />
					</div>
					);
				})}

				<div className={styles.bannerControls}>
					<BannerArrow direction="left" onClick={() => setCurrentIndex((i) => (i - 1 + total) % total)} currentProgramId={slider[currentIndex].id} />

					<div className={styles.bannerInfoWrap}>
						{slider.map((program, i) => (
							<div
								key={program.id}
								className={styles.bannerInfoSlide}
								style={{
									opacity: i === currentIndex ? 1 : 0,
									transform: i === currentIndex ? "translateY(0)" : "translateY(20px)",
									pointerEvents: i === currentIndex ? "auto" : "none",
								}}
							>
								<BannerInfo program={program} isBannerFocused={i === currentIndex} />
							</div>
						))}
					</div>

					<BannerArrow direction="right" onClick={() => setCurrentIndex((i) => (i + 1) % total)} currentProgramId={slider[currentIndex].id} />
				</div>

				{total > 1 && (
					<div className={styles.bannerDots} aria-hidden="true">
						{slider.map((program, i) => (
							<span
								key={program.id}
								className={[styles.bannerDot, i === currentIndex ? styles.bannerDotActive : ""].join(" ")}
							/>
						))}
					</div>
				)}
			</div>
		</FocusContext.Provider>
	);
}

export default memo(Banner);
