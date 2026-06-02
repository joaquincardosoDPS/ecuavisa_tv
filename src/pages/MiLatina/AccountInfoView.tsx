import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FocusContext,
    useFocusable,
    setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import axios from 'axios';
import { CLIENT, RUDO_SESSION } from '@/config-global';
import { useAuthStore } from '@/features/auth/authStore';
import type { Profile } from '@/interfaces/profile.interface';
import styles from './MiLatinaView.module.css';

interface SessionData {
    name: string;
    last_name: string;
    email: string;
    gender?: string;
}

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

// ── AccountInfoView ──

function AccountInfoView() {
    const navigate = useNavigate();
    const activeProfile = useAuthStore((s) => s.activeProfile);
    const logout = useAuthStore((s) => s.logout);

    const [session, setSession] = useState<SessionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const { ref, focusKey } = useFocusable({
        focusKey: 'ACCOUNT-INFO-VIEW',
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
        autoRestoreFocus: true,
    });

    const avatarUrl = activeProfile ? getProfileAvatarUrl(activeProfile) : null;

    // Fetch session data
    useEffect(() => {
        let cancelled = false;
        const token = localStorage.getItem('auth_token') || '';

        if (!token) {
            setIsLoading(false);
            setError('No hay sesión activa.');
            return;
        }

        setIsLoading(true);
        setError('');

        axios
            .post(RUDO_SESSION, `client=${CLIENT}&token=${token}&_t=${Date.now()}`, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
            .then((response) => {
                if (cancelled) return;
                const data = response.data;
                if (data.status === 'error') {
                    setError(data.msj || 'Error al cargar la sesión.');
                } else if (data.user) {
                    setSession({
                        name: data.user.name || '',
                        last_name: data.user.last_name || '',
                        email: data.user.email || '',
                        gender: data.user.gender || '',
                    });
                }
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : 'Error al cargar la sesión.');
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleLogout = useCallback(() => {
        logout();
        navigate('/', { replace: true });
    }, [logout, navigate]);

    // Foco inicial
    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => setFocus('ACCOUNT-BTN-LOGOUT'), 300);
        }
    }, [isLoading]);

    // Keyboard: Back navega atrás explícitamente a /mi-latina
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const code = e.keyCode;
            if (code === 27 || code === 8 || code === 10009 || code === 461) {
                e.preventDefault();
                e.stopPropagation();
                navigate('/mi-latina', { replace: true });
            }
        };
        window.addEventListener('keydown', handleKeyDown, true);
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, [navigate]);

    if (isLoading) {
        return <div className={styles.loading}>Cargando...</div>;
    }

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
                <h1 className={styles.title}>Mi Perfil</h1>

                {/* Session info */}
                {error ? (
                    <p className={styles.errorText}>{error}</p>
                ) : session ? (
                    <div className={styles.infoGroup}>
                        <span className={styles.infoLabel}>Nombre</span>
                        <span className={styles.infoValue}>
                            {session.name} {session.last_name}
                        </span>

                        <span className={styles.infoLabel}>Email</span>
                        <span className={styles.infoValue}>{session.email}</span>
                    </div>
                ) : null}

                {/* Logout button */}
                <div className={styles.buttonsContainer}>
                    <FocusableButton
                        focusKey="ACCOUNT-BTN-LOGOUT"
                        label="Cerrar Sesión"
                        onPress={handleLogout}
                        variant="secondary"
                    />
                </div>
            </div>
        </FocusContext.Provider>
    );
}

export default AccountInfoView;
