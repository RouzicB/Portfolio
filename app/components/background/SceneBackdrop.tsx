"use client";

import { usePathname } from "next/navigation";
import { tabletFor } from "../../data/tablet";
import { moodLights, useMoodOverride, type Mood } from "../../lib/mood";

/**
 * Lumière autour de la tablette, posée sur le fond en facettes :
 * sa couleur suit l'ambiance de la page (bleu stable, analyse, chaleur, alerte jaune, critique rouge).
 */
export default function SceneBackdrop() {
  const pathname = usePathname();
  const override = useMoodOverride();
  const mood: Mood = override?.path === pathname ? override.mood : (tabletFor(pathname)?.mood ?? "stable");
  const [a, b] = moodLights[mood];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.22] transition-[background] duration-[1600ms] dark:opacity-[0.28]"
        style={{ background: `radial-gradient(50% 55% at 6% 4%, ${a}, transparent 70%), radial-gradient(45% 50% at 96% 96%, ${b}, transparent 72%)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(11_18_32/0.12))] dark:bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.5))]" />
    </div>
  );
}
