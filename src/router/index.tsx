import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { APP_ROUTES } from "./config";
import { BASENAME } from "@/config-global";

// En Smart TV (Tizen/webOS) la app se instala y se ejecuta desde file://.../index.html.
// Ahí el path del navegador no coincide con el basename y <BrowserRouter> no
// renderiza nada (pantalla en blanco/color fijo). En ese caso usamos HashRouter,
// que genera URLs tipo file://.../index.html#/... y funciona sin importar la ruta.
const isFileProtocol =
  typeof window !== "undefined" && window.location.protocol === "file:";

export const appRouter = isFileProtocol
  ? createHashRouter(APP_ROUTES)
  : createBrowserRouter(APP_ROUTES, {
      basename: BASENAME,
    });