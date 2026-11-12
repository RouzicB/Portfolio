"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { MotionValue } from "framer-motion";
import type { Mood } from "../../lib/mood";

export interface SceneProps {
  /** Progression du scroll à l'intérieur de la scène, de 0 à 1 */
  local: MotionValue<number>;
  /** false quand on revient sur une scène déjà vue : les intros sont raccourcies */
  firstVisit: boolean;
  /** Position de la scène dans le voyage (0 = première) */
  index: number;
}

export interface SceneDef {
  id: string;
  label: string;
  /** Longueur de scroll de la scène, en hauteurs d'écran (1 par défaut) */
  length?: number;
  /** Encart « Objectif » */
  objective?: string;
  /** Pensée en sous-titre à l'arrivée sur la scène */
  thought?: string;
  /** Lumière autour de la tablette */
  mood?: Mood;
  /** Moment critique : l'interface s'efface pour laisser place au choix */
  critical?: boolean;
  render: (props: SceneProps) => ReactNode;
}

export interface JourneyState {
  scene: number;
  scenes: readonly Omit<SceneDef, "render">[];
  goTo: (index: number) => void;
  /** Lecture automatique des scènes (LECTURE / PAUSE) */
  playing: boolean;
  togglePlay: () => void;
}

export const JourneyContext = createContext<JourneyState | null>(null);

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney doit être utilisé dans <Journey>");
  return ctx;
}
