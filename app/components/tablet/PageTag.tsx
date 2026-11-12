"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Corners } from "../hud/Corners";

/** Repère « Page n/N » encadré de coins cyan, avec les flèches pour changer d'écran */
export default function PageTag({
  current,
  total,
  label,
  onPrev,
  onNext,
}: Readonly<{ current: number; total: number; label?: string; onPrev: () => void; onNext: () => void }>) {
  const arrow = "flex size-8 items-center justify-center text-body transition-colors hover:text-fg disabled:opacity-30";

  return (
    <div className="relative flex shrink-0 items-center gap-0.5 bg-surface/85 px-1 py-0.5 backdrop-blur">
      <Corners size={6} tone="border-hud" />
      <button type="button" onClick={onPrev} disabled={current <= 1} aria-label="Page précédente" className={arrow}>
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>
      <span className="min-w-[5.5rem] text-center leading-none" aria-label={`Page ${current} sur ${total}${label ? ` : ${label}` : ""}`}>
        <span className="block hud-label text-hud-ink">Page</span>
        <span className="text-[15px] font-semibold tabular-nums text-fg">
          {current}
          <span className="font-light text-muted">/{total}</span>
        </span>
      </span>
      <button type="button" onClick={onNext} disabled={current >= total} aria-label="Page suivante" className={arrow}>
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
