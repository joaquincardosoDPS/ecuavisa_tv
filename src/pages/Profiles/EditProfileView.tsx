import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  FocusContext,
  useFocusable,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { useAuthStore } from '@/features/auth/authStore';
import { profileService } from '@/services/profileService';
import { useFetch } from '@/hooks/useFetch';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import { OnScreenKeyboard } from '@/components/ui/OnScreenKeyboard';
import { Button } from '@/components/ui/Button';
import { isInputAction } from '@/utils/keycodes';
import type { Profile } from '@/interfaces/profile.interface';
import iconEdit from '@/assets/img/icons/iconos-edit.svg';
import styles from './EditProfileView.module.css';

// ── Focusable Action Button ──

function ActionButton({
  focusKey,
  label,
  onPress,
  disabled,
  baseClass,
  focusedClass,
}: {
  focusKey: string;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  baseClass: string;
  focusedClass: string;
}) {
  const { ref, focused } = useFocusable({
    focusKey,
    focusable: !disabled,
    onEnterPress: onPress,
  });

  return (
    <button
      ref={ref}
      className={`${styles.actionBtn} ${baseClass} ${focused ? focusedClass : ''}`}
      onClick={onPress}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// ── Delete Modal Component con Focus Trap ──

function DeleteModal({
  name,
  isDeleting,
  onCancel,
  onDelete,
}: {
  name: string;
  isDeleting: boolean;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'DELETE-MODAL',
    isFocusBoundary: true, // Trampa de foco (Regla F3.1)
    trackChildren: true,
  });

  useEffect(() => {
    // Forzar foco al abrir (Regla F4.1)
    setTimeout(() => setFocus('modal-cancel'), 50);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p className={styles.modalText}>
            ¿Quieres borrar el perfil de {name}?
          </p>
          <div className={styles.modalActions}>
            <ActionButton
              focusKey="modal-cancel"
              label="Cancelar"
              onPress={onCancel}
              baseClass={`${styles.modalBtn} ${styles.modalCancelBtn}`}
              focusedClass={styles.modalBtnFocused}
            />
            <ActionButton
              focusKey="modal-delete"
              label={isDeleting ? 'Borrando...' : 'Borrar'}
              onPress={onDelete}
              disabled={isDeleting}
              baseClass={`${styles.modalBtn} ${styles.modalDeleteBtn}`}
              focusedClass={styles.modalBtnFocused}
            />
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

// ── Main View ──

function EditProfileView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);

  const isCreateMode = !id || id === 'nuevo';

  // Fetch existing profiles for edit mode
  const { data: profilesResponse } = useFetch(
    () => profileService.getAll(token!),
    [token],
    { enabled: !!token && !isCreateMode },
  );

  const existingProfile: Profile | null = !isCreateMode
    ? (profilesResponse?.data?.find((p) => p.id === id) ?? null)
    : null;

  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isFirstProfile = profilesResponse?.data
    ? profilesResponse.data[0]?.id === id
    : false;
  const isDefaultProfile = existingProfile?.default === true || isFirstProfile;

  // Receive avatar from AvatarSelectView (must be BEFORE the profile prefill)
  const location = useLocation();
  const avatarFromNav = useRef(false);

  useEffect(() => {
    const state = location.state as { selectedAvatar?: string; selectedAvatarUrl?: string; currentName?: string } | null;
    if (state?.selectedAvatar) {
      setSelectedAvatar(state.selectedAvatar);
      setSelectedAvatarUrl(state.selectedAvatarUrl || null);
      avatarFromNav.current = true;
    }
    if (state?.currentName !== undefined) {
      setName(state.currentName);
    }
  }, [location.state]);

  // Prellenar datos si es edición (no sobreescribir avatar si vino de AvatarSelectView)
  useEffect(() => {
    if (existingProfile) {
      setName(existingProfile.name_perfil);
      if (!avatarFromNav.current) {
        setSelectedAvatar(existingProfile.avatar || null);
      }
    }
  }, [existingProfile]);

  // Norigin container
  const { ref: containerRef, focusKey } = useFocusable({
    focusKey: 'EDIT-PROFILE-VIEW',
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Focus keyboard initially
  useEffect(() => {
    setTimeout(() => setFocus('PROFILE-KB-r0-a'), 300);
  }, []);

  // Back key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isInputAction(e, 'Back')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        if (showDeleteModal) {
          setShowDeleteModal(false);
        } else {
          navigate('/mi-latina', { replace: true });
        }
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [navigate, showDeleteModal]);

  const activeProfile = useAuthStore((s) => s.activeProfile);
  const setActiveProfile = useAuthStore((s) => s.setActiveProfile);

  const handleSubmit = async () => {
    if (!token) return;
    if (!name.trim()) {
      setSubmitError('El nombre del perfil es obligatorio.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const avatarToSend = isCreateMode
        ? selectedAvatar
        : (selectedAvatar ?? existingProfile?.avatar ?? null);

      console.log('[EditProfile] Submitting:', { isCreateMode, name: name.trim(), avatarToSend, selectedAvatar, existingAvatar: existingProfile?.avatar });

      const response = isCreateMode
        ? await profileService.create(token, name.trim(), avatarToSend)
        : await profileService.update(token, id!, name.trim(), avatarToSend);

      if (response.status === 'error') {
        const rawMsg = response.msj || '';
        // Mapear errores técnicos de la API a mensajes amigables
        let friendlyMsg = 'Error al guardar el perfil.';
        if (rawMsg.toLowerCase().includes('avatar')) {
          friendlyMsg = 'Debes seleccionar un avatar para el perfil.';
        } else if (rawMsg.toLowerCase().includes('name') || rawMsg.toLowerCase().includes('nombre')) {
          friendlyMsg = 'El nombre del perfil es obligatorio.';
        } else if (rawMsg) {
          friendlyMsg = rawMsg;
        }
        setSubmitError(friendlyMsg);
        return;
      }

      // Si se actualizó el perfil activo, actualizar el store y LocalStorage
      if (!isCreateMode && existingProfile && activeProfile?.id === id) {
        const updatedProfile: Profile = {
          ...existingProfile,
          name_perfil: name.trim(),
          avatar: avatarToSend || existingProfile.avatar,
          images: selectedAvatarUrl
            ? { default: selectedAvatarUrl, medium: selectedAvatarUrl }
            : existingProfile.images,
        };
        setActiveProfile(updatedProfile);
      }

      setSubmitSuccess(true);
      setTimeout(() => navigate('/mi-latina', { replace: true }), 1200);
    } catch (err) {
      console.error('[EditProfile] Error:', err);
      setSubmitError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = useCallback(async () => {
    if (!token || !id || isCreateMode) return;

    setIsDeleting(true);
    try {
      const response = await profileService.delete(token, id);
      if (response.status === 'error') {
        setSubmitError(response.msj || 'Error al eliminar el perfil.');
        setShowDeleteModal(false);
        return;
      }
      navigate('/mi-latina', { replace: true });
    } catch (err) {
      console.error('[EditProfile] Delete error:', err);
      setSubmitError('Error de conexión.');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  }, [token, id, isCreateMode, navigate]);

  // Avatar URL for preview — prefer selected avatar URL, fallback to existing profile images
  const getProfileAvatarUrl = (): string | null => {
    if (selectedAvatarUrl) return selectedAvatarUrl;
    if (!existingProfile || Array.isArray(existingProfile.images)) return null;
    return existingProfile.images?.medium || existingProfile.images?.default || null;
  };
  const avatarUrl = getProfileAvatarUrl();

  // Navigate to avatar selection
  const returnPath = isCreateMode ? '/mi-latina/nuevo' : `/mi-latina/${id}`;
  const goToAvatarSelect = useCallback(() => {
    navigate('/mi-latina/avatar', {
      state: { currentAvatar: selectedAvatar, returnTo: returnPath, currentName: name },
    });
  }, [navigate, selectedAvatar, returnPath, name]);

  // Focusable avatar edit badge
  const { ref: editBadgeRef, focused: editBadgeFocused } = useFocusable({
    focusKey: 'edit-profile-avatar-btn',
    onEnterPress: goToAvatarSelect,
    onArrowPress: (direction) => {
      if (direction === 'right') {
        setFocus('PROFILE-KB');
        return false;
      }
      if (direction === 'down') {
        setFocus('edit-profile-save');
        return false;
      }
      return true;
    },
  });

  if (!isCreateMode && !existingProfile && profilesResponse) {
    return <FullScreenSpinner />;
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={containerRef} className={styles.container}>
        {/* ── Title ── */}
        <h1 className={styles.title}>
          {isCreateMode ? 'Crear perfil' : 'Editar perfil'}
        </h1>

        {/* ── Two-column content ── */}
        <div className={styles.contentGrid}>
          {/* Left: Name + Avatar */}
          <div className={styles.leftColumn}>

            {/* Avatar preview */}
            <div className={styles.avatarContainer}>
              <div className={styles.avatarPreview}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className={styles.avatarPreviewImg}
                    draggable={false}
                    decoding="async"
                  />
                ) : (
                  <span className={styles.avatarPreviewFallback}>
                    {(name.trim() || existingProfile?.name_perfil || 'Default').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button
                ref={editBadgeRef}
                className={`${styles.avatarEditBadge} ${editBadgeFocused ? styles.avatarEditBadgeFocused : ''}`}
                onClick={goToAvatarSelect}
              >
                <img src={iconEdit} alt="Editar" className={styles.avatarEditIcon} />
              </button>
            </div>

            {/* Name input (read-only, driven by keyboard) */}
            <input
              type="text"
              placeholder="Nombre del perfil"
              value={name}
              className={styles.nameInput}
              readOnly
              maxLength={15}
            />
          </div>

          {/* Right: Keyboard */}
          <div className={styles.rightColumn}>
            <div className={styles.keyboardWrapper}>
              <OnScreenKeyboard
                focusKeyPrefix="PROFILE-KB"
                onInput={(char) => setName((prev) => (prev.length < 15 ? prev + char : prev))}
                onDelete={() => setName((prev) => prev.slice(0, -1))}
                onEscapeLeft={() => setFocus('edit-profile-avatar-btn')}
              />
            </div>
          </div>
        </div>

        {/* ── Bottom actions ── */}
        <div className={styles.bottomActions}>
          {submitError && <p className={styles.errorText}>{submitError}</p>}
          {submitSuccess && (
            <p className={styles.successText}>
              {isCreateMode ? 'Perfil creado' : 'Perfil actualizado'} ✓
            </p>
          )}

          <Button
            focusKey="edit-profile-save"
            variant="secondary"
            onPress={handleSubmit}
          >
            {isSubmitting ? 'Guardando...' : isCreateMode ? 'Crear perfil' : 'Guardar cambios'}
          </Button>

          {!isCreateMode && !isDefaultProfile && (
            <Button
              focusKey="edit-profile-delete"
              variant="tertiary"
              onPress={() => setShowDeleteModal(true)}
            >
              Eliminar perfil
            </Button>
          )}
        </div>
      </div>

      {/* ── Delete Modal ── */}
      {showDeleteModal && (
        <DeleteModal
          name={name || existingProfile?.name_perfil || ''}
          isDeleting={isDeleting}
          onCancel={() => {
            setShowDeleteModal(false);
            setFocus('edit-profile-delete'); // Restaurar foco
          }}
          onDelete={handleDelete}
        />
      )}
    </FocusContext.Provider>
  );
}

export default EditProfileView;
