import { type ReactNode } from "react";

const TICKS = Array.from({ length: 18 }, (_, i) => i * 8);

/** Encart d'information : règle graduée cyan, titre en capitales, légende, contenu optionnel */
export default function Callout({
  title,
  text,
  children,
  className = "",
}: Readonly<{ title: string; text: string; children?: ReactNode; className?: string }>) {
  return (
    <div className={`w-60 ${className}`}>
      <svg aria-hidden viewBox="0 0 240 6" className="mb-2 h-1.5 w-full text-hud">
        <line x1="0" y1="5.5" x2="240" y2="5.5" stroke="currentColor" strokeWidth="0.75" />
        {TICKS.map((x) => (
          <line key={x} x1={x} y1="2" x2={x} y2="5.5" stroke="currentColor" strokeWidth="0.75" />
        ))}
      </svg>
      <p className="text-[15px] font-semibold uppercase tracking-[0.04em] text-fg">{title}</p>
      <p className="mt-1 text-[10px] leading-snug text-body">{text}</p>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
