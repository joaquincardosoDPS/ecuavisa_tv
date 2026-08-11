import { useState, useEffect } from "react";
import ProgramGrid from "@/components/ProgramCard/ProgramGrid";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { useSearchData } from "@/hooks/search/useSearchData";
import { VirtualKeyboard } from "./components/VirtualKeyboard";
import { setFocus, useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import { TVScrollProvider, useTVScroll } from "@/hooks/tv/useTVScroll";
import styles from "./SearchView.module.css";

function SearchViewContent() {
	useDocumentTitle("Buscador");
	const { query, setQuery, programs, totalRecords, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchData();
	const [localQuery, setLocalQuery] = useState(query);
	const { scrollY } = useTVScroll();

	const { ref: pageRef, focusKey: pageFocusKey } = useFocusable({
		focusKey: "zone-search-page",
		saveLastFocusedChild: true
	});

	useEffect(() => {
		const handler = setTimeout(() => {
			if (localQuery !== query) {
				setQuery(localQuery);
			}
		}, 500);
		return () => clearTimeout(handler);
	}, [localQuery, query, setQuery]);

	useEffect(() => {
		if (query && !localQuery) {
			setLocalQuery(query);
		}
	}, [query]);

	useEffect(() => {
		setFocus("key-A");
	}, []);

	const handleKeyPress = (char: string) => {
		setLocalQuery(prev => prev + char);
	};

	const handleBackspace = () => {
		setLocalQuery(prev => prev.slice(0, -1));
	};

	const handleClear = () => {
		setLocalQuery("");
	};

	return (
		<FocusContext.Provider value={pageFocusKey}>
			<div ref={pageRef} className={styles.pageContainer}>
				<div className={styles.searchLayout}>
					<div className={styles.keyboardPanel}>
						<div className={styles.displayWrapper}>
							<span className={[styles.displayText, !localQuery ? styles.displayTextEmpty : ""].join(" ")}>
								{localQuery || "Buscar programas..."}
							</span>
						</div>
						<VirtualKeyboard
							onKeyPress={handleKeyPress}
							onBackspace={handleBackspace}
							onClear={handleClear}
						/>
					</div>

					<div className={styles.resultsPanel} style={{ transform: `translateY(${scrollY}px)`, transition: 'transform 0.3s ease-out' }}>
						{localQuery.trim() ? (
							<div className={styles.activeQueryHeader}>
								<h1 className={styles.resultsTitle}>
									Resultados para <span className={styles.highlightedQuery}>"{localQuery}"</span>
								</h1>
								{!isLoading && (
									<p className={styles.resultsCount}>
										{totalRecords === 1 ? "1 resultado encontrado" : `${totalRecords} resultados encontrados`}
									</p>
								)}
							</div>
						) : null}

						{!isLoading && localQuery.trim().length > 0 && programs.length === 0 && query === localQuery && (
							<div className={styles.noResultsContainer}>
								<p className={styles.noResultsText}>
									No encontramos resultados para <span className={styles.noResultsQuery}>"{localQuery}"</span>
								</p>
								<p className={styles.noResultsSuggestion}>
									Intenta con otros términos de búsqueda.
								</p>
							</div>
						)}

						<ProgramGrid programs={programs} isLoading={isLoading} isError={isError} loadingText="Buscando..." errorText="Error al buscar contenidos" fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
					</div>
				</div>
			</div>
		</FocusContext.Provider>
	);
}

function SearchView() {
	return (
		<TVScrollProvider>
			<SearchViewContent />
		</TVScrollProvider>
	);
}

export default SearchView;
