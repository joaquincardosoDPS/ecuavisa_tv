import { memo, useCallback } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Button from "@/components/ui/Button";
import type { Chapter } from "@/components/VideoPlayer/types";
import styles from "./EndOfEpisodeScreen.module.css";

interface EndOfEpisodeScreenProps {
  backgroundImage?: string;
  nextEpisode: Chapter | null;
  programTitle?: string;
  countdown: number;
  onNextEpisode?: (episode: Chapter) => void;
  onBack?: () => void;
  onCancelTransition?: () => void;
}

/**
 * Pantalla de fin de episodio: background con info del siguiente capítulo.
 * Se renderiza como overlay mientras el VideoPlayer se muestra en modo PiP.
 */
const EndOfEpisodeScreenComponent = ({
  backgroundImage,
  nextEpisode,
  programTitle,
  countdown,
  onNextEpisode,
  onBack,
  onCancelTransition,
}: EndOfEpisodeScreenProps) => {
  const { ref: pipVideoRef, focused: pipVideoFocused } = useFocusable({
    focusKey: "PIP-VIDEO",
    onEnterPress: () => {
      if (onCancelTransition) onCancelTransition();
    },
    onArrowPress: (dir) => {
      if (dir === "left") {
        setTimeout(() => setFocus("PIP-BTN-EPISODES"), 0);
        return false;
      }
      if (dir === "up" || dir === "down" || dir === "right") return false;
      return true;
    },
  });

  const handleNextSelect = useCallback(() => {
    if (nextEpisode && onNextEpisode) {
      onNextEpisode(nextEpisode);
    }
  }, [nextEpisode, onNextEpisode]);

  const nextBtnRef = useFocusable({
    focusKey: "PIP-BTN-NEXT",
    onEnterPress: handleNextSelect,
    onArrowPress: (dir) => {
      if (dir === "right") {
        setTimeout(() => setFocus("PIP-BTN-EPISODES"), 0);
        return false;
      }
      if (dir === "up" || dir === "down" || dir === "left") return false;
      return true;
    },
  });

  const episodesBtnRef = useFocusable({
    focusKey: "PIP-BTN-EPISODES",
    onEnterPress: () => {
      if (onBack) onBack();
    },
    onArrowPress: (dir) => {
      if (dir === "left" && nextEpisode) {
        setTimeout(() => setFocus("PIP-BTN-NEXT"), 0);
        return false;
      }
      if (dir === "right") {
        setTimeout(() => setFocus("PIP-VIDEO"), 0);
        return false;
      }
      if (dir === "up" || dir === "down") return false;
      return true;
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            className={styles.backgroundImage}
          />
        )}
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.info}>
        <h1 className={styles.programTitle}>
          {nextEpisode?.title || programTitle}
        </h1>
        {nextEpisode?.description && (
          <p className={styles.description}>{nextEpisode.description}</p>
        )}
        <div className={styles.buttons}>
          {nextEpisode && (
            <Button
              ref={nextBtnRef.ref}
              variant="primary"
              showArrow
              focused={nextBtnRef.focused}
              onClick={handleNextSelect}
            >
              Siguiente episodio en{" "}
              <span className={styles.countdownNumber}>{countdown}</span>s
            </Button>
          )}
          <Button
            ref={episodesBtnRef.ref}
            variant="tertiary"
            focused={episodesBtnRef.focused}
            onClick={() => {
              if (onBack) onBack();
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: "0.5vw" }}
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Listado de episodios
          </Button>
        </div>
      </div>

      <div
        ref={pipVideoRef}
        className={`${styles.pipVideoWrapper} ${pipVideoFocused ? styles.focused : ""}`}
        onClick={() => {
          if (onCancelTransition) onCancelTransition();
        }}
      />
    </div>
  );
};

export const EndOfEpisodeScreen = memo(EndOfEpisodeScreenComponent);
