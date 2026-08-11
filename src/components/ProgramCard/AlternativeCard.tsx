import type { Program } from "@/interfaces/catalog.interface";
import { useNavigate } from "react-router-dom";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import styles from "./ProgramCard.module.css";

function AlternativeCard({ program }: { program: Program }) {
    const navigate = useNavigate();
    const imageSrc = program?.image_land?.small;

    const handleClick = () => navigate(`/programas/${program.key}`);

    const { ref, focused } = useSpatialFocus({
        focusKey: `program-card-${program.key}`,
        onEnterPress: handleClick,
    });

    return (
        <div className={styles.cardWrapper}>
            <div
                ref={ref}
                tabIndex={0}
                className={`${[styles.cardImg, styles.cardImgHorizontal].join(" ")} ${styles.fullWidthCard} ${focused ? styles.focused : ""}`}
                onClick={handleClick}
            >
                {imageSrc ? (
                    <img src={imageSrc} alt={program.title} draggable={false} loading="lazy" />
                ) : (
                    <div className={styles.cardImgFallback}>
                        <span className={styles.cardImgFallbackText}>{program.title}</span>
                    </div>
                )}
            </div>
            <div className={styles.cardMeta}>
                <p className={styles.cardTitle}>{program.title}</p>
            </div>
        </div>
    );
}

export default AlternativeCard;
