import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FocusContext, setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useProfilesList } from "@/hooks/profiles/useProfilesList";
import { useAuthStore } from "@/features/auth/authStore";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import iconEdit from "@/assets/img/icons/iconos-edit.svg";
import Button from "@/components/ui/Button";
import type { Profile } from "@/interfaces/profile.interface";
import styles from "./ProfilesView.module.css";

// Primer valor no vacío entre los candidatos del user de sesión; si no hay dato, "—".
const formatField = (...values: unknown[]): string => {
  for (const v of values) {
    if (v !== undefined && v !== null && v !== "") return String(v);
  }
  return "—";
};

interface FieldItem {
  label: string;
  value: string;
}

interface ProfileCardItemProps {
  profile: Profile;
  isActive: boolean;
  avatarUrl: string | null;
  onSelect: () => void;
  onEdit: () => void;
}

function ProfileCardItem({ profile, isActive, avatarUrl, onSelect, onEdit }: ProfileCardItemProps) {
  const initial = profile.name_perfil ? profile.name_perfil.charAt(0).toUpperCase() : "?";
  const select = useSpatialFocus({
    focusKey: `account-profile-${profile.id}`,
    onEnterPress: onSelect,
  });
  const edit = useSpatialFocus({
    focusKey: `account-edit-${profile.id}`,
    onEnterPress: onEdit,
  });

  return (
    <div className={styles.profileCard}>
      <button
        type="button"
        ref={select.ref}
        className={[styles.profileSelect, isActive ? styles.profileActive : "", select.focused ? styles.profileFocused : ""].join(" ")}
        onClick={onSelect}
        aria-label={`Seleccionar perfil ${profile.name_perfil}`}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={profile.name_perfil} className={styles.avatarImage} />
        ) : (
          <span className={styles.avatarInitial}>{initial}</span>
        )}
      </button>
      <span className={[styles.profileName, isActive ? styles.profileNameActive : ""].join(" ")}>
        {profile.name_perfil}
      </span>
      <button
        type="button"
        ref={edit.ref}
        className={[styles.editButton, edit.focused ? styles.editFocused : ""].join(" ")}
        onClick={onEdit}
        aria-label={`Editar perfil ${profile.name_perfil}`}
      >
        <img src={iconEdit} alt="" className={styles.editIcon} />
      </button>
    </div>
  );
}

// Se renderiza DENTRO del FocusContext de la página para quedar en la misma
// zona que los perfiles (page-account) y ser alcanzable bajando con el D-pad.
function LogoutButton({ onLogout }: { onLogout: () => void }) {
  const { ref, focused } = useSpatialFocus({
    focusKey: "account-btn-logout",
    onEnterPress: onLogout,
    // No dejar salir la navegación hacia abajo desde Cerrar sesión.
    onArrowPress: (direction) => {
      if (direction === "down") return false;
      return true;
    },
  });

  return (
    <div className={styles.logoutRow}>
      <Button
        variant="secondary"
        ref={ref}
        focused={focused}
        className={styles.logoutButton}
        onClick={onLogout}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}

function ProfilesView() {
  const navigate = useNavigate();
  const { profiles, isLoading, error, getAvatarUrl } = useProfilesList();
  const user = useAuthStore((s) => s.user);
  const currentProfile = useAuthStore((s) => s.activeProfile);
  const setActiveProfile = useAuthStore((s) => s.setActiveProfile);
  const logout = useAuthStore((s) => s.logout);

  // Zona de foco de la página: agrupa los elementos de la cuenta.
  const { ref: pageRef, focusKey: pageFocusKey } = useFocusable({
    focusKey: "page-account",
    saveLastFocusedChild: true,
    autoRestoreFocus: true,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Datos personales del user de la sesión (RUDO). Los campos que el backend
  // no envía (fecha nacimiento, teléfono, ciudad, país, género) muestran "—".
  const personalFields: FieldItem[] = [
    { label: "Nombre", value: formatField(user?.name) },
    { label: "Apellido", value: formatField(user?.last_name) },
    { label: "Fecha de nacimiento", value: formatField(user?.birth_date, user?.birthdate) },
    { label: "Teléfono", value: formatField(user?.phone, user?.telefono) },
    { label: "País", value: formatField(user?.country, user?.pais) },
    { label: "Ciudad", value: formatField(user?.city, user?.ciudad) },
    { label: "Género", value: formatField(user?.gender, user?.genero) },
  ];

  // Disposición en dos columnas como el diseño: cada fila es [izquierda, derecha].
  const fieldRows: Array<[FieldItem, FieldItem | null]> = [
    [personalFields[0], personalFields[1]],
    [personalFields[2], personalFields[3]],
    [personalFields[4], personalFields[5]],
    [personalFields[6], null],
  ];

  const firstProfile = profiles?.[0];
  const initialFocusKey = currentProfile
    ? `account-profile-${currentProfile.id}`
    : firstProfile
      ? `account-profile-${firstProfile.id}`
      : "account-btn-logout";

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => setFocus(initialFocusKey), 60);
    return () => clearTimeout(timer);
  }, [isLoading, initialFocusKey]);

  if (isLoading) return <FullScreenSpinner />;

  return (
    <FocusContext.Provider value={pageFocusKey}>
      <div ref={pageRef} className={styles.pageContainer}>
        <div className={styles.topRow}>
          <h1 className={styles.pageTitle}>Mi Cuenta</h1>
        </div>

        <div className={styles.contentLayout}>
          <section className={styles.personalSection}>
            <h2 className={styles.sectionTitle}>Datos personales</h2>
            <div className={styles.fieldsGrid}>
              {fieldRows.map((row, i) => (
                <div key={`row-${i}`} className={styles.fieldsRow}>
                  {row.map((field) =>
                    field ? (
                      <div key={field.label} className={styles.field}>
                        <span className={styles.fieldLabel}>{field.label}</span>
                        <p className={styles.fieldValue}>{field.value}</p>
                      </div>
                    ) : (
                      <div key={`empty-${i}`} className={styles.field} />
                    )
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.profilesSection}>
            <h2 className={styles.sectionTitle}>Tus perfiles</h2>
            {error ? (
              <p className={styles.errorText}>{error.message || "Error al cargar perfiles"}</p>
            ) : !profiles || profiles.length === 0 ? (
              <p className={styles.emptyText}>No se encontraron perfiles en esta cuenta.</p>
            ) : (
              <div className={styles.profilesRow}>
                {profiles.map((profile) => (
                  <ProfileCardItem
                    key={profile.id}
                    profile={profile}
                    isActive={currentProfile?.id === profile.id}
                    avatarUrl={getAvatarUrl(profile)}
                    onSelect={() => setActiveProfile(profile)}
                    onEdit={() => navigate(`/mi-ecuavisa/perfiles/${profile.id}`)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        <LogoutButton onLogout={handleLogout} />
      </div>
    </FocusContext.Provider>
  );
}

export default ProfilesView;


