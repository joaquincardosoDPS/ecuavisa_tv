### 🖥️ Sistema de Reglas del Proyecto: Smart TV Streaming App

#### 1\. Reglas de Estilos y Compatibilidad (Tailwind vs. Vanilla CSS)

Para Smart TVs, la recomendación principal es usar **CSS Modules con SCSS** o **CSS Puro** en lugar de Tailwind, a menos que configures Tailwind de forma extremadamente estricta. Los motores de navegadores de TVs antiguos (como Tizen 3.0 o webOS 3) pueden tener problemas con hojas de estilo muy pesadas o clases utilitarias excesivas.

-   **REGLA 1.1 - Motor de Estilos:** Usar CSS Modules (`.module.css`) para evitar colisiones de clases y mantener el CSS lo más pequeño posible.
-   **REGLA 1.2 - Animaciones Seguras:** Limitar las animaciones **estrictamente** a las propiedades `transform` (translate, scale) y `opacity`. Animar márgenes, anchos o alturas causará _reflows_ que congelarán la interfaz del televisor.
-   **REGLA 1.3 - Layout Constraints:** Usar Flexbox para todo el diseño. Evitar CSS Grid avanzado o propiedades modernas (como `gap` en Flexbox si se soportan TVs anteriores a 2018), ya que los navegadores web de Hisense o Samsung antiguos podrían no renderizarlos correctamente.
-   **REGLA 1.4 - Tamaños Absolutos:** Usar resoluciones basadas en `1920x1080` (1080p) como viewport base. Escalar usando `vh`, `vw` o `rem` con un tamaño de fuente base ajustado.

#### 2\. Reglas de Navegación Espacial y Foco (D-Pad)

Crear tu propio sistema desde cero puede ser complejo. Te sugiero establecer reglas para implementar una librería probada como `@noriginmedia/norigin-spatial-navigation` (que es el estándar en React para TVs), o en su defecto, un sistema de Contextos estricto.

-   **REGLA 2.1 - Árbol de Foco (Focus Zones):** La aplicación debe dividirse en zonas de foco estrictas (Ej: `SidebarZone`, `PlayerZone`, `GridZone`). El agente nunca debe mezclar la lógica de navegación de dos zonas distintas.
-   **REGLA 2.2 - Movimiento Sidebar vs. Vista:** \* Cuando el `Sidebar` se abre, la aplicación debe hacer un **Trap del foco** (el foco no puede salir del sidebar a menos que se presione la tecla "Derecha" explícitamente para cerrarlo).
    
    -   El sistema debe memorizar el último elemento enfocado en la "Vista principal". Al cerrar el `Sidebar`, el foco **debe retornar exactamente** a la tarjeta o botón que el usuario tenía seleccionado previamente.
-   **REGLA 2.3 - Indicadores Visuales:** Todo elemento enfocable debe tener una clase `.focused`. Esta clase modificará su tamaño (`transform: scale(1.05)`) y añadirá un borde o resplandor claro. El diseño del foco debe ser obvio a 3 metros de distancia.

#### 3\. Reglas de Arquitectura y TypeScript

-   **REGLA 3.1 - Tipado Estricto de Teclas:** Crear un archivo de constantes global (`keycodes.ts`) porque los TVs usan códigos de teclas diferentes al teclado de un PC estándar.
    
    -   _Ejemplo:_ El botón "Atrás" en webOS no es el mismo `keyCode` que el "Return" en Tizen. El agente siempre debe usar el mapa de constantes, nunca el número mágico (ej: `event.keyCode === 10009` para Samsung).
-   **REGLA 3.2 - Componentes Tontos vs. Inteligentes:** Separar estrictamente la lógica de la UI. Los componentes visuales (`Card`, `Button`) solo reciben propiedades y un estado booleano `isFocused`. El manejo de teclas de dirección se hace en componentes contenedores de orden superior (HOC) o Hooks.

#### 4\. Reglas de Interacción con Hardware y Sistema Operativo

-   **REGLA 4.1 - Bloqueo de Salida Accidental:** Interceptar siempre el botón "Back/Return" globalmente. Si el usuario está en el reproductor de video, "Atrás" pausa y muestra la UI. Si está en un menú profundo, "Atrás" sube un nivel. Si está en el Home, "Atrás" debe invocar la API nativa del televisor para cerrar la app (ej: `tizen.application.getCurrentApplication().exit()`), nunca dejar que el navegador haga la acción por defecto.
-   **REGLA 4.2 - Gestión de Memoria (Crucial):** Los TVs se quedan sin memoria rápido. El agente debe usar "Virtualización" (Lazy Loading) para grillas de contenido grandes (ej: si hay 100 canales, solo renderizar en el DOM los 10 visibles).

#### 5\. Reglas de Configuración de Vite

-   **REGLA 5.1 - Targets de Transpilación:** Vite por defecto compila para navegadores modernos. El agente debe configurar `@vitejs/plugin-legacy` en `vite.config.ts` para asegurar que el código se transpila a ES5/ES6 compatible con los motores Chromium antiguos (versión 47+) de los Smart TVs de años anteriores.


**Estructura de Carpetas Obligatoria:**
Debes respetar estrictamente el siguiente árbol. No crees carpetas fuera de esta estructura a menos que el usuario te lo pida explícitamente:
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

#### 5\. Reglas de Comentarios y Documentación (Clean Code)
-    **REGLA 5.1 - Comentarios Profesionales y Minimalistas:** El código generado debe ser autoexplicativo mediante un buen nombrado de variables y funciones. Los comentarios están estrictamente limitados a explicar el **"porqué"** (decisiones de diseño, reglas de negocio específicas o lógica matemática compleja) y nunca el "qué".
-    **RESTRICCIONES ESTRICTAS PARA EL AGENTE:**

1.  **Cero bitácoras de cambios:** NUNCA escribas comentarios sobre las modificaciones que acabas de realizar (ej. `// Se cambió este valor`, `// Agregado para corregir el bug`, `// Nueva función`).
2.  **Cero redundancia:** ESTÁ PROHIBIDO comentar elementos triviales, funciones cortas, _getters/setters_, o agregar un comentario solo porque se creó una nueva variable o función.
3.  **Cero explicaciones literales:** No expliques lo que el código ya dice. Si sientes la necesidad de explicar el código línea por línea, refactoriza el código para que sea legible por sí mismo.