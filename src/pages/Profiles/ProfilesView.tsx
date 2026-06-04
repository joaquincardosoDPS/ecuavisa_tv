import { useState, useEffect } from 'react';
import {
  FocusContext,
  useFocusable,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import { useProfilesData } from '@/hooks/profiles/useProfilesData';
import { useProfilesNavigation } from '@/hooks/profiles/useProfilesNavigation';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import { Button } from '@/components/ui/Button';
import { useConfigStore } from '@/features/config/useConfigStore';
import { isInputAction } from '@/utils/keycodes';
import type { Profile } from '@/interfaces/profile.interface';
import fallbackLogo from '@/assets/img/logo.svg';
import iconEdit from '@/assets/img/icons/iconos-edit.svg';
import styles from './ProfilesView.module.css';

// ── Profile Card (focusable) ──

function ProfileCard({
  profile,
  focusKey,
  onSelect,
  editMode,
  onEdit,
  prevFocusKey,
  nextFocusKey,
}: {
  profile: Profile;
  focusKey: string;
  onSelect: () => void;
  editMode: boolean;
  onEdit: () => void;
  prevFocusKey?: string | null;
  nextFocusKey?: string | null;
}) {
  const handleAction = () => {
    if (editMode) {
      onEdit();
    } else {
      onSelect();
    }
  };

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: handleAction,
    onArrowPress: (direction) => {
      if (direction === 'down') {
        setFocus('profiles-edit-btn');
        return false;
      }
      if (direction === 'left') {
        if (prevFocusKey) {
          setFocus(prevFocusKey);
        } else {
          setFocus(SIDEBAR_FOCUS_KEY);
        }
        return false;
      }
      if (direction === 'right' && nextFocusKey) {
        setFocus(nextFocusKey);
        return false;
      }
      return true;
    },
  });

  useEffect(() => {
    if (focused && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [focused, ref]);

  const avatarUrl = getAvatarUrl(profile);

  return (
    <button
      ref={ref}
      className={styles.profileCard}
      onClick={handleAction}
    >
      <div className={`${styles.avatarWrapper} ${focused ? styles.avatarWrapperFocused : ''}`}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={profile.name_perfil}
            className={styles.avatarImg}
            draggable={false}
            decoding="async"
          />
        ) : (
          <span className={styles.avatarInitial}>
            {profile.name_perfil.charAt(0).toUpperCase()}
          </span>
        )}

        {/* Edit badge */}
        {editMode && (
          <div className={`${styles.editBadge} ${focused ? styles.editBadgeFocused : ''}`}>
            <img src={iconEdit} alt="Editar" className={styles.editBadgeIcon} />
          </div>
        )}
      </div>
      <span className={`${styles.profileName} ${focused ? styles.profileNameFocused : ''}`}>
        {profile.name_perfil}
      </span>
    </button>
  );
}

// ── Add Profile Card (focusable) ──

function AddProfileCard({ focusKey, disabled, onPress }: { focusKey: string; disabled?: boolean; onPress?: () => void }) {
  const handlePress = () => {
    if (!disabled) onPress?.();
  };

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: handlePress,
    focusable: !disabled,
    onArrowPress: (direction) => {
      if (direction === 'down') {
        setFocus('profiles-edit-btn');
        return false;
      }
      return true;
    },
  });

  return (
    <button
      ref={ref}
      className={styles.profileCard}
      onClick={handlePress}
    >
      <div className={`${styles.avatarWrapper} ${focused ? styles.avatarWrapperFocused : ''}`}>
        <span className={`${styles.addIcon} ${focused ? styles.addIconFocused : ''}`}>+</span>
      </div>
      <span className={`${styles.profileName} ${focused ? styles.profileNameFocused : ''}`}>
        Agregar perfil
      </span>
    </button>
  );
}

// ── Helper ──

function getAvatarUrl(profile: Profile): string | null {
  if (Array.isArray(profile.images)) return null;
  return profile.images?.medium || profile.images?.default || null;
}

// ── Main View ──

function ProfilesView() {
  const logo = useConfigStore((s) => s.config?.logo) || fallbackLogo;
  const [editMode, setEditMode] = useState(false);

  /* ── Hooks de datos y navegación ── */
  const { token, profiles, isLoading, isError, selectProfile, logout } = useProfilesData();
  const { goToHome, goToCreateProfile, goToEditProfile, goToAccountInfo } = useProfilesNavigation();

  useEffect(() => {
    if (!token) goToHome();
  }, [token, goToHome]);

  const { ref: containerRef, focusKey } = useFocusable({
    focusKey: 'PROFILES-VIEW',
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  const { ref: gridRef, focusKey: gridFocusKey } = useFocusable({
    focusKey: 'PROFILES-GRID',
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  useEffect(() => {
    if (!isLoading && profiles.length > 0) {
      setTimeout(() => setFocus(`profile-${profiles[0].id}`), 300);
    }
  }, [isLoading, profiles]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isInputAction(e, 'Back')) {
        e.preventDefault();
        e.stopPropagation();
        if (editMode) {
          setEditMode(false);
        } else {
          goToHome();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [editMode, goToHome]);

  const handleSelectProfile = (profile: Profile) => {
    console.log('[Profiles] Selected:', profile.name_perfil, profile.id);
    selectProfile(profile);
    goToHome();
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={containerRef} className={styles.container}>
        <img src={logo} alt="Logo" className={styles.logo} draggable={false} />

        <h1 className={styles.heading}>
          {editMode ? 'Editar perfil' : '¿Quién está ahí?'}
        </h1>

        {isLoading ? (
          <FullScreenSpinner />
        ) : isError ? (
          <p className={styles.errorText}>Error al cargar perfiles.</p>
        ) : (
          <>
            <FocusContext.Provider value={gridFocusKey}>
              <div ref={gridRef} className={styles.profilesGrid}>
                {profiles.map((profile, index) => {
                  const prevKey = index > 0 ? `profile-${profiles[index - 1].id}` : null;
                  const isLast = index === profiles.length - 1;
                  const nextKey = isLast
                    ? (profiles.length < 4 && !editMode ? 'profile-add' : null)
                    : `profile-${profiles[index + 1].id}`;
                  return (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      focusKey={`profile-${profile.id}`}
                      onSelect={() => handleSelectProfile(profile)}
                      editMode={editMode}
                      onEdit={() => goToEditProfile(profile.id)}
                      prevFocusKey={prevKey}
                      nextFocusKey={nextKey}
                    />
                  );
                })}
                {profiles.length < 4 && (
                  <AddProfileCard focusKey="profile-add" disabled={editMode} onPress={goToCreateProfile} />
                )}
              </div>
            </FocusContext.Provider>

            {/* Action buttons */}
            <div className={styles.bottomActions}>
              <Button
                focusKey="profiles-edit-btn"
                variant="secondary"
                onPress={() => setEditMode((prev) => !prev)}
                onArrowPress={(direction) => {
                  if (direction === 'up') {
                    setFocus('PROFILES-GRID');
                    return false;
                  }
                  if (direction === 'down') {
                    setFocus('profiles-account-btn');
                    return false;
                  }
                  return true;
                }}
              >
                {editMode ? 'Listo' : 'Editar perfil'}
              </Button>
              <Button
                focusKey="profiles-account-btn"
                variant="secondary"
                onPress={goToAccountInfo}
                onArrowPress={(direction) => {
                  if (direction === 'up') {
                    setFocus('profiles-edit-btn');
                    return false;
                  }
                  if (direction === 'down') {
                    setFocus('profiles-logout-btn');
                    return false;
                  }
                  return true;
                }}
              >
                Información de Cuenta
              </Button>
              <Button
                focusKey="profiles-logout-btn"
                variant="tertiary"
                onPress={() => {
                  logout();
                  goToHome();
                }}
                onArrowPress={(direction) => {
                  if (direction === 'up') {
                    setFocus('profiles-account-btn');
                    return false;
                  }
                  return true;
                }}
              >
                Cerrar sesión
              </Button>
            </div>
          </>
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default ProfilesView;
