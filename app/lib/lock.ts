"use client";

import { useSyncExternalStore } from "react";

/** Verrouillage de la tablette : le bouton d'arrêt de la barre d'état met l'écran en veille */
let locked = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

export function isLocked() {
  return locked;
}

export function setLocked(next: boolean) {
  if (next === locked) return;
  locked = next;
  emit();
}

export const lock = () => setLocked(true);
export const unlock = () => setLocked(false);

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLocked() {
  return useSyncExternalStore(subscribe, isLocked, () => false);
}
