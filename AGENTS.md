# AGENTS.md - Reglas del Proyecto

## Sistema de Reglas del Proyecto: Smart TV Streaming App

### 1. Estilos y Compatibilidad (Tailwind vs. Vanilla CSS)

Para Smart TVs, usar **CSS Modules con SCSS** o **CSS Puro** en lugar de Tailwind, a menos que Tailwind esté configurado de forma extremadamente estricta. Los motores de navegadores de TVs antiguos (como Tizen 3.0 o webOS 3) pueden tener problemas con hojas de estilo muy pesadas o clases utilitarias excesivas.

- **REGLA 1.1 - Motor de Estilos:** Usar CSS Modules (`.module.css`) para evitar colisiones de clases y mantener el CSS lo más pequeño posible.
- **REGLA 1.2 - Animaciones Seguras:** Limitar las animaciones **estrictamente** a las propiedades `transform` (translate, scale) y `opacity`. Animar márgenes, anchos o alturas causará _reflows_ que congelarán la interfaz del televisor.
- **REGLA 1.3 - Layout Constraints:** Usar Flexbox para todo el diseño. Evitar CSS Grid avanzado o propiedades modernas (como `gap` en Flexbox si se soportan TVs anteriores a 2018), ya que los navegadores web de Hisense o Samsung antiguos podrían no renderizarlos correctamente.
- **REGLA 1.4 - Tamaños Absolutos:** Usar resoluciones basadas en `1920x1080` (1080p) como viewport base. Escalar usando `vh`, `vw` o `rem` con un tamaño de fuente base ajustado.

### 2. Navegación Espacial y Foco (D-Pad)

Implementar una librería probada como `@noriginmedia/norigin-spatial-navigation` (estándar en React para TVs), o en su defecto, un sistema de Contextos estricto.

- **REGLA 2.1 - Árbol de Foco (Focus Zones):** La aplicación debe dividirse en zonas de foco estrictas (Ej: `SidebarZone`, `PlayerZone`, `GridZone`). Nunca mezclar la lógica de navegación de dos zonas distintas.
- **REGLA 2.2 - Movimiento Sidebar vs. Vista:**
  - Cuando el `Sidebar` se abre, la aplicación debe hacer un **Trap del foco** (el foco no puede salir del sidebar a menos que se presione la tecla "Derecha" explícitamente para cerrarlo).
  - El sistema debe memorizar el último elemento enfocado en la "Vista principal". Al cerrar el `Sidebar`, el foco **debe retornar exactamente** a la tarjeta o botón que el usuario tenía seleccionado previamente.
- **REGLA 2.3 - Indicadores Visuales:** Todo elemento enfocable debe tener una clase `.focused`. Esta clase modificará su tamaño (`transform: scale(1.05)`) y añadirá un borde o resplandor claro. El diseño del foco debe ser obvio a 3 metros de distancia.

### 3. Arquitectura y TypeScript

- **REGLA 3.1 - Tipado Estricto de Teclas:** Crear un archivo de constantes global (`keycodes.ts`) porque los TVs usan códigos de teclas diferentes al teclado de un PC estándar.
  - _Ejemplo:_ El botón "Atrás" en webOS no es el mismo `keyCode` que el "Return" en Tizen. Usar siempre el mapa de constantes, nunca el número mágico (ej: `event.keyCode === 10009` para Samsung).
- **REGLA 3.2 - Componentes Tontos vs. Inteligentes:** Separar estrictamente la lógica de la UI. Los componentes visuales (`Card`, `Button`) solo reciben propiedades y un estado booleano `isFocused`. El manejo de teclas de dirección se hace en componentes contenedores de orden superior (HOC) o Hooks.

### 4. Interacción con Hardware y Sistema Operativo

- **REGLA 4.1 - Bloqueo de Salida Accidental:** Interceptar siempre el botón "Back/Return" globalmente. Si el usuario está en el reproductor de video, "Atrás" pausa y muestra la UI. Si está en un menú profundo, "Atrás" sube un nivel. Si está en el Home, "Atrás" debe invocar la API nativa del televisor para cerrar la app (ej: `tizen.application.getCurrentApplication().exit()`), nunca dejar que el navegador haga la acción por defecto.
- **REGLA 4.2 - Gestión de Memoria (Crucial):** Los TVs se quedan sin memoria rápido. Usar "Virtualización" (Lazy Loading) para grillas de contenido grandes (ej: si hay 100 canales, solo renderizar en el DOM los 10 visibles).

### 5. Configuración de Vite

- **REGLA 5.1 - Targets de Transpilación:** Vite por defecto compila para navegadores modernos. Configurar `@vitejs/plugin-legacy` en `vite.config.ts` para asegurar que el código se transpila a ES5/ES6 compatible con los motores Chromium antiguos (versión 47+) de los Smart TVs de años anteriores.

**Estructura de Carpetas Obligatoria:**
Respetar estrictamente el siguiente árbol. No crear carpetas fuera de esta estructura a menos que el usuario lo pida explícitamente:
```
├── public
└── src
    ├── assets       (Imágenes, fuentes, iconos estáticos)
    ├── components   (Componentes reutilizables UI: botones, tarjetas, carruseles)
    ├── contexts     (Contextos nativos de React, si son estrictamente necesarios)
    ├── features     (Agrupación por dominio/módulos, ej: auth, player, catalog)
    ├── hooks        (Custom hooks genéricos)
    ├── interfaces   (Tipos y dependencias de TypeScript globales)
    ├── layout       (Componentes de estructura de página: Navbar, Footer, Sidebar)
    ├── pages        (Vistas principales enrutadas)
    ├── router       (Configuración de React Router DOM)
    ├── services     (Lógica de llamadas a la API, configuración de Axios/Fetch)
```

### 6. Comentarios y Documentación (Clean Code)

- **REGLA 6.1 - Comentarios Profesionales y Minimalistas:** El código generado debe ser autoexplicativo mediante un buen nombrado de variables y funciones. Los comentarios están estrictamente limitados a explicar el **"porqué"** (decisiones de diseño, reglas de negocio específicas o lógica matemática compleja) y nunca el "qué".
- **RESTRICCIONES ESTRICTAS:**
  1. **Cero bitácoras de cambios:** NUNCA escribir comentarios sobre las modificaciones que acabas de realizar (ej. `// Se cambió este valor`, `// Agregado para corregir el bug`, `// Nueva función`).
  2. **Cero redundancia:** PROHIBIDO comentar elementos triviales, funciones cortas, _getters/setters_, o agregar un comentario solo porque se creó una nueva variable o función.
  3. **Cero explicaciones literales:** No explicar lo que el código ya dice. Si sientes la necesidad de explicar el código línea por línea, refactoriza el código para que sea legible por sí mismo.

## Colores Dinámicos

**Objetivo:** Al generar código HTML, CSS o componentes, utilizar exclusivamente las variables dinámicas insertadas en la aplicación para los colores importantes (textos, fondos, botones, gradientes y estados de foco). **Bajo ninguna circunstancia usar colores estáticos (HEX, RGB, etc.)** para estos elementos clave.

**Variables Disponibles:**

- `--clr-edit`
- `--clr-icon`
- `--clr-primary`
- `--clr-primary-button`
- `--clr-primary-subtitle`
- `--clr-primary-text`
- `--clr-primary-title`
- `--clr-secondary`
- `--clr-secondary-button`
- `--clr-secondary-subtitle`
- `--clr-secondary-text`
- `--clr-secondary-title`
- `--clr-text-primary-button`
- `--clr-text-secondary-button`
- `--clr-text-tertiary-button`
- `--foc-primary`
- `--foc-secondary`
- `--foc-tertiary`
- `--grad-banner`
- `--grad-sidebar`

**Reglas de Implementación:**

1. **Uso mediante Clases (Prioridad):** Construir las clases utilizando la estructura `propiedad-var(--variable)`.
   - **Textos:** Usar `text-var(--variable)` (ej. `text-var(--clr-primary-text)`).
   - **Fondos:** Usar `bg-var(--variable)` (ej. `bg-var(--clr-primary)` o `bg-var(--grad-banner)`).
   - **Bordes:** Usar `border-var(--variable)` (ej. `border-var(--clr-secondary)`).
2. **Uso mediante Estilos en Línea (Cuando sea necesario):** Si el contexto técnico requiere estilos en línea o la clase no aplica, inyectar la variable usando la función CSS `var()`.
   - Ejemplo: `style="color: var(--clr-secondary-subtitle); background: var(--grad-sidebar);"`

## React Compiler y Optimización

- **REGLA C1.1 - Uso de React Compiler para Rendimiento:** Configurar y utilizar el React Compiler para automatizar la memorización de componentes. Esto es crucial en aplicaciones de TV manejadas por teclado/D-Pad, donde los cambios rápidos de estado (el movimiento del cursor) pueden causar cascadas de re-renderizados costosos en la CPU del televisor.
- **REGLA C1.2 - Requisito de Versión y Polyfills:** El React Compiler requiere React 19+. Asegurar que la salida compilada (que incluye llamadas a cachés internas de React) sea correctamente transpilada a ES2015 por el `@vitejs/plugin-legacy`. Si el compilador introduce características de JS muy modernas, verificar que estén incluidas en los `additionalLegacyPolyfills` (como se definió en la regla de Vite) para evitar que la app colapse en Tizen 3.0 o webOS 3.
- **REGLA C1.3 - Estructura Defensiva Primero:** Aunque el React Compiler esté activo, **no ser perezoso** con la arquitectura. La Regla F4.2 (Minimizar Estado de Foco en Padres) sigue vigente. El compilador es una red de seguridad para el rendimiento, no una excusa para poner estados globales de navegación en el componente raíz.

## Gestión de Foco Espacial (Norigin)

### 1. Estructura y Contexto de Zonas

- **REGLA F1.1 - Aislamiento por Zonas:** **Siempre** envolver las secciones lógicas de la interfaz (Sidebar, Header, Player Controls, Grid de Canales) en su propio `FocusContext.Provider`. Nunca debe haber un mar de elementos enfocables sin un contexto padre.
- **REGLA F1.2 - Nombres de Llaves de Foco (focusKey):** Todas las llaves de foco (`focusKey`) deben seguir una nomenclatura estricta y descriptiva. No permitir autogeneración aleatoria de llaves si el elemento necesita ser referenciado. Formato: `[Zona]-[Componente]-[ID]`. (Ejemplo: `sidebar-btn-movies`, `grid-channel-15`).

### 2. Memoria y Navegación Intuitiva

- **REGLA F2.1 - Retorno Seguro (saveLastFocusedChild):** Todo `useFocusable` que actúe como contenedor de una zona (como un Sidebar o una fila de películas) debe implementar obligatoriamente `saveLastFocusedChild: true`. Esto garantiza que al salir y volver a la zona, el sistema recuerde la última selección del usuario en lugar de saltar al primer elemento.
- **REGLA F2.2 - Prevención de Foco Perdido (autoRestoreFocus):** El contenedor principal (`App` o el Layout base) debe tener `autoRestoreFocus: true`. Si un componente enfocado se desmonta de la pantalla (por ejemplo, un canal que desaparece de la grilla), el sistema debe auto-restaurar el foco al elemento más cercano para que el usuario no se quede sin cursor.

### 3. Control y Bloqueo de Foco (Trapping)

- **REGLA F3.1 - Trampas de Foco en Modales y Sidebar Expandido:** Cuando se abre un Modal, un Teclado Virtual (OSD) o el Sidebar en modo expandido, restringir la navegación usando la API de Norigin para evitar que el foco se escape al contenido de fondo.
- **REGLA F3.2 - Redirección Forzada:** Si el usuario presiona "Derecha" estando en el último botón del Sidebar, y el Sidebar no está diseñado para cerrarse con esa acción, usar los callbacks direccionales de Norigin (`onArrowRight`) para retornar `false` y bloquear el movimiento.

### 4. Rendimiento y Re-renderizados (Crítico para TVs)

- **REGLA F4.1 - Foco Imperativo Seguro (`setFocus`):** Usar la función `setFocus('focusKey')` proveída por Norigin de manera imperativa **solo en `useEffect`** o como respuesta a eventos (ej: al cargar el reproductor, forzar el foco al botón de Pausa).
- **REGLA F4.2 - Minimizar Estado de Foco en Padres:** El booleano `focused` devuelto por `useFocusable` **solo** debe ser consumido en el componente de nivel más bajo posible (el botón o tarjeta visual). No pasar el estado `focused` a componentes padres gigantes, ya que causará re-renderizados masivos en el DOM cada vez que el usuario presione una flecha.

### 5. Interacción de Scroll y Visibilidad

- **REGLA F5.1 - Foco a la Vista (Scroll into View):** Asegurar que el elemento enfocado siempre esté visible. Cuando un componente recibe el estado `focused`, debe disparar suavemente el scroll del contenedor padre si se encuentra fuera de la pantalla. En TVs, esto se hace animando el contenedor padre mediante `transform: translateY(...)`, no usando las barras de scroll nativas del navegador.

### 6. Usos de hover y clic

- **REGLA F6.1:** Pensar en el uso de Magic Mouse, por lo que el hover debe tener los estilos del foco.
- **REGLA F6.2:** El clic debe actuar también como si se presiona enter sobre un componente.

## Componente VideoPlayer (HLS + IMA SDK)

El componente `VideoPlayer` es un reproductor de video basado en **Hls.js** para streaming HLS y el **IMA SDK de Google** para publicidad (VAST/VMAP). Debe ser modular, encapsulado y portable. La guía completa está en `VIDEO_PLAYER_GUIDE.md`.

- **REGLA V1.1 - Dependencias Obligatorias:** Usar `hls.js`, `@glomex/vast-ima-player`, `axios` y `he`. No reemplazar estas librerías por alternativas sin pedir autorización.
- **REGLA V1.2 - Estructura del Módulo:** El reproductor vive en `src/components/VideoPlayer` con esta organización: `VideoPlayer.tsx` (orquestador principal), `hooks/` (lógica HLS, Ads y Analytics separada), `ads/` (integración IMA SDK), `UI/` (Seekbar, botones, barras de control) y `types/` (interfaces TypeScript).
- **REGLA V1.3 - API de Props (`VideoPlayerProps`):** Respetar el contrato existente: `src` (m3u8, requerido), `title` (requerido), `description`, `isLive` (desactiva seekbar), `vastUrl` (VAST/VMAP), `autoplay` (por defecto `true`), `onBack`, `initialSeconds`, `episodes` (`Chapter[]`), `currentEpisodeKey`, `onEpisodeSelect` y `programBackgroundImage`. No modificar props existentes sin actualizar la guía.
- **REGLA V1.4 - Theming con Variables CSS:** El reproductor consume variables CSS globales (`--clr-primary`, `--foc-primary`, `--clr-secondary-button`, etc.) definidas en `:root` de `index.css`. Nunca usar colores estáticos dentro del reproductor.
- **REGLA V1.5 - Limpieza de Memoria:** El componente debe limpiar automáticamente el objeto HLS y los listeners de anuncios al desmontarse. Cualquier cambio debe preservar esta garantía.
- **REGLA V1.6 - Atajos de Teclado:** Mantener el mapeo del reproductor: con la UI oculta, cualquier tecla de navegación la muestra; `Espacio/Enter` pausa + muestra UI; `Flechas Izq/Der` (VOD) muestra UI + foco en seekbar para hold-to-seek; `Flechas Arriba/Abajo` muestra UI + foco en play/pause; `Back/Return` (ESC, Backspace, Samsung 10009, LG 461) ejecuta `onBack`. Usar el mapa de constantes de `keycodes.ts` (REGLA 3.1).
- **REGLA V1.7 - Prioridad de Publicidad:** Si se provee `vastUrl`, el reproductor debe priorizar la carga del anuncio antes de iniciar el contenido principal.
