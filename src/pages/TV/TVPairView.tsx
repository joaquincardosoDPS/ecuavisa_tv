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
          className={styles.codeInput}
          style={{ opacity: (status === "loading" || status === "success") ? 0.5 : 1 }}
        />
        {message && (
          <div className={styles.message} style={{ color: status === "success" ? "#4ade80" : status === "error" ? "#f87171" : "rgba(var(--clr-primary-title-rgb), 0.5)" }}>
            {message}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={status === "loading" || status === "success"}
          className={styles.submitBtn}
          style={{ cursor: (status === "loading" || status === "success") ? "not-allowed" : "pointer", opacity: (status === "loading" || status === "success") ? 0.5 : 1 }}
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
