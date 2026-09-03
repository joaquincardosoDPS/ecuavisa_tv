import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import type { Chapter } from "@/interfaces/catalog.interface";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useAuthStore } from "@/features/auth/authStore";
import { unlockTokenService, type ProtectedToken } from "@/services/unlockTokenService";
import RestrictionOverlay from "@/components/ui/RestrictionOverlay";
import RestrictionModal from "@/components/ui/RestrictionModal";
import { isContentRestricted } from "@/utils/restriction";
import styles from "./ChapterCard.module.css";

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
  programKey: string;
  showChapter?: boolean;
  playbackTime?: number;
  isFinished?: boolean;
  /** Badge de tipo de contenido, ej: "Serie". */
  badge?: string;
  /** Si es la primera fila de la grilla: al enfocarla, la vista se alinea con la posición del tab. */
  isFirstRow?: boolean;
  /** Restricción del programa: si el programa está restringido, todos sus capítulos se bloquean. */
  programRestriction?: string | number | null;
  /** Si el usuario ya compró el programa (PPV), el contenido se desbloquea. */
  isPurchased?: boolean;
}

function getProgress(playbackTime: number, durationSeg: number): number {
  if (durationSeg <= 0 || playbackTime <= 0) return 0;
  return Math.min(100, (playbackTime / durationSeg) * 100);
}

function ChapterCard({ chapter, programKey, showChapter = true, playbackTime = 0, isFinished = false, isFirstRow = false, badge, programRestriction, isPurchased = false }: ChapterCardProps) {
  const navigate = useNavigate();
  const authToken = useAuthStore((s) => s.token);
  const subscriptionActive = Boolean(useAuthStore((s) => s.user)?.subscription_active);
  const imageSrc = chapter.image_land.small;
  const [showRestrictionModal, setShowRestrictionModal] = useState(false);

  const chapterFocusKey = `chapter-${programKey}-${chapter.key_segment}-${chapter.season}-${chapter.chapter}`;
  const isRestricted =
    !isPurchased &&
    (isContentRestricted(chapter.restriction) || isContentRestricted(programRestriction));

  const playUrl = `/play/${programKey}/${chapter.key_segment}/${chapter.season}/${chapter.chapter}`;

  const navigateToPlay = (protectedToken?: ProtectedToken) => {
    const state: { resumeTime?: number; protectedToken?: ProtectedToken } = {};
    if (playbackTime > 0 && !isFinished) state.resumeTime = playbackTime;
    if (protectedToken) state.protectedToken = protectedToken;
    const hasState = Object.keys(state).length > 0;
    navigate(playUrl, hasState ? { state } : undefined);
  };

  const handleClick = async () => {
    if (!isRestricted) {
      navigateToPlay();
      return;
    }

    // Sin suscripción activa: el contenido de pago solo muestra el modal de compra.
    if (!subscriptionActive) {
      setShowRestrictionModal(true);
      return;
    }

    // Con suscripción activa: intentar desbloquear con unlock_token para reproducirlo.
    try {
      if (!authToken) {
        setShowRestrictionModal(true);
        return;
      }
      const res = await unlockTokenService.get({ token: authToken, keyVideo: chapter.key });
      const tok = res.data;
      if (
        tok &&
        typeof tok.st === "string" &&
        typeof tok.ts === "number" &&
        typeof tok.e === "number"
      ) {
        navigateToPlay({ st: tok.st, ts: tok.ts, e: tok.e });
        return;
      }
    } catch {
      // Sin conexión: mantener el bloqueo
    }
    setShowRestrictionModal(true);
  };

  const closeRestrictionModal = () => {
    setShowRestrictionModal(false);
    // Devolver el foco al card al cerrar el modal
    setTimeout(() => setFocus(chapterFocusKey), 50);
  };

  const progress = isFinished ? 100 : getProgress(playbackTime, chapter.duration_seg);
  const hasProgress = progress > 0;

  const { ref, focused } = useSpatialFocus({
    focusKey: chapterFocusKey,
    onEnterPress: handleClick,
    // Primera fila: al enfocarla (subiendo o bajando) la vista se posiciona
    // como si el foco estuviera en el tab. El ancla es el BOTÓN del tab
    // (misma referencia que usa el tab con position:'top'), no el contenedor.
    scrollAnchorSelector: isFirstRow ? "[data-tabs-anchor] button" : undefined,
  });

  return (
    <div ref={ref} onClick={handleClick} className={[styles.cardContainer, focused ? styles.focused : ""].join(" ")}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={chapter.title} loading="lazy" className={styles.thumbnailImage} />
        <RestrictionOverlay show={isRestricted} />
        {hasProgress && (
          <div className={styles.progressBarContainer}>
            <div style={{ height: "100%", backgroundColor: "var(--foc-primary)", transition: "all 0.3s", width: `${progress}%` }} />
          </div>
        )}
      </div>
      <div className={styles.textContainer}>
        {badge && <span className={styles.badge}>{badge}</span>}
        {showChapter ? (
          <>
            <h1 className={styles.titleText}>{chapter.title}</h1>
            <p className={styles.chapterMeta}>Temporada {chapter.season} - Capítulo {chapter.chapter}</p>
          </>
        ) : (
          <div className={styles.infoContainer}>
            {/*<p className={styles.durationText}>{formatDuration(chapter.duration_seg)}</p>*/}
            <h4 className={styles.titleText}>{chapter.title}</h4>
            
            {/*<p className={styles.descriptionText}>{chapter.description}</p>*/}
            
          </div>
        )}
      </div>
      <RestrictionModal isOpen={showRestrictionModal} onClose={closeRestrictionModal} />
    </div>
  );
}
export default ChapterCard;
