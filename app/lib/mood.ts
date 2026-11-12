"use client";

import { useSyncExternalStore } from "react";

/**
 * Ambiance lumineuse autour de la tablette, d'après la diode des androïdes :
 * stable = bleu · analysis = bleu profond · warm = bleu et lumière chaude
 * alert = jaune (tension) · critical = rouge (erreur, moment critique)
 */
export type Mood = "stable" | "analysis" | "warm" | "alert" | "critical";

/** Couleurs des deux sources de lumière de chaque ambiance */
export const moodLights: Record<Mood, readonly [string, string]> = {
  stable: ["#00d1ff", "#0b4bcc"],
  analysis: ["#4fe0ff", "#6f6bff"],
  warm: ["#00d1ff", "#ffb547"],
  alert: ["#fff500", "#ff9f1c"],
  critical: ["#ff0000", "#7c1d3d"],
};

/** Ambiance imposée pour une page précise (scène de l'accueil, page 404…) */
interface Override {
  mood: Mood;
  path: string;
}

let override: Override | null = null;
const listeners = new Set<() => void>();

export function setMoodOverride(mood: Mood, path: string) {
  if (override?.mood === mood && override.path === path) return;
  override = { mood, path };
  listeners.forEach((l) => l());
}

export function clearMoodOverride(path: string) {
  if (override?.path !== path) return;
  override = null;
  listeners.forEach((l) => l());
}

export function getMoodOverride() {
  return override;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useMoodOverride() {
  return useSyncExternalStore(subscribe, getMoodOverride, () => null);
}
