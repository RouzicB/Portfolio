"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import StatusBar from "./StatusBar";
import NavBar from "./NavBar";
import Lockscreen from "./Lockscreen";
import { AnimatePresence } from "framer-motion";
import { useLocked } from "../../lib/lock";
import {
  FOOTER_ID,
  OVERLAY_ID,
  SCREEN_ID,
  ScreenContext,
} from "../../lib/screen";

/**
 * La tablette, fixe à l'écran : tranche métallique, bord noir, deux coins biseautés (haut droit, bas gauche).
 * Tout vit dedans : barre d'état, barre de menu (onglets, recherche, reconstruction, diode),
 * l'écran qui défile (le contenu des pages) et le pied (page n/N, frise, commandes, crédits).
 */
export default function Tablet({
  children,
}: Readonly<{ children: ReactNode }>) {
  const screen = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const locked = useLocked();

  // Hauteur de l'écran exposée en CSS (--screen-h) : le voyage de l'accueil s'y cale
  useEffect(() => {
    const el = screen.current;
    if (!el) return;
    const update = () =>
      el.style.setProperty("--screen-h", `${el.clientHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Chaque nouvelle page s'ouvre en haut de l'écran
  useEffect(() => {
    screen.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <ScreenContext.Provider value={screen}>
      <div className="fixed inset-0 flex px-1.5 py-1.5 sm:px-3 sm:py-3 lg:px-8 lg:py-5">
        <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col">
          {/* Ombre portée (filtre isolé : il ne doit pas toucher au contenu) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -bottom-3 top-8 blur-2xl"
          >
            <span className="chamfer block size-full bg-[#0b1220]/35 dark:bg-black/70" />
          </span>
          {/* Tranche métallique */}
          <div className="tablet-edge chamfer relative flex h-full flex-col p-[2px] [--ch:36px] [--r:24px]">
            {/* Bord noir */}
            <div className="chamfer relative flex h-full flex-col bg-[#0c0e11] p-[6px] [--ch:35px] [--r:22px] sm:p-[9px]">
              {/* Écran */}
              <div className="chamfer relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface [--ch:30px] [--r:14px]">
                <StatusBar />
                <div className="relative flex min-h-0 flex-1 flex-col">
                  {/* Verrouillée : la page reste dessous mais n'est plus atteignable (souris, clavier, lecteur d'écran) */}
                  <div inert={locked} className="flex min-h-0 flex-1 flex-col">
                    <NavBar />
                    <div className="relative min-h-0 flex-1">
                      <main
                        id={SCREEN_ID}
                        ref={screen}
                        tabIndex={-1}
                        className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain outline-none [--screen-h:calc(100svh-190px)] [scrollbar-color:var(--muted)_transparent] [scrollbar-width:thin]"
                      >
                        {children}
                      </main>
                      {/* Calque de l'écran : objectif, sous-titres */}
                      <div
                        id={OVERLAY_ID}
                        className="pointer-events-none absolute inset-0 z-30"
                      />
                    </div>
                    <div
                      id={FOOTER_ID}
                      className="chrome-ui relative z-20 min-h-[62px] shrink-0 border-t border-line bg-surface"
                    />
                  </div>
                  <AnimatePresence>{locked && <Lockscreen />}</AnimatePresence>
                </div>
                {/* Reflet sur la vitre */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.07)_45%,transparent_55%)] dark:bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.03)_45%,transparent_55%)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContext.Provider>
  );
}
