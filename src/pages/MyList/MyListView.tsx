import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullScreenSpinner } from "@/components/ui/FullScreenSpinner";
import ProgramGrid from "@/components/ProgramCard/ProgramGrid";
import Button from "@/components/ui/Button";
import { useMyListData } from "@/hooks/mylist/useMyListData";
import { useHistoryData } from "@/hooks/history/useHistoryData";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { TabSelector } from "./components/TabSelector";
import { HistoryGrid } from "./components/HistoryGrid";
import EmptyList from "./components/EmptyList";
import { BackButton } from "@/components/ui/BackButton";
import styles from "./MyListView.module.css";

type Tab = "favorites" | "history";

function MyListView() {
	useDocumentTitle("Mi Lista");
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<Tab>("favorites");
	const { favorites, isLoading: favLoading, isError: favError, error: favErr, isAuthenticated, fetchNextPage: favNext, hasNextPage: favHasNext, isFetchingNextPage: favFetching } = useMyListData();
	const { historyItems, isLoading: histLoading, isError: histError, error: histErr, fetchNextPage: histNext, hasNextPage: histHasNext, isFetchingNextPage: histFetching } = useHistoryData();

	const isLoading = activeTab === "favorites" ? favLoading : histLoading;
	const isError = activeTab === "favorites" ? favError : histError;
	const error = activeTab === "favorites" ? favErr : histErr;

	return (
		<div className={styles.pageContainer}>
			<BackButton />
			<TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
			{!isAuthenticated ? (
				<div className={styles.authPromptContainer}>
					<p className={styles.authPromptText}>
						Inicia sesión para ver {activeTab === "favorites" ? "tu lista de favoritos" : "tu historial"}.
					</p>
					<Button variant="secondary" onClick={() => navigate("/auth/login")}>Iniciar sesión</Button>
				</div>
			) : isLoading ? (
				<FullScreenSpinner />
			) : isError ? (
				<p className={styles.errorMessage}>
					{error instanceof Error ? error.message : "Error al cargar contenido."}
				</p>
			) : activeTab === "favorites" ? (
				!favorites || favorites.length === 0 ? <EmptyList /> : (
					<ProgramGrid programs={favorites} cols={5} fetchNextPage={favNext} hasNextPage={favHasNext} isFetchingNextPage={favFetching} />
				)
			) : (
				<HistoryGrid items={historyItems} fetchNextPage={histNext} hasNextPage={histHasNext} isFetchingNextPage={histFetching} />
			)}
		</div>
	);
}
export default MyListView;

