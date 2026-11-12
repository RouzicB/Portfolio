"use client";

import { useSyncExternalStore } from "react";

/** Découpe une longue page en « pages » de la hauteur de l'écran : page courante et nombre total */
export function pageCount(scrollY: number, viewport: number, docHeight: number) {
  const total = Math.max(1, Math.ceil((docHeight - viewport * 0.25) / viewport));
  const current = Math.min(total, Math.floor((scrollY + viewport * 0.5) / viewport) + 1);
  return { current, total };
}

function subscribe(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  window.addEventListener("resize", listener);
  return () => {
    window.removeEventListener("scroll", listener);
    window.removeEventListener("resize", listener);
  };
}

const snapshot = () => {
  const { current, total } = pageCount(window.scrollY, window.innerHeight, document.documentElement.scrollHeight);
  return `${current}/${total}`;
};

/** « Page n/N » de la page courante, mis à jour au scroll */
export function usePageCount() {
  const [current, total] = useSyncExternalStore(subscribe, snapshot, () => "1/1")
    .split("/")
    .map(Number);
  return { current, total };
}
