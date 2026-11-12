import { marginWords } from "../../data/tablet";

/** Marge de l'écran : devises en journal système à la verticale et graduations — très pâle, derrière le texte */
export default function MarginData({ seed = 0, className = "" }: Readonly<{ seed?: number; className?: string }>) {
  const words = (offset: number) => Array.from({ length: 6 }, (_, i) => marginWords[(i + offset + seed) % marginWords.length]).join("  ·  ");

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-y-0 left-0 flex w-12 select-none gap-1 overflow-hidden pl-2 text-fg opacity-[0.09] ${className}`}>
      <p className="rotate-180 whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl]">{words(0)}</p>
      <p className="mt-24 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">{words(3)}</p>
      <span className="absolute inset-y-10 right-1 w-1.5 bg-[repeating-linear-gradient(180deg,currentColor_0_1px,transparent_1px_10px)]" />
    </div>
  );
}
