/* === Sidebar Icons ===
 * Re-exporta los iconos SVG de @/components/icons
 * para uso en el sidebar con un mapeo por nombre.
 */

import type { SVGProps } from 'react';
import { SidebarHome } from '@/components/icons/sidebar-home';
import { SidebarSearch } from '@/components/icons/sidebar-search';
import { SidebarOnDemand } from '@/components/icons/sidebar-on-demand';
import { SidebarEnVivo } from '@/components/icons/sidebar-en-vivo';
import { SidebarList } from '@/components/icons/sidebar-list';
import { SidebarAcount } from '@/components/icons/sidebar-acount';

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<string, IconComponent> = {
    home: SidebarHome,
    search: SidebarSearch,
    programs: SidebarOnDemand,
    live: SidebarEnVivo,
    list: SidebarList,
    account: SidebarAcount,
    login: SidebarAcount,
};

export function SidebarIcon({ name, size = 48 }: { name: string; size?: number }) {
    const Icon = ICON_MAP[name];
    if (!Icon) return null;
    return <Icon width={size} height={size} />;
}
