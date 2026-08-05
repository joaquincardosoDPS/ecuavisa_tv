import ProgramGrid from "@/components/ProgramCard/ProgramGrid";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { useSearchData } from "@/hooks/search/useSearchData";
import Button from "@/components/ui/Button";
import styles from "./SearchView.module.css";

function SearchView() {
	useDocumentTitle("Buscador");
	const { query, programs, totalRecords, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchData();

	return (
		<div className={styles.pageContainer}>
			{query.trim() ? (
				<div className={styles.activeQueryHeader}>
					<h1 className={styles.resultsTitle}>
						Resultados para <span className={styles.highlightedQuery}>"{query}"</span>
					</h1>
					{!isLoading && (
						<p className={styles.resultsCount}>
							{totalRecords === 1 ? "1 resultado encontrado" : `${totalRecords} resultados encontrados`}
						</p>
					)}
				</div>
			) : (
				<div className={styles.emptyQueryHeader}>
					<h1 className={styles.searchTitle}>Buscador</h1>
					<p className={styles.searchSubtitle}>
						Explora nuestro catálogo de programas, series y contenidos.
					</p>
				</div>
			)}
			{!isLoading && query.trim().length > 0 && programs.length === 0 && (
				<div className={styles.noResultsContainer}>
					<p className={styles.noResultsText}>
						No encontramos resultados para <span className={styles.noResultsQuery}>"{query}"</span>
					</p>
					<p className={styles.noResultsSuggestion}>
						Intenta con otros términos de búsqueda como el nombre del programa o género.
					</p>
				</div>
			)}
			<ProgramGrid programs={programs} isLoading={isLoading} isError={isError} loadingText="Buscando..." errorText="Error al buscar contenidos" />
			{hasNextPage && (
				<div className={styles.loadMoreContainer}>
					<Button variant="tertiary" onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className={styles.loadMoreButton}>
						{isFetchingNextPage ? "Cargando..." : "Ver más"}
					</Button>
				</div>
			)}
		</div>
	);
}
export default SearchView;
