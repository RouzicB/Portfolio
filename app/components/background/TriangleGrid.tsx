"use client";

import { useId, useMemo } from "react";

/** Côté d'un triangle (px) : grandes facettes, comme le fond polygonal de la maquette */
const S = 168;
/** Hauteur d'une rangée de triangles */
const RH = (S * Math.sqrt(3)) / 2;
/** Hauteur du motif répété (deux rangées) */
const H = RH * 2;

/** Lignes du motif : 2 horizontales + diagonales à 60° et 120° → réseau de triangles équilatéraux */
const PATTERN_PATH = `M0 0H${S}M0 ${RH}H${S}M0 ${H}H${S}M0 0L${S} ${H}M${S} 0L0 ${H}`;

/** Sommets du triangle (rangée k, colonne c), pointe en haut ou en bas, alignés sur le motif */
function trianglePoints(k: number, c: number, up: boolean) {
  const yTop = k * RH;
  const yBottom = (k + 1) * RH;
  if (up) {
    const x = ((k + 1) % 2) * (S / 2) + c * S;
    return `${x},${yBottom} ${x + S},${yBottom} ${x + S / 2},${yTop}`;
  }
  const x = (k % 2) * (S / 2) + c * S;
  return `${x},${yTop} ${x + S},${yTop} ${x + S / 2},${yBottom}`;
}

/** Générateur pseudo-aléatoire déterministe : rendu identique serveur / client */
function random(seed: number) {
  let s = (seed * 7919) % 2147483647 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const FACET_TONES = ["fill-surface", "fill-line", "fill-surface", "fill-body"] as const;
const FACET_OPACITY = { "fill-surface": 0.7, "fill-line": 0.45, "fill-body": 0.04 } as const;

/** Fond en facettes triangulaires isométriques, avec quelques reflets cyan qui passent */
export default function TriangleGrid({ seed = 1, className = "" }: Readonly<{ seed?: number; className?: string }>) {
  const id = `tri-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const { facets, glints } = useMemo(() => {
    const r = random(seed);
    const pick = () => trianglePoints(Math.floor(r() * 9), Math.floor(r() * 14), r() > 0.5);
    return {
      facets: Array.from({ length: 30 }, (_, i) => ({
        key: i,
        points: pick(),
        tone: FACET_TONES[Math.floor(r() * FACET_TONES.length)],
      })),
      glints: Array.from({ length: 4 }, (_, i) => ({ key: i, points: pick(), delay: `${(r() * 8).toFixed(2)}s` })),
    };
  }, [seed]);

  return (
    <svg
      aria-hidden
      width="100%"
      height="100%"
      className={`pointer-events-none [mask-image:radial-gradient(ellipse_at_60%_45%,black_40%,transparent_95%)] ${className}`}
    >
      <defs>
        <pattern id={id} width={S} height={H} patternUnits="userSpaceOnUse">
          <path d={PATTERN_PATH} fill="none" stroke="currentColor" className="text-line" strokeOpacity={0.6} />
        </pattern>
      </defs>
      {facets.map((f) => (
        <polygon key={f.key} points={f.points} className={f.tone} fillOpacity={FACET_OPACITY[f.tone]} />
      ))}
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <g className="text-hud">
        {glints.map((g) => (
          <polygon key={g.key} points={g.points} fill="currentColor" className="tri-pulse" style={{ animationDelay: g.delay }} />
        ))}
      </g>
    </svg>
  );
}
