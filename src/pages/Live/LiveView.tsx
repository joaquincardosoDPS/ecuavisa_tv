import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveSignal } from "@/hooks/live/useLiveSignal";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { isInputAction } from "@/utils/keyCodes";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import EPGGrid from "./components/EPGGrid";
import LivePlayerSection from "./components/LivePlayerSection";
import LiveSignalInfo from "./components/LiveSignalInfo";
import bgLogin from "@/assets/img/bg_login.png";
import styles from "./Live.module.css";

function LiveView() {
  useDocumentTitle("En Vivo");
  const navigate = useNavigate();
  const { selectedSignal, epg, playlistPremium, isLoading, expanded, handleSelectSignal, toggleExpand, expandPlayer } = useLiveSignal();

  const { focusKey, ref } = useFocusable({
    focusKey: 'page-live',
    saveLastFocusedChild: true,
    autoRestoreFocus: true
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isInputAction(e, 'Back')) return;
      if (expanded) return;
      e.preventDefault();
      e.stopPropagation();
      navigate('/', { replace: true });
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [expanded, navigate]);

  const currentEvent = useMemo(() => {
    if (!selectedSignal || !epg) return null;
    const channel = epg.find((ch) => ch.key_live === selectedSignal.key_live);
    if (!channel) return null;
    const now = new Date();
    return channel.events.find((ev) => {
      const begin = new Date(ev.beginTime);
      const end = new Date(ev.endTime);
      return begin <= now && end > now;
    }) ?? null;
  }, [selectedSignal, epg]);

  if (isLoading) return <FullScreenSpinner />;

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className={styles.page}
      style={{ background: `url(${bgLogin}) top center / 100% auto no-repeat` }}
    >
      <div className={[styles.playerRow, expanded ? styles.playerRowExpanded : styles.playerRowNormal].join(" ")}>
        {!expanded && (
          <div className={styles.signalInfo}>
            <LiveSignalInfo signal={selectedSignal} epg={epg} />
          </div>
        )}
        <div className={expanded ? undefined : styles.playerCol} style={expanded ? { width: "100%", display: "flex", alignItems: "center", justifyContent: "center" } : undefined}>
          <LivePlayerSection signal={selectedSignal} currentEvent={currentEvent} isExpanded={expanded} onToggleExpand={toggleExpand} />
        </div>
      </div>
      <div className={[styles.epgRow, expanded ? styles.epgRowExpanded : styles.epgRowNormal].join(" ")}>
        <EPGGrid epg={epg} signals={playlistPremium} selectedKeyLive={selectedSignal?.key_live} onSelectSignal={handleSelectSignal} onEnterSignal={expandPlayer} />
      </div>
      </div>
    </FocusContext.Provider>
  );
}

export default LiveView;
