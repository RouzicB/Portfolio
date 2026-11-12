"use client";

import { useSyncExternalStore } from "react";

/** État de la diode de l'en-tête : bleu = normal, jaune = chargement, rouge = erreur */
export type DiodeState = "ok" | "loading" | "error";

let current: DiodeState = "ok";
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

export function getDiode() {
  return current;
}

export function setDiode(next: DiodeState) {
  clearTimeout(timer);
  if (next === current) return;
  current = next;
  emit();
}

/** Passe en « chargement » pendant `ms`, puis revient à la normale (sauf erreur entre-temps) */
export function flashLoading(ms = 900) {
  if (current === "error") return;
  setDiode("loading");
  timer = setTimeout(() => {
    if (current !== "loading") return;
    current = "ok";
    emit();
  }, ms);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useDiode() {
  return useSyncExternalStore(subscribe, getDiode, () => "ok" as const);
}
