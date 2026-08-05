import { useNavigate, useLocation } from "react-router-dom";
import type { NavbarItemConfig } from "./constants";
import { SidebarIcon } from "./SidebarIcons";
import styles from "./NavbarItem.module.css";

interface NavbarItemProps {
    item: NavbarItemConfig;
}

export function NavbarItem({ item }: NavbarItemProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = item.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.path);

    const handleSelect = () => {
        navigate(item.path, { replace: true });
    };

    return (
        <li
            className={[styles.item, isActive ? styles.itemActive : styles.itemInactive].join(" ")}
            onClick={handleSelect}
        >
            {item.icon && (
                <span className={styles.icon}>
                    <SidebarIcon name={item.icon} size={22} />
                </span>
            )}
            <span>{item.title}</span>
        </li>
    );
}
