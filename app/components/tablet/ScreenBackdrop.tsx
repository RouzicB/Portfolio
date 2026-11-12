import TriangleGrid from "../background/TriangleGrid";

export type ScreenBackdropVariant = "triangles" | "map" | "none";

/* Plan schématique : îlots d'un quartier, avenue en diagonale, fleuve, itinéraire en pointillés */
const BLOCKS = [
  [40, 60, 90, 70],
  [150, 60, 70, 70],
  [40, 150, 90, 90],
  [150, 150, 70, 40],
  [380, 70, 110, 60],
  [510, 70, 70, 60],
  [380, 150, 60, 80],
  [460, 150, 120, 80],
  [60, 430, 120, 70],
  [200, 430, 80, 70],
  [420, 420, 90, 60],
  [530, 420, 60, 100],
] as const;

const MARKERS = [
  { x: 186, y: 210, label: "ATELIER" },
  { x: 470, y: 128, label: "STUDIO" },
  { x: 240, y: 520, label: "ÉCOLE" },
] as const;

/**
 * Fond pâle de l'écran, à la place des croquis du carnet :
 * des facettes triangulaires, ou un plan de ville schématique annoté.
 */
export default function ScreenBackdrop({ variant = "triangles", seed = 1, className = "" }: Readonly<{ variant?: ScreenBackdropVariant; seed?: number; className?: string }>) {
  if (variant === "none") return null;

  if (variant === "triangles") return <TriangleGrid seed={seed} className={`absolute inset-0 opacity-80 ${className}`} />;

  return (
    <svg aria-hidden viewBox="0 0 620 620" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none absolute inset-0 size-full opacity-[0.2] ${className}`}>
      <g fill="none" className="stroke-muted" strokeWidth={1}>
        {BLOCKS.map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />
        ))}
        {/* Avenue en diagonale */}
        <path d="M-20 360 L 640 250" strokeWidth={2} />
        <path d="M-20 384 L 640 274" strokeWidth={1} />
        {/* Fleuve */}
        <path d="M-20 560 C 140 520, 260 600, 420 560 S 600 520, 640 540" className="stroke-hud" strokeWidth={6} strokeOpacity={0.35} />
      </g>
      {/* Itinéraire */}
      <path d="M186 210 L 300 330 L 470 128" fill="none" className="stroke-hud-ink" strokeWidth={1.6} strokeDasharray="4 6" />
      {MARKERS.map((m) => (
        <g key={m.label}>
          <circle cx={m.x} cy={m.y} r={9} fill="none" className="stroke-hud-ink" strokeWidth={1.5} />
          <circle cx={m.x} cy={m.y} r={2.5} className="fill-hud-ink" />
          <text x={m.x + 14} y={m.y - 10} fontSize="11" letterSpacing="1.5" className="fill-fg font-sans">
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
