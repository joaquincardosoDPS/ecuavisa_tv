import { useEffect } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useMyListData } from "@/hooks/mylist/useMyListData";
import { useMyListNavigation } from "@/hooks/mylist/useMyListNavigation";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { Button } from "@/components/ui/Button";
import ProgramGrid from "@/components/ProgramCard/ProgramGrid";
import type { Program } from "@/interfaces/catalog.interface";
import EmptyList from "./components/EmptyList";
import styles from "./MyList.module.css";

function MyListView() {
  /* ── Hooks de datos y navegación ── */
  const {
    favorites,
    page,
    isLoading,
    isLoadingMore,
    isError,
    errorMsg,
    hasMore,
    loadMore,
    isAuthenticated,
  } = useMyListData();

  const { goToProgram, goToLogin, goToSearch } = useMyListNavigation();

  /* ── UI / Foco ── */
  const { ref, focusKey } = useFocusable({
    focusKey: "MYLIST-VIEW",
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    autoRestoreFocus: true,
  });

  // Foco inicial
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setTimeout(() => setFocus("MYLIST-BTN-LOGIN"), 300);
    } else if (favorites.length > 0) {
      setTimeout(() => setFocus(`MYLIST-RESULTS-${favorites[0].id}`), 300);
    } else if (!isError) {
      setTimeout(() => setFocus("MYLIST-EMPTY-BTN"), 300);
    }
  }, [isLoading, isAuthenticated, favorites.length, isError]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.container}>
        <h1 className={styles.title}>Mi Lista</h1>

        {!isAuthenticated ? (
          <div className={styles.notLoggedIn}>
            <p className={styles.notLoggedInText}>
              Inicia sesión para ver tu lista de favoritos.
            </p>
            <Button
              focusKey="MYLIST-BTN-LOGIN"
              variant="secondary"
              onPress={goToLogin}
            >
              Iniciar sesión
            </Button>
          </div>
        ) : isLoading && page === 1 ? (
          <FullScreenSpinner />
        ) : isError ? (
          <p className={styles.errorText}>{errorMsg}</p>
        ) : favorites.length === 0 ? (
          <EmptyList onPress={goToSearch} />
        ) : (
          <div className={styles.favoritesWrapperGrid}>
            <ProgramGrid
              programs={favorites as unknown as Program[]}
              isLoading={isLoading}
              isError={isError}
              loadingText="Cargando favoritos..."
              errorText="Error al cargar"
              focusKeyPrefix="MYLIST-RESULTS"
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMore}
              onProgramPress={goToProgram}
            />
          </div>
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default MyListView;
