import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { catalogService } from "@/services/catalogService";
import { useAuthStore } from "@/features/auth/authStore";
import { historyService } from "@/services/historyService";
import { adsService } from "@/services/adsService";
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
  const token = useAuthStore((s) => s.token);
  const activeProfile = useAuthStore((s) => s.activeProfile);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentKey, setCurrentKey] = useState("");
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [programTitle, setProgramTitle] = useState("");
  const [vodSlug, setVodSlug] = useState("");
  const [chapterImage, setChapterImage] = useState("");
  const [programKey, setProgramKey] = useState("");
  const [m3u8, setM3u8] = useState("");
  const [vastUrl, setVastUrl] = useState<string | undefined>(undefined);
  const [initialSeconds, setInitialSeconds] = useState<number | undefined>(
    undefined,
  );
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [episodes, setEpisodes] = useState<Chapter[]>([]);

  // Shrink state
  const [isShrunk, setIsShrunk] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(SHRINK_THRESHOLD_SECONDS);
  const isShrunkRef = useRef(false);
  const userExpandedRef = useRef(false);
  const autoPlayCancelledRef = useRef(false);
  const nextChapterRef = useRef<Chapter | null>(null);

  // Keep ref in sync with state
  nextChapterRef.current = nextChapter;

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

        // Auto-play next chapter when countdown ends
        if (secs <= 1 && !autoPlayCancelledRef.current && segment) {
          autoPlayCancelledRef.current = true;
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
      navigate(`/play/${program}/${segment}/${nextChapter.season}/${nextChapter.chapter}`);
    }
  };

  const goBack = () => {
    const slug = programKey || program;
    navigate(`/programas/${slug}`);
  };

  const goToEpisodes = () => {
    const slug = programKey || program;
    if (slug) {
      navigate(`/programas/${slug}`);
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

        // Optimización: si season > 0 o chapter > 0, NO es single_episode.
        // season=0 Y chapter=0 es la ruta usada para single_episode.
        const isNoSegments = seasonNum === 0 && chapterNum === 0;

        // Cargar capítulo actual
        let chapterData: Chapter | undefined;

        if (isNoSegments) {
          const response = await catalogService.getChapters({
            program: program!,
            page: 1,
            limit: 1,
          });
          chapterData = response?.data?.[0];
        } else {
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
            setError("Capítulo no encontrado");
            setLoading(false);
          }
          return;
        }

        if (cancelled) return;

        // Setear datos esenciales del capítulo
        setCurrentKey(chapterData.key);
        setEpisodeTitle(chapterData.name_program || chapterData.title || "");
        setProgramTitle(isNoSegments ? "" : `T${chapterData.season}:E${chapterData.chapter}`);
        setVodSlug(chapterData.slug);
        setM3u8(chapterData.m3u8);
        setChapterImage(chapterData.image_land?.big || "");
        setProgramKey(chapterData.key_program || "");

        // Obtener VAST URL para ads (esencial antes de montar el player)
        try {
          const vmapData = await adsService.getVodAds(chapterData.key);
          if (!cancelled && vmapData) {
            const prerollVast = adsService.getPrerollVastUrl(vmapData);
            setVastUrl(prerollVast);
          }
        } catch {
          // Ads not available, continue without
        }

        if (cancelled) return;

        // Data esencial + ads lista → desbloquear el player
        setLoading(false);

        // Cargar historial, siguiente capítulo y episodios en paralelo
        // (no bloquean el montaje del player)
        const promises: Promise<void>[] = [];

        if (token && activeProfile) {
          promises.push((async () => {
            try {
              const timelineRes = await historyService.getTimeline(
                token,
                activeProfile.id,
                [chapterData!.slug],
              );
              const timelineItem = timelineRes.data?.[0];
              if (
                !cancelled &&
                timelineItem &&
                timelineItem.end === 0 &&
                timelineItem.time > 0
              ) {
                setInitialSeconds(timelineItem.time);
              }
            } catch {
              // Timeline not available, start from beginning
            }
          })());
        }

        if (!isNoSegments) {
          promises.push((async () => {
            try {
              const nextRes = await catalogService.getChapterBySlug({
                program,
                segment,
                season: seasonNum,
                chapter: chapterNum + 1,
              });
              if (!cancelled && nextRes?.data?.key) {
                setNextChapter(nextRes.data);
              } else if (!cancelled) {
                setNextChapter(null);
              }
            } catch {
              if (!cancelled) setNextChapter(null);
            }
          })());

          promises.push((async () => {
            try {
              const chaptersRes = await catalogService.getChapters({
                program: program!,
                segment,
                season: seasonNum,
                limit: 50,
              });
              if (!cancelled && chaptersRes?.data) {
                setEpisodes(chaptersRes.data);
              }
            } catch {
              // Episodes list not critical
            }
          })());
        } else {
          if (!cancelled) setNextChapter(null);
        }

        await Promise.all(promises);
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
  }, [program, segment, season, chapter, token, activeProfile]);

  // Reset state on episode change
  useEffect(() => {
    setIsShrunk(false);
    isShrunkRef.current = false;
    userExpandedRef.current = false;
    autoPlayCancelledRef.current = false;
    setNextChapter(null);
    setRemainingSeconds(SHRINK_THRESHOLD_SECONDS);
    setInitialSeconds(undefined);
  }, [segment, season, chapter]);

  return {
    // Data
    loading,
    error,
    currentKey,
    episodeTitle,
    programTitle,
    vodSlug,
    chapterImage,
    initialSeconds,
    nextChapter,
    episodes,
    m3u8,
    vastUrl,
    segment,

    // Shrink
    isShrunk,
    remainingSeconds,
    expandPlayer,
    handleTimeUpdate,

    // Auth (pass-through for VideoPlayer)
    token,
    activeProfile,

    // Navigation
    playNext,
    goBack,
    goToEpisodes,
    programKey,
  };
}
