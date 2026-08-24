import type { Program } from "@/interfaces/catalog.interface";
import { useNavigate } from "react-router-dom";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import RestrictionBadge from "@/components/ui/RestrictionBadge";
import { isContentRestricted } from "@/utils/restriction";
import styles from "./ProgramCard.module.css";

function AlternativeCard({ program, index, onFocus }: { program: Program; index?: number; onFocus?: () => void }) {
    const navigate = useNavigate();
    const imageSrc = program?.image_land?.small;

    const { ref, focused } = useCarouselFocus({
        focusKey: `program-grid-item-${index ?? program.id}`,
        onEnterPress: () => navigate(`/programas/${program.key}`),
        onFocus,
    });

    return (
        <div className={styles.cardWrapper}>
            <div
                ref={ref}
                className={`${[styles.cardImg, styles.cardImgHorizontal].join(" ")} ${styles.fullWidthCard} ${focused ? styles.focused : ""}`}
                onClick={() => navigate(`/programas/${program.key}`)}
            >
                {imageSrc ? (
                    <img src={imageSrc} alt={program.title} draggable={false} loading="lazy" />
                ) : (
                    <div className={styles.cardImgFallback}>
                        <span className={styles.cardImgFallbackText}>{program.title}</span>
                    </div>
                )}
                <RestrictionBadge show={isContentRestricted(program.restriction)} />
            </div>
            <div className={styles.cardMeta}>
                <p className={styles.cardTitle}>{program.title}</p>
            </div>
        </div>
    );
}

export default AlternativeCard;
