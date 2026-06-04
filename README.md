# LatinaTV 2 — Smart TV Streaming App

Aplicación de streaming OTT diseñada para Smart TVs (Samsung Tizen, LG webOS, Hisense) y navegadores web. Construida con React 19, Vite 8 y navegación espacial D-Pad.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| UI Framework | React 19 + TypeScript 6 |
| Bundler | Vite 8 con `@vitejs/plugin-legacy` (target Chrome ≥ 47) |
| Optimización | React Compiler (`babel-plugin-react-compiler`) |
| Navegación Espacial | `@noriginmedia/norigin-spatial-navigation` v3 |
| Routing | React Router DOM v7 |
| Streaming | HLS.js v1.6 |
| Publicidad | Google IMA SDK via `@glomex/vast-ima-player` (VAST/VMAP) |
| HTTP | Axios |
| Estilos | CSS Modules (`.module.css`) — sin Tailwind |

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                      main.tsx                           │
│  Inicializa Norigin Spatial Navigation + monta <App />  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                      App.tsx                            │
│  useAppInitialization → config remota + auth + CSS vars │
│  Renderiza <RouterProvider> cuando está listo            │
└──────────────────────┬──────────────────────────────────┘
                       │
         ┌─────────────┼──────────────┐
         ▼             ▼              ▼
   Standalone     WhoIsThere      MainLayout
   (Auth)         (Selector)     (Sidebar + Content)
```

### Flujo de Arranque

1. **`main.tsx`** — Inicializa el motor de navegación espacial (`init()`) y monta `<App />`.
2. **`App.tsx`** — Ejecuta `useAppInitialization()`:
   - Descarga la configuración remota del cliente (`/config/all`).
   - Inyecta variables CSS dinámicas en `:root` (colores, gradientes, foco).
   - Registra teclas multimedia en Tizen (`registerTVKeys()`).
   - Valida la sesión existente en `localStorage` si hay token.
3. **Router** — Una vez la config carga, se renderiza el `RouterProvider` con las rutas.

---

## Estructura de Carpetas

```
src/
├── assets/          # Imágenes, fuentes, iconos estáticos
├── components/      # Componentes UI reutilizables
│   ├── ui/          #   Button, Spinner, FullScreenSpinner
│   ├── icons/       #   Componentes SVG
│   ├── ProgramCard/ #   Cards + Carruseles de programas
│   ├── VideoPlayer/ #   Reproductor VOD (HLS + VAST)
│   └── LivePlayer/  #   Reproductor Live (HLS + DAI)
├── features/        # Estado global por dominio
│   ├── auth/        #   authStore (sesión + perfil activo)
│   ├── config/      #   useConfigStore (config remota)
│   └── programs/    #   Estado de programas en memoria
├── hooks/           # Custom hooks organizados por dominio
│   ├── shared/      #   useFetch, usePageScroll, useBackHandler...
│   ├── home/        #   useHomeData, useHomeNavigation
│   ├── live/        #   useLiveData
│   ├── player/      #   useHlsStream, usePlayerKeyboard, useWatchHistory...
│   ├── program/     #   useProgramDetail, useChapters, useFavorite...
│   ├── programs/    #   useProgramsData (scroll infinito)
│   ├── profiles/    #   useProfilesData, useProfilesNavigation
│   ├── search/      #   useSearchData, useSearchNavigation
│   ├── category/    #   useCategoryData, useCategoryNavigation
│   ├── event/       #   useEventData, useEventNavigation
│   ├── auth/        #   useAuthNavigation, useLoginData
│   ├── mylist/      #   useMyListData, useMyListNavigation
│   └── milatina/    #   useAccountData, useMiLatinaNavigation
├── interfaces/      # Tipos TypeScript globales
├── layout/          # MainLayout + Sidebar
├── pages/           # Vistas principales (1 carpeta = 1 ruta)
│   ├── Auth/        #   LoginView, RegisterView
│   ├── Home/        #   HomeView + Banner, Carruseles
│   ├── Live/        #   LiveView (TV en vivo)
│   ├── Player/      #   PlayerView (reproductor VOD)
│   ├── Program/     #   ProgramPage (detalle serie/película)
│   ├── Programs/    #   ProgramsView (catálogo completo)
│   ├── Search/      #   SearchView (buscador)
│   ├── Category/    #   CategoryView (categoría individual)
│   ├── Event/       #   EventView (eventos especiales)
│   ├── Profiles/    #   ProfilesView, WhoIsThereView, EditProfileView
│   ├── MiLatina/    #   AccountInfoView
│   └── MyList/      #   MyListView (favoritos)
├── router/          # Configuración de rutas
├── services/        # Capa de acceso a APIs (Axios)
├── types/           # Tipos auxiliares
└── utils/           # Utilidades: keycodes, platform, formatters
```

---

## Sistema de Rutas

El router define tres niveles de acceso:

```
/                          → Redirect a /whoisthere
├── auth/login             → Standalone (sin sidebar ni protección)
├── auth/register          → Standalone (sin sidebar ni protección)
│
├── whoisthere             → ProtectedRoute + Standalone (sin sidebar)
│                            Selector de perfil al entrar a la app
│
└── MainLayout (sidebar + content)
    ├── play/:program/:segment/:season/:chapter  → PlayerView (sin protección extra)
    │
    └── ProtectedRoute
        ├── home           → HomeView (catálogo + banner + señales)
        ├── live           → LiveView (TV en vivo)
        ├── buscar         → SearchView
        ├── programas      → ProgramsView (catálogo completo)
        ├── programas/:slug→ ProgramPage (detalle)
        ├── categoria/:slug→ CategoryView
        ├── eventos/:slug  → EventView
        ├── mi-lista       → MyListView (favoritos)
        ├── mi-latina      → ProfilesView (gestión perfiles)
        ├── mi-latina/cuenta → AccountInfoView
        ├── mi-latina/nuevo  → EditProfileView
        ├── mi-latina/:id    → EditProfileView
        └── mi-latina/avatar → AvatarSelectView
```

### Protección de Rutas

`ProtectedRoute` verifica `authStore.isAuthenticated`. Si no hay sesión, redirige a `/auth/register`.

---

## Patrón de Hooks por Dominio

Cada vista sigue un patrón consistente de separación:

```
hooks/<dominio>/
├── use<Dominio>Data.ts        → Fetching + estado de datos
└── use<Dominio>Navigation.ts  → Acciones de navegación (navigate)
```

**Ejemplo — HomeView:**
```tsx
function HomeView() {
    const { slider, categories, liveSignals, ... } = useHomeData();       // datos
    const { goToProgram, goToLive, goToCategory } = useHomeNavigation();  // navegación
    const { scrollRef, scrollToSection } = usePageScroll();               // scroll
    // ... renderizado
}
```

Esto permite que la misma lógica de datos se reutilice en otros clientes (chvTV, c13, etc.) cambiando solo la vista.

### Hooks Compartidos (`hooks/shared/`)

| Hook | Función |
|---|---|
| `useFetch` | Fetch genérico con estados `isLoading`/`isError`/`data` |
| `useFetchPaginated` | Scroll infinito con `loadMore()` y `hasMore` |
| `usePageScroll` | Scroll vertical vía `transform: translateY()` (sin scrollbar nativo) |
| `useTrackScroll` | Scroll horizontal para carruseles |
| `useBackHandler` | Captura global de tecla "Atrás" con restauración de foco |
| `useAppInitialization` | Carga config + validación sesión + inyección CSS |
| `useDebounce` | Debounce genérico para búsquedas |
| `useImagePreloader` | Precarga de imágenes para evitar flashes |

---

## Navegación Espacial (D-Pad)

La app usa `@noriginmedia/norigin-spatial-navigation` para toda la navegación por control remoto.

### Zonas de Foco

```
MAIN-LAYOUT
├── SIDEBAR              (saveLastFocusedChild: true)
└── CONTENT-WRAPPER      (saveLastFocusedChild: true)
    └── [Vista activa]
        ├── BANNER / GRID / TABS...
        └── Elementos individuales (botones, cards)
```

### Principios Clave

- **`saveLastFocusedChild: true`** en todos los contenedores — al volver a una zona se recuerda el último elemento enfocado.
- **`autoRestoreFocus: true`** en el contenedor raíz — si un elemento enfocado se desmonta, el foco se restaura automáticamente.
- **`onArrowPress`** para redirección forzada — cuando la geometría automática falla, se usa `setFocus('key')` imperativo.
- **`isFocusBoundary: true`** en modales — para atrapar el foco y que no escape al contenido de fondo.
- **FocusKeys descriptivos** — formato `[zona]-[componente]-[id]` (ej: `sidebar-btn-home`, `program-single-btn-play`).

### Indicadores Visuales

Todo elemento enfocable tiene una clase `.focused` que aplica:
- `transform: scale(1.05)` — Escala sutil visible a distancia
- Borde o resplandor con `var(--foc-primary)` — El color de foco dinámico del cliente
- Hover comparte los mismos estilos — Para soporte de Magic Mouse en LG

---

## Sistema de Estilos

### Variables CSS Dinámicas

Los colores se inyectan desde la API de configuración del cliente al iniciar la app:

```css
:root {
  --clr-primary: #00453a;
  --clr-secondary: #01a77e;
  --clr-primary-text: #ffffff;
  --foc-primary: #fff200;        /* Color de foco */
  --foc-secondary: #00b28a;
  --grad-sidebar: linear-gradient(...);
  /* ... */
}
```

Esto permite que la misma app se despliegue con branding diferente para cada cliente sin cambiar código.

### Reglas CSS para Smart TV

- **Solo `transform` y `opacity`** para animaciones — evita reflows costosos en CPUs de televisores.
- **CSS Modules** (`.module.css`) — evita colisiones de clases y mantiene el CSS liviano.
- **Flexbox exclusivamente** — sin CSS Grid avanzado (incompatible con navegadores antiguos de TV).
- **Viewport base 1920×1080** — escalado con `vh`, `vw` y `rem`.
- **Sin `aspect-ratio`** — incompatible con Chromium < 88; se usa `height` calculado.
- **Sin `gap` en Flexbox** — se usa `margin` con selectores `> * + *`.

---

## Reproductor de Video

### VOD (`VideoPlayer`)

```
VideoPlayer (orquestador)
├── useHlsStream       → HLS.js: carga, buffering, play/pause
├── usePlayerKeyboard   → Manejo de teclas (Back, Enter, flechas)
├── useUIVisibility     → Auto-hide de controles (4s timeout)
├── useAdsPolicy        → Decide si reproducir preroll VAST
├── usePlayerAnalytics  → Tracking de progreso
├── useWatchHistory     → Guardado periódico "Seguir viendo"
├── VastPlayer          → Capa de publicidad IMA SDK
├── PlayerTopBar        → Título + botón atrás
└── PlayerControls      → Play/Pause + Seekbar + Skip
```

**Flujo de reproducción:**
1. `useAdsPolicy` evalúa si hay VAST URL → activa `VastPlayer` como preroll.
2. Video HLS se mantiene pausado y muteado durante los ads.
3. Al terminar ads, se desmutea y se inicia reproducción HLS.
4. `useWatchHistory` guarda progreso cada ~15s para "Seguir viendo".
5. En los últimos 30s, `PlayerView` detecta fin de episodio y muestra `NextEpisodeCard` o `EndOfEpisodeScreen`.

### Live (`LivePlayer`)

Similar al VOD pero:
- Sin seekbar (es streaming en vivo).
- Integra HLS con token de autenticación para señales premium.
- Soporta EPG (Electronic Program Guide) para mostrar el programa actual.

---

## Servicios (Capa API)

Todos los servicios están en `src/services/` y usan Axios contra el backend **Rudo Video**:

| Servicio | Responsabilidad |
|---|---|
| `api.ts` | Instancia Axios base con interceptores |
| `configService.ts` | Configuración remota del cliente |
| `authService.ts` | Login, registro, validación de sesión |
| `catalogService.ts` | Categorías, programas, capítulos, búsqueda |
| `profileService.ts` | CRUD de perfiles de usuario |
| `historyService.ts` | Historial "Seguir viendo" |
| `favoritesService.ts` | Lista de favoritos |
| `eventService.ts` | Eventos especiales |
| `adsService.ts` | URLs VAST/VMAP por capítulo |
| `deviceAdService.ts` | Publicidad contextual por dispositivo |
| `devicePairService.ts` | Vinculación de TV por código |
| `hlsSessionService.ts` | Generación de IDs de sesión HLS (dpssid/sid) |

---

## Estado Global

### `authStore` (features/auth)

Store manual con `useSyncExternalStore` (sin dependencias externas como Zustand):

```typescript
interface AuthState {
    user: AuthUser | null;
    token: string | null;
    activeProfile: Profile | null;
    isAuthenticated: boolean;
}
```

- Persiste en `localStorage` (`auth_token`, `auth_user`, `active_profile`).
- Accesible fuera de React con `useAuthStore.getState()`.

### `useConfigStore` (features/config)

Almacena la configuración del cliente (colores, logos, textos, URLs).

---

## Compatibilidad con Smart TVs

### Plataformas Soportadas

| Plataforma | Motor Web | Versión Mínima |
|---|---|---|
| Samsung (Tizen) | Chromium 47+ | Tizen 3.0 (2017) |
| LG (webOS) | Chromium ~47+ | webOS 3.0 (2016) |
| Hisense (VIDAA) | Chromium ~47+ | Varía por modelo |
| Navegador Web | Cualquiera moderno | Chrome, Firefox, Safari |

### Transpilación

Vite + `@vitejs/plugin-legacy` transpila a ES2015 con polyfills:
```ts
legacy({
    targets: ['Chrome >= 47', 'Safari >= 9'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
})
```

### Detección de Plataforma

`src/utils/platform.ts` detecta el SO del televisor y expone:
- `getPlatform()` → `'tizen' | 'webos' | 'hisense' | 'web'`
- `exitApp()` → Cierra la app usando API nativa del SO
- `registerTVKeys()` → Registra teclas multimedia en Tizen
- `keepScreenAwake()` → Previene screensaver durante reproducción

### Mapa de Teclas

`src/utils/keycodes.ts` abstrae las diferencias de códigos de tecla entre plataformas:

```typescript
// Nunca usar números mágicos:
if (isInputAction(event, 'Back')) { ... }  // ✅
if (event.keyCode === 10009) { ... }        // ❌
```

---

## Builds por Plataforma

```bash
npm run dev              # Desarrollo local
npm run build            # Build genérico (dist/)
npm run build:webos      # Build para LG webOS (.ipk)
npm run build:tizen      # Build para Samsung Tizen (.wgt)
npm run build:hisense    # Build para Hisense
```

El script `scripts/build-platform.mjs` copia el output de Vite a la carpeta `apps/<platform>/` y empaqueta con las herramientas del SDK correspondiente.

---

## Flujo de Usuario

```
App Init
  │
  ├─ Sin token → /auth/register → /auth/login → Vinculación por código QR
  │                                                    │
  │                                              Verificación OK
  │                                                    │
  ├─ Con token ─────────────────────────────────► /whoisthere
  │                                               Selector de perfil (sin sidebar)
  │                                                    │
  │                                              Selecciona perfil
  │                                                    │
  └───────────────────────────────────────────────► /live (MainLayout + Sidebar)
                                                       │
                                     ┌─────────────────┼──────────────────┐
                                     ▼                 ▼                  ▼
                                   /home          /programas          /buscar
                                   Banner +       Catálogo con        Búsqueda
                                   Carruseles     scroll infinito     con debounce
                                     │
                                     ▼
                              /programas/:slug
                              Detalle (Info + Tabs + Capítulos)
                                     │
                                     ▼
                        /play/:program/:seg/:season/:chapter
                        Reproductor VOD (preroll + HLS + seekbar)
```
