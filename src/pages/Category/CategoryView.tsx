import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { useCategoryPrograms } from "@/hooks/category/useCategoryPrograms";
import ProgramGrid from "@/components/ProgramCard/ProgramGrid";
import Button from "@/components/ui/Button";
import styles from "./CategoryView.module.css";

function CategoryView() {
  const { slug, categoryTitle, programs, totalRecords, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useCategoryPrograms();
  useDocumentTitle(categoryTitle || slug);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.categoryTitle}>{categoryTitle || slug}</h1>
        {totalRecords > 0 && (
          <p className={styles.programCount}>
            {totalRecords} programa{totalRecords !== 1 ? "s" : ""}
          </p>
        )}
      </div>
      {isLoading ? (
        <FullScreenSpinner />
      ) : isError ? (
        <p className={styles.errorMessage}>Error al cargar los programas de esta categoría.</p>
      ) : programs.length === 0 ? (
        <p className={styles.emptyMessage}>No hay programas en esta categoría.</p>
      ) : (
        <>
          <ProgramGrid programs={programs} />
          {hasNextPage && (
            <div className={styles.loadMoreWrapper}>
              <Button variant="secondary" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? "Cargando..." : "Cargar más"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default CategoryView;
