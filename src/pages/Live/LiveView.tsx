import { useLiveSignal } from "@/hooks/live/useLiveSignal";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import EPGGrid from "./components/EPGGrid";
import LivePlayerSection from "./components/LivePlayerSection";
import LiveSignalInfo from "./components/LiveSignalInfo";
import bgLogin from "@/assets/img/bg_login.png";
import styles from "./Live.module.css";

function LiveView() {
  useDocumentTitle("En Vivo");
  const { selectedSignal, epg, playlistPremium, isLoading, expanded, handleSelectSignal, toggleExpand } = useLiveSignal();

  const { focusKey, ref } = useFocusable({
    focusKey: 'page-live',
    saveLastFocusedChild: true,
    autoRestoreFocus: true
  });

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
          <LivePlayerSection signal={selectedSignal} isExpanded={expanded} onToggleExpand={toggleExpand} />
        </div>
      </div>
      <div className={[styles.epgRow, expanded ? styles.epgRowExpanded : styles.epgRowNormal].join(" ")}>
        <EPGGrid epg={epg} signals={playlistPremium} selectedKeyLive={selectedSignal?.key_live} onSelectSignal={handleSelectSignal} />
      </div>
      </div>
    </FocusContext.Provider>
  );
}

export default LiveView;
