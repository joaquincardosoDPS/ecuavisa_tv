import { useNavigate, useLocation } from "react-router-dom";
import { NAVBAR_ITEMS, type NavbarItemConfig } from "./constants";
import { SidebarIcon } from "./SidebarIcons";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";
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

    const currentIndex = NAVBAR_ITEMS.findIndex(i => i.id === item.id);
    const prevItem = currentIndex > 0 ? NAVBAR_ITEMS[currentIndex - 1] : null;
    const nextItem = currentIndex < NAVBAR_ITEMS.length - 1 ? NAVBAR_ITEMS[currentIndex + 1] : null;

    const { ref, focused } = useFocusable({
        focusKey: item.id,
        onEnterPress: handleSelect,
        onArrowPress: (direction) => {
            if (direction === 'up') return false;
            if (direction === 'left') {
                if (prevItem) {
                    setTimeout(() => setFocus(prevItem.id), 0);
                } else {
                    setTimeout(() => setFocus('header-search'), 0);
                }
                return false;
            }
            if (direction === 'right') {
                if (nextItem) {
                    setTimeout(() => setFocus(nextItem.id), 0);
                } else {
                    setTimeout(() => setFocus('header-avatar'), 0);
                }
                return false;
            }
            return true;
        }
    });

    return (
        <li
            ref={ref}
            className={[styles.item, isActive ? styles.itemActive : styles.itemInactive, focused ? styles.focused : ""].join(" ")}
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
