import { useState, useEffect, useRef } from "react";
import type { Program, Segment, Chapter } from "@/interfaces/catalog.interface";
import { useQuery } from "@tanstack/react-query";
import { catalogService } from "@/services/catalogService";
import { useAnalytics } from "@/layout/AnalyticsWrapper";

type ActiveTab = "related" | "details" | Segment;

interface UseProgramSingleDataReturn {
  chapter: Chapter | null;
  relatedPrograms: Program[];
  isLoadingRelatedPrograms: boolean;
  segments: Segment[];
  hasSegments: boolean;
  activeSegment: Segment | null;
  setActiveSegment: (segment: Segment) => void;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  showRelated: boolean;
  setShowRelated: (show: boolean) => void;
  activeSeason: number | null;
  setActiveSeason: (season: number | null) => void;
  tabsRef: React.RefObject<HTMLDivElement | null>;
  scrollToTabs: () => void;
  requestScroll: () => void;
  handleChaptersLoaded: () => void;
}

export function useProgramSingleData(
  program: Program,
  setIsLoading: (loading: boolean) => void
): UseProgramSingleDataReturn {
  const { data: chapterData, isLoading: isLoadingChapters } = useQuery({
    queryKey: ["singleChapters", program.key],
    queryFn: () =>
      catalogService.getChapters({
        program: program.key,
        no_segments: true,
      }),
    enabled: !!program.key,
  });

  const { data: relatedProgramsData, isLoading: isLoadingRelatedPrograms } =
    useQuery({
      queryKey: ["relatedPrograms", program.key],
      queryFn: () =>
        catalogService.searchPrograms({
          slug_exclude: program.key,
          category: program.name_category,
        }),
      enabled: !!program.key,
    });

  const relatedPrograms = relatedProgramsData?.data ?? [];
  const chapter = chapterData?.data?.[0] ?? null;
  const segments = program.segments ?? [];
  const hasSegments = segments.length > 0;

  // Tab activo: objeto de segmento, "related" o "details"
  const [activeTab, setActiveTabState] = useState<ActiveTab>(
    hasSegments ? segments[0] : "related"
  );
  const [activeSeason, setActiveSeason] = useState<number | null>(
    hasSegments ? (segments[0].all_temp?.[0] ?? 1) : null
  );

  // Derivados con la misma forma que usa Tabs (vista multi-capitulo)
  const activeSegment: Segment | null =
    typeof activeTab === "object" ? activeTab : null;
  const showDetails = activeTab === "details";
  const showRelated = activeTab === "related";

  const setActiveSegment = (segment: Segment) => setActiveTabState(segment);
  const setShowDetails = (show: boolean) =>
    setActiveTabState(show ? "details" : hasSegments ? segments[0] : "related");
  const setShowRelated = (show: boolean) =>
    setActiveTabState(show ? "related" : hasSegments ? segments[0] : "details");

  const tabsRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef(false);

  const { trackPage } = useAnalytics();

  // Override del path para GA4
  const analyticsPath =
    typeof activeTab === "object" && activeTab.key
      ? `/programas/${program.key}/${activeTab.key}`
      : `/programas/${program.key}`;

  // Enviar page_view cuando cambia el tab/segmento (la URL no cambia)
  useEffect(() => {
    trackPage(analyticsPath);
  }, [analyticsPath, trackPage]);

  const scrollToTabs = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 50);
  };

  const requestScroll = () => {
    pendingScroll.current = true;
  };

  const handleChaptersLoaded = () => {
    if (pendingScroll.current) {
      pendingScroll.current = false;
      scrollToTabs();
    }
  };

  // Resetear temporada al cambiar de segmento
  useEffect(() => {
    if (typeof activeTab === "object" && activeTab.all_temp?.length > 0) {
       
      setActiveSeason(activeTab.all_temp[0]);
    }
  }, [activeTab]);

  // Notificar al padre que la vista está lista
  useEffect(() => {
    if (!isLoadingChapters && !isLoadingRelatedPrograms) {
      setIsLoading(false);
    }
  }, [isLoadingChapters, isLoadingRelatedPrograms, setIsLoading]);

  // Segmento activo para ChaptersContainer
  return {
    chapter,
    relatedPrograms,
    isLoadingRelatedPrograms,
    segments,
    hasSegments,
    activeSegment,
    setActiveSegment,
    showDetails,
    setShowDetails,
    showRelated,
    setShowRelated,
    activeSeason,
    setActiveSeason,
    tabsRef,
    scrollToTabs,
    requestScroll,
    handleChaptersLoaded,
  };
}
