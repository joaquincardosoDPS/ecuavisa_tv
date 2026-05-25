import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router"
import { FullScreenSpinner } from "./components/ui/FullScreenSpinner";
import { useAppInitialization } from "./hooks/useAppInitilization";


function App() {
  const { isLoading, isError } = useAppInitialization();

  if (isLoading) return <FullScreenSpinner />;
  if (isError) return <div>Error crítico al iniciar la aplicación.</div>;


  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
