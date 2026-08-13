**Objetivo:** Al generar código HTML, CSS o componentes, debes utilizar exclusivamente las variables dinámicas insertadas en la aplicación para los colores importantes (textos, fondos, botones, gradientes y estados de foco). **Bajo ninguna circunstancia debes usar colores estáticos (HEX, RGB, etc.)** para estos elementos clave.

**Variables Disponibles:**

-   `--clr-edit`
-   `--clr-icon`
-   `--clr-primary`
-   `--clr-primary-button`
-   `--clr-primary-subtitle`
-   `--clr-primary-text`
-   `--clr-primary-title`
-   `--clr-secondary`
-   `--clr-secondary-button`
-   `--clr-secondary-subtitle`
-   `--clr-secondary-text`
-   `--clr-secondary-title`
-   `--clr-text-primary-button`
-   `--clr-text-secondary-button`
-   `--clr-text-tertiary-button`
-   `--foc-primary`
-   `--foc-secondary`
-   `--foc-tertiary`
-   `--grad-banner`
-   `--grad-sidebar`

**Reglas de Implementación:**

1.  **Uso mediante Clases (Prioridad):** Construye las clases utilizando la estructura `propiedad-var(--variable)`.
    
    -   **Textos:** Usa `text-var(--variable)` (ej. `text-var(--clr-primary-text)`).
    -   **Fondos:** Usa `bg-var(--variable)` (ej. `bg-var(--clr-primary)` o `bg-var(--grad-banner)`).
    -   **Bordes:** Usa `border-var(--variable)` (ej. `border-var(--clr-secondary)`).
2.  **Uso mediante Estilos en Línea (Cuando sea necesario):** Si el contexto técnico requiere estilos en línea o la clase no aplica, debes inyectar la variable usando la función CSS `var()`.
    
    -   Ejemplo: `style="color: var(--clr-secondary-subtitle); background: var(--grad-sidebar);"`