import { useEffect, useCallback, useRef } from "react";
import {
  FocusContext,
  useFocusable,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { useMyListData } from "@/hooks/mylist/useMyListData";
import { useMyListNavigation } from "@/hooks/mylist/useMyListNavigation";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import AlternativeCard from "@/components/ProgramCard/AlternativeCard";
import type { Program } from "@/interfaces/catalog.interface";
import EmptyList from "./components/EmptyList";
import styles from "./MyList.module.css";

/** Columnas del grid */
const COLUMNS = 4;

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

  // Foco inicial — solo se ejecuta UNA vez (no al cargar más páginas)
  const initialFocusSet = useRef(false);

  useEffect(() => {
    if (isLoading) return;
    if (initialFocusSet.current) return;

    if (!isAuthenticated) {
      setTimeout(() => setFocus("MYLIST-BTN-LOGIN"), 300);
      initialFocusSet.current = true;
    } else if (favorites.length > 0) {
      setTimeout(() => setFocus(`MYLIST-RESULTS-${favorites[0].id}`), 300);
      initialFocusSet.current = true;
    } else if (!isError) {
      setTimeout(() => setFocus("MYLIST-EMPTY-BTN"), 300);
      initialFocusSet.current = true;
    }
  }, [isLoading, isAuthenticated, favorites.length, isError]);

  /* ── Refs para estabilizar callbacks ──
   * Los cards memoizados solo se re-renderizan si sus props cambian.
   * Al leer valores volátiles desde refs, los callbacks nunca cambian
   * de referencia → los cards existentes no se re-renderizan. */
  const hasMoreRef = useRef(hasMore);
  hasMoreRef.current = hasMore;

  const isLoadingMoreRef = useRef(isLoadingMore);
  isLoadingMoreRef.current = isLoadingMore;

  const loadMoreRef = useRef(loadMore);
  loadMoreRef.current = loadMore;

  const favLenRef = useRef(favorites.length);
  favLenRef.current = favorites.length;

  /* ── Scroll infinito: detectar proximidad al fondo ── */
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (
        el.scrollHeight - el.scrollTop - el.clientHeight < 300 &&
        hasMoreRef.current &&
        !isLoadingMoreRef.current
      ) {
        loadMoreRef.current();
      }
    },
    [],
  );

  /* ── Scroll into view + prefetch al enfocar un card ── */
  const handleCardFocus = useCallback(
    (focusKeyCard: string, index: number) => {
      /* Prefetch: última fila → cargar más (se ejecuta siempre) */
      const currentRow = Math.floor(index / COLUMNS);
      const lastRow = Math.floor((favLenRef.current - 1) / COLUMNS);

      if (
        hasMoreRef.current &&
        !isLoadingMoreRef.current &&
        currentRow >= lastRow
      ) {
        loadMoreRef.current();
      }

      /* Scroll into view */
      const container = ref.current as HTMLElement | null;
      if (!container) return;

      const child = container.querySelector(
        `[data-focuskey="${focusKeyCard}"]`,
      ) as HTMLElement | null;
      if (!child) return;

      const containerRect = container.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();

      if (childRect.top < containerRect.top || childRect.bottom > containerRect.bottom) {
        const offset = childRect.top - containerRect.top - 10;
        container.scrollBy({ top: offset, behavior: "smooth" });
      }
    },
    [],
  );

  /* ── onPress estable para los cards ── */
  const handleProgramPress = useCallback(
    (key: string) => goToProgram(key),
    [goToProgram],
  );

  const programs = favorites as unknown as Program[];

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.container} onScroll={handleScroll}>
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
          <>
            <div className={styles.grid}>
              {programs.map((program, index) => {
                const cardKey = `MYLIST-RESULTS-${program.id}`;
                return (
                  <AlternativeCard
                    key={program.id}
                    program={program}
                    focusKey={cardKey}
                    index={index}
                    onCardFocus={handleCardFocus}
                    onPress={handleProgramPress}
                  />
                );
              })}
            </div>

            {isLoadingMore && (
              <div className={styles.loadingMore}>
                <Spinner />
              </div>
            )}
          </>
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default MyListView;

