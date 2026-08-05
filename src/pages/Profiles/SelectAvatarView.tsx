import { useEditProfile } from "@/hooks/profiles/useEditProfile";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { BackButton } from "@/components/ui/BackButton";
import styles from "./SelectAvatarView.module.css";

function SelectAvatarView() {
  const { isCreateMode, avatarGroups, isLoading, selectedAvatar, setSelectedAvatar, handleSubmit, name, navigate, getAvatarUrl, isSubmitting } = useEditProfile();

  if (isLoading) return <FullScreenSpinner />;

  const handleSelect = async (avatarId: string) => {
    if (isSubmitting) return;
    setSelectedAvatar(avatarId);
    if (!isCreateMode) {
      await handleSubmit(name, false, avatarId);
    }
    navigate(-1);
  };

  return (
    <div className={styles.pageContainer}>
      <BackButton />
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Elegir avatar</h1>
        <p className={styles.pageSubtitle}>Selecciona el avatar que mejor te represente</p>
      </div>
      <div className={styles.avatarsGrid}>
        {avatarGroups?.flatMap((group) => group.avatars).map((avatar) => {
          const avatarUrl = getAvatarUrl(avatar);
          const isSelected = selectedAvatar === avatar.id;
          if (!avatarUrl) return null;
          return (
            <button
              key={avatar.id}
              onClick={() => handleSelect(avatar.id)}
              disabled={isSubmitting}
              style={{ position: "relative", outline: "none", width: "100%", aspectRatio: "1/1", cursor: isSubmitting ? "wait" : "pointer", opacity: isSubmitting ? 0.8 : 1, background: "none", border: "none", padding: 0 }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1rem", overflow: "hidden", backgroundColor: "color-mix(in srgb, var(--clr-primary-title) 5%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid transparent", transition: "all 0.3s", borderColor: isSelected ? "var(--epg-accent)" : "transparent", transform: isSelected ? "scale(1.05)" : "scale(1)", boxShadow: isSelected ? "0 0 20px rgba(16,212,255,0.4)" : "none" }}>
                <img src={avatarUrl} alt={`Avatar ${avatar.id}`} className={styles.avatarImage} />
                {isSelected && isSubmitting && (
                  <div className={styles.loadingOverlay}>
                    <div className={styles.loadingSpinner} />
                  </div>
                )}
              </div>
              {isSelected && (
                <div className={styles.selectedBadgeWrapper}>
                  <div className={styles.selectedBadge}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4} className={styles.checkIcon}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default SelectAvatarView;
