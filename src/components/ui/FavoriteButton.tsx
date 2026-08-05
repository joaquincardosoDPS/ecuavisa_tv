import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
    isFavorited: boolean;
    isToggling: boolean;
    onClick: () => void;
}

function FavoriteButton({ isFavorited, isToggling, onClick }: FavoriteButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={isToggling}
            className={[styles.btn, isFavorited ? styles.favorited : styles.unfavorited].join(" ")}
            aria-label={isFavorited ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
        >
            {isFavorited ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                    <path d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                    <path d="M12 4v16m8-8H4" />
                </svg>
            )}
        </button>
    );
}

export default FavoriteButton;
