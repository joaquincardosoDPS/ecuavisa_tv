import { useEffect } from "react";
import { FocusContext, setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEditProfile } from "@/hooks/profiles/useEditProfile";
import { useSpatialFocus } from "@/hooks/tv/useSpatialFocus";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import { BackButton } from "@/components/ui/BackButton";
import type { AvatarItem } from "@/interfaces/profile.interface";
import styles from "./SelectAvatarView.module.css";

interface AvatarOptionProps {
  avatar: AvatarItem;
  avatarUrl: string;
  isSelected: boolean;
  isSubmitting: boolean;
  onSelect: () => void;
}

function AvatarOption({ avatar, avatarUrl, isSelected, isSubmitting, onSelect }: AvatarOptionProps) {
  const { ref, focused } = useSpatialFocus({
    focusKey: `avatar-${avatar.id}`,
    onEnterPress: onSelect,
  });

  return (
    <button
      ref={ref}
      onClick={onSelect}
      disabled={isSubmitting}
      className={[styles.avatarButton, focused ? styles.avatarFocused : ""].join(" ")}
      style={{ cursor: isSubmitting ? "wait" : "pointer", opacity: isSubmitting ? 0.8 : 1 }}
    >
      <div className={[styles.avatarFrame, isSelected ? styles.avatarSelected : ""].join(" ")}>
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
}

function SelectAvatarView() {
  const { isCreateMode, avatarGroups, isLoading, selectedAvatar, setSelectedAvatar, handleSubmit, name, navigate, getAvatarUrl, isSubmitting } = useEditProfile();

  // Zona de foco de la página.
  const { ref: pageRef, focusKey: pageFocusKey } = useFocusable({
    focusKey: "zone-select-avatar",
    saveLastFocusedChild: true,
    autoRestoreFocus: true,
  });

  const avatarItems =
    (avatarGroups ?? []).flatMap((group) => group.avatars).filter((a) => getAvatarUrl(a)) ?? [];

  // Foco inicial: avatar seleccionado o el primero.
  const initialAvatarId =
    avatarItems.find((a) => a.id === selectedAvatar)?.id || avatarItems[0]?.id;

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => {
      setFocus(initialAvatarId ? `avatar-${initialAvatarId}` : "back-button");
    }, 80);
    return () => clearTimeout(timer);
  }, [isLoading, initialAvatarId]);

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
    <FocusContext.Provider value={pageFocusKey}>
      <div ref={pageRef} className={styles.pageContainer}>
        <BackButton />
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>Elegir avatar</h1>
          <p className={styles.pageSubtitle}>Selecciona el avatar que mejor te represente</p>
        </div>
        <div className={styles.avatarsGrid}>
          {avatarItems.map((avatar) => {
            const avatarUrl = getAvatarUrl(avatar);
            if (!avatarUrl) return null;
            return (
              <AvatarOption
                key={avatar.id}
                avatar={avatar}
                avatarUrl={avatarUrl}
                isSelected={selectedAvatar === avatar.id}
                isSubmitting={isSubmitting}
                onSelect={() => handleSelect(avatar.id)}
              />
            );
          })}
        </div>
      </div>
    </FocusContext.Provider>
  );
}
export default SelectAvatarView;
