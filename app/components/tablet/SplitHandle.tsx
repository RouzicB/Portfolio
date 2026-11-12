/**
 * Séparateur de l'écran partagé, à la place de la spirale du carnet :
 * un trait fin, une ombre douce de part et d'autre et une poignée au centre.
 */
export default function SplitHandle({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-y-0 left-1/2 hidden w-16 -translate-x-1/2 lg:block ${className}`}>
      <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgb(11_18_32/0.05)_45%,rgb(11_18_32/0.1)_50%,rgb(11_18_32/0.05)_55%,transparent)]" />
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
      {/* Graduations le long du séparateur */}
      <span className="absolute inset-y-6 left-1/2 w-2 -translate-x-1/2 bg-[repeating-linear-gradient(180deg,var(--line)_0_1px,transparent_1px_24px)]" />
      {/* Poignée */}
      <span className="absolute left-1/2 top-[min(50%,calc(50vh-100px))] h-14 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/70 shadow-[0_0_0_3px_var(--surface)]" />
    </div>
  );
}
