import { useNavigate } from "react-router-dom";
import { useTVPairing } from "@/hooks/tv/useTVPairing";
import styles from "./TVPairView.module.css";

function TVPairView() {
  const navigate = useNavigate();
  const { code, setCode, status, message, handleSubmit, handleKeyDown, inputRef, logo, isMobile } = useTVPairing();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Logo" onClick={() => navigate("/")} className={styles.logoImage} />
        </div>
        <h1 className={styles.pairTitle}>Vincular TV</h1>
        <p className={styles.pairDescription}>
          Ingresa el código que aparece en la pantalla de tu televisor.
        </p>
        <input
          ref={inputRef}
          type="text"
          placeholder="Ej: A3B7X9"
          maxLength={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={status === "loading" || status === "success"}
          style={{ width: "100%", textAlign: "center", fontSize: "1.5rem", fontFamily: "monospace", letterSpacing: "0.5em", outline: "none", backgroundColor: "var(--clr-secondary)", borderRadius: "0.375rem", padding: "1rem 1.25rem", color: "var(--clr-primary-title)", border: "2px solid color-mix(in srgb, var(--clr-primary-title) 10%, transparent)", opacity: (status === "loading" || status === "success") ? 0.5 : 1 }}
        />
        {message && (
          <div style={{ marginTop: "1rem", fontSize: "0.875rem", textAlign: "center", color: status === "success" ? "#4ade80" : status === "error" ? "#f87171" : "color-mix(in srgb, var(--clr-primary-title) 50%, transparent)" }}>
            {message}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={status === "loading" || status === "success"}
          style={{ width: "100%", marginTop: "1.5rem", padding: "0.875rem", fontSize: "1rem", fontWeight: "bold", borderRadius: "0.375rem", backgroundColor: "var(--clr-secondary-button)", color: "var(--clr-text-primary-button)", border: "none", cursor: (status === "loading" || status === "success") ? "not-allowed" : "pointer", opacity: (status === "loading" || status === "success") ? 0.5 : 1 }}
        >
          {status === "loading" ? "Vinculando..." : status === "success" ? "¡Vinculado!" : "Vincular dispositivo"}
        </button>
        {!isMobile && (
          <p className={styles.backLinkWrapper}>
            <span onClick={() => navigate("/")} className={styles.backLink}>← Volver al inicio</span>
          </p>
        )}
      </div>
    </div>
  );
}
export default TVPairView;
