import TriangleFrame from "./TriangleFrame";
import { Corners } from "./Corners";
import { site } from "../../data/site";

/** Grand visuel de droite : cadre triangulaire + repères de scan et cotes */
export default function HeroVisual() {
  return (
    <div className="relative">
      <TriangleFrame images={site.heroImages} code="49.2" />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-[26%] top-[34%] size-12">
          <Corners size={7} />
          <span className="absolute inset-3 border border-hud/50" />
          <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-loading" />
        </span>
        <span className="absolute left-[30%] top-[45%] flex items-center gap-2">
          <span className="h-px w-24 bg-hud/60" />
          <span className="hud-label text-hud-ink">Spécifications</span>
        </span>
        <span className="absolute left-[36%] top-[52%] hud-label text-hud-ink">43.7</span>
        <span className="absolute left-[60%] top-[22%] size-10">
          <Corners size={6} />
        </span>
      </div>
    </div>
  );
}
