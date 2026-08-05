import { useNavigate, useLocation } from "react-router-dom";
import { SidebarIcon } from "../header/SidebarIcons";
import styles from "./Sidebar.module.css";

interface SidebarItem {
	id: string;
	label: string;
	icon: string;
	path: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
	{ id: "sb-home", label: "Inicio", icon: "home", path: "/" },
	{ id: "sb-search", label: "Buscar", icon: "search", path: "/buscar" },
	{ id: "sb-programs", label: "Programas", icon: "programs", path: "/programas" },
	{ id: "sb-live", label: "En vivo", icon: "live", path: "/en-vivo" },
	{ id: "sb-list", label: "Mi Lista", icon: "list", path: "/mi-lista" },
	{ id: "sb-history", label: "Seguir Viendo", icon: "history", path: "/seguir-viendo" },
	{ id: "sb-account", label: "Cuenta", icon: "account", path: "/mi-ecuavisa" },
];

function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (path: string) => {
		if (path === "/") return location.pathname === "/";
		return location.pathname.startsWith(path);
	};

	return (
		<aside className={styles.sidebar}>
			<nav className={styles.nav}>
				{SIDEBAR_ITEMS.map((item) => {
					const active = isActive(item.path);
					return (
						<button
							key={item.id}
							onClick={() => navigate(item.path)}
							className={[styles.btn, active ? styles.btnActive : styles.btnInactive].join(" ")}
						>
							<SidebarIcon name={item.icon} size={22} />
							<span className={styles.label}>{item.label}</span>
						</button>
					);
				})}
			</nav>
		</aside>
	);
}

export default Sidebar;
