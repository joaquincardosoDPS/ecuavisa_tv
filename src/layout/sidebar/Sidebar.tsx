import { useState, useCallback, useMemo } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate } from 'react-router-dom';
import { SIDEBAR_FOCUS_KEY, SIDEBAR_ITEMS_BASE, SIDEBAR_ITEMS_AUTH, SIDEBAR_ITEM_LOGIN, CONTENT_FOCUS_KEY } from './constants';
import { useAuthStore } from '@/features/auth/authStore';
import { useConfigStore } from '@/features/config/useConfigStore';
import { SidebarItem } from './SidebarItem';
import logoFallback from '@/assets/img/logo.svg';
import styles from './Sidebar.module.css';
import type { Profile } from '@/interfaces/profile.interface';

function getProfileAvatarUrl(profile: Profile): string | null {
    if (Array.isArray(profile.images)) return null;
    return profile.images?.medium || profile.images?.default || null;
}

// ── Focusable profile avatar item ──

function ProfileSidebarItem({
    profile,
    avatarUrl,
    isExpanded,
    nextFocusKey,
    onItemFocus,
    onItemBlur,
    onCollapse,
}: {
    profile: Profile;
    avatarUrl: string | null;
    isExpanded: boolean;
    nextFocusKey: string | null;
    onItemFocus: () => void;
    onItemBlur: () => void;
    onCollapse: () => void;
}) {
    const navigate = useNavigate();

    const goToProfiles = () => {
        navigate('/perfiles', { replace: true });
        onCollapse();
        setFocus(CONTENT_FOCUS_KEY);
    };

    const { ref, focused } = useFocusable({
        focusKey: 'sidebar-profile',
        onEnterPress: goToProfiles,
        onFocus: onItemFocus,
        onBlur: onItemBlur,
        onArrowPress: (direction) => {
            if (direction === 'right') {
                onCollapse();
                setFocus(CONTENT_FOCUS_KEY);
                return false;
            }
            if (direction === 'left') return false;
            if (direction === 'up') return false;
            if (direction === 'down' && nextFocusKey) {
                setFocus(nextFocusKey);
                return false;
            }
            return false;
        },
    });

    const classList = [
        styles.profileItem,
        focused && styles.profileItemFocused,
        isExpanded && styles.profileItemExpanded,
    ].filter(Boolean).join(' ');

    return (
        <li ref={ref} className={classList} onClick={goToProfiles}>
            <div className={styles.profileItemInner}>
                <span className={styles.profileAvatar}>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={profile.name_perfil}
                            className={styles.profileAvatarImg}
                            draggable={false}
                            decoding="async"
                        />
                    ) : (
                        <span className={styles.profileAvatarInitial}>
                            {profile.name_perfil.charAt(0).toUpperCase()}
                        </span>
                    )}
                </span>
                <span className={styles.profileLabel}>Perfil</span>
            </div>
        </li>
    );
}

export function Sidebar() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const activeProfile = useAuthStore((s) => s.activeProfile);
    const configLogo = useConfigStore((s) => s.config?.logo);
    const [isFocusExpanded, setIsFocusExpanded] = useState(false);
    const [isHoverExpanded, setIsHoverExpanded] = useState(false);

    const isExpanded = isFocusExpanded || isHoverExpanded;

    const items = useMemo(() => {
        return isAuthenticated
            ? [...SIDEBAR_ITEMS_BASE, ...SIDEBAR_ITEMS_AUTH]
            : [ ...SIDEBAR_ITEMS_BASE, SIDEBAR_ITEM_LOGIN];
    }, [isAuthenticated]);

    const { ref, focusKey } = useFocusable({
        focusKey: SIDEBAR_FOCUS_KEY,
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
    });

    const handleChildFocus = useCallback(() => {
        setIsFocusExpanded(true);
    }, []);

    const handleChildBlur = useCallback(() => {
        setIsFocusExpanded(false);
    }, []);

    /* F6.1: Hover expande el sidebar igual que el foco */
    const handleHoverStart = useCallback(() => {
        setIsHoverExpanded(true);
    }, []);

    const handleHoverEnd = useCallback(() => {
        setIsHoverExpanded(false);
    }, []);

    const handleCollapse = useCallback(() => {
        setIsFocusExpanded(false);
        setIsHoverExpanded(false);
    }, []);

    const containerClass = [
        styles.container,
        isExpanded && styles.expanded,
    ].filter(Boolean).join(' ');

    return (
        <FocusContext.Provider value={focusKey}>
            <nav
                ref={ref}
                className={containerClass}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
            >
                <div className={styles.backdrop} />

                <img src={configLogo || logoFallback} alt="Logo" className={styles.logo} />

                <div className={styles.spacer} />

                <ul className={styles.navList}>
                    {/* Active profile avatar — above Home, focusable */}
                    {isAuthenticated && activeProfile && (
                        <ProfileSidebarItem
                            profile={activeProfile}
                            avatarUrl={getProfileAvatarUrl(activeProfile)}
                            isExpanded={isExpanded}
                            nextFocusKey={items.length > 0 ? items[0].id : null}
                            onItemFocus={handleChildFocus}
                            onItemBlur={handleChildBlur}
                            onCollapse={handleCollapse}
                        />
                    )}

                    {items.map((item, index) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            isExpanded={isExpanded}
                            prevFocusKey={index > 0
                                ? items[index - 1].id
                                : (isAuthenticated && activeProfile ? 'sidebar-profile' : null)}
                            nextFocusKey={index < items.length - 1 ? items[index + 1].id : null}
                            onItemFocus={handleChildFocus}
                            onItemBlur={handleChildBlur}
                            onCollapse={handleCollapse}
                        />
                    ))}
                </ul>
            </nav>
        </FocusContext.Provider>
    );
}
