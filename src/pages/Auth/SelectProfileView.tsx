import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FocusContext, setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useProfilesList } from "@/hooks/profiles/useProfilesList";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { useAuthStore } from "@/features/auth/authStore";
import iconEdit from "@/assets/img/icons/iconos-edit.svg";
import Button from "@/components/ui/Button";
import type { Profile } from "@/interfaces/profile.interface";
import styles from "./SelectProfileView.module.css";

interface ProfileSelectButtonProps {
  profile: Profile;
  avatarUrl: string | null;
  isEditing: boolean;
  onSelect: () => void;
}

function ProfileSelectButton({ profile, avatarUrl, isEditing, onSelect }: ProfileSelectButtonProps) {
  const initial = profile.name_perfil ? profile.name_perfil.charAt(0).toUpperCase() : "?";
  const { ref, focused } = useSpatialFocus({
    focusKey: `profile-select-${profile.id}`,
    onEnterPress: onSelect,
  });

  return (
    <button
      ref={ref}
      onClick={onSelect}
      className={[styles.profileBtn, focused ? styles.focused : ""].join(" ")}
    >
      <div className={styles.avatarWrap}>
        <div className={styles.avatarCircle}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={profile.name_perfil} className={styles.avatarImg} />
          ) : (
            <span className={styles.avatarInitial}>{initial}</span>
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
}

function AddProfileButton({ onCreate }: { onCreate: () => void }) {
  const { ref, focused } = useSpatialFocus({
    focusKey: "profile-add",
    onEnterPress: onCreate,
  });

  return (
    <button ref={ref} onClick={onCreate} className={[styles.addBtn, focused ? styles.focused : ""].join(" ")}>
      <div className={styles.addCircle}>
        <span className={styles.addPlus}>+</span>
      </div>
      <span className={styles.addLabel}>Agregar perfil</span>
    </button>
  );
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  const { ref, focused } = useSpatialFocus({
    focusKey: "profile-logout",
    onEnterPress: onLogout,
  });

  return (
    <Button variant="secondary" ref={ref} focused={focused} onClick={onLogout}>
      Cerrar sesion
    </Button>
  );
}

function EditToggleButton({ editing, onToggle }: { editing: boolean; onToggle: () => void }) {
  const { ref, focused } = useSpatialFocus({
    focusKey: "profile-edit-toggle",
    onEnterPress: onToggle,
  });

  return (
    <button
      type="button"
      ref={ref}
      onClick={onToggle}
      className={[styles.editToggle, focused ? styles.focused : ""].join(" ")}
    >
      {editing ? "Listo" : "Editar perfiles"}
    </button>
  );
}

function SelectProfileView() {
  const { profiles, isLoading, isError, error, getAvatarUrl, isEditing, toggleEditing } = useProfilesList();
  const setActiveProfile = useAuthStore((s) => s.setActiveProfile);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  // Zona de foco de la página (pantalla standalone, sin MainLayout).
  const { ref: pageRef, focusKey: pageFocusKey } = useFocusable({
    focusKey: "zone-select-profile",
    saveLastFocusedChild: true,
    autoRestoreFocus: true,
  });

  const handleSelect = (profile: Profile) => {
    if (isEditing) {
      navigate(`/mi-ecuavisa/perfiles/${profile.id}`);
    } else {
      setActiveProfile(profile);
      navigate("/", { replace: true });
    }
  };

  const firstProfileId = profiles?.[0]?.id;
  const showAdd = (profiles?.length ?? 0) < 4;

  // Foco inicial: primer perfil, o "Agregar" si no hay, o cerrar sesión como último recurso.
  useEffect(() => {
    if (isLoading) return;
    const target = firstProfileId
      ? `profile-select-${firstProfileId}`
      : showAdd
        ? "profile-add"
        : "profile-logout";
    const timer = setTimeout(() => setFocus(target), 80);
    return () => clearTimeout(timer);
  }, [isLoading, firstProfileId, showAdd]);

  return (
    <FocusContext.Provider value={pageFocusKey}>
      <div ref={pageRef} className={styles.page}>
        <EditToggleButton editing={isEditing} onToggle={toggleEditing} />
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
              {profiles?.map((profile) => (
                <ProfileSelectButton
                  key={profile.id}
                  profile={profile}
                  avatarUrl={getAvatarUrl(profile)}
                  isEditing={isEditing}
                  onSelect={() => handleSelect(profile)}
                />
              ))}

              {showAdd && <AddProfileButton onCreate={() => navigate("/mi-ecuavisa/perfiles/nuevo")} />}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <LogoutButton onLogout={() => logout()} />
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default SelectProfileView;
