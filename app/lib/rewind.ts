"use client";

import { useSyncExternalStore } from "react";
import { flashLoading } from "./diode";

/**
 * Reconstruction : remonter le temps comme on rejoue une scène analysée.
 * L'écran passe au bleu, des lignes de balayage le traversent, la tablette « glitche »
 * et la diode passe au jaune le temps de l'effet.
 */
let effect = false;
let effectTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

export function getRewindEffect() {
  return effect;
}

/** Retour en arrière visible (page précédente, remontée de l'accueil) pendant `ms` */
export function playRewind(ms = 1000) {
  flashLoading(ms);
  clearTimeout(effectTimer);
  if (!effect) {
    effect = true;
    emit();
  }
  effectTimer = setTimeout(() => {
    effect = false;
    emit();
  }, ms);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useRewindEffect() {
  return useSyncExternalStore(subscribe, getRewindEffect, () => false);
}
