import { useRef } from "react";
import styles from "./Tabs.module.css";

export type TabKey = "relacionados" | "detalles";

interface TabsProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 50);
  };

  const getTabStyle = (isActive: boolean) => ({
    paddingBottom: "1.25rem", paddingLeft: "0.5rem", paddingRight: "0.5rem", height: "100%", cursor: "pointer", borderBottom: "4px solid", marginBottom: "-2px", transition: "colors 0.2s",
    borderColor: isActive ? "var(--clr-primary-title)" : "transparent",
    color: isActive ? "var(--clr-primary-title)" : "var(--clr-secondary-text)",
    background: "none", borderTop: "none", borderLeft: "none", borderRight: "none", fontSize: "1.25rem", fontWeight: 500
  });

  return (
    <div ref={tabsRef} className={styles.tabsContainer}>
      <div className={styles.tabsList}>
        <button onClick={() => { setActiveTab("relacionados"); scrollToBottom(); }} style={getTabStyle(activeTab === "relacionados")}>Relacionados</button>
        <button onClick={() => { setActiveTab("detalles"); scrollToBottom(); }} style={getTabStyle(activeTab === "detalles")}>Detalles</button>
      </div>
    </div>
  );
}
export default Tabs;
