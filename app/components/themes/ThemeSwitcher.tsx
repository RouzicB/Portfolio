"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../icons/DetroitIcons";

/**
 * Sélecteur Jour / Nuit à icônes, dans la barre de la tablette : l'option active est soulignée de cyan.
 * `tone="dark"` : sur fond sombre (la barre violette).
 */
export default function ThemeSwitcher({ tone = "light" }: Readonly<{ tone?: "light" | "dark" }>) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Évite le mismatch d'hydratation : le thème n'est connu que côté client
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const dark = tone === "dark";
  const option = (active: boolean) => {
    if (active) return `flex size-7 items-center justify-center transition-colors shadow-[inset_0_-2px_0_var(--hud)] ${dark ? "bg-white text-[#2b2347]" : "bg-fg text-surface"}`;
    return `flex size-7 items-center justify-center transition-colors ${dark ? "text-white/70 hover:text-white" : "text-body hover:text-fg"}`;
  };

  return (
    <div role="group" aria-label="Thème" className={`flex items-center border p-0.5 ${dark ? "border-white/25" : "border-line"}`}>
      <button type="button" aria-label="Jour" title="Jour" aria-pressed={!isDark} onClick={() => setTheme("light")} className={option(!isDark)}>
        <SunIcon size={16} strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="Nuit" title="Nuit" aria-pressed={isDark} onClick={() => setTheme("dark")} className={option(isDark)}>
        <MoonIcon size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
