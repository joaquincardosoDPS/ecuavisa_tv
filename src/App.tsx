import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router"
import { useAppInitialization } from "./hooks/shared/useAppInitilization";


function App() {
  // Config se carga en background — el splash de index.html cubre todo
  // hasta que WhoIsThereView lo remueva cuando los perfiles estén listos.
  useAppInitialization();

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
