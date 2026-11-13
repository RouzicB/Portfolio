"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import JourneyHud from "./JourneyHud";
import { JourneyContext, type SceneDef } from "./JourneyContext";
import { EASE } from "./motion";
import { flashLoading } from "../../lib/diode";
import { setMoodOverride } from "../../lib/mood";
import { useScreenRef } from "../../lib/screen";

/** Durée de la transition entre deux scènes */
const TRANSITION_S = 0.9;

/* Le nouvel écran se déploie en triangle : depuis le bas quand on descend, depuis le haut quand on remonte */
const SHAPES = {
  down: ["polygon(50% 100%, 50% 100%, 50% 100%)", "polygon(50% -300%, 250% 100%, -150% 100%)"],
  up: ["polygon(50% 0%, 50% 0%, 50% 0%)", "polygon(50% 400%, 250% 0%, -150% 0%)"],
} as const;

interface TransitionCustom {
  dir: number;
  /** Mouvement réduit : simple fondu, sans déploiement */
  reduce: boolean;
}

const shape = (dir: number) => SHAPES[dir > 0 ? "down" : "up"];

/* L'état « center » est identique avec ou sans mouvement réduit : le HTML serveur et client concordent */
const wipe: Variants = {
  enter: ({ dir, reduce }: TransitionCustom) => ({ clipPath: shape(dir)[reduce ? 1 : 0], opacity: reduce ? 0 : 1, zIndex: 2 }),
  center: ({ dir, reduce }: TransitionCustom) => ({
    clipPath: shape(dir)[1],
    opacity: 1,
    zIndex: 2,
    transition: { duration: reduce ? 0.3 : TRANSITION_S, ease: EASE },
  }),
  exit: ({ reduce }: TransitionCustom) => {
    if (reduce) return { zIndex: 1, opacity: 0, transition: { duration: 0.3 } };
    // L'écran précédent s'efface doucement, dans les deux sens
    return { zIndex: 1, opacity: 0, scale: 0.97, filter: "blur(4px)", transition: { duration: TRANSITION_S, ease: EASE } };
  },
};

/** Bornes [début, fin] de chaque scène dans la progression globale (0 → 1), selon leur longueur */
export function sceneBounds(scenes: readonly Pick<SceneDef, "length">[]) {
  const lengths = scenes.map((s) => s.length ?? 1);
  const totalLength = lengths.reduce((sum, l) => sum + l, 0);
  const ends = lengths.map((_, i) => lengths.slice(0, i + 1).reduce((sum, l) => sum + l, 0) / totalLength);
  const bounds = ends.map((end, i) => [i === 0 ? 0 : ends[i - 1], end] as const);
  return { bounds, totalLength };
}

interface SlotProps {
  def: SceneDef;
  index: number;
  range: readonly [number, number];
  progress: MotionValue<number>;
  direction: number;
  firstVisit: boolean;
  reduce: boolean;
}

function SceneSlot({ def, index, range, progress, direction, firstVisit, reduce }: Readonly<SlotProps>) {
  const local = useTransform(progress, [range[0], range[1]], [0, 1]);

  return (
    <motion.section
      aria-label={def.label}
      custom={{ dir: direction, reduce }}
      variants={wipe}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 overflow-hidden"
    >
      {/* Ligne de scan jaune (chargement) qui suit le front de la transition */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 z-10 h-px bg-loading shadow-[0_0_14px_var(--loading)]"
        initial={{ top: direction > 0 ? "100%" : "0%", opacity: reduce ? 0 : 1 }}
        animate={{ top: direction > 0 ? "0%" : "100%", opacity: reduce ? 0 : [1, 1, 0] }}
        transition={{ duration: TRANSITION_S, ease: EASE }}
      />
      <div className="relative h-full">{def.render({ local, firstVisit, index })}</div>
    </motion.section>
  );
}

/**
 * Voyage au scroll : une scène plein écran reste fixée pendant que l'on défile,
 * et laisse place à la suivante (transition en triangle) quand on franchit sa longueur.
 */
export default function Journey({ scenes }: Readonly<{ scenes: SceneDef[] }>) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const container = useScreenRef();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ["start start", "end end"] });
  const { bounds, totalLength } = useMemo(() => sceneBounds(scenes), [scenes]);

  const [entry, setEntry] = useState({ index: 0, direction: 1, firstVisit: true });
  const current = useRef(0);
  const visited = useRef(new Set([0]));

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const found = bounds.findIndex(([, end]) => v < end);
    const next = found === -1 ? scenes.length - 1 : found;
    if (next === current.current) return;

    const firstVisit = !visited.current.has(next);
    visited.current.add(next);
    const direction = next > current.current ? 1 : -1;
    setEntry({ index: next, direction, firstVisit });
    current.current = next;
    flashLoading(TRANSITION_S * 1000);
  });

  // Lumière autour de la tablette propre à chaque scène
  const def = scenes[entry.index];
  useEffect(() => {
    setMoodOverride(def.mood ?? "stable", "/");
  }, [def]);

  const goTo = useCallback(
    (i: number) => {
      const el = ref.current;
      const screen = container.current;
      if (!el || !screen || i < 0 || i >= bounds.length) return;
      const [start, end] = bounds[i];
      const v = start + (end - start) * 0.04;
      const top = el.getBoundingClientRect().top - screen.getBoundingClientRect().top + screen.scrollTop;
      screen.scrollTo({ top: top + v * (el.offsetHeight - screen.clientHeight), behavior: reduce ? "auto" : "smooth" });
    },
    [bounds, reduce, container]
  );

  const value = useMemo(
    () => ({
      scene: entry.index,
      scenes: scenes.map((s) => ({ id: s.id, label: s.label, objective: s.objective, thought: s.thought, mood: s.mood })),
      goTo,
    }),
    [entry.index, scenes, goTo]
  );

  return (
    <JourneyContext.Provider value={value}>
      <JourneyHud progress={scrollYProgress} />
      {/* Hauteur = longueur totale de scroll + un écran pour la dernière scène */}
      <div ref={ref} className="relative" style={{ height: `calc(var(--screen-h) * ${totalLength + 1})` }}>
        <div className="sticky top-0 h-[var(--screen-h)] overflow-hidden">
          <AnimatePresence initial={false} custom={{ dir: entry.direction, reduce }}>
            <SceneSlot
              key={def.id}
              def={def}
              index={entry.index}
              range={bounds[entry.index]}
              progress={scrollYProgress}
              direction={entry.direction}
              firstVisit={entry.firstVisit}
              reduce={reduce}
            />
          </AnimatePresence>
        </div>
      </div>
    </JourneyContext.Provider>
  );
}
