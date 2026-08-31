import { useState, useEffect } from "react";
import type { Program } from "@/interfaces/catalog.interface";
import styles from "./ProgramsBanner.module.css";

interface ProgramsBannerProps {
  activeProgram: Program | null;
}

export default function ProgramsBanner({ activeProgram }: ProgramsBannerProps) {
  const currentBgImage = activeProgram?.image_slider?.big || activeProgram?.image_background?.big || activeProgram?.image_land?.big || "";
  const [images, setImages] = useState<{ src: string; loaded: boolean }[]>(currentBgImage ? [{ src: currentBgImage, loaded: true }] : []);

  useEffect(() => {
    if (!currentBgImage) return;
    setImages((prev) => {
      const lastImage = prev[prev.length - 1];
      if (lastImage && lastImage.src === currentBgImage) return prev;
      const lastLoaded = prev.filter((img) => img.loaded).slice(-1);
      return [...lastLoaded, { src: currentBgImage, loaded: false }];
    });
  }, [currentBgImage]);

  if (!activeProgram) return null;

  return (
    <>
      {images.map((img) => (
        <div
          key={img.src}
          className={styles.backgroundImage}
          style={{
            opacity: img.loaded ? 1 : 0, transform: img.loaded ? "scale(1)" : "scale(1.05)",
            backgroundImage: `url(${img.src})`,
          }}
          ref={(el) => {
            if (el && !img.loaded) {
              const preload = new Image();
              preload.onload = () => setImages((prev) => prev.map((i) => i.src === img.src ? { ...i, loaded: true } : i));
              preload.src = img.src;
            }
          }}
        />
      ))}
      <div className={styles.gradientTop} />
      <div className={styles.gradientLeft} />
      <div className={styles.gradientBottom} />
    </>
  );
}
