import { useMemo, useEffect } from "react";
import { RudoPlayer } from "@/components/RudoPlayer";
import { usePlayerEpisode } from "@/hooks/player/usePlayerEpisode";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { useAnalytics } from "@/layout/AnalyticsWrapper";
import { PlayerLoading } from "./components/PlayerLoading";
import { PlayerError } from "./components/PlayerError";
import { ShrunkBackdrop } from "./components/ShrunkBackdrop";
import styles from "./PlayerView.module.css";

function toSlug(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

function PlayerView() {
  const { loading, error, currentKey, episodeTitle, programTitle, vodSlug, chapterImage, initialSeconds, nextChapter, isShrunk, remainingSeconds, expandPlayer, handleTimeUpdate, token, activeProfile, playNext, goBack, goToEpisodes, programKey, segment, chapterTitle, chapterNumber, seasonNumber } = usePlayerEpisode();
  useDocumentTitle(episodeTitle);
  const { trackPage } = useAnalytics();

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

  if (loading) return <PlayerLoading chapterImage={chapterImage} />;
  if (error || !currentKey) return <PlayerError error={error} onBack={goBack} />;

  return (
    <div className={styles.playerContainer}>
      {isShrunk && chapterImage && <ShrunkBackdrop chapterImage={chapterImage} nextChapter={nextChapter} programTitle={episodeTitle} remainingSeconds={remainingSeconds} onPlayNext={playNext} onGoToEpisodes={goToEpisodes} />}
      <div style={isShrunk ? { position: "fixed", bottom: "10rem", right: "5rem", width: "28vw", aspectRatio: "16/9", borderRadius: "0.75rem", overflow: "hidden", zIndex: 50, boxShadow: "0 8px 32px rgba(0,0,0,0.6)", backgroundColor: "black", transition: "all 0.6s ease-in-out" } : { position: "fixed", inset: 0, width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "black", transition: "all 0.6s ease-in-out" }}>
        {isShrunk && <div onClick={expandPlayer} className={styles.playerOverlay} />}
        <RudoPlayer rudoKey={currentKey} mode="vod" title={episodeTitle} description={programTitle} onBack={goBack} initialSeconds={initialSeconds} userToken={token || undefined} userProfile={activeProfile?.id || undefined} vodSlug={vodSlug} onTimeUpdate={handleTimeUpdate} hideOverlay={isShrunk} />
      </div>
    </div>
  );
}
export default PlayerView;
