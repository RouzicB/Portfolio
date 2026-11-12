"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/** Barres pseudo-aléatoires mais fixes (rendu identique serveur / client) */
const { BARS, WIDTH } = (() => {
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const widths = [1, 1, 1, 2, 2, 3, 4];
  const gaps = [1, 2, 2, 3, 4];
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  while (x < 600) {
    const w = widths[Math.floor(rand() * widths.length)];
    bars.push({ x, w });
    x += w + gaps[Math.floor(rand() * gaps.length)];
  }
  return { BARS: bars, WIDTH: x };
})();

interface BarcodeProps {
  progress: MotionValue<number>;
  /** Code affiché au-dessus du repère, ex. « 01.34 » */
  label: MotionValue<string>;
  /** cyan = normal, jaune = chargement */
  tone?: "hud" | "loading";
}

function Bars({ className }: Readonly<{ className: string }>) {
  return (
    <svg viewBox={`0 0 ${WIDTH} 12`} preserveAspectRatio="none" className="absolute inset-0 size-full">
      <g className={className}>
        {BARS.map((b) => (
          <rect key={b.x} x={b.x} width={b.w} height={12} />
        ))}
      </g>
    </svg>
  );
}

/** Frise « time line » : code-barres qui se colore avec la progression */
export default function Barcode({ progress, label, tone = "hud" }: Readonly<BarcodeProps>) {
  const clipPath = useTransform(progress, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const left = useTransform(progress, (v) => `${v * 100}%`);
  const color = tone === "loading" ? "fill-[#ecd900]" : "fill-hud";
  const marker = tone === "loading" ? "bg-[#ecd900]" : "bg-hud";

  return (
    <div aria-hidden className="relative h-9 w-full">
      {/* Bornes */}
      <span className="absolute left-0 top-1/2 h-4 w-1.5 -translate-y-1/2 border-y border-l border-body/60" />
      <span className="absolute right-0 top-1/2 h-4 w-1.5 -translate-y-1/2 border-y border-r border-body/60" />

      <div className="absolute inset-x-2.5 top-1/2 h-3 -translate-y-1/2">
        <Bars className="fill-body/75" />
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <Bars className={`${color} transition-[fill] duration-500`} />
        </motion.div>

        <motion.span style={{ left }} className={`absolute -inset-y-3 w-0.5 -translate-x-1/2 transition-colors duration-500 ${marker}`}>
          <motion.span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] tabular-nums text-body">{label}</motion.span>
        </motion.span>
      </div>
    </div>
  );
}
