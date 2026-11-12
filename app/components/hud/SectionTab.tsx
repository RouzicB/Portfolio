/** Séparateur de section : ligne cyan qui se soulève en onglet autour du titre (« DESIGN ») */
export default function SectionTab({ title, code, id }: Readonly<{ title: string; code?: string; id?: string }>) {
  return (
    <div id={id} className="mb-14 mt-28 scroll-mt-28">
      <div className="flex items-end">
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-hud/50" />
        <div className="relative h-12 w-64 shrink-0 sm:w-72">
          <svg aria-hidden viewBox="0 0 288 48" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
            <path d="M0 47.5 L36 1 H252 L288 47.5" fill="none" className="stroke-hud" strokeOpacity={0.5} vectorEffect="non-scaling-stroke" />
          </svg>
          <h2 className="relative flex h-full items-center justify-center pt-1 text-xl font-bold uppercase tracking-[0.06em] text-muted sm:text-[22px]">
            {title}
          </h2>
        </div>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-hud/50" />
      </div>
      {code && <p className="mt-5 text-right text-xs text-hud-ink/70">{code}</p>}
    </div>
  );
}
