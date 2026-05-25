export interface SidebarItemConfig {
    id: string;
    title: string;
    path: string;
    icon: string;
}

export const SIDEBAR_FOCUS_KEY = 'SIDEBAR';

export const SIDEBAR_ITEMS_BASE: SidebarItemConfig[] = [
    { id: 'live', title: 'En vivo', path: '/live', icon: 'live' },
    { id: 'home', title: 'Inicio', path: '/home', icon: 'home' },
    { id: 'search', title: 'Buscar', path: '/buscar', icon: 'search' },
    { id: 'programs', title: 'On Demand', path: '/programas', icon: 'programs' },
];

/** Items visibles solo con sesión activa */
export const SIDEBAR_ITEMS_AUTH: SidebarItemConfig[] = [
    { id: 'my-list', title: 'Mi lista', path: '/mi-lista', icon: 'list' },
];

/** Item de login (sin autenticación) */
export const SIDEBAR_ITEM_LOGIN: SidebarItemConfig =
    { id: 'login', title: 'Mi Latina', path: '/auth/login', icon: 'login' };

/** Ancho colapsado del sidebar en px (solo iconos) */
export const SIDEBAR_WIDTH_COLLAPSED = 100;
/** Ancho expandido del sidebar en px (iconos + texto) */
export const SIDEBAR_WIDTH_EXPANDED = 450;

/** Focus key del contenedor de contenido principal */
export const CONTENT_FOCUS_KEY = 'CONTENT';
