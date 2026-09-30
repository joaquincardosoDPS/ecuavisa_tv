﻿import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import legacy from "@vitejs/plugin-legacy";

// Subcarpeta donde se publica la versión web en el servidor (url_base/ecuavisa-tv/).
const WEB_BASE = "/ecuavisa-tv/";

export default defineConfig(({ mode }) => {
  return {
    // - mode "web" (npm run build:web): build para el servidor, servido desde
    //   url_base/ecuavisa-tv/. BrowserRouter toma el basename de acá (BASE_URL).
    // - resto (dev, build, build:webos/tizen/hisense): rutas relativas, necesarias
    //   para las apps de TV que corren desde file://.
    base: mode === "web" ? WEB_BASE : "./",
    plugins: [
      react(),
      legacy({
        targets: ["Chrome >= 47"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        renderLegacyChunks: true,
      }),
    ],
    build: {
      minify: "terser" as const,
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          // Los console.log/info/debug cuestan caro en las CPUs de TV: eliminar siempre en build
          pure_funcs: ["console.log", "console.info", "console.debug"],
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
