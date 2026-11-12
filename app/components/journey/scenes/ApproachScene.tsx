"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import SceneLayout, { Item } from "./SceneLayout";
import DisplayTitle from "../../hud/DisplayTitle";
import { Corners } from "../../hud/Corners";
import Badge from "../../ui/Badge";
import type { SceneProps } from "../JourneyContext";
import { processPhases, tools } from "../../../data/process";
import { pad } from "../../../lib/format";

/* Double diamant : chaque phase = deux segments qui se tracent avec le scroll */
const PHASE_LINES = [
  ["M0 110 L150 10", "M0 110 L150 210"],
  ["M150 10 L300 110", "M150 210 L300 110"],
  ["M300 110 L450 10", "M300 110 L450 210"],
  ["M450 10 L600 110", "M450 210 L600 110"],
];
const PHASE_AREAS = ["0,110 150,10 150,210", "150,10 300,110 150,210", "300,110 450,10 450,210", "450,10 600,110 450,210"];
const PHASE_LABEL_X = [75, 225, 375, 525];

/** Les phases se jouent entre 5 % et 85 % de la scène */
const START = 0.05;
const SPAN = 0.2;
const phaseAt = (v: number) => Math.min(3, Math.max(0, Math.floor((v - START) / SPAN)));

function PhaseStroke({ local, i }: Readonly<{ local: MotionValue<number>; i: number }>) {
  const length = useTransform(local, [START + i * SPAN, START + (i + 1) * SPAN], [0, 1]);
  return (
    <>
      {PHASE_LINES[i].map((d) => (
        <motion.path key={d} d={d} style={{ pathLength: length }} className="stroke-hud" strokeWidth={2} fill="none" />
      ))}
    </>
  );
}

/** Scène 2 — Méthode : le double diamant se trace et le texte change à chaque phase */
export default function ApproachScene({ local }: Readonly<SceneProps>) {
  const [phase, setPhase] = useState(() => phaseAt(local.get()));
  useMotionValueEvent(local, "change", (v) => setPhase(phaseAt(v)));
  const current = processPhases[phase];

  return (
    <SceneLayout
      screen="grid" backdrop="none" seed={3}
      rightOnMobile
      left={
        <>
          <Item>
            <p className="mb-4 hud-label text-hud-ink">Phase {pad(phase + 1)} / 04</p>
            <DisplayTitle light="Mé" bold="thode" />
          </Item>
          <Item className="min-h-48">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">
                  {current.name} — {current.goal}
                </p>
                <ul className="mt-5 flex max-w-[440px] flex-wrap gap-2">
                  {current.methods.map((m) => (
                    <li key={m}>
                      <Badge>{m}</Badge>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </Item>
          <Item>
            <p className="mt-6 hidden text-sm text-body sm:block">Outils · {tools.join(" · ")}</p>
          </Item>
        </>
      }
      right={
        <div className="relative px-2 lg:px-8">
          <span aria-hidden className="absolute -top-8 right-6 hud-label text-hud-ink">
            {((phase + 1) * 21.4).toFixed(1)}
          </span>
          <svg viewBox="-10 -20 620 270" className="w-full overflow-visible" aria-hidden>
            {PHASE_AREAS.map((points, i) => (
              <polygon
                key={points}
                points={points}
                className={`transition-colors duration-500 ${i <= phase ? "fill-hud/10" : "fill-surface/50"}`}
              />
            ))}
            <path d="M0 110 L150 10 L300 110 L450 10 L600 110 L450 210 L300 110 L150 210 Z" className="stroke-line" fill="none" />
            {PHASE_LINES.map((_, i) => (
              <PhaseStroke key={i} local={local} i={i} />
            ))}
            {[0, 300, 600].map((x) => (
              <circle key={x} cx={x} cy={110} r={5} className="fill-surface stroke-hud" strokeWidth={2} />
            ))}
            {processPhases.map((p, i) => (
              <text
                key={p.name}
                x={PHASE_LABEL_X[i]}
                y={245}
                textAnchor="middle"
                fontSize="13"
                className={`uppercase transition-colors duration-500 ${i === phase ? "fill-fg font-semibold" : "fill-muted"}`}
              >
                {p.name}
              </text>
            ))}
          </svg>
          {/* Repère de la phase active */}
          <span
            aria-hidden
            className="absolute top-[35%] size-14 -translate-x-1/2 transition-[left] duration-500"
            style={{ left: `${((PHASE_LABEL_X[phase] + 10) / 620) * 100}%` }}
          >
            <Corners size={7} />
          </span>
        </div>
      }
    />
  );
}
