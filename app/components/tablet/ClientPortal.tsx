"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};

/**
 * Rend son contenu ailleurs dans le DOM : dans <body> par défaut (panneaux plein écran),
 * ou dans un emplacement de la tablette (`target` = id : pied, calque de l'écran).
 */
export default function ClientPortal({ children, target }: Readonly<{ children: ReactNode; target?: string }>) {
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
  if (!mounted) return null;
  const node = target ? document.getElementById(target) : document.body;
  return node ? createPortal(children, node) : null;
}
