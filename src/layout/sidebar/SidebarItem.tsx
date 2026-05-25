import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import type { SidebarItemConfig } from './constants';
import { SidebarIcon } from './SidebarIcons';
import { CONTENT_FOCUS_KEY } from './constants';
import styles from './SidebarItem.module.css';

interface SidebarItemProps {
    item: SidebarItemConfig;
    isExpanded: boolean;
    prevFocusKey: string | null;
    nextFocusKey: string | null;
    onItemFocus: () => void;
    onItemBlur: () => void;
    onCollapse: () => void;
}

export function SidebarItem({
    item,
    isExpanded,
    prevFocusKey,
    nextFocusKey,
    onItemFocus,
    onItemBlur,
    onCollapse,
}: SidebarItemProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname.startsWith(item.path);

    const { ref, focused } = useFocusable({
        focusKey: item.id,
        onEnterPress: () => {
            navigate(item.path, { replace: true });
            onCollapse();
            setFocus(CONTENT_FOCUS_KEY);
        },
        onFocus: onItemFocus,
        onBlur: onItemBlur,
        onArrowPress: (direction) => {
            if (direction === 'right') {
                onCollapse();
                setFocus(CONTENT_FOCUS_KEY);
                return false;
            }
            if (direction === 'left') {
                return false;
            }
            /* Navegación secuencial por índice — evita saltos espaciales */
            if (direction === 'up' && prevFocusKey) {
                setFocus(prevFocusKey);
                return false;
            }
            if (direction === 'down' && nextFocusKey) {
                setFocus(nextFocusKey);
                return false;
            }
            return false;
        },
    });

    const classList = [
        styles.item,
        focused && styles.focused,
        isActive && styles.active,
        isExpanded && styles.expanded,
    ].filter(Boolean).join(' ');

    return (
        <li
            ref={ref}
            className={classList}
            onClick={() => {
                navigate(item.path, { replace: true });
                onCollapse();
                setFocus(CONTENT_FOCUS_KEY);
            }}
        >
            <div className={styles.itemInner}>
                <span className={styles.iconWrapper}>
                    <SidebarIcon name={item.icon} size={44} />
                </span>
                <span className={styles.label}>{item.title}</span>
            </div>
        </li>
    );
}
