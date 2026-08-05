import type { Profile, ProfileImages } from "@/interfaces/profile.interface";
import styles from "./ProfileAvatar.module.css";

interface ProfileAvatarProps {
  profile: Profile;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

function getAvatarUrl(images: ProfileImages | []): string | null {
  if (Array.isArray(images)) return null;
  return images?.medium || images?.small || images?.default || null;
}

function ProfileAvatar({ profile, size = "md", className }: ProfileAvatarProps) {
  const url = getAvatarUrl(profile.images);

  return (
    <div className={[styles.avatar, sizeClassMap[size], className].filter(Boolean).join(" ")}>
      {url ? (
        <img
          src={url}
          alt={profile.name_perfil}
          className={styles.img}
        />
      ) : (
        <span className={styles.initial}>
          {profile.name_perfil.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { getAvatarUrl };
export default ProfileAvatar;
