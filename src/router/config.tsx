import { Navigate, type RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "@/layout/MainLayout";
import ProtectedRoute from "@/router/ProtectedRoute";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";

const HomeView = lazy(() => import("@/pages/Home/HomeView"));
const SearchView = lazy(() => import("@/pages/Search/SearchView"));
const ProgramsView = lazy(() => import("@/pages/Programs/ProgramsView"));
const ProgramPage = lazy(() => import("@/pages/Program/index"));
// Vista original con PiP shrink:
// const PlayerView = lazy(() => import("@/pages/Player/PlayerView"));
// Vista alternativa con card overlay:
const PlayerView = lazy(() => import("@/pages/Player/PlayerViewAlt"));
const LoginView = lazy(() => import("@/pages/Auth/LoginView"));
const RegisterView = lazy(() => import("@/pages/Auth/RegisterView"));
const WhoIsThereView = lazy(() => import("@/pages/Profiles/WhoIsThereView"));
const ProfilesView = lazy(() => import("@/pages/Profiles/ProfilesView"));
const EditProfileView = lazy(() => import("@/pages/Profiles/EditProfileView"));
const AvatarSelectView = lazy(() => import("@/pages/Profiles/AvatarSelectView"));
const MyListView = lazy(() => import("@/pages/MyList/MyListView"));
const AccountInfoView = lazy(() => import("@/pages/MiLatina/AccountInfoView"));
const CategoryView = lazy(() => import("@/pages/Category/CategoryView"));
// const MyAccountView = lazy(() => import("@/pages/MyAccount/MyAccountView"));
const LiveView = lazy(() => import("@/pages/Live/LiveView"));
const EventView = lazy(() => import("@/pages/Event/EventView"));
// const TVPairView = lazy(() => import("@/pages/TV/TVPairView"));
// const NotFoundView = lazy(() => import("@/pages/Error/NotFoundView"));

/**
 * Precarga los chunks JS de las vistas principales del sidebar.
 * Se llama después de que la app inicie para eliminar el delay
 * de carga cuando el usuario navega por el sidebar.
 */
export function prefetchMainViews() {
    setTimeout(() => {
        import("@/pages/Home/HomeView");
        import("@/pages/Live/LiveView");
        import("@/pages/Search/SearchView");
        import("@/pages/Programs/ProgramsView");
        import("@/pages/MyList/MyListView");
    }, 3000); // Esperar 3s para no competir con la carga inicial
}

const Lazy = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<FullScreenSpinner />}>{children}</Suspense>
);

export const APP_ROUTES: RouteObject[] = [
    { path: "auth/register", element: <Lazy><RegisterView /></Lazy> },
    { path: "auth/login", element: <Lazy><LoginView /></Lazy> },
    {
        element: <ProtectedRoute />,
        children: [
            { path: "whoisthere", element: <Lazy><WhoIsThereView /></Lazy> },
        ],
    },
    {
        id: "root",
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/whoisthere" replace /> },
            {
                path: "play/:program/:segment/:season/:chapter",
                element: <Lazy><PlayerView /></Lazy>,
            },
            /* Rutas protegidas — requieren token */
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "home", element: <Lazy><HomeView /></Lazy> },
                    { path: "buscar", element: <Lazy><SearchView /></Lazy> },
                    { path: "programas", element: <Lazy><ProgramsView /></Lazy> },
                    { path: "programas/:slug", element: <Lazy><ProgramPage /></Lazy> },
                    { path: "categoria/:slug", element: <Lazy><CategoryView /></Lazy> },
                    { path: "eventos/:slug", element: <Lazy><EventView /></Lazy> },
                    { path: "live", element: <Lazy><LiveView /></Lazy> },
                    { path: "mi-lista", element: <Lazy><MyListView /></Lazy> },
                    { path: "mi-latina/cuenta", element: <Lazy><AccountInfoView /></Lazy> },
                    { path: "mi-latina", element: <Lazy><ProfilesView /></Lazy> },
                    { path: "mi-latina/nuevo", element: <Lazy><EditProfileView /></Lazy> },
                    { path: "mi-latina/:id", element: <Lazy><EditProfileView /></Lazy> },
                    { path: "mi-latina/avatar", element: <Lazy><AvatarSelectView /></Lazy> },
                ],
            },
        ],
    }
];

