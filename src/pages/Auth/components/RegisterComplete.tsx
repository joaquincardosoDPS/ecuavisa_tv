import bgPrograms from "@/assets/img/bg_login.png";
import fallbackLogo from "@/assets/img/logo.svg";
import { Spinner } from "@/components/ui/Spinner";
import { useConfigStore } from "@/features/config/useConfigStore";
import styles from "./RegisterComplete.module.css";

function RegisterComplete() {
  const logo = useConfigStore((s) => s.config?.logo) || fallbackLogo;
  return (
    <div className={styles.pageContainer}>
      <img src={bgPrograms} alt="" className={styles.backgroundImage} />
      <div className={styles.contentWrapper}>
        <img src={logo} alt="" className={styles.logoImage} />
        <h1 className={styles.successTitle}>¡Tu cuenta ha sido creada con éxito!</h1>
        <p className={styles.successMessage}>En breve podrás disfrutar nuestra aplicación</p>
        <Spinner />
      </div>
    </div>
  );
}
export default RegisterComplete;
