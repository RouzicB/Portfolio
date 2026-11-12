"use client";

import { createContext, useContext, type RefObject } from "react";

/**
 * L'écran de la tablette est la zone qui défile (la fenêtre ne défile plus) :
 * le voyage de l'accueil, la progression des pages et les flèches s'y rapportent.
 */
export const SCREEN_ID = "tablet-screen";
/** Calque posé sur l'écran (objectif, sous-titres) */
export const OVERLAY_ID = "tablet-overlay";
/** Pied de la tablette (page n/N, frise, commandes) */
export const FOOTER_ID = "tablet-footer";

export const ScreenContext = createContext<RefObject<HTMLElement | null> | null>(null);

/** Référence de la zone qui défile, pour useScroll({ container }) */
export function useScreenRef() {
  const ref = useContext(ScreenContext);
  if (!ref) throw new Error("useScreenRef doit être utilisé dans la tablette");
  return ref;
}

export function getScreen() {
  return typeof document === "undefined" ? null : document.getElementById(SCREEN_ID);
}

export function screenScrollTo(top: number, behavior: ScrollBehavior = "smooth") {
  getScreen()?.scrollTo({ top, behavior });
}

/** Défile d'une fraction de la hauteur de l'écran (flèches « page suivante / précédente ») */
export function screenTurn(dir: number, behavior: ScrollBehavior = "smooth") {
  const el = getScreen();
  el?.scrollBy({ top: dir * el.clientHeight * 0.85, behavior });
}
