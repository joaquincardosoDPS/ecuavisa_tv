import { useEffect } from "react";
import { FocusContext, SpatialNavigation, setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEditProfile } from "@/hooks/profiles/useEditProfile";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { NameKeyboard } from "./components/NameKeyboard";
import iconEdit from "@/assets/img/icons/iconos-edit.svg";
import styles from "./EditProfileView.module.css";

// Límite de caracteres del nombre de perfil.
const MAX_NAME_LENGTH = 12;

// Botón de lápiz bajo el avatar para elegir otro avatar.
function AvatarPickerButton({ onPick }: { onPick: () => void }) {
  const { ref, focused } = useSpatialFocus({
    focusKey: "edit-avatar-pick",
    onEnterPress: onPick,
  });

  return (
    <button
      type="button"
      ref={ref}
      className={[styles.avatarPickButton, focused ? styles.focusedGlow : ""].join(" ")}
      onClick={onPick}
      aria-label="Cambiar avatar"
    >
      <img src={iconEdit} alt="" className={styles.avatarPickIcon} />
    </button>
  );
}

interface BottomActionProps {
  label: string;
  onPress: () => void;
  focusKey: string;
  kind: "save" | "delete";
  disabled?: boolean;
}

// Botones inferiores GUARDAR CAMBIOS / ELIMINAR PERFIL.
function BottomAction({ label, onPress, focusKey, kind, disabled }: BottomActionProps) {
  const { ref, focused } = useSpatialFocus({
    focusKey,
    onEnterPress: () => {
      if (!disabled) onPress();
    },
  });

  return (
    <button
      type="button"
      ref={ref}
      disabled={disabled}
      className={[
        styles.bottomButton,
        kind === "save" ? styles.saveButton : styles.deleteButton,
        focused ? styles.focusedGlow : "",
      ].join(" ")}
      onClick={onPress}
    >
      {label}
    </button>
  );
}

function EditProfileView() {
  const {
    isCreateMode,
    existingProfile,
    isDefaultProfile,
    name,
    setName,
    selectedAvatar,
    avatarGroups,
    isLoading,
    isSubmitting,
    submitError,
    submitSuccess,
    showDeleteModal,
    setShowDeleteModal,
    isDeleting,
    handleSubmit,
    handleDelete,
    navigate,
  } = useEditProfile();

  // Zona de foco de la página.
  const { ref: pageRef, focusKey: pageFocusKey } = useFocusable({
    focusKey: "page-edit-profile",
    saveLastFocusedChild: true,
    autoRestoreFocus: true,
  });

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => setFocus("namekey-a"), 80);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) return <FullScreenSpinner />;

  const avatarUrl = (() => {
    if (selectedAvatar && avatarGroups) {
      for (const group of avatarGroups) {
        const found = group.avatars.find((a) => a.id === selectedAvatar);
        if (found) return found.images?.big || found.images?.medium || found.images?.default || null;
      }
    }
    if (existingProfile && !Array.isArray(existingProfile.images)) {
      return existingProfile.images?.big || existingProfile.images?.medium || existingProfile.images?.default || null;
    }
    return null;
  })();

  // Solo el draft en edición: si el usuario borra todo, no se reintroduce el nombre original del perfil
  const draftName = (name || "").toUpperCase();
  const initial = (name || existingProfile?.name_perfil || "").toUpperCase().charAt(0) || "?";

  const typeChar = (char: string) => {
    if (isSubmitting) return;
    setName((name + char.toUpperCase()).slice(0, MAX_NAME_LENGTH));
  };

  const removeChar = () => {
    if (isSubmitting) return;
    setName(name.slice(0, -1));
  };

  const clearName = () => {
    if (isSubmitting) return;
    setName("");
  };

  const canDelete = !isCreateMode && !isDefaultProfile;
  const title = isCreateMode ? "Crear perfil" : "Editar mi perfil";

  // Al cerrar el modal sus focos se desmontan: devolver el foco a "Eliminar perfil"
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTimeout(() => {
      if (SpatialNavigation.doesFocusableExist("edit-delete")) setFocus("edit-delete");
    }, 150);
  };

  return (
    <FocusContext.Provider value={pageFocusKey}>
      <div ref={pageRef} className={styles.pageContainer}>
        <div className={styles.headerRow}>
          
          <div className={styles.headerText}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <p className={styles.pageSubtitle}>
              {isCreateMode
                ? "Elige un avatar y escribe el nombre del perfil"
                : "Escribe el nombre con el teclado y cambia tu avatar"}
            </p>
          </div>
        </div>

        <div className={styles.contentLayout}>
          <div className={styles.avatarColumn}>
            <div className={styles.avatarFrame}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={draftName || "Avatar"} className={styles.avatarImage} />
              ) : (
                <span className={styles.avatarInitial}>{initial}</span>
              )}
            </div>
            <AvatarPickerButton onPick={() => navigate("avatars")} />
            <p className={styles.avatarNameLabel}>{draftName || "Mi perfil"}</p>
          </div>

          <div className={styles.editorColumn}>
            <NameKeyboard
              onKey={typeChar}
              onBackspace={removeChar}
              onClear={clearName}
            />
            {submitError && <p className={styles.errorText}>{submitError}</p>}
            {submitSuccess && (
              <p className={styles.successText}>
                {isCreateMode ? "¡Perfil creado!" : "¡Perfil actualizado!"}
              </p>
            )}
          </div>
        </div>

        <div className={styles.actionsRow}>
          <BottomAction
            label={isCreateMode ? "CREAR PERFIL" : "GUARDAR CAMBIOS"}
            focusKey="edit-save"
            kind="save"
            disabled={isSubmitting || !name.trim()}
            onPress={() => handleSubmit()}
          />
          {canDelete && (
            <BottomAction
              label="ELIMINAR PERFIL"
              focusKey="edit-delete"
              kind="delete"
              onPress={() => setShowDeleteModal(true)}
            />
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        message={`¿Quieres borrar el perfil de ${existingProfile?.name_perfil || ""}?`}
        confirmLabel="Borrar"
        loadingLabel="Borrando..."
        isLoading={isDeleting}
      />
    </FocusContext.Provider>
  );
}

export default EditProfileView;
