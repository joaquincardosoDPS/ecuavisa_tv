import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/authStore";
import { profileService } from "@/services/profileService";
import type { Profile } from "@/interfaces/profile.interface";
import ProfileAvatar from "./ProfileAvatar";
import styles from "./ProfileDropdown.module.css";

function ProfileDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeProfile = useAuthStore((s) => s.activeProfile);
  const setActiveProfile = useAuthStore((s) => s.setActiveProfile);
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  const { data: profiles } = useQuery({
    queryKey: ["profiles", token],
    queryFn: async () => {
      const response = await profileService.getAll(token!);
      if (response.status === "error") return [];
      return response.data || [];
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!activeProfile) return null;

  const handleSwitch = (profile: Profile) => {
    setActiveProfile(profile);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const navigateTo = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.triggerLabel}>Mi perfil</span>
        <ProfileAvatar profile={activeProfile} size="md" className={styles.triggerAvatar} />
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.profileList}>
            {profiles?.map((profile) => (
              <button
                key={profile.id}
                onClick={() => handleSwitch(profile)}
                className={styles.profileBtn}
              >
                <ProfileAvatar profile={profile} size="sm" />
                <span className={styles.profileName}>{profile.name_perfil}</span>
              </button>
            ))}

            {(profiles?.length ?? 0) < 4 && (
              <button
                onClick={() => navigateTo("/perfiles/nuevo")}
                className={styles.addBtn}
              >
                <div className={styles.addIcon}>
                  <span className={styles.addPlus}>+</span>
                </div>
                <span style={{ fontSize: "0.875rem" }}>Agregar perfil</span>
              </button>
            )}
          </div>

          <div className={styles.linkList}>
            <button className={styles.link} onClick={() => navigateTo("/perfiles")}>Editar perfiles</button>
            <button className={styles.link} onClick={() => navigateTo("/cuenta")}>Cuenta</button>
            <button className={styles.link} onClick={() => navigateTo("/tv")}>Vincular TV</button>
            <button className={styles.link} onClick={handleLogout}>Desconectarse</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
