import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FocusContext,
  useFocusable,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import { useAuthStore } from '@/features/auth/authStore';
import { profileService } from '@/services/profileService';
import { useFetch } from '@/hooks/useFetch';
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

function AddProfileCard({ focusKey, disabled }: { focusKey: string; disabled?: boolean }) {
  const navigate = useNavigate();

  const goToCreate = () => {
    if (!disabled) navigate('/mi-latina/nuevo', { replace: true });
  };

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: goToCreate,
    focusable: !disabled,
  });

  return (
    <button
      ref={ref}
      className={styles.profileCard}
      onClick={goToCreate}
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
  const navigate = useNavigate();
  const logo = useConfigStore((s) => s.config?.logo) || fallbackLogo;
  const token = useAuthStore((s) => s.token);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/home', { replace: true });
    }
  }, [token, navigate]);

  const { data: profilesResponse, isLoading, isError } = useFetch(
    () => profileService.getAll(token!),
    [token],
    { enabled: !!token },
  );

  const profiles = profilesResponse?.data || [];

  const { ref: containerRef, focusKey } = useFocusable({
    focusKey: 'PROFILES-VIEW',
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
          navigate('/home', { replace: true });
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, editMode]);

  const handleSelectProfile = (profile: Profile) => {
    console.log('[Profiles] Selected:', profile.name_perfil, profile.id);
    useAuthStore.getState().setActiveProfile(profile);
    navigate('/home', { replace: true });
  };

  const handleEditProfile = (profile: Profile) => {
    navigate(`/mi-latina/${profile.id}`, { replace: true });
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
            <div className={styles.profilesGrid}>
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
                    onEdit={() => handleEditProfile(profile)}
                    prevFocusKey={prevKey}
                    nextFocusKey={nextKey}
                  />
                );
              })}
              {profiles.length < 4 && (
                <AddProfileCard focusKey="profile-add" disabled={editMode} />
              )}
            </div>

            {/* Action buttons */}
            <div className={styles.bottomActions}>
              <Button
                focusKey="profiles-edit-btn"
                variant="secondary"
                onPress={() => setEditMode((prev) => !prev)}
              >
                {editMode ? 'Listo' : 'Editar perfil'}
              </Button>
              <Button
                focusKey="profiles-account-btn"
                variant="secondary"
                onPress={() => navigate('/mi-latina/cuenta', { replace: true })}
              >
                Información de Cuenta
              </Button>
              <Button
                focusKey="profiles-logout-btn"
                variant="tertiary"
                onPress={() => {
                  useAuthStore.getState().logout();
                  navigate('/home', { replace: true });
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
