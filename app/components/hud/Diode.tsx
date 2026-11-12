"use client";

import { useDiode, type DiodeState } from "../../lib/diode";

const gradients: Record<DiodeState, string> = {
  ok: "conic-gradient(from 200deg, #00d1ff, #a6f4ff, #009fe0, #4fe0ff, #00d1ff)",
  loading: "conic-gradient(from 0deg, #fff500, #c6f24c, #fff500, #ffd000, #fff500)",
  error: "conic-gradient(from 0deg, #ff0000, #ff7070, #c80000, #ff3030, #ff0000)",
};
const glows: Record<DiodeState, string> = { ok: "#00d1ff", loading: "#fff500", error: "#ff0000" };
const labels: Record<DiodeState, string> = { ok: "Système opérationnel", loading: "Chargement", error: "Erreur" };

/** Diode circulaire : bleu = normal, jaune = chargement (tourne), rouge = erreur */
export default function Diode({ size = 34, state }: Readonly<{ size?: number; state?: DiodeState }>) {
  const live = useDiode();
  const s = state ?? live;
  const ring = Math.max(3, Math.round(size * 0.12));
  const mask = `radial-gradient(farthest-side, transparent calc(100% - ${ring}px), #000 calc(100% - ${ring - 0.5}px))`;

  return (
    <span
      role="img"
      aria-label={labels[s]}
      title={labels[s]}
      className="relative inline-block shrink-0 transition-[filter] duration-500"
      style={{ width: size, height: size, filter: `drop-shadow(0 0 ${size * 0.16}px ${glows[s]})` }}
    >
      <span
        className={`absolute inset-0 rounded-full ${s === "loading" ? "animate-spin [animation-duration:1.4s]" : ""}`}
        style={{ background: gradients[s], mask, WebkitMask: mask }}
      />
    </span>
  );
}
