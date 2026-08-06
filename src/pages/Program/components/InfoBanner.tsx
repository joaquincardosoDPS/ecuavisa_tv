import Button from "@/components/ui/Button";
import type { Chapter, Program } from "@/interfaces/catalog.interface";
import { useFavorite } from "@/hooks/mylist/useFavorite";
import ProgressBar from "@/components/ui/ProgressBar";
import { useContinueWatching } from "@/hooks/program/useContinueWatching";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import HeartIcon from "@/components/icons/HeartIcon";
import { PlayButton } from "@/components/icons/play-button";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { useEffect } from "react";
import styles from "../Program.module.css";

interface InfoBannerProps {
  program: Program;
  firstChapter?: Chapter | null;
  badge?: string;
  schedule?: string;
}

function InfoBanner({ program, firstChapter, badge, schedule }: InfoBannerProps) {
  const navigate = useNavigate();
  const { isFavorited, isEnabled, toggleFavorite } = useFavorite(program.key);
  const { item: continueWatchingItem } = useContinueWatching(program.key);
  const firstSegment = program.segments?.[0];

  const playFocusKey = `program-play-${program.key}`;
  const favFocusKey = `program-fav-${program.key}`;

  const handlePlay = () => {
    if (continueWatchingItem) {
      navigate(`/play/${program.key}/${continueWatchingItem.key_segment}/${continueWatchingItem.season}/${continueWatchingItem.chapter}`, { state: { resumeTime: continueWatchingItem.time } });
    } else if (firstSegment && firstChapter) {
      navigate(`/play/${program.key}/${firstSegment.key}/${firstChapter.season}/${firstChapter.chapter}`);
    }
  };

  const handleFavorite = () => {
    if (isEnabled) {
      toggleFavorite();
    } else {
      navigate("/auth/login");
    }
  };

  const { ref: playRef, focused: playFocused } = useSpatialFocus({
    focusKey: playFocusKey,
    onEnterPress: handlePlay,
  });

  const { ref: favRef, focused: favFocused } = useSpatialFocus({
    focusKey: favFocusKey,
    onEnterPress: handleFavorite,
  });

  // Foco inicial en "Ver ahora"
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFocus(playFocusKey);
    }, 150);
    return () => clearTimeout(timeout);
  }, [playFocusKey]);

  const logoImg = program?.image_logo?.big;

  return (
    <div className={styles.infoWrap}>
      <div className={styles.backWrap}>
        <BackButton />
      </div>
      <div className={styles.infoContent}>
        {logoImg && (
          <div className={styles.logoBox}>
            <img src={logoImg} alt={program.title} className={styles.logoImg} />
          </div>
        )}
        {badge && <span className={styles.infoBadge}>{badge}</span>}
        <h2 className={styles.programTitle}>{program.title}</h2>
        <p className={styles.programDesc}>{program.description_short}</p>
        {schedule && <p className={styles.programSchedule}>{schedule}</p>}
        <div className={styles.actionsRow}>
          <div ref={playRef} tabIndex={0} className={playFocused ? styles.focused : undefined}>
            <Button
              variant="primary"
              onClick={handlePlay}
              className="uppercase"
              style={{
                backgroundColor: "var(--clr-primary-title)",
                color: "var(--clr-primary)",
                borderColor: "transparent",
                borderRadius: "9999px",
                padding: "0.85rem 2rem",
              }}
            >
              <PlayButton width={22} height={22} className={styles.playIcon} />
              {continueWatchingItem ? "Reanudar" : "Ver ahora"}
            </Button>
          </div>
          <div ref={favRef} tabIndex={0} className={favFocused ? styles.focused : undefined}>
            <Button
              variant="primary"
              onClick={handleFavorite}
              className={styles.favBtn}
              style={{ backgroundColor: isFavorited ? "var(--foc-secondary)" : "black", borderColor: isFavorited ? "transparent" : "white" }}
            >
              {isFavorited ? <HeartIcon filled size={24} /> : "+"}
            </Button>
          </div>
        </div>
        {continueWatchingItem && <ProgressBar duration={continueWatchingItem.duration} time={continueWatchingItem.time} />}
      </div>
    </div>
  );
}

export default InfoBanner;
