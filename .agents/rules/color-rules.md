---
trigger: always_on
---

### 🎨 Reglas de Agente: Variables CSS y Colores Dinámicos

#### 1. Variables CSS Dinámicas (cargadas desde la API)

Usar las variables dinámicas insertadas al iniciar la app para los colores importantes:

| Variable                       | Fallback   | Uso principal                           |
|-------------------------------|------------|------------------------------------------|
| `--clr-primary`               | `#001a28`  | Color de fondo principal                 |
| `--clr-secondary`             | `#0a2a3c`  | Color de fondo secundario                |
| `--clr-primary-title`         | `#ffffff`  | Títulos principales                      |
| `--clr-secondary-title`       | `#cccccc`  | Títulos secundarios                      |
| `--clr-primary-button`        | `#ff1376`  | Background de botón primario             |
| `--clr-secondary-button`      | `#2a4a5c`  | Background de botón secundario           |
| `--clr-primary-subtitle`      | `#ffffff`  | Subtítulos principales                   |
| `--clr-secondary-subtitle`    | `#aaaaaa`  | Subtítulos secundarios                   |
| `--clr-primary-text`          | `#ffffff`  | Texto principal                          |
| `--clr-secondary-text`        | `#b0b0b0`  | Texto secundario / descripciones         |
| `--clr-text-primary-button`   | `#ffffff`  | Texto dentro de botón primario           |
| `--clr-text-secondary-button` | `#ffffff`  | Texto dentro de botón secundario         |
| `--clr-text-tertiary-button`  | `#ffffff`  | Texto dentro de botón terciario          |
| `--clr-icon`                  | `#ffffff`  | Color de iconos                          |
| `--clr-edit`                  | `#ff1376`  | Color de edición                         |
| `--foc-primary`               | `#ff1376`  | Color de foco principal (D-Pad)          |
| `--foc-secondary`             | `#ff1376`  | Color de foco secundario                 |
| `--foc-tertiary`              | `#ff1376`  | Color de foco terciario                  |
| `--grad-banner`               | `#001a28`  | Gradiente del banner                     |
| `--grad-sidebar`              | `#054668`  | Gradiente del sidebar                    |

#### 2. Reglas de Uso

-   **REGLA CLR1 - Usar variables CSS, nunca colores hardcodeados:** El agente debe usar `var(--variable)` para todos los colores temáticos. Nunca usar valores hexadecimales hardcodeados para colores que vienen de la API.

-   **REGLA CLR2 - Fallback obligatorio en CSS:** Toda referencia a una variable CSS de color **debe** incluir un valor fallback inline:
    ```css
    /* ✅ CORRECTO */
    color: var(--clr-primary-text, #ffffff);
    background: var(--clr-primary, #001a28);
    
    /* ❌ INCORRECTO */
    color: var(--clr-primary-text);
    ```
    Los fallbacks aseguran que la UI sea visible mientras la API no haya respondido o en Smart TVs donde el ponyfill tarda en iniciar.

-   **REGLA CLR3 - Los fallbacks deben coincidir con `:root`:** El valor fallback en `var(--variable, fallback)` **debe ser el mismo** que el valor declarado en `:root` de `index.css`. No inventar colores diferentes.

#### 3. Ponyfill para Smart TVs (CSS Custom Properties)

-   **REGLA CLR4 - css-vars-ponyfill obligatorio:** Las Smart TVs antiguas (webOS 3 / Chrome < 49) **no soportan CSS Custom Properties** nativamente. El ponyfill `css-vars-ponyfill` debe:
    1. Inicializarse en `main.tsx` con `watch: true` y `silent: true`.
    2. Re-ejecutarse explícitamente en `applyConfigToCSS()` después de actualizar variables desde la API.

-   **REGLA CLR5 - Inyección dual de variables:** Al actualizar variables desde la API, el agente **siempre** debe hacer dos cosas:
    1. Aplicar con `root.style.setProperty('--var', value)` — para browsers modernos.
    2. Inyectar un `<style id="__config-vars__">` con las variables y re-ejecutar `cssVars()` — para el ponyfill en TVs legacy.

-   **REGLA CLR6 - Toda la lógica en `applyConfigToCSS.ts`:** El agente **no debe** dispersar `setProperty` de variables de color en múltiples archivos. Toda la lógica de aplicación de colores/fuentes desde la API debe pasar por `src/utils/applyConfigToCSS.ts`.

#### 4. Variables de Tipografía y Dimensiones

Las variables de fuente y dimensiones definidas en `:root` de `index.css` (prefijos `--font-`, `--tam-`, `--bor-`, `--card-`) son estáticas y **no** se modifican desde la API. Se usan directamente en el CSS.