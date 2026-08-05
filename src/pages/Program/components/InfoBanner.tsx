import Button from "@/components/ui/Button";
import type { Chapter, Program } from "@/interfaces/catalog.interface";
import { useFavorite } from "@/hooks/mylist/useFavorite";
import ProgressBar from "@/components/ui/ProgressBar";
import { useContinueWatching } from "@/hooks/program/useContinueWatching";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import HeartIcon from "@/components/icons/HeartIcon";
import styles from "../Program.module.css";

interface InfoBannerProps {
  program: Program;
  firstChapter?: Chapter | null;
}

function InfoBanner({ program, firstChapter }: InfoBannerProps) {
  const navigate = useNavigate();
  const { isFavorited, isEnabled, toggleFavorite } = useFavorite(program.key);
  const { item: continueWatchingItem } = useContinueWatching(program.key);
  const firstSegment = program.segments?.[0];

  const handlePlay = () => {
    if (continueWatchingItem) {
      navigate(`/play/${program.key}/${continueWatchingItem.key_segment}/${continueWatchingItem.season}/${continueWatchingItem.chapter}`, { state: { resumeTime: continueWatchingItem.time } });
    } else if (firstSegment && firstChapter) {
      navigate(`/play/${program.key}/${firstSegment.key}/${firstChapter.season}/${firstChapter.chapter}`);
    }
  };

  const logoImg = program?.image_logo?.big;

  return (
    <div className={styles.infoWrap}>
      <BackButton />
      <div>
        <div className={styles.logoBox}>
          {logoImg && <img src={logoImg} alt={program.title} className={styles.logoImg} />}
        </div>
        <h2 className={styles.programTitle}>{program.title}</h2>
        <p className={styles.programDesc}>{program.description_short}</p>
        <div className={styles.actionsRow}>
          <Button variant="primary" showArrow onClick={handlePlay} className="uppercase">
            {continueWatchingItem ? "Reanudar" : "Ver ahora"}
          </Button>
          {isEnabled && (
            <Button
              variant="primary"
              onClick={toggleFavorite}
              className={styles.favBtn}
              style={{ backgroundColor: isFavorited ? "var(--foc-secondary)" : "black", borderColor: isFavorited ? "transparent" : "white" }}
            >
              {isFavorited ? <HeartIcon filled size={24} /> : "+"}
            </Button>
          )}
        </div>
        {continueWatchingItem && <ProgressBar duration={continueWatchingItem.duration} time={continueWatchingItem.time} />}
      </div>
    </div>
  );
}

export default InfoBanner;
