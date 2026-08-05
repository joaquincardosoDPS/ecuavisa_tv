import { useNavigate } from "react-router-dom";
import { useProfilesList } from "@/hooks/profiles/useProfilesList";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { useAuthStore } from "@/features/auth/authStore";
import iconEdit from "@/assets/img/icons/iconos-edit.svg";
import Button from "@/components/ui/Button";
import type { Profile } from "@/interfaces/profile.interface";
import styles from "./SelectProfileView.module.css";

function SelectProfileView() {
  const { profiles, isLoading, isError, error, getAvatarUrl, isEditing } = useProfilesList();
  const setActiveProfile = useAuthStore((s) => s.setActiveProfile);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleSelect = (profile: Profile) => {
    if (isEditing) {
      navigate(`/mi-ecuavisa/perfiles/${profile.id}`);
    } else {
      setActiveProfile(profile);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <p className={styles.title}>Quien esta ahi?</p>
      </div>
      <div className={styles.body}>
        {isLoading ? (
          <FullScreenSpinner />
        ) : isError ? (
          <p className={styles.error}>
            {error instanceof Error ? error.message : "Error al cargar perfiles."}
          </p>
        ) : (
          <div className={styles.grid}>
            {profiles?.map((profile) => {
              const avatarUrl = getAvatarUrl(profile);
              return (
                <button
                  key={profile.id}
                  onClick={() => handleSelect(profile)}
                  className={styles.profileBtn}
                >
                  <div className={styles.avatarWrap}>
                    <div className={styles.avatarCircle}>
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={profile.name_perfil} className={styles.avatarImg} />
                      ) : (
                        <span className={styles.avatarInitial}>
                          {profile.name_perfil.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    {isEditing && (
                      <div className={styles.editBadge}>
                        <img src={iconEdit} alt="Editar" className={styles.editBadgeImg} />
                      </div>
                    )}
                  </div>
                  <span className={styles.profileName}>{profile.name_perfil}</span>
                </button>
              );
            })}

            {(profiles?.length ?? 0) < 4 && (
              <button
                onClick={() => navigate("/mi-ecuavisa/perfiles/nuevo")}
                className={styles.addBtn}
              >
                <div className={styles.addCircle}>
                  <span className={styles.addPlus}>+</span>
                </div>
                <span className={styles.addLabel}>Agregar perfil</span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => logout()}>Cerrar sesion</Button>
      </div>
    </div>
  );
}

export default SelectProfileView;
