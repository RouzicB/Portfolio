"use client";

import { useSyncExternalStore } from "react";
import { getScreen } from "./screen";

/** Découpe une longue page en « pages » de la hauteur de l'écran : page courante et nombre total */
export function pageCount(scrollY: number, viewport: number, docHeight: number) {
  const total = Math.max(1, Math.ceil((docHeight - viewport * 0.25) / viewport));
  const current = Math.min(total, Math.floor((scrollY + viewport * 0.5) / viewport) + 1);
  return { current, total };
}

function subscribe(listener: () => void) {
  const el = getScreen();
  el?.addEventListener("scroll", listener, { passive: true });
  window.addEventListener("resize", listener);
  // La hauteur du contenu change aussi sans scroll (navigation, filtres…)
  const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(listener);
  if (el?.firstElementChild) observer?.observe(el.firstElementChild);
  return () => {
    el?.removeEventListener("scroll", listener);
    window.removeEventListener("resize", listener);
    observer?.disconnect();
  };
}

const snapshot = () => {
  const el = getScreen();
  if (!el) return "1/1";
  const { current, total } = pageCount(el.scrollTop, el.clientHeight, el.scrollHeight);
  return `${current}/${total}`;
};

/** « Page n/N » de l'écran de la tablette, mis à jour au scroll */
export function usePageCount() {
  const [current, total] = useSyncExternalStore(subscribe, snapshot, () => "1/1")
    .split("/")
    .map(Number);
  return { current, total };
}
