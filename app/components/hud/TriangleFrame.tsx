"use client";

import { useId, type ReactNode } from "react";

/* Composition : un grand triangle pointe en haut (devant) et un triangle inversé (derrière),
   chacun rempli d'une image, avec leurs contours cyan décalés. Repère : viewBox 720 × 460. */
const A = "230,10 455,420 5,420";
const B = "245,0 695,0 470,420";
const A_OUTLINE = "252,48 474,450 30,450";
const B_OUTLINE = "270,24 716,24 492,440";

const FACETS_A = [
  { points: "230,10 300,140 160,150", opacity: 0.22 },
  { points: "160,150 300,140 220,290", opacity: 0.08 },
  { points: "5,420 160,150 120,420", opacity: 0.16 },
  { points: "300,140 455,420 330,330", opacity: 0.26 },
];
const FACETS_B = [
  { points: "245,0 420,0 330,170", opacity: 0.32 },
  { points: "420,0 695,0 560,150", opacity: 0.14 },
  { points: "330,170 560,150 470,420", opacity: 0.2 },
];

interface TriangleFrameProps {
  /** [image du triangle avant, image du triangle arrière] — chemins dans /public */
  images?: readonly (string | null | undefined)[];
  /** Micro-numéro affiché au-dessus */
  code?: string;
  /** Élément centré dans le triangle avant (ex. bouton lecture) */
  center?: ReactNode;
  className?: string;
}

export default function TriangleFrame({ images = [], code = "85.9", center, className = "" }: Readonly<TriangleFrameProps>) {
  const id = `tf-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [imageA, imageB] = images;

  const fill = (
    image: string | null | undefined,
    box: { x: number; width: number },
    gradient: string,
    facets: typeof FACETS_A
  ) =>
    image ? (
      <image href={image} x={box.x} y={0} width={box.width} height={420} preserveAspectRatio="xMidYMid slice" />
    ) : (
      <>
        <rect x={box.x} y={0} width={box.width} height={420} fill={`url(#${gradient})`} />
        {facets.map((f) => (
          <polygon key={f.points} points={f.points} fill="#fff" fillOpacity={f.opacity} />
        ))}
      </>
    );

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 720 460" className="w-full overflow-visible" aria-hidden>
        <defs>
          <clipPath id={`${id}-a`}>
            <polygon points={A} />
          </clipPath>
          <clipPath id={`${id}-b`}>
            <polygon points={B} />
          </clipPath>
          <linearGradient id={`${id}-ga`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dbe2f0" />
            <stop offset="1" stopColor="#7b8fbd" />
          </linearGradient>
          <linearGradient id={`${id}-gb`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f6f9" />
            <stop offset="1" stopColor="#a6b3c3" />
          </linearGradient>
          <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#1d2a4a" floodOpacity="0.22" />
          </filter>
        </defs>

        <polygon points={B_OUTLINE} fill="none" className="stroke-hud" strokeOpacity={0.45} />
        <polygon points={A_OUTLINE} fill="none" className="stroke-hud" strokeOpacity={0.45} />
        <line x1="120" y1="-12" x2="720" y2="-12" className="stroke-hud" strokeOpacity={0.35} />

        <g filter={`url(#${id}-shadow)`}>
          <g clipPath={`url(#${id}-b)`}>{fill(imageB, { x: 245, width: 450 }, `${id}-gb`, FACETS_B)}</g>
        </g>
        <g filter={`url(#${id}-shadow)`}>
          <g clipPath={`url(#${id}-a)`}>{fill(imageA, { x: 5, width: 450 }, `${id}-ga`, FACETS_A)}</g>
        </g>

        <text x="300" y="-22" fontSize="18" className="fill-hud-ink" opacity={0.55}>
          {code}
        </text>
      </svg>

      {center && <div className="absolute left-[32%] top-[61%] -translate-x-1/2 -translate-y-1/2">{center}</div>}
    </div>
  );
}
