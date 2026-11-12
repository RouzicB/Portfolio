"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** Sélecteur « JOUR NUIT », à la place du « RU EN » de la maquette : l'option active est en gras */
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Évite le mismatch d'hydratation : le thème n'est connu que côté client
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div role="group" aria-label="Thème" className="flex gap-2 uppercase">
      <button
        type="button"
        aria-pressed={!isDark}
        onClick={() => setTheme("light")}
        className={!isDark ? "font-bold text-fg" : "text-body hover:text-fg"}
      >
        Jour
      </button>
      <button
        type="button"
        aria-pressed={isDark}
        onClick={() => setTheme("dark")}
        className={isDark ? "font-bold text-fg" : "text-body hover:text-fg"}
      >
        Nuit
      </button>
    </div>
  );
}
