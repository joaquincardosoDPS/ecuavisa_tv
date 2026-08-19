import { useNavigate } from "react-router-dom";
import { useCarouselFocus } from "@/hooks/tv/useCarouselFocus";
import styles from "./EmptyList.module.css";

function EmptyList() {
  const navigate = useNavigate();
  const { ref, focused } = useCarouselFocus({
    focusKey: "mylist-empty-add",
    onEnterPress: () => navigate('/buscar'),
  });

  return (
    <div className={styles.emptyListContainer}>
      <button
        ref={ref}
        onClick={() => navigate('/buscar')}
        className={`${styles.addButton}${focused ? ` ${styles.focused}` : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v16m8-8H4"/>
        </svg>
      </button>
      <h1 className={styles.titleText}>Tu lista está vacía</h1>
      <p className={styles.subtitleText}>El contenido que agregues a tu lista aparecerá aquí</p>
    </div>
  );
}
export default EmptyList;
