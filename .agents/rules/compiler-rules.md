---
trigger: always_on
---

### 🧠 Regla de Agente: React Compiler y Optimización

-   **REGLA C1.1 - Uso de React Compiler para Rendimiento:** El agente debe configurar y utilizar el React Compiler para automatizar la memorización de componentes. Esto es crucial en aplicaciones de TV manejadas por teclado/D-Pad, donde los cambios rápidos de estado (el movimiento del cursor) pueden causar cascadas de re-renderizados costosos en la CPU del televisor.
-   **REGLA C1.2 - Requisito de Versión y Polyfills:** El React Compiler requiere React 19+. El agente debe asegurarse de que la salida compilada (que incluye llamadas a cachés internas de React) sea correctamente transpilada a ES2015 por el `@vitejs/plugin-legacy`. Si el compilador introduce características de JS muy modernas, el agente debe verificar que estén incluidas en los `additionalLegacyPolyfills` (como definimos en la regla de Vite) para evitar que la app colapse en Tizen 3.0 o webOS 3.
-   **REGLA C1.3 - Estructura Defensiva Primero:** Aunque el React Compiler esté activo, el agente **no debe ser perezoso** con la arquitectura. La Regla F4.2 (Minimizar Estado de Foco en Padres) sigue vigente. El compilador es una red de seguridad para el rendimiento, no una excusa para poner estados globales de navegación en el componente raíz.