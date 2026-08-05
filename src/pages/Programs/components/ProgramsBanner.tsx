import { useState, useEffect } from "react";
import type { Program } from "@/interfaces/catalog.interface";

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
          style={{
            position: "fixed", inset: 0, zIndex: -20, width: "100%", height: "100%", transformOrigin: "center", transition: "all 1s ease-in-out",
            opacity: img.loaded ? 1 : 0, transform: img.loaded ? "scale(1)" : "scale(1.05)",
            backgroundImage: `url(${img.src})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "var(--clr-primary)", backgroundRepeat: "no-repeat"
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
      <div style={{ position: "fixed", inset: "0 0 auto 0", height: "100vh", background: "linear-gradient(to bottom, rgba(var(--clr-primary-rgb), 0.8), rgba(var(--clr-primary-rgb), 0.4), transparent)", pointerEvents: "none", zIndex: -10 }} />
      <div style={{ position: "fixed", inset: "0 auto 0 0", width: "50%", background: "linear-gradient(to right, rgba(var(--clr-primary-rgb), 0.8), rgba(var(--clr-primary-rgb), 0.4), transparent)", pointerEvents: "none", zIndex: -10 }} />
      <div style={{ position: "fixed", inset: "auto 0 0 0", height: "100vh", background: "linear-gradient(to top, var(--clr-primary), rgba(var(--clr-primary-rgb), 0.6), transparent)", pointerEvents: "none", zIndex: -10 }} />
    </>
  );
}
