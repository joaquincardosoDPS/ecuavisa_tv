import { useProfilesList } from "@/hooks/profiles/useProfilesList";
import { useAuthStore } from "@/features/auth/authStore";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import iconEdit from "@/assets/img/icons/iconos-edit.svg";
import Button from "@/components/ui/Button";
import styles from "./ProfilesView.module.css";

function ProfilesView() {
  const { profiles, isLoading, error, navigate, handleProfileClick, getAvatarUrl } = useProfilesList();
  const currentProfile = useAuthStore((s) => s.activeProfile);
  const logout = useAuthStore((s) => s.logout);

  const getProfileInitial = (profile: any) => profile.name_perfil ? profile.name_perfil.charAt(0).toUpperCase() : "?";

  if (isLoading) return <FullScreenSpinner />;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.mainTitle}>¿Quién está viendo ahora?</h1>
        <div className={styles.currentProfileSection}>
          <h2 className={styles.sectionTitle}>Perfil actual</h2>
          <div className={styles.currentProfileInfo}>
            <div className={styles.currentProfileRow}>
              <span className={styles.profileLabel}>Nombre</span>
              <p className={styles.profileNameText}>{currentProfile ? currentProfile.name_perfil : "Sin seleccionar"}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className={styles.manageProfilesTitle}>Gestionar perfiles</h2>
          <div className={styles.profilesContainer}>
            {error ? (
              <p className={styles.errorText}>{error.message || "Error al cargar perfiles"}</p>
            ) : !profiles || profiles.length === 0 ? (
              <p className={styles.emptyText}>No se encontraron perfiles en esta cuenta.</p>
            ) : (
              <div className={styles.profilesGrid}>
                {profiles.map((profile) => (
                  <div key={profile.id || profile.id} className={styles.profileCard}>
                    <div onClick={() => handleProfileClick(profile)} className={styles.profileAvatarWrapper}>
                      <div className={styles.avatarImageContainer}>
                        <div className={styles.avatarBackground}>
                          {getAvatarUrl(profile) ? (
                            <img src={getAvatarUrl(profile) as string} alt={profile.name_perfil} className={styles.avatarImage} />
                          ) : (
                            <span className={styles.initialText}>{getProfileInitial(profile)}</span>
                          )}
                        </div>
                      </div>
                      <span className={styles.profileName}>{profile.name_perfil}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/perfiles/edit/${profile.id || profile.id}`); }} className={styles.editButton}>
                      <img src={iconEdit} alt="Editar" className={styles.editIcon} />
                    </button>
                  </div>
                ))}
                {profiles.length < 5 && (
                  <div onClick={() => navigate("/perfiles/new")} className={styles.addProfileCard}>
                    <div className={styles.addProfileCircle}>
                      <span className={styles.addProfilePlus}>+</span>
                    </div>
                    <span className={styles.addProfileLabel}>Agregar perfil</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.logoutContainer}>
            <Button variant="secondary" onClick={() => logout()}>Cerrar sesión</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilesView;


