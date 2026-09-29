import { useMemo, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FocusContext, useFocusable, setFocus, doesFocusableExist } from "@noriginmedia/norigin-spatial-navigation";
import { VideoPlayer, type Chapter as VideoPlayerChapter } from "@/components/VideoPlayer";
import { usePlayerEpisode } from "@/hooks/player/usePlayerEpisode";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { useAnalytics } from "@/layout/AnalyticsWrapper";
import { PlayerLoading } from "./components/PlayerLoading";
import { PlayerError } from "./components/PlayerError";
import { EndOfEpisodeScreen } from "./components/EndOfEpisodeScreen";
import RestrictionModal from "@/components/ui/RestrictionModal";
import { usePurchasedPrograms } from "@/hooks/program/usePurchasedPrograms";
import { isContentRestricted } from "@/utils/restriction";
import styles from "./PlayerView.module.css";

function toSlug(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

function PlayerView() {
  const navigate = useNavigate();
  const { loading, error, restricted, currentKey, episodeTitle, programTitle, vodSlug, chapterImage, initialSeconds, nextChapter, isShrunk, remainingSeconds, expandPlayer, handleTimeUpdate, token, activeProfile, playNext, goBack, goToEpisodes, program, programKey, segment, chapterTitle, chapterNumber, seasonNumber, m3u8, vastUrl, vastUrls, midrollCuepoints, postrollVastUrls, episodes } = usePlayerEpisode();
  useDocumentTitle(episodeTitle);
  const { trackPage } = useAnalytics();
  const { hasPurchased } = usePurchasedPrograms();

  // Capítulos del panel sin acceso: la restricción del capítulo manda (la del
  // programa solo etiqueta el programa de pago) y hace falta la compra (PPV).
  const lockedEpisodes = useMemo(() => {
    if (hasPurchased(program || programKey)) return [];
    return episodes
      .filter((ep) => isContentRestricted(ep.restriction))
      .map((ep) => ep.key);
  }, [hasPurchased, program, programKey, episodes]);

  // El capítulo siguiente puede no estar en la lista cargada: se evalúa su
  // propia restricción para no ofrecerlo sin acceso.
  const nextChapterLocked = useMemo(() => {
    if (!nextChapter) return false;
    return !hasPurchased(program || programKey) && isContentRestricted(nextChapter.restriction);
  }, [nextChapter, hasPurchased, program, programKey]);

  const [showNextChapterPaywall, setShowNextChapterPaywall] = useState(false);

  const handleNextChapter = useCallback(() => {
    if (nextChapterLocked) {
      setShowNextChapterPaywall(true);
      return;
    }
    playNext();
  }, [nextChapterLocked, playNext]);

  const closeNextChapterPaywall = useCallback(() => {
    setShowNextChapterPaywall(false);
    setTimeout(() => {
      if (doesFocusableExist("PLAYER-BTN-CHAPTER-NEXT")) setFocus("PLAYER-BTN-CHAPTER-NEXT");
    }, 150);
  }, []);

  // El reproductor captura Back a nivel window: con el modal de pago abierto
  // debe cerrarlo en vez de salir del player.
  const handleBack = useCallback(() => {
    if (showNextChapterPaywall) {
      closeNextChapterPaywall();
      return;
    }
    goBack();
  }, [showNextChapterPaywall, closeNextChapterPaywall, goBack]);

  const analyticsPath = useMemo(() => {
    if (!programKey || !chapterTitle) return null;
    const parts = ['/programas', programKey];
    if (segment) parts.push(segment);
    if (seasonNumber != null) parts.push(String(seasonNumber));
    parts.push(toSlug(chapterTitle));
    return parts.join('/');
  }, [programKey, segment, seasonNumber, chapterTitle]);

  const analyticsTitle = useMemo(() => {
    if (!episodeTitle) return null;
    const parts = [episodeTitle];
    if (segment) parts.push(segment.replace(/-/g, ' '));
    if (seasonNumber != null) parts.push(`Temporada ${seasonNumber}`);
    if (chapterNumber != null) parts.push(`Capitulo ${chapterNumber}`);
    return parts.join(' | ');
  }, [episodeTitle, segment, seasonNumber, chapterNumber]);

  useEffect(() => {
    if (analyticsPath && analyticsTitle) trackPage(analyticsPath, analyticsTitle);
  }, [analyticsPath, analyticsTitle, trackPage]);

  // FocusContext para la vista completa del player
  const { ref: viewFocusRef, focusKey: viewFocusKey } = useFocusable({
    focusKey: "PLAYER-PAGE",
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Foco imperativo cuando el player está listo
  useEffect(() => {
    if (!loading && !error) {
      setFocus("PLAYER-VIEW");
    }
  }, [loading, error]);

  // Foco en la pantalla de fin de episodio al encogerse / restaurar al expandir
  useEffect(() => {
    if (isShrunk) {
      const timer = setTimeout(() => {
        setFocus(nextChapter ? "PIP-BTN-NEXT" : "PIP-BTN-EPISODES");
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setFocus("PLAYER-BTN-PLAYPAUSE");
    }
  }, [isShrunk, nextChapter]);

  const handleEpisodeSelect = useCallback(
    (ep: VideoPlayerChapter) => {
      const seg = ep.key_segment || segment || '';
      navigate(`/play/${program || programKey}/${seg}/${ep.season}/${ep.chapter}`);
    },
    [navigate, program, programKey, segment],
  );

  // Video terminó naturalmente (auto-nav cancelado por el usuario)
  const handleEnded = useCallback(() => {
    if (nextChapter) playNext();
    else goToEpisodes();
  }, [nextChapter, playNext, goToEpisodes]);

  if (loading) return <PlayerLoading chapterImage={chapterImage} />;
  // Capítulo protegido sin acceso: paywall en lugar del reproductor.
  if (restricted) {
    return (
      <div className={styles.playerContainer}>
        <RestrictionModal isOpen onClose={goBack} programKey={programKey || program} />
      </div>
    );
  }
  if (error || !currentKey || !m3u8) return <PlayerError error={error || "No se pudo cargar el episodio"} onBack={goBack} />;

  return (
    <FocusContext.Provider value={viewFocusKey}>
      <div ref={viewFocusRef} className={styles.playerContainer}>
        <VideoPlayer
          src={m3u8}
          title={episodeTitle}
          description={programTitle}
          rudoKey={currentKey}
          vastUrl={vastUrl}
          vastUrls={vastUrls}
          autoplay
          onBack={handleBack}
          pipMode={isShrunk}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          initialSeconds={initialSeconds}
          vodSlug={vodSlug}
          userToken={token || undefined}
          userProfile={activeProfile?.id || undefined}
          episodes={episodes}
          currentEpisodeKey={currentKey}
          onEpisodeSelect={handleEpisodeSelect}
          lockedEpisodes={lockedEpisodes}
          midrollCuepoints={midrollCuepoints}
          postrollVastUrls={postrollVastUrls}
          hasNextChapter={Boolean(nextChapter)}
          onNextChapter={handleNextChapter}
          forceControlsVisible={showNextChapterPaywall}
        />

        <RestrictionModal
          isOpen={showNextChapterPaywall}
          onClose={closeNextChapterPaywall}
          programKey={programKey || program}
        />

        {/* Pantalla de fin de episodio (background + info) — se renderiza
            encima del VideoPlayer cuyo fondo es transparente en pip-active */}
        {isShrunk && (
          <EndOfEpisodeScreen
            backgroundImage={chapterImage}
            nextEpisode={nextChapter}
            programTitle={episodeTitle}
            countdown={remainingSeconds}
            onNextEpisode={playNext}
            onBack={goToEpisodes}
            onCancelTransition={expandPlayer}
          />
        )}
      </div>
    </FocusContext.Provider>
  );
}
export default PlayerView;
