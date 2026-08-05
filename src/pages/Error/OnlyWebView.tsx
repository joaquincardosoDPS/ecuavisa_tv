import { useConfigStore } from "@/features/config/useConfigStore";
import fallbackLogo from "@/assets/img/logo.svg";
import styles from "./OnlyWebView.module.css";

function OnlyWebView() {
  const config = useConfigStore((s) => s.config);
  const logo = config?.logo || fallbackLogo;
  const androidLink = config?.["android-link"];
  const iosLink = config?.["ios-link"];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentBox}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.iconSvg}>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
        <p className={styles.messageText}>
          Para una mejor experiencia descarga la app en App Store o Play Store.
        </p>
        <div className={styles.buttonsContainer}>
          {androidLink && <a href={androidLink} target="_blank" rel="noopener noreferrer" className={styles.playStoreLink}>Ir a Play Store</a>}
          {iosLink && <a href={iosLink} target="_blank" rel="noopener noreferrer" className={styles.appStoreLink}>Ir a App Store</a>}
        </div>
      </div>
    </div>
  );
}
export default OnlyWebView;
