import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/features/auth/authStore";
import iconoVisible from "@/assets/img/icons/iconos-visible.svg";
import iconoOculto from "@/assets/img/icons/iconos-oculto.svg";
import styles from "./Auth.module.css";
import { useConfigStore } from "@/features/config/useConfigStore";
import fallbackLogo from "@/assets/img/logo.svg";

function LoginView() {
  const navigate = useNavigate();
  const location = useLocation();
  const logo = useConfigStore((s) => s.config?.logo) || fallbackLogo;
  const from = (location.state as { from?: string })?.from || "/perfiles";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Ingresa tus credenciales");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const response = await authService.login({ email, password });
      if (response.status === "error") {
        setError(response.msj || "Credenciales incorrectas.");
        return;
      }
      const token = response.user!.token;
      useAuthStore.getState().login(token, response.user);
      navigate("/seleccionar-perfil", { state: { from }, replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.msj || "Error de conexión. Intenta de nuevo.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLabelClass = (name: "email" | "password", value: string) => {
    if (focusedInput === name) return [styles.label, styles.labelFocus].join(" ");
    if (value) return [styles.label, styles.labelValue].join(" ");
    return [styles.label, styles.labelNormal].join(" ");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <img src={logo} alt="Logo" className={styles.logo} onClick={() => navigate("/")} />
        </div>
        <h1 className={styles.title}>Iniciar sesión</h1>
        {error && <p className={`${styles.errorMsg} ${styles.submitErrorText}`}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={getLabelClass("email", email)} htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedInput("email")} onBlur={() => setFocusedInput(null)} className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <label className={getLabelClass("password", password)} htmlFor="password">Contraseña</label>
            <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocusedInput("password")} onBlur={() => setFocusedInput(null)} className={`${styles.input} ${styles.passwordInputPadding}`} required />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
              <img src={showPassword ? iconoVisible : iconoOculto} alt="Toggle" className={styles.eyeIcon} />
            </button>
          </div>
          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>{isSubmitting ? "Ingresando..." : "Ingresar"}</button>
        </form>
        <p className={styles.linkWrap}>
          ¿No tienes una cuenta? <span className={styles.link} onClick={() => navigate("/auth/register", { state: { from } })}>Regístrate aquí</span>
        </p>
      </div>
    </div>
  );
}
export default LoginView;
