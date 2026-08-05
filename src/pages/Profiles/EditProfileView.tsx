import { useEditProfile } from "@/hooks/profiles/useEditProfile";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { BackButton } from "@/components/ui/BackButton";
import ProfileActionRow from "@/components/ui/ProfileActionRow";
import Button from "@/components/ui/Button";
import styles from "./EditProfileView.module.css";

function EditProfileView() {
  const { isCreateMode, existingProfile, isDefaultProfile, name, setName, selectedAvatar, avatarGroups, showDeleteModal, setShowDeleteModal, isDeleting, isSubmitting, submitError, submitSuccess, isLoading, handleSubmit, handleDelete, navigate } = useEditProfile();
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

  return (
    <div className={styles.pageContainer}>
      <BackButton />
      <div className={styles.contentLayout}>
        <div className={styles.formSection}>
          <h1 className={styles.pageTitle}>
            {isCreateMode ? "Nuevo perfil" : "Mi perfil"}
          </h1>
          <p className={styles.pageSubtitle}>
            {isCreateMode ? "Creá tu perfil de Ecuavisa" : "Personalizá tu experiencia en Ecuavisa"}
          </p>
          <p className={styles.pageDescription}>
            {isCreateMode ? "Elige un nombre y avatar obligatorios para crear tu nuevo perfil" : "Personaliza tu experiencia en Ecuavisa y disfruta de contenido hecho para ti"}
          </p>
          <div className={styles.actionList}>
            <ProfileActionRow icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"/></svg>} label={isCreateMode ? "Elegir avatar *" : "Elegir avatar"} variant="navigation" onClick={() => navigate('avatars')} />
            <ProfileActionRow icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>} label={isCreateMode ? "Nombre *" : "Nombre"} variant="editable" value={name || (isCreateMode ? "Toca para escribir nombre" : "")} onValueChange={setName} onSave={!isCreateMode ? () => handleSubmit(name, false) : undefined} />
            {submitError && <p className={styles.errorText}>{submitError}</p>}
            {submitSuccess && <p className={styles.successText}>{isCreateMode ? "¡Perfil creado con éxito!" : "¡Perfil actualizado!"}</p>}
            {isCreateMode && (
              <div className={styles.submitButtonWrapper}>
                <Button variant="primary" onClick={() => handleSubmit(name, true)} disabled={isSubmitting} className={styles.submitButton}>
                  {isSubmitting ? "Creando perfil..." : "Crear perfil"}
                </Button>
              </div>
            )}
            {!isCreateMode && !isDefaultProfile && (
              <ProfileActionRow icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>} label="Eliminar perfil" variant="action" onClick={() => setShowDeleteModal(true)} />
            )}
          </div>
        </div>
        <div className={styles.avatarSection}>
          {avatarUrl ? (
            <div className={styles.avatarPreviewWrapper}>
              <img src={avatarUrl} alt={name || "Perfil"} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s", opacity: isSubmitting ? 0.4 : 1 }} />
            </div>
          ) : (
            <div className={styles.avatarPlaceholderWrapper}>
              <div style={{ fontSize: "200px", fontWeight: "bold", fontFamily: "Gotham", lineHeight: "220px", color: "var(--clr-primary-title)", transition: "opacity 0.3s", opacity: isSubmitting ? 0.4 : 1 }}>
                {(name || existingProfile?.name_perfil || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          <p className={styles.avatarNameText}>
            {name || existingProfile?.name_perfil || (isCreateMode ? "Nombre de perfil" : "")}
          </p>
        </div>
      </div>
      {!isCreateMode && (
        <ConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message={`¿Quieres borrar el perfil de ${existingProfile?.name_perfil || ""}?`} confirmLabel="Borrar" loadingLabel="Borrando..." isLoading={isDeleting} />
      )}
    </div>
  );
}
export default EditProfileView;
