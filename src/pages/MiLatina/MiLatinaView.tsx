import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FocusContext,
    useFocusable,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { useAuthStore } from '@/features/auth/authStore';
import type { Profile } from '@/interfaces/profile.interface';
import styles from './MiLatinaView.module.css';

function getProfileAvatarUrl(profile: Profile): string | null {
    if (Array.isArray(profile.images)) return null;
    return profile.images?.medium || profile.images?.default || null;
}

// ── Focusable Button ──

function FocusableButton({
    focusKey,
    label,
    onPress,
    variant = 'primary',
}: {
    focusKey: string;
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
}) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: onPress,
    });

    const classList = [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        focused && styles.buttonFocused,
    ].filter(Boolean).join(' ');

    return (
        <button ref={ref} className={classList} onClick={onPress}>
            {label}
        </button>
    );
}

// ── MiLatinaView ──

function MiLatinaView() {
    const navigate = useNavigate();
    const activeProfile = useAuthStore((s) => s.activeProfile);
    const logout = useAuthStore((s) => s.logout);

    const { ref, focusKey } = useFocusable({
        focusKey: 'MILATINA-VIEW',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        autoRestoreFocus: true,
    });

    const avatarUrl = activeProfile ? getProfileAvatarUrl(activeProfile) : null;

    const handleAccountInfo = useCallback(() => {
        navigate('/mi-latina/cuenta', { replace: true });
    }, [navigate]);

    const handleLogout = useCallback(() => {
        logout();
        navigate('/', { replace: true });
    }, [logout, navigate]);

    // Foco inicial
    useEffect(() => {
        setTimeout(() => setFocus('MILATINA-BTN-ACCOUNT'), 300);
    }, []);

    // Keyboard: Back navega atrás
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const code = e.keyCode;
            if (code === 27 || code === 8 || code === 10009) {
                e.preventDefault();
                e.stopPropagation();
                navigate(-1);
            }
        };
        window.addEventListener('keydown', handleKeyDown, true);
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, [navigate]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.container}>
                {/* Avatar */}
                <div className={styles.avatar}>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={activeProfile?.name_perfil || 'Perfil'}
                            className={styles.avatarImg}
                            draggable={false}
                            decoding="async"
                        />
                    ) : (
                        <span className={styles.avatarInitial}>
                            {activeProfile?.name_perfil?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className={styles.title}>Mi Latina</h1>

                {/* Profile name */}
                <p className={styles.profileName}>
                    {activeProfile?.name_perfil || 'Usuario'}
                </p>

                {/* Buttons */}
                <div className={styles.buttonsContainer}>
                    <FocusableButton
                        focusKey="MILATINA-BTN-ACCOUNT"
                        label="Información de Cuenta"
                        onPress={handleAccountInfo}
                    />
                    <FocusableButton
                        focusKey="MILATINA-BTN-LOGOUT"
                        label="Cerrar Sesión"
                        onPress={handleLogout}
                        variant="secondary"
                    />
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default MiLatinaView;
