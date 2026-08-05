import type { Program } from "@/interfaces/catalog.interface";
import { useNavigate } from "react-router-dom";
import styles from "./ProgramCard.module.css";

function AlternativeCard({ program }: { program: Program }) {
    const navigate = useNavigate();
    const imageSrc = program?.image_land?.small;

    return (
        <div className={styles.cardWrapper}>
            <div
                tabIndex={0}
                className={`${[styles.cardImg, styles.cardImgHorizontal].join(" ")} ${styles.fullWidthCard}`}
                onClick={() => navigate(`/programas/${program.key}`)}
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
