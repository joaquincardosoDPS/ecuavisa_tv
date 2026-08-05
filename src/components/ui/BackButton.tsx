import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

export function BackButton({ fallback = "/" }: { fallback?: string }) {
	const navigate = useNavigate();

	const handleBack = () => {
		if (window.history.state && window.history.state.idx > 0) {
			navigate(-1);
		} else {
			navigate(fallback, { replace: true });
		}
	};

	return (
		<button className={styles.btn} onClick={handleBack}>
			<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
				<polyline points="15 18 9 12 15 6" />
			</svg>
			<h2 className={styles.label}>Volver</h2>
		</button>
	);
}
