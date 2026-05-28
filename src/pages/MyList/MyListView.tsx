import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useAuthStore } from "@/features/auth/authStore";
import { favoritesService } from "@/services/favoritesService";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { Button } from "@/components/ui/Button";
import ProgramGrid from "@/components/ProgramCard/ProgramGrid";
import type { FavoriteItem } from "@/interfaces/favorites.interface";
import type { Program } from "@/interfaces/catalog.interface";
import EmptyList from "./components/EmptyList";
import styles from "./MyList.module.css";

const FAVORITES_LIMIT = 12;

function MyListView() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const activeProfile = useAuthStore((s) => s.activeProfile);

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { ref, focusKey } = useFocusable({
    focusKey: "MYLIST-VIEW",
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
    autoRestoreFocus: true,
  });

  // Fetch inicial de favoritos
  useEffect(() => {
    if (!token || !activeProfile) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);
    setPage(1);

    favoritesService
      .getAll(token, activeProfile.id, 1, FAVORITES_LIMIT)
      .then((response) => {
        if (cancelled) return;
        if (response.status === "error") {
          setIsError(true);
          setErrorMsg(response.msj || "Error al cargar favoritos.");
        } else {
          const results = response.data || [];
          setFavorites(results);
          setHasMore(results.length >= FAVORITES_LIMIT);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setIsError(true);
        setErrorMsg(err instanceof Error ? err.message : "Error al cargar favoritos.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [token, activeProfile]);

  // Cargar más resultados (Infinite Scroll)
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || !token || !activeProfile) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);

    favoritesService
      .getAll(token, activeProfile.id, nextPage, FAVORITES_LIMIT)
      .then((response) => {
        if (response.status === "error") {
          return;
        }
        const results = response.data || [];
        setFavorites((prev) => [...prev, ...results]);
        setPage(nextPage);
        setHasMore(results.length >= FAVORITES_LIMIT);

        // Mover foco al primer resultado nuevo
        if (results.length > 0) {
          const firstNewId = results[0].id;
          setTimeout(() => {
            setFocus(`MYLIST-RESULTS-${firstNewId}`);
          }, 100);
        }
      })
      .catch(() => {
        // Silencioso - el usuario puede reintentar
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [page, hasMore, isLoadingMore, token, activeProfile]);

  // Foco inicial
  useEffect(() => {
    if (isLoading) return;

    if (!token || !activeProfile) {
      setTimeout(() => setFocus("MYLIST-BTN-LOGIN"), 300);
    } else if (favorites.length > 0) {
      setTimeout(() => setFocus(`MYLIST-RESULTS-${favorites[0].id}`), 300);
    } else if (!isError) {
      setTimeout(() => setFocus("MYLIST-EMPTY-BTN"), 300);
    }
  }, [isLoading, token, activeProfile, favorites.length, isError]);

  // Back lo maneja el global useBackHandler (exit modal en vista principal)

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.container}>
        <h1 className={styles.title}>Mi Lista</h1>

        {!token || !activeProfile ? (
          <div className={styles.notLoggedIn}>
            <p className={styles.notLoggedInText}>
              Inicia sesión para ver tu lista de favoritos.
            </p>
            <Button
              focusKey="MYLIST-BTN-LOGIN"
              variant="secondary"
              onPress={() => navigate("/auth/login")}
            >
              Iniciar sesión
            </Button>
          </div>
        ) : isLoading && page === 1 ? (
          <FullScreenSpinner />
        ) : isError ? (
          <p className={styles.errorText}>{errorMsg}</p>
        ) : favorites.length === 0 ? (
          <EmptyList />
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
            />
          </div>
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default MyListView;
