import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

interface TVScrollContextProps {
  scrollY: number;
  scrollToNode: (node: HTMLElement, isBanner?: boolean) => void;
  /** Vuelve la vista al tope (scrollY = 0). Útil al enfocar tabs/filas superiores. */
  resetScroll: () => void;
}

const TVScrollContext = createContext<TVScrollContextProps | undefined>(undefined);

export function TVScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  const scrollToNode = useCallback((node: HTMLElement, isBanner = false) => {
    if (isBanner) {
      setScrollY(0);
      return;
    }

    const viewportHeight = window.innerHeight;
    const rect = node.getBoundingClientRect();
    
    // Position of the center of the node relative to the viewport
    const nodeCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    
    const diff = nodeCenter - viewportCenter;
    
    setScrollY((prev) => {
      // prevent scrolling past top
      const nextScroll = prev - diff;
      return nextScroll > 0 ? 0 : nextScroll;
    });
  }, []);

  const resetScroll = useCallback(() => setScrollY(0), []);

  const value = useMemo(() => ({ scrollY, scrollToNode, resetScroll }), [scrollY, scrollToNode, resetScroll]);

  return (
    <TVScrollContext.Provider value={value}>
      {children}
    </TVScrollContext.Provider>
  );
}

export function useTVScroll() {
  const context = useContext(TVScrollContext);
  if (!context) {
    throw new Error('useTVScroll must be used within a TVScrollProvider');
  }
  return context;
}
