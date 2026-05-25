import { useSyncExternalStore } from 'react';
import { authService } from '@/services/authService';
import type { Profile } from '@/interfaces/profile.interface';

interface AuthUser {
    id: string;
    email: string;
    name: string;
    token: string;
    [key: string]: unknown;
}

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    activeProfile: Profile | null;
    isAuthenticated: boolean;
    isValidating: boolean;
}

interface AuthActions {
    login: (token: string, userData?: Record<string, unknown>) => void;
    logout: () => void;
    setActiveProfile: (profile: Profile) => void;
    validateSession: () => Promise<void>;
}

// --- Store interno ---

const storedToken = localStorage.getItem('auth_token');
const storedUser = localStorage.getItem('auth_user');
const storedProfile = localStorage.getItem('active_profile');

let state: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken,
    activeProfile: storedProfile ? JSON.parse(storedProfile) : null,
    isAuthenticated: !!storedToken,
    isValidating: false,
};

const listeners = new Set<() => void>();

function setState(partial: Partial<AuthState>) {
    state = { ...state, ...partial };
    listeners.forEach((l) => l());
}

function getState(): AuthState & AuthActions {
    return { ...state, ...actions };
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

// --- Acciones ---

const actions: AuthActions = {
    login: (token, userData) => {
        const user = { token, ...userData } as AuthUser;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
        setState({ user, token, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('active_profile');
        setState({ user: null, token: null, activeProfile: null, isAuthenticated: false });
    },

    setActiveProfile: (profile) => {
        localStorage.setItem('active_profile', JSON.stringify(profile));
        setState({ activeProfile: profile });
    },

    validateSession: async () => {
        const { token } = state;
        if (!token) {
            setState({ isAuthenticated: false, user: null, token: null });
            return;
        }

        setState({ isValidating: true });

        try {
            const response = await authService.validateSession(token);

            if (response.status === 'error') {
                console.warn('[Auth] Session invalid, logging out');
                actions.logout();
                return;
            }

            const user = { ...response.user, token: response.user?.token || token } as AuthUser;
            localStorage.setItem('auth_user', JSON.stringify(user));
            setState({ user, token: user.token, isAuthenticated: true });
        } catch (error) {
            console.warn('[Auth] Session validation failed, logging out', error);
            actions.logout();
        } finally {
            setState({ isValidating: false });
        }
    },
};

// --- Hook público (misma API que Zustand) ---

type Selector<T> = (state: AuthState & AuthActions) => T;

export function useAuthStore<T>(selector: Selector<T>): T {
    return useSyncExternalStore(
        subscribe,
        () => selector(getState()),
    );
}

/** Acceso estático fuera de React (equivalente a Zustand's getState) */
useAuthStore.getState = getState;
