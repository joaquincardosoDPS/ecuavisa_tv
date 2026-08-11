import { useCallback } from "react";
import { useAuthStore } from "@/features/auth/authStore";
import { useConfigStore } from "@/features/config/useConfigStore";
import type { Profile } from "@/interfaces/profile.interface";
import { NAVBAR_ITEMS } from "./constants";
import { NavbarItem } from "./NavbarItem";
import { SidebarIcon } from "./SidebarIcons";
import { useLocation, useNavigate } from "react-router-dom";
import { FocusContext, useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import logoFallback from "@/assets/img/logo.svg";
import styles from "./Header.module.css";

function getProfileAvatarUrl(profile: Profile): string | null {
	if (Array.isArray(profile.images)) return null;
	return profile.images?.medium || profile.images?.default || null;
}

function HeaderContent() {
	const configLogo = useConfigStore((s) => s.config?.logo);
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const activeProfile = useAuthStore((s) => s.activeProfile);
	const navigate = useNavigate();

	const avatarUrl = activeProfile ? getProfileAvatarUrl(activeProfile) : null;
	const avatarInitial = (activeProfile?.name_perfil || "U").charAt(0).toUpperCase();

	const goToProfile = useCallback(() => {
		navigate(isAuthenticated ? "/mi-ecuavisa/perfiles" : "/auth/login", { replace: true });
	}, [isAuthenticated, navigate]);

	const openSearch = useCallback(() => {
		navigate("/buscar");
	}, [navigate]);

	const { ref: avatarRef, focused: avatarFocused } = useFocusable({
		focusKey: 'header-avatar',
		onEnterPress: goToProfile,
		onArrowPress: (direction) => {
			if (direction === 'up') return false;
			if (direction === 'left') return false;
			if (direction === 'right') {
				setTimeout(() => setFocus('header-search'), 0);
				return false;
			}
			return true;
		}
	});

	const { ref: searchRef, focused: searchFocused } = useFocusable({
		focusKey: 'header-search',
		onEnterPress: openSearch,
		onArrowPress: (direction) => {
			if (direction === 'up') return false;
			if (direction === 'left') {
				setTimeout(() => setFocus('header-avatar'), 0);
				return false;
			}
			if (direction === 'right') {
				setTimeout(() => setFocus('navbar-home'), 0);
				return false;
			}
			return true;
		}
	});

	return (
		<nav className={styles.nav}>
			<div className={styles.leftSlot}>
				<button ref={avatarRef} className={[styles.avatarBtn, avatarFocused ? styles.focused : ""].join(" ")} onClick={goToProfile}>
					{avatarUrl ? (
						<img
							src={avatarUrl}
							alt={activeProfile?.name_perfil || "Avatar"}
							className={styles.avatarImg}
							draggable={false}
							decoding="async"
						/>
					) : (
						<span className={styles.avatarInitial}>{avatarInitial}</span>
					)}
				</button>
			</div>

			<div
				className={styles.centerPill}
				style={{
					backgroundColor: "color-mix(in srgb, var(--clr-primary-title) 20%, transparent)",
				}}
			>
				<ul className={styles.navList}>
					<li ref={searchRef} className={[styles.searchTrigger, searchFocused ? styles.focused : ""].join(" ")} onClick={openSearch}>
						<span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "1.375rem", height: "1.375rem" }}>
							<SidebarIcon name="search" size={22} />
						</span>
					</li>
					{NAVBAR_ITEMS.map((item) => (
						<NavbarItem key={item.id} item={item} />
					))}
				</ul>
			</div>

			<div className={styles.rightSlot}>
				<img
					src={configLogo || logoFallback}
					alt="Logo"
					className={styles.logo}
					draggable={false}
				/>
			</div>
		</nav>
	);
}

function Header() {
	const location = useLocation();
	
	let preferredChild = 'header-search';
	if (location.pathname === '/') preferredChild = 'navbar-home';
	else if (location.pathname.startsWith('/live')) preferredChild = 'navbar-live';
	else if (location.pathname.startsWith('/programas') || location.pathname.startsWith('/eventos')) preferredChild = 'navbar-videoteca';
	else if (location.pathname.startsWith('/mi-lista')) preferredChild = 'navbar-lista';

	const { focusKey: generatedFocusKey, ref: headerRef } = useFocusable({
		focusKey: 'zone-header',
		preferredChildFocusKey: preferredChild
	});

	return (
		<FocusContext.Provider value={generatedFocusKey}>
			<div ref={headerRef} className={styles.wrapper}>
				<HeaderContent />
			</div>
		</FocusContext.Provider>
	);
}

export default Header;
