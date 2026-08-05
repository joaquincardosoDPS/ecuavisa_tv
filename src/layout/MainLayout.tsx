import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import styles from "./MainLayout.module.css";
// import Sidebar from "./sidebar/Sidebar";

function MainLayout() {
  return (
    <div className={styles.layout}>
      {/* <Sidebar /> */}
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
