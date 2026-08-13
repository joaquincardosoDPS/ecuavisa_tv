import type { Program } from "@/interfaces/catalog.interface";
import type { FavoriteItem } from "@/interfaces/favorites.interface";
import AlternativeCard from "./AlternativeCard";
import { useInfiniteScroll } from "@/hooks/shared/useInfiniteScroll";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import styles from "./ProgramCard.module.css";

type GridItem = Program | FavoriteItem;

interface ProgramGridProps {
  programs: GridItem[];
  isLoading?: boolean;
  isError?: boolean;
  loadingText?: string;
  errorText?: string;
  cols?: number;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

function isProgram(item: GridItem): item is Program {
  return "segments" in item;
}

function toProgram(item: GridItem): Program {
  if (isProgram(item)) return item;
  return item as unknown as Program;
}

const gridColsMap: Record<number, string> = {
  2: styles.grid2,
  3: styles.grid3,
  4: styles.grid4,
  5: styles.grid5,
  6: styles.grid6,
};

function ProgramGrid({
  programs,
  isLoading = false,
  isError = false,
  loadingText = "Cargando...",
  errorText = "Error al cargar",
  cols = 4,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
}: ProgramGridProps) {
  const sentinelRef = useInfiniteScroll(() => fetchNextPage?.(), hasNextPage && !isFetchingNextPage);

  const { ref, focusKey } = useFocusable({
    focusKey: "zone-results",
    saveLastFocusedChild: true
  });

  return (
    <>
    <FocusContext.Provider value={focusKey}>
      {isLoading && <p className={styles.loadingText}>{loadingText}</p>}
      <div ref={ref} className={[styles.grid, gridColsMap[cols] || styles.grid4].join(" ")}>
        {programs.map((item, index) => {
          // If we are in the last 'cols' elements, trigger fetchNextPage on focus
          const isNearEnd = index >= programs.length - cols * 2;
          return (
            <AlternativeCard 
              key={item.id} 
              index={index}
              program={toProgram(item)} 
              onFocus={() => {
                if (isNearEnd && hasNextPage && !isFetchingNextPage && fetchNextPage) {
                  fetchNextPage();
                }
              }}
            />
          );
        })}
        {isError && <p className={styles.errorText}>{errorText}</p>}
      </div>
    </FocusContext.Provider>
    {fetchNextPage && (
      <div ref={sentinelRef} className={styles.loadMore}>
        {isFetchingNextPage && <div className={styles.spinner} />}
      </div>
    )}
    </>
  );
}

export default ProgramGrid;
