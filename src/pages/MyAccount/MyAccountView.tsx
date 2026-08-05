import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/authStore";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import styles from "./MyAccountView.module.css";

function MyAccountView() {
  useDocumentTitle('Mi Cuenta');
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const activeProfile = useAuthStore((s) => s.activeProfile);
  const logout = useAuthStore((s) => s.logout);

  const avatarUrl = (activeProfile?.images && !Array.isArray(activeProfile.images) ? activeProfile.images.medium || activeProfile.images.default : null) || activeProfile?.avatar;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <p className={styles.pageTitle}>Cuenta</p>
        <div className={styles.avatarWrapper}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={user?.name || "Avatar"} className={styles.avatarImage} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {user?.name?.charAt(0).toUpperCase() || "?"}
            </div>
          )}
        </div>
        <div className={styles.userInfoWrapper}>
          <p className={styles.userNameText}>{user?.name || "Usuario"}</p>
          <p>{user?.email || ""}</p>
        </div>
        <button
          onClick={handleLogout} className={styles.logoutButton}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
export default MyAccountView;
