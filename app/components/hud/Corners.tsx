import { type ReactNode } from "react";

interface CornersProps {
  /** Longueur des branches (px) */
  size?: number;
  /** Décalage vers l'extérieur (px) */
  offset?: number;
  /** Classe de couleur de bordure */
  tone?: string;
}

/** Quatre coins en équerre, positionnés sur le parent (qui doit être relative/absolute) */
export function Corners({ size = 8, offset = 0, tone = "border-hud" }: Readonly<CornersProps>) {
  const base = `pointer-events-none absolute ${tone}`;
  const s = { width: size, height: size };
  return (
    <>
      <span aria-hidden className={`${base} border-l border-t`} style={{ ...s, left: -offset, top: -offset }} />
      <span aria-hidden className={`${base} border-r border-t`} style={{ ...s, right: -offset, top: -offset }} />
      <span aria-hidden className={`${base} border-b border-l`} style={{ ...s, left: -offset, bottom: -offset }} />
      <span aria-hidden className={`${base} border-b border-r`} style={{ ...s, right: -offset, bottom: -offset }} />
    </>
  );
}

/** Bloc encadré de coins cyan */
export default function Brackets({
  children,
  className = "",
  ...corners
}: Readonly<CornersProps & { children?: ReactNode; className?: string }>) {
  return (
    <div className={`relative ${className}`}>
      <Corners {...corners} />
      {children}
    </div>
  );
}
