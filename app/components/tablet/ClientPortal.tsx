"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};

/**
 * Rend son contenu directement dans <body> : les éléments fixes (barre basse, panneaux)
 * restent collés à l'écran même quand la page ondule (transform) pendant un retour en arrière.
 */
export default function ClientPortal({ children }: Readonly<{ children: ReactNode }>) {
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
  return mounted ? createPortal(children, document.body) : null;
}
