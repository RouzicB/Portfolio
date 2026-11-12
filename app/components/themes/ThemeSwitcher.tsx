"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Sélecteur Jour / Nuit à icônes, dans la barre de menu de la tablette : l'option active est surlignée en cyan */
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Évite le mismatch d'hydratation : le thème n'est connu que côté client
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const option = (active: boolean) =>
    `flex size-7 items-center justify-center transition-colors ${active ? "bg-fg text-surface shadow-[inset_0_-2px_0_var(--hud)]" : "text-body hover:text-fg"}`;

  return (
    <div role="group" aria-label="Thème" className="flex items-center border border-line p-0.5">
      <button type="button" aria-label="Jour" title="Jour" aria-pressed={!isDark} onClick={() => setTheme("light")} className={option(!isDark)}>
        <Sun size={15} strokeWidth={1.75} />
      </button>
      <button type="button" aria-label="Nuit" title="Nuit" aria-pressed={isDark} onClick={() => setTheme("dark")} className={option(isDark)}>
        <Moon size={15} strokeWidth={1.75} />
      </button>
    </div>
  );
}
