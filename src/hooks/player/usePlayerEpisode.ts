import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { catalogService } from "@/services/catalogService";
import { useAuthStore } from "@/features/auth/authStore";
import { historyService } from "@/services/historyService";
import { adsService, type AdBreakCuepoint } from "@/services/adsService";
import { setSignedParams, unlockTokenService, type ProtectedToken } from "@/services/unlockTokenService";
import { isContentRestricted } from "@/utils/restriction";
import type { Chapter } from "@/interfaces/catalog.interface";

/** Segundos antes de terminar en los que el player se achica */
const SHRINK_THRESHOLD_SECONDS = 30;

export function usePlayerEpisode() {
  const { program, segment, season, chapter } = useParams<{
    program: string;
    segment: string;
    season: string;
    chapter: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((s) => s.token);
  const activeProfile = useAuthStore((s) => s.activeProfile);
  // subscription_active viene en la sesión (payload del user).
  const subscriptionActive = Boolean(useAuthStore((s) => s.user)?.subscription_active);

  // resumeTime y protectedToken pasados desde HistoryView / ContinueWatchingCarousel / ChapterCard
  const locationState = location.state as { resumeTime?: number; protectedToken?: ProtectedToken } | null;
  const stateResumeTime = locationState?.resumeTime;
  const stateProtectedToken = locationState?.protectedToken;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentKey, setCurrentKey] = useState("");
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [programTitle, setProgramTitle] = useState("");
  const [vodSlug, setVodSlug] = useState("");
  const [chapterImage, setChapterImage] = useState("");
  const [programKey, setProgramKey] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterNumber, setChapterNumber] = useState<number | null>(null);
  const [seasonNumber, setSeasonNumber] = useState<number | null>(null);
  const [initialSeconds, setInitialSeconds] = useState<number | undefined>(
    undefined,
  );
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);

  // Datos del stream y publicidad
  const [m3u8, setM3u8] = useState("");
  const [vastUrl, setVastUrl] = useState<string | undefined>(undefined);
  const [vastUrls, setVastUrls] = useState<string[]>([]);
  const [midrollCuepoints, setMidrollCuepoints] = useState<AdBreakCuepoint[]>([]);
  const [postrollVastUrls, setPostrollVastUrls] = useState<string[]>([]);
  const [episodes, setEpisodes] = useState<Chapter[]>([]);
  /** Capítulo protegido (PPV) sin acceso: mostrar paywall en vez de reproducir. */
  const [restricted, setRestricted] = useState(false);

  // Estado de minimización
  const [isShrunk, setIsShrunk] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(SHRINK_THRESHOLD_SECONDS);
  const isShrunkRef = useRef(false);
  const userExpandedRef = useRef(false);
  const autoPlayCancelledRef = useRef(false);
  const nextChapterRef = useRef<Chapter | null>(null);

  // Mantener ref sincronizado con el estado
  nextChapterRef.current = nextChapter;

  /** Marca el capítulo actual como finalizado en el historial */
  const markAsFinished = () => {
    if (token && activeProfile && vodSlug) {
      historyService.saveProgress({
        token,
        profile: activeProfile.id,
        vod: vodSlug,
        time: 0,
        end: 1,
      });
    }
  };

  const handleTimeUpdate = (currentTime: number, duration: number) => {
    if (duration > 0) {
      const remaining = duration - currentTime;
      if (remaining > SHRINK_THRESHOLD_SECONDS && userExpandedRef.current) {
        userExpandedRef.current = false;
      }
      if (remaining <= SHRINK_THRESHOLD_SECONDS && remaining > 0 && !isShrunkRef.current && !userExpandedRef.current) {
        isShrunkRef.current = true;
        setIsShrunk(true);
      }
      // Update countdown when shrunk and next chapter exists
      if (isShrunkRef.current && nextChapterRef.current) {
        const secs = Math.max(0, Math.ceil(remaining));
        setRemainingSeconds(secs);

        // Auto-play next chapter when countdown ends.
        // Si el video ya terminó (remaining <= 0), el flujo onEnded/postroll decide.
        if (remaining > 0 && secs <= 1 && !autoPlayCancelledRef.current && segment) {
          autoPlayCancelledRef.current = true;
          markAsFinished();
          navigate(`/play/${program}/${segment}/${nextChapterRef.current.season}/${nextChapterRef.current.chapter}`);
        }
      }
    }
  };

  const expandPlayer = () => {
    setIsShrunk(false);
    isShrunkRef.current = false;
    userExpandedRef.current = true;
    autoPlayCancelledRef.current = true;
  };

  const playNext = () => {
    if (nextChapter && segment && program) {
      markAsFinished();
      navigate(`/play/${program}/${segment}/${nextChapter.season}/${nextChapter.chapter}`);
    }
  };

  const goBack = () => {
    navigate(`/programas/${programKey}`);
  };

  const goToEpisodes = () => {
    if (programKey) {
      markAsFinished();
      navigate(`/programas/${programKey}`);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadEpisode = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!segment || !season || !chapter) {
          setError("Parámetros de ruta incompletos");
          setLoading(false);
          return;
        }

        const seasonNum = parseInt(season, 10);
        const chapterNum = parseInt(chapter, 10);

        // Obtener detalle del programa para saber si es single_episode
        const programDetail = program
          ? (await catalogService.getProgramDetail(program))?.data
          : null;
        const isNoSegments = programDetail?.single_episode === true;

        // Cargar capítulo actual
        let chapterData: Chapter | undefined;

        if (isNoSegments) {
          // Programa single_episode: obtener capítulos sin segmento
          const response = await catalogService.getChapters({
            program: program!,
            no_segments: true,
          });
          chapterData = response?.data?.[0];
        } else {
          // Programa con segmentos: obtener capítulo específico
          const response = await catalogService.getChapterBySlug({
            program,
            segment,
            season: seasonNum,
            chapter: chapterNum,
          });
          chapterData = response?.data;
        }

        if (!chapterData?.key) {
          if (!cancelled) {
            navigate("/404", { replace: true });
          }
          return;
        }

        // Capítulo protegido (PPV): obtener el unlock token y firmar el m3u8,
        // equivalente al flujo legacy de getProtectedVideoUrl.
        let finalM3u8 = chapterData.m3u8;
        let locked = false;
        const isProtected =
          isContentRestricted(chapterData.restriction) ||
          isContentRestricted(programDetail?.restriction);

        if (isProtected) {
          const signedParams = setSignedParams(stateProtectedToken);
          if (signedParams) {
            finalM3u8 =
              chapterData.m3u8 +
              (chapterData.m3u8.includes("?") ? "&" : "?") +
              signedParams;
          } else if (subscriptionActive && token) {
            try {
              const unlockRes = await unlockTokenService.get({
                token,
                keyVideo: chapterData.key,
              });
              const tok = unlockRes?.data;
              if (
                tok &&
                typeof tok.st === "string" &&
                typeof tok.ts === "number" &&
                typeof tok.e === "number"
              ) {
                const params = setSignedParams({ st: tok.st, ts: tok.ts, e: tok.e });
                if (params) {
                  finalM3u8 =
                    chapterData.m3u8 +
                    (chapterData.m3u8.includes("?") ? "&" : "?") +
                    params;
                }
              } else {
                locked = true;
              }
            } catch {
              locked = true;
            }
          } else {
            // Sin suscripción activa (o sin sesión): paywall, no reproducir.
            locked = true;
          }
        }

        if (!cancelled) {
          setCurrentKey(chapterData.key);
          setEpisodeTitle(chapterData.name_program || chapterData.title || "");
          setProgramTitle(`T${chapterData.season}:E${chapterData.chapter}`);
          setVodSlug(chapterData.slug);
          setChapterImage(chapterData.image_land?.big || "");
          setProgramKey(chapterData.key_program || "");
          setChapterTitle(chapterData.title || "");
          setChapterNumber(chapterData.chapter ?? null);
          setSeasonNumber(chapterData.season ?? null);
          setM3u8(locked ? "" : finalM3u8);
          setRestricted(locked);

          let resolvedInitialSeconds: number | undefined;

          // Priorizar resumeTime del location.state (viene de HistoryView / ContinueWatchingCarousel)
          if (typeof stateResumeTime === 'number' && stateResumeTime > 0) {
            resolvedInitialSeconds = stateResumeTime;
          } else if (token && activeProfile) {
            try {
              const timelineRes = await historyService.getTimeline(
                token,
                activeProfile.id,
                [chapterData.slug],
              );
              const timelineItem = timelineRes.data?.[0];
              if (
                timelineItem &&
                timelineItem.end === 0 &&
                timelineItem.time > 0
              ) {
                resolvedInitialSeconds = timelineItem.time;
              }
            } catch {
              // Timeline no disponible, iniciar desde el principio
            }
          }
          setInitialSeconds(resolvedInitialSeconds);
        }

        // Obtener VAST URLs para ads (esencial antes de montar el player)
        if (!cancelled && chapterData) {
          try {
            const vmapData = await adsService.getVodAds(chapterData.key);
            if (vmapData) {
              const allPrerollUrls = adsService.getAllPrerollVastUrls(vmapData);
              if (allPrerollUrls.length > 0) {
                setVastUrls(allPrerollUrls);
                setVastUrl(allPrerollUrls[0]);
              }

              const midrolls = adsService.getMidrollAdBreaks(vmapData);
              const postrolls = adsService.getPostrollVastUrls(vmapData);
              setMidrollCuepoints(midrolls);
              setPostrollVastUrls(postrolls);
            }
          } catch {
            // Ads not available, continue without
          }
        }

        // Lista de episodios (para el sidebar del player)
        if (!cancelled && chapterData && !isNoSegments) {
          try {
            const chaptersRes = await catalogService.getChapters({
              program: program!,
              segment,
              season: seasonNum,
              limit: 50,
            });
            if (chaptersRes?.data) {
              setEpisodes(chaptersRes.data);
            }
          } catch {
            // Episodes list not critical
          }
        }

        // Intentar cargar el siguiente capítulo (solo si tiene segmentos y next-cap > 0)
        if (!cancelled && chapterData) {
          const nextCapNum = chapterData["next-cap"];
          if (!isNoSegments && nextCapNum > 0) {
            try {
              const nextRes = await catalogService.getChapterBySlug({
                program,
                segment,
                season: seasonNum,
                chapter: nextCapNum,
              });
              if (!cancelled && nextRes?.data?.key) {
                setNextChapter(nextRes.data);
              } else if (!cancelled) {
                setNextChapter(null);
              }
            } catch {
              if (!cancelled) setNextChapter(null);
            }
          } else {
            if (!cancelled) setNextChapter(null);
          }
        }

        if (!cancelled) {
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError("Error al cargar el episodio");
          setLoading(false);
        }
      }
    };

    loadEpisode();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only re-fetch when route params or auth change, not on navigate/program/stateResumeTime reference changes
  }, [segment, season, chapter, token, activeProfile, subscriptionActive]);

  // Resetear estado al cambiar de episodio
  useEffect(() => {
    setIsShrunk(false);
    isShrunkRef.current = false;
    userExpandedRef.current = false;
    autoPlayCancelledRef.current = false;
    setNextChapter(null);
    setRemainingSeconds(SHRINK_THRESHOLD_SECONDS);
    setInitialSeconds(undefined);
    setMidrollCuepoints([]);
    setPostrollVastUrls([]);
    setVastUrl(undefined);
    setVastUrls([]);
    setEpisodes([]);
    setM3u8("");
    setRestricted(false);
  }, [segment, season, chapter]);


  // Prevenir scroll en la página del player
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return {
    // Datos
    loading,
    error,
    currentKey,
    episodeTitle,
    programTitle,
    vodSlug,
    chapterImage,
    initialSeconds,
    nextChapter,
    segment,
    m3u8,
    vastUrl,
    vastUrls,
    midrollCuepoints,
    postrollVastUrls,
    episodes,

    // Minimización
    isShrunk,
    remainingSeconds,
    expandPlayer,
    handleTimeUpdate,

    // Autenticación
    token,
    activeProfile,

    // Paywall de contenido protegido
    restricted,

    // Navegación
    playNext,
    goBack,
    goToEpisodes,
    program,
    programKey,
    chapterTitle,
    chapterNumber,
    seasonNumber,
  };
}
