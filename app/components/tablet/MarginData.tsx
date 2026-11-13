import { marginCodes } from "../../data/tablet";

/**
 * Marge de l'écran : une colonne de codes système à la verticale (identifiants, valeurs, états),
 * puis une règle graduée à côté — sans chevauchement. Très pâle, derrière le texte.
 */
export default function MarginData({ seed = 0, className = "" }: Readonly<{ seed?: number; className?: string }>) {
  // Assez de codes pour couvrir les pages les plus longues (la colonne est coupée à la hauteur de la page)
  const codes = Array.from({ length: 80 }, (_, i) => marginCodes[(i + seed * 3) % marginCodes.length]).join("   ◇   ");

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-y-0 left-0 flex w-12 select-none items-stretch gap-1.5 overflow-hidden pl-2 text-fg opacity-[0.12] ${className}`}>
      <p className="rotate-180 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.35em] tabular-nums [writing-mode:vertical-rl]">{codes}</p>
      {/* Règle graduée */}
      <span className="my-10 w-1.5 shrink-0 bg-[repeating-linear-gradient(180deg,currentColor_0_1px,transparent_1px_8px)]" />
      <span className="my-10 -ml-1 w-px shrink-0 bg-[repeating-linear-gradient(180deg,currentColor_0_3px,transparent_3px_40px)]" />
    </div>
  );
}
