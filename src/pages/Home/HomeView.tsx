import { useEffect, useRef } from "react";
import CardCarrousel from "@/components/ProgramCard/CardCarrousel";
import CarrouselContainerHome from "@/pages/Home/components/CarrouselContainerHome";
import ContinueWatchingCarousel from "@/pages/Home/components/ContinueWatchingCarousel";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { useHomeData } from "@/hooks/home/useHomeData";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import Banner from "./components/Banner";
import { useAppInitialization } from "@/hooks/shared/useAppInitilization";
import HomeLiveGrid from "./components/HomeLiveGrid";
import SingleEvent from "./components/SingleEvent";
import { TVScrollProvider, useTVScroll } from "@/hooks/tv/useTVScroll";
import styles from "./Home.module.css";

function HomeScrollWrapper({ children }: { children: React.ReactNode }) {
	const { scrollY } = useTVScroll();
	return (
		<div style={{ transform: `translateY(${scrollY}px)`, transition: 'transform 0.3s ease-out' }}>
			{children}
		</div>
	);
}

function HomeView() {
	useDocumentTitle("Inicio", {
		description: "Mira tus programas favoritos en vivo y on demand en Ecuavisa.",
		canonical: "https://www.ecuavisa.com/",
	});

	const { slider, categories, recommended, continueWatching, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useHomeData();
	const { data } = useAppInitialization();
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => { if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage(); },
			{ rootMargin: "400px" }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) return <FullScreenSpinner />;

	if (isError || !slider) {
		return (
			<div className={styles.errorWrap}>
				<p className={styles.errorText}>Error al cargar el catálogo.</p>
			</div>
		);
	}

	return (
		<TVScrollProvider>
			<div className={styles.page}>
				<HomeScrollWrapper>
					<Banner slider={slider} />
					<div className={styles.content}>
						<HomeLiveGrid />
						{continueWatching.length > 0 && <ContinueWatchingCarousel items={continueWatching} />}
						{recommended.length > 0 && (
							<div className={`${styles.carouselSection} ${styles.categoryFont}`}>
								<h2 className={styles.sectionTitle}>{data?.data?.nombre_recomendados || "Recomendados para ti"}</h2>
								<CardCarrousel programs={recommended} />
							</div>
						)}
						{categories.map((category) => {
							if (category.programs.length > 1) return <CarrouselContainerHome key={category.key} category={category} />;
							if (category.programs.length === 1 && category.format === "event") return <SingleEvent key={category.key} category={category} />;
							return null;
						})}
						<div ref={sentinelRef} className={styles.sentinel} />
						{isFetchingNextPage && (
							<div className={styles.loadingMore}>
								<div className={styles.spinnerSm} />
							</div>
						)}
					</div>
				</HomeScrollWrapper>
			</div>
		</TVScrollProvider>
	);
}

export default HomeView;
