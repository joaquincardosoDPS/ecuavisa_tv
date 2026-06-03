import { memo, useCallback } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { Button } from "@/components/ui/Button";
import type { Chapter } from "@/components/VideoPlayer/types";
import styles from "./EndOfEpisodeScreen.module.css";

interface EndOfEpisodeScreenProps {
  /** Imagen de fondo del programa */
  backgroundImage?: string;
  /** Episodio siguiente (null si no hay) */
  nextEpisode: Chapter | null;
  /** Título del programa (fallback si no hay next episode) */
  programTitle?: string;
  /** Segundos restantes para auto-navegación */
  countdown: number;
  /** Callback al seleccionar "Siguiente episodio" */
  onNextEpisode?: (episode: Chapter) => void;
  /** Callback al presionar "Listado de episodios" / volver */
  onBack?: () => void;
  /** Callback al hacer click/enter sobre el video PiP para cancelar la transición */
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
  // Focus wrapper para el video PiP (REGLA F6.1 / F6.2)
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

  return (
    <div className={styles.container}>
      {/* Background con imagen del programa */}
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

      {/* Info del siguiente episodio */}
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
              focusKey="PIP-BTN-NEXT"
              variant="primary"
              showArrow
              onPress={handleNextSelect}
              onArrowPress={(dir) => {
                if (dir === "right") {
                  setTimeout(() => setFocus("PIP-BTN-EPISODES"), 0);
                  return false;
                }
                if (dir === "up" || dir === "down" || dir === "left")
                  return false;
                return true;
              }}
            >
              Siguiente episodio en{" "}
              <span className={styles.countdownNumber}>{countdown}</span>s
            </Button>
          )}
          <Button
            focusKey="PIP-BTN-EPISODES"
            variant="tertiary"
            onPress={() => {
              if (onBack) onBack();
            }}
            onArrowPress={(dir) => {
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
