import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/features/auth/authStore";
import { useConfigStore } from "@/features/config/useConfigStore";
import type { Profile } from "@/interfaces/profile.interface";
import { NAVBAR_ITEMS } from "./constants";
import { NavbarItem } from "./NavbarItem";
import { SidebarIcon } from "./SidebarIcons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import logoFallback from "@/assets/img/logo.svg";
import styles from "./Header.module.css";

function getProfileAvatarUrl(profile: Profile): string | null {
	if (Array.isArray(profile.images)) return null;
	return profile.images?.medium || profile.images?.default || null;
}

function Header() {
	const configLogo = useConfigStore((s) => s.config?.logo);
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const activeProfile = useAuthStore((s) => s.activeProfile);
	const [searchMode, setSearchMode] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const inputRef = useRef<HTMLInputElement>(null);
	const centerRef = useRef<HTMLDivElement>(null);
	const [naturalWidth, setNaturalWidth] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		const q = searchParams.get("q");
		if (q) setSearchQuery(q);
	}, [searchParams]);

	const avatarUrl = activeProfile ? getProfileAvatarUrl(activeProfile) : null;
	const avatarInitial = (activeProfile?.name_perfil || "U").charAt(0).toUpperCase();

	const goToProfile = useCallback(() => {
		navigate(isAuthenticated ? "/mi-ecuavisa/perfiles" : "/auth/login", { replace: true });
	}, [isAuthenticated, navigate]);

	const openSearch = useCallback(() => {
		if (centerRef.current && naturalWidth === 0) {
			setNaturalWidth(centerRef.current.offsetWidth);
		}
		setSearchMode(true);
		setTimeout(() => inputRef.current?.focus(), 100);
	}, [naturalWidth]);

	const closeSearch = useCallback(() => {
		setSearchMode(false);
	}, []);

	const handleSearchSubmit = useCallback(() => {
		const trimmed = searchQuery.trim();
		if (trimmed) {
			navigate(`/buscar?q=${encodeURIComponent(trimmed)}`);
			setSearchMode(false);
		} else if (location.pathname !== "/buscar") {
			navigate("/buscar");
			setSearchMode(false);
		}
	}, [searchQuery, navigate, location.pathname]);

	return (
		<div className={styles.wrapper}>
			{searchMode && (
				<div
					className={styles.overlay}
					style={{ background: "color-mix(in srgb, var(--clr-primary) 70%, transparent)" }}
					onClick={closeSearch}
				/>
			)}
			<nav className={styles.nav}>
				<div className={styles.leftSlot}>
					<button className={styles.avatarBtn} onClick={goToProfile}>
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
					ref={centerRef}
					className={styles.centerPill}
					style={{
						width: naturalWidth
							? searchMode
								? `${Math.max(naturalWidth * 1.3, 560)}px`
								: `${naturalWidth}px`
							: undefined,
						backgroundColor: searchMode
							? "color-mix(in srgb, var(--clr-primary) 95%, transparent)"
							: "color-mix(in srgb, var(--clr-primary-title) 20%, transparent)",
					}}
				>
					<ul
						className={styles.navList}
						style={{
							opacity: searchMode ? 0 : 1,
							pointerEvents: searchMode ? "none" : "auto",
							transform: searchMode ? "scale(0.9)" : "scale(1)",
						}}
					>
						<li className={styles.searchTrigger} onClick={openSearch}>
							<span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "1.375rem", height: "1.375rem" }}>
								<SidebarIcon name="search" size={22} />
							</span>
						</li>
						{NAVBAR_ITEMS.map((item) => (
							<NavbarItem key={item.id} item={item} />
						))}
					</ul>

					<div
						className={styles.searchLayer}
						style={{
							opacity: searchMode ? 1 : 0,
							pointerEvents: searchMode ? "auto" : "none",
							transform: searchMode ? "translateY(0)" : "translateY(6px)",
						}}
					>
						<button
							type="button"
							onClick={handleSearchSubmit}
							className={styles.searchIcon}
							tabIndex={searchMode ? 0 : -1}
							title="Buscar"
						>
							<SidebarIcon name="search" size={20} />
						</button>
						<input
							ref={inputRef}
							type="text"
							value={searchQuery}
							placeholder="Buscar programas, peliculas..."
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleSearchSubmit();
								if (e.key === "Escape") closeSearch();
							}}
							className={styles.searchInput}
							autoComplete="off"
							maxLength={100}
							tabIndex={searchMode ? 0 : -1}
						/>
						<button
							type="button"
							className={styles.searchClose}
							onClick={closeSearch}
							tabIndex={searchMode ? 0 : -1}
						>
							x
						</button>
					</div>
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
		</div>
	);
}

export default Header;
