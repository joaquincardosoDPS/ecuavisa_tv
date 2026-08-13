import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { useCategoryPrograms } from "@/hooks/category/useCategoryPrograms";
import ProgramGrid from "@/components/ProgramCard/ProgramGrid";
import Button from "@/components/ui/Button";
import { TVScrollProvider, useTVScroll } from "@/hooks/tv/useTVScroll";
import { useEffect } from "react";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import styles from "./CategoryView.module.css";

function SetInitialFocus() {
  useEffect(() => {
    // Delay slightly to allow focus tree to mount
    const t = setTimeout(() => {
      try {
        setFocus('program-grid-item-0');
      } catch (e) {
        // ignore
      }
    }, 60);
    return () => clearTimeout(t);
  }, []);
  return null;
}

function CategoryView() {
  const { slug, categoryTitle, programs, totalRecords, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useCategoryPrograms();
  useDocumentTitle(categoryTitle || slug);

  function CategoryScrollWrapper({ children }: { children: React.ReactNode }) {
    const { scrollY } = useTVScroll();
    return (
      <div style={{ transform: `translateY(${scrollY}px)`, transition: 'transform 0.3s ease-out' }}>
        {children}
      </div>
    );
  }

  return (
    <TVScrollProvider>
      <div className={styles.pageContainer}>
        <CategoryScrollWrapper>
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
              {/* Al cargar la vista 'Ver más', queremos que el foco inicial esté en la primera tarjeta */}
              {/* Establecemos el foco en el elemento con focusKey 'program-grid-item-0' */}
              {(!isLoading && programs.length > 0) && (
                <SetInitialFocus />
              )}
              {hasNextPage && (
                <div className={styles.loadMoreWrapper}>
                  <Button variant="secondary" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? "Cargando..." : "Cargar más"}
                  </Button>
                </div>
              )}
            </>
          )}
        </CategoryScrollWrapper>
      </div>
    </TVScrollProvider>
  );
}
export default CategoryView;
