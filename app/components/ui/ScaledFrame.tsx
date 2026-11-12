"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Affiche un contenu conçu à taille fixe (baseWidth × baseHeight), réduit pour remplir son parent */
export default function ScaledFrame({
  baseWidth,
  baseHeight,
  children,
}: Readonly<{ baseWidth: number; baseHeight: number; children: ReactNode }>) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / baseWidth));
    observer.observe(el);
    return () => observer.disconnect();
  }, [baseWidth]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-0 top-0 origin-top-left transition-opacity duration-300"
        style={{ width: baseWidth, height: baseHeight, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
