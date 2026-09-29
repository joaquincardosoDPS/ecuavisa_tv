import { useCallback, useEffect, useRef, useState } from "react";
import { SpatialNavigation, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import CardCarrousel from "@/components/ProgramCard/CardCarrousel";
import CarrouselContainerHome from "@/pages/Home/components/CarrouselContainerHome";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { useExitOnBack } from "@/hooks/tv/useExitOnBack";
import { useHomeData } from "@/hooks/home/useHomeData";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import Banner from "./components/Banner";
import { useConfigStore } from "@/features/config/useConfigStore";
import { useAuthStore } from "@/features/auth/authStore";
import HomeLiveGrid from "./components/HomeLiveGrid";
import SingleEvent from "./components/SingleEvent";
import { LivePlayer } from "@/components/LivePlayer/LivePlayer";
import type { LiveSignal, EPGEvent } from "@/interfaces/catalog.interface";
import { TVScrollProvider, useTVScroll, useTVScrollY } from "@/hooks/tv/useTVScroll";
import { useNearViewport } from "@/hooks/tv/useNearViewport";
import styles from "./Home.module.css";

function HomeScrollWrapper({ children }: { children: React.ReactNode }) {
	const scrollY = useTVScrollY();
	const { containerRef } = useTVScroll();
	return (
		<div ref={containerRef} style={{ transform: `translateY(${scrollY}px)`, transition: 'transform 0.3s ease-out' }}>
			{children}
		</div>
	);
}

function HomeView() {
	useDocumentTitle("Inicio", {
		description: "Mira tus programas favoritos en vivo y on demand en Ecuavisa.",
		canonical: "https://www.ecuavisa.com/",
	});

	const { slider, categories, recommended, playlistPremium, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useHomeData();
	const config = useConfigStore((s) => s.config);
	const token = useAuthStore((s) => s.token);
	const sentinelRef = useRef<HTMLDivElement>(null);
	const { ref: setRecommendedRef, isNear: isRecommendedNear } = useNearViewport();

	useEffect(() => {
		console.log("Home · token de usuario:", token);
	}, [token]);

	// Señal de TV seleccionada en la grilla del Home: se abre en un reproductor fullscreen (sin redirigir)
	const [liveSelection, setLiveSelection] = useState<{ signal: LiveSignal; event: EPGEvent | null } | null>(null);

	const handleSelectSignal = useCallback((signal: LiveSignal, event: EPGEvent) => {
		setLiveSelection({ signal, event });
	}, []);

	const { modal: exitModal } = useExitOnBack({
		disabled: isLoading || isError || Boolean(liveSelection),
	});

	useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => { if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage(); },
			{ rootMargin: "150px" }
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
		<>
			<TVScrollProvider wheelEnabled={!liveSelection}>
				<div className={styles.page}>
					<HomeScrollWrapper>
						<Banner slider={slider} />
						<div className={styles.content}>
							<HomeLiveGrid
								playlistPremium={playlistPremium}
								onSelectSignal={handleSelectSignal}
							/>
							{recommended.length > 0 && (
								<div ref={setRecommendedRef} className={`${styles.carouselSection} ${styles.categoryFont}`}>
									<h2 className={styles.sectionTitle}>{config?.nombre_recomendados || "Recomendados para ti"}</h2>
									<CardCarrousel programs={recommended} renderImages={isRecommendedNear} />
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
			{liveSelection && (
				<div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, width: "100vw", height: "100vh", zIndex: 99999, backgroundColor: "#000" }}>
					<LivePlayer
						streamSrc={liveSelection.signal.m3u8 ?? ""}
						assetKey={liveSelection.signal.DPSDAIAssetKey || liveSelection.signal.assetKey || null}
						vastUrl={liveSelection.signal.vast || null}
						signalName={liveSelection.signal.name_live}
						currentEvent={liveSelection.event}
						isFullscreen
						onBack={() => {
							const focusKey = `epg-${liveSelection.signal.key_live}`;
							setLiveSelection(null);
							// Al cerrar, devolver el foco a la tarjeta de la señal que estaba activa
							setTimeout(() => {
								if (SpatialNavigation.doesFocusableExist(focusKey)) setFocus(focusKey);
								else setFocus("zone-live-epg");
							}, 150);
						}}
					/>
				</div>
			)}
			{exitModal}
		</>
	);
}

export default HomeView;
