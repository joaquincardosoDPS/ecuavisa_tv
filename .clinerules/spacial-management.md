### 🎯 Reglas de Agente: Gestión de Foco Espacial (Norigin)

#### 1\. Estructura y Contexto de Zonas

-   **REGLA F1.1 - Aislamiento por Zonas:** El agente **siempre** debe envolver las secciones lógicas de la interfaz (Sidebar, Header, Player Controls, Grid de Canales) en su propio `FocusContext.Provider`. Nunca debe haber un mar de elementos enfocables sin un contexto padre.
-   **REGLA F1.2 - Nombres de Llaves de Foco (focusKey):** Todas las llaves de foco (`focusKey`) deben seguir una nomenclatura estricta y descriptiva. El agente no debe permitir autogeneración aleatoria de llaves si el elemento necesita ser referenciado. Formato: `[Zona]-[Componente]-[ID]`. (Ejemplo: `sidebar-btn-movies`, `grid-channel-15`).

#### 2\. Memoria y Navegación Intuitiva

-   **REGLA F2.1 - Retorno Seguro (saveLastFocusedChild):** Todo `useFocusable` que actúe como contenedor de una zona (como un Sidebar o una fila de películas) debe implementar obligatoriamente `saveLastFocusedChild: true`. Esto garantiza que al salir y volver a la zona, el sistema recuerde la última selección del usuario en lugar de saltar al primer elemento.
-   **REGLA F2.2 - Prevención de Foco Perdido (autoRestoreFocus):** El contenedor principal (`App` o el Layout base) debe tener `autoRestoreFocus: true`. Si un componente enfocado se desmonta de la pantalla (por ejemplo, un canal que desaparece de la grilla), el sistema debe auto-restaurar el foco al elemento más cercano para que el usuario no se quede sin cursor.

#### 3\. Control y Bloqueo de Foco (Trapping)

-   **REGLA F3.1 - Trampas de Foco en Modales y Sidebar Expandido:** Cuando se abre un Modal, un Teclado Virtual (OSD) o el Sidebar en modo expandido, el agente debe restringir la navegación usando la API de Norigin para evitar que el foco se escape al contenido de fondo.
-   **REGLA F3.2 - Redirección Forzada:** Si el usuario presiona "Derecha" estando en el último botón del Sidebar, y el Sidebar no está diseñado para cerrarse con esa acción, el agente debe usar los callbacks direccionales de Norigin (`onArrowRight`) para retornar `false` y bloquear el movimiento.

#### 4\. Rendimiento y Re-renderizados (Crítico para TVs)

-   **REGLA F4.1 - Foco Imperativo Seguro (`setFocus`):** El agente debe usar la función `setFocus('focusKey')` proveída por Norigin de manera imperativa **solo en `useEffect`** o como respuesta a eventos (ej: al cargar el reproductor, forzar el foco al botón de Pausa).
-   **REGLA F4.2 - Minimizar Estado de Foco en Padres:** El booleano `focused` devuelto por `useFocusable` **solo** debe ser consumido en el componente de nivel más bajo posible (el botón o tarjeta visual). El agente no debe pasar el estado `focused` a componentes padres gigantes, ya que causará re-renderizados masivos en el DOM cada vez que el usuario presione una flecha.

#### 5\. Interacción de Scroll y Visibilidad

-   **REGLA F5.1 - Foco a la Vista (Scroll into View):** El agente debe asegurar que el elemento enfocado siempre esté visible. Cuando un componente recibe el estado `focused`, debe disparar suavemente el scroll del contenedor padre si se encuentra fuera de la pantalla. En TVs, esto se hace animando el contenedor padre mediante `transform: translateY(...)`, no usando las barras de scroll nativas del navegador.

#### 6\. Usos de hover y clic
-    **REGLA F6.1 - Se debe pensar en el uso de Magic Mouse, por lo que el hover debe tener los estilos del foco.
-    **REGLA F6.2 - El clic debe actuar también como si se presiona enter sobre un componente.