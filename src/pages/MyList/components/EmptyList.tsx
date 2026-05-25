import { useNavigate } from "react-router-dom";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import plusRaw from "@/assets/img/icons/plus.svg?raw";
import styles from "../MyList.module.css";

function EmptyList() {
  const navigate = useNavigate();

  const { ref, focused } = useFocusable({
    focusKey: "MYLIST-EMPTY-BTN",
    onEnterPress: () => navigate("/buscar"),
  });

  const btnClass = [
    styles.emptyBtn,
    focused && styles.emptyBtnFocused,
  ].filter(Boolean).join(" ");

  return (
    <div className={styles.emptyContainer}>
      <button
        ref={ref}
        className={btnClass}
        onClick={() => navigate("/buscar")}
        dangerouslySetInnerHTML={{
          __html: plusRaw
            .replace(/width="[^"]*"/, 'width="80"')
            .replace(/height="[^"]*"/, 'height="80"')
            .replace(/stroke="[^"]*"/, 'stroke="currentColor"'),
        }}
      />
      <h1 className={styles.emptyTitle}>Tu lista está vacía</h1>
      <p className={styles.emptySubtitle}>
        El contenido que agregues a tu lista aparecerá aquí
      </p>
    </div>
  );
}

export default EmptyList;
