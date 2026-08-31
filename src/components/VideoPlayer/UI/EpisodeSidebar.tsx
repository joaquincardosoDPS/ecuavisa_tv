import React from "react";
import type { ProgramChapter } from "../types";
import styles from "./EpisodeSidebar.module.css";

interface EpisodeSidebarProps {
  episodes: ProgramChapter[];
  currentEpisodeKey?: string;
  visible: boolean;
  onClose: () => void;
  onCloseAll: () => void;
  onEpisodeSelect: (episode: ProgramChapter) => void;
}

interface EpisodeItemProps {
  episode: ProgramChapter;
  isCurrent: boolean;
  onSelect: (episode: ProgramChapter) => void;
  onCloseAll: () => void;
  currentEpisodeKey?: string;
}

const EpisodeItemComponent = ({ episode, isCurrent, onSelect, onCloseAll, currentEpisodeKey }: EpisodeItemProps) => {

  return (
    <div
      onClick={() => {
        if (episode.key !== currentEpisodeKey) onSelect(episode);
        else onCloseAll();
      }} className={styles.episodeItem}
    >
      <span
        className={styles.episodeTitle}
        style={{
          color: isCurrent ? "#ff3c00" : "#fff",
        }}
      >
        {episode.title}
      </span>
    </div>
  );
};

const EpisodeItem = React.memo(EpisodeItemComponent);

const EpisodeSidebarComponent = ({
  episodes = [],
  currentEpisodeKey,
  visible,
  onClose,
  onCloseAll,
  onEpisodeSelect,
}: EpisodeSidebarProps) => {


  return (
    <>
      {/* Overlay Oscuro */}
      <div
        onClick={onClose}
        className={styles.overlay}
        style={{
          opacity: visible ? 1 : 0,
          visibility: visible ? "visible" : "hidden",
        }}
      />

      {/* Contenedor del Sidebar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.sidebar}
        style={{
          transform: visible ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className={styles.episodeList}>
          {episodes.map((episode, index) => (
            <EpisodeItem
              key={episode.key || index}
              episode={episode}
              isCurrent={episode.key === currentEpisodeKey}
              onSelect={onEpisodeSelect}
              onCloseAll={onCloseAll}
              currentEpisodeKey={currentEpisodeKey}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const EpisodeSidebar = React.memo(EpisodeSidebarComponent);
