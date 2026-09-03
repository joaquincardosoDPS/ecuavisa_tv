import { useEffect } from "react";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { isInputAction } from "@/utils/keyCodes";
import { formatDuration } from "@/utils/formatDuration";
import type { ProgramChapter } from "../types";
import styles from "./ChaptersPanel.module.css";

interface ChaptersPanelProps {
  episodes: ProgramChapter[];
  currentEpisodeKey?: string;
  visible: boolean;
  onClose: () => void;
  onEpisodeSelect: (episode: ProgramChapter) => void;
}

interface ChapterItemProps {
  episode: ProgramChapter;
  isCurrent: boolean;
  focusKey: string;
  leftKey?: string;
  rightKey?: string;
  onSelect: (episode: ProgramChapter) => void;
  onClose: () => void;
}

function ChapterItem({ episode, isCurrent, focusKey, leftKey, rightKey, onSelect, onClose }: ChapterItemProps) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: () => onSelect(episode),
    onArrowPress: (direction) => {
      if (direction === "left" && leftKey) {
        setFocus(leftKey);
        return false;
      }
      if (direction === "right" && rightKey) {
        setFocus(rightKey);
        return false;
      }
      if (direction === "up" || direction === "down") {
        onClose();
        return false;
      }
      return false;
    },
  });

  useEffect(() => {
    if (focused && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [focused, ref]);

  return (
    <div
      ref={ref}
      onClick={() => onSelect(episode)}
      className={`${styles.card} ${isCurrent ? styles.current : ""} ${focused ? styles.focused : ""}`}
    >
      <div className={styles.imageWrap}>
        {episode.image && (
          <img src={episode.image} alt={episode.title} loading="lazy" className={styles.thumbnail} />
        )}
        {isCurrent && (
          <span className={styles.playingBadge}>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
              <path d="M0 0L10 6L0 12V0Z" />
            </svg>
            Reproduciendo
          </span>
        )}
      </div>
      {episode.duration && <p className={styles.durationText}>{formatDuration(episode.duration)}</p>}
      <p className={styles.episodeTitle}>{episode.title}</p>
    </div>
  );
}

function ChaptersPanel({ episodes, currentEpisodeKey, visible, onClose, onEpisodeSelect }: ChaptersPanelProps) {
  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInputAction(e, "Back")) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [visible, onClose]);

  useEffect(() => {
    if (!visible) return;

    const current = episodes.find((e) => e.key === currentEpisodeKey) ?? episodes[0];
    const t = setTimeout(() => {
      if (current) {
        try {
          setFocus(`PLAYER-EPISODE-${current.key}`);
        } catch {
          // el item puede no estar registrado aún
        }
      }
    }, 120);
    return () => clearTimeout(t);
  }, [visible, episodes, currentEpisodeKey]);

  if (!visible) return null;

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Capítulos</h2>
      <div className={styles.row}>
        {episodes.map((episode, index) => (
          <ChapterItem
            key={`${episode.key}-${index}`}
            episode={episode}
            isCurrent={episode.key === currentEpisodeKey}
            focusKey={`PLAYER-EPISODE-${episode.key}`}
            leftKey={index > 0 ? `PLAYER-EPISODE-${episodes[index - 1].key}` : undefined}
            rightKey={index < episodes.length - 1 ? `PLAYER-EPISODE-${episodes[index + 1].key}` : undefined}
            onSelect={onEpisodeSelect}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}

export default ChaptersPanel;
