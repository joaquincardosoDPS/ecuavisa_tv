import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "@/hooks/auth/useRegisterForm";
import RegisterComplete from "./components/RegisterComplete";
import iconoVisible from "@/assets/img/icons/iconos-visible.svg";
import iconoOculto from "@/assets/img/icons/iconos-oculto.svg";
import styles from "./Auth.module.css";

function RegisterView() {
  const navigate = useNavigate();
  const {
    STEPS,
    step,
    formData,
    setFieldValue,
    errors,
    isSubmitting,
    submitError,
    showPassword,
    togglePassword,
    acceptTerms,
    setAcceptTerms,
    logo,
    from,
    termsUrl,
    inputRefs,
    goNext,
    goPrev,
    handleKeyDown,
    getSlideClass,
    isAnimating,
    registrationComplete,
  } = useRegisterForm();

  if (registrationComplete) return <RegisterComplete />;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <img src={logo} alt="Logo" className={styles.logo} onClick={() => navigate("/")} />
        </div>

        <div className={styles.stepWrap}>
          {step > 0 && (
            <button type="button" onClick={goPrev} disabled={isSubmitting || isAnimating} className={styles.backBtn}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <p className={styles.stepText}>Paso {step + 1} de {STEPS.length}</p>
        </div>

        {submitError && <p className={`${styles.errorMsg} ${styles.submitErrorText}`}>{submitError}</p>}

        <div className={styles.slidesWrap}>
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`register-slide ${getSlideClass(i)}`}
              style={i === step && !isAnimating ? { position: "relative", width: "100%" } : { position: "absolute", top: 0, left: 0, width: "100%" }}
            >
              <h2 className={styles.stepTitle}>{s.label}</h2>
              <div className={styles.inputWrapper}>
                <input
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type={s.id === "password" ? (showPassword ? "text" : "password") : s.type}
                  placeholder={s.placeholder}
                  value={formData[s.id]}
                  onChange={(e) => setFieldValue(s.id, e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={[styles.input, errors[s.id] ? styles.inputError : ""].join(" ")}
                  style={s.id === "password" ? { paddingRight: "3.5rem" } : {}}
                  autoComplete={s.type === "password" ? "new-password" : s.id}
                />
                {s.id === "password" && (
                  <button type="button" onClick={togglePassword} className={styles.eyeBtn} tabIndex={-1}>
                    <img src={showPassword ? iconoVisible : iconoOculto} alt="Toggle" className={styles.eyeIcon} />
                  </button>
                )}
              </div>
              <div className={styles.errorMsg} style={{ opacity: errors[s.id] ? 1 : 0, height: errors[s.id] ? "1.25rem" : 0, transition: "all 0.2s" }}>
                {errors[s.id]}
              </div>
            </div>
          ))}
        </div>

        {step === STEPS.length - 1 && (
          <label className={styles.checkboxWrap}>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>
              Acepto los <a href={termsUrl} target="_blank" rel="noopener noreferrer" className={styles.link} onClick={(e) => e.stopPropagation()}>Términos, Condiciones y Políticas de Privacidad</a>
            </span>
          </label>
        )}

        <button type="button" onClick={goNext} disabled={isSubmitting} className={`${styles.submitBtn} ${styles.registerSubmitBtn}`}>
          {isSubmitting ? "Creando cuenta..." : step < STEPS.length - 1 ? "Continuar" : "Crear cuenta"}
        </button>

        <p className={styles.linkWrap}>
          ¿Ya tienes cuenta? <span className={styles.link} onClick={() => navigate("/auth/login", { state: { from } })}>Inicia sesión</span>
        </p>
      </div>
      <style>{`
        .register-slide { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .register-slide-active { transform: translateX(0); opacity: 1; }
        .register-slide-exit-left { transform: translateX(-110%); opacity: 0; }
        .register-slide-exit-right { transform: translateX(110%); opacity: 0; }
        .register-slide-enter-right { transform: translateX(0); opacity: 1; animation: slideFromRight 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .register-slide-enter-left { transform: translateX(0); opacity: 1; animation: slideFromLeft 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .register-slide-hidden { transform: translateX(110%); opacity: 0; pointer-events: none; position: absolute; }
        @keyframes slideFromRight { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideFromLeft { from { transform: translateX(-110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

export default RegisterView;
