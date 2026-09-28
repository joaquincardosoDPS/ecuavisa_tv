import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig(() => {
  return {
    base: "./",
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

