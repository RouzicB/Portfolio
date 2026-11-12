"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { ChevronsRight, Lock, LockOpen, UserRound } from "lucide-react";
import TriangleGrid from "../background/TriangleGrid";
import Diode from "../hud/Diode";
import { unlock } from "../../lib/lock";
import { site } from "../../data/site";

/** Décélération longue et douce (ease-out quint) */
const SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Course du curseur « Glisser pour déverrouiller » (px) */
const TRACK = 232;

const [first, ...rest] = site.author.split(" ");

/** Heure et date en français, mises à jour chaque seconde (rendu client uniquement : l'écran n'existe qu'après un clic) */
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return {
    time: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    date: now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
  };
}

/** Le curseur doit aller jusqu'au bout : en deçà de ce seuil (px), il revient au départ */
const END = TRACK - 3;
/** Pas du curseur au clavier (flèches) */
const STEP = TRACK / 5;

/**
 * Curseur « Glisser pour déverrouiller » : il faut l'amener tout au bout de la piste.
 * Relâché avant, il revient au départ. Au clavier : flèches pour l'avancer, Fin pour l'amener au bout.
 */
function SlideToUnlock() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const hint = useTransform(x, [0, TRACK * 0.6], [1, 0]);
  const fill = useTransform(x, (v) => v + 48);
  const [percent, setPercent] = useState(0);
  const knob = useRef<HTMLDivElement>(null);
  // Le focus passe sur le curseur (le bouton d'arrêt, désactivé, le perdrait sinon)
  useEffect(() => knob.current?.focus(), []);
  useMotionValueEvent(x, "change", (v) => setPercent(Math.round((v / TRACK) * 100)));

  const settle = () => {
    if (x.get() >= END) {
      x.set(TRACK);
      unlock();
    } else {
      animate(x, 0, reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 });
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = { ArrowRight: STEP, ArrowUp: STEP, ArrowLeft: -STEP, ArrowDown: -STEP, End: TRACK, Home: -TRACK };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = Math.min(TRACK, Math.max(0, x.get() + moves[e.key]));
    x.set(next);
    if (next >= END) unlock();
  };

  return (
    <div className="relative h-12 w-[280px] overflow-hidden rounded-full border border-white/25 bg-white/10 backdrop-blur">
      <motion.span aria-hidden style={{ width: fill }} className="absolute inset-y-0 left-0 rounded-full bg-hud/25" />
      <motion.span
        aria-hidden
        style={{ opacity: hint }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap pl-12 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80"
      >
        Glisser pour déverrouiller
      </motion.span>
      {/* Repère d'arrivée */}
      <span aria-hidden className="absolute right-1 top-1 flex size-10 items-center justify-center rounded-full border border-dashed border-white/35 text-white/50">
        <LockOpen size={16} strokeWidth={1.75} />
      </span>
      <motion.div
        role="slider"
        ref={knob}
        tabIndex={0}
        aria-label="Glisser jusqu'au bout pour déverrouiller la tablette"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={percent >= 100 ? "Déverrouillé" : `${percent} %`}
        data-prompt-label="Glisser"
        drag="x"
        dragConstraints={{ left: 0, right: TRACK }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={settle}
        onKeyDown={onKeyDown}
        style={{ x }}
        className="absolute left-1 top-1 z-10 flex size-10 cursor-grab touch-none items-center justify-center rounded-full bg-white text-[#3a1d31] shadow-[0_0_16px_var(--hud)] outline-none focus-visible:ring-2 focus-visible:ring-hud active:cursor-grabbing"
      >
        <ChevronsRight size={20} strokeWidth={2} />
      </motion.div>
    </div>
  );
}

/**
 * Écran de verrouillage : l'écran s'éteint, puis se rallume sur l'heure, la date et la session.
 * Il faut faire glisser le curseur jusqu'au bout pour déverrouiller : l'écran remonte et la page réapparaît.
 */
export default function Lockscreen() {
  const reduce = useReducedMotion();
  const { time, date } = useClock();

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Tablette verrouillée"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0, transition: { duration: 0.25 } } : { y: "-100%", transition: { duration: 0.7, ease: SOFT } }}
      className="absolute inset-0 z-30 overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#5e2f4b_0%,#2a1424_45%,#0c0e11_100%)] text-white"
    >
      <TriangleGrid seed={9} className="absolute inset-0 opacity-[0.12] invert" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(45%_40%_at_80%_85%,rgb(0_209_255/0.18),transparent_70%)]" />

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.55, duration: 0.8, ease: SOFT }}
        className="relative flex h-full flex-col items-center justify-between px-6 pb-10 pt-[8vh]"
      >
        {/* Heure et date */}
        <div className="flex flex-col items-center text-center">
          <span className="flex items-center gap-2 hud-label text-white/60">
            <Lock size={11} strokeWidth={2} /> Verrouillé
          </span>
          <p className="mt-3 text-[clamp(4rem,11vw,8.5rem)] leading-none font-extralight tabular-nums tracking-[0.02em]">{time}</p>
          <p className="mt-3 text-[15px] font-medium tracking-[0.08em] text-white/80 first-letter:uppercase">{date}</p>
        </div>

        {/* Session et déverrouillage */}
        <div className="flex flex-col items-center gap-5">
          <span className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10">
              <UserRound size={20} strokeWidth={1.5} />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold">
                {first} <span className="font-light">{rest.join(" ")}</span>
              </span>
              <span className="block hud-label text-white/60">{site.role}</span>
            </span>
            <Diode size={18} />
          </span>
          <SlideToUnlock />
        </div>
      </motion.div>

      {/* Mise en veille : l'écran s'éteint puis se rallume sur le verrouillage */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: reduce ? 0 : 0.35, duration: reduce ? 0.2 : 0.6, ease: "easeOut" }}
      />
    </motion.div>
  );
}
