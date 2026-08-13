import { Spinner } from "@/components/ui/Spinner";
import styles from "./PlayerLoading.module.css";

interface PlayerLoadingProps {
  chapterImage: string;
}

export function PlayerLoading({ chapterImage }: PlayerLoadingProps) {
  return (
    <div
      className={styles.container}
      style={{
        background: chapterImage
          ? `url(${chapterImage}) center/cover no-repeat #000`
          : "#000",
      }}
    >
      <Spinner />
    </div>
  );
}
