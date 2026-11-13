"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import SplitHandle from "./SplitHandle";
import MarginData from "./MarginData";
import ScreenBackdrop from "./ScreenBackdrop";

/** Galerie des projets : écran partagé qui s'allonge, panneau à gauche, plan annoté à droite */
function ScreenAlbum({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="relative min-h-full">
      <div className="screen-panel absolute inset-y-0 left-0 w-full lg:w-1/2">
        <ScreenBackdrop variant="triangles" seed={4} className="h-[900px]" />
        <MarginData seed={4} className="left-1 sm:left-2" />
      </div>
      <div className="screen-grid absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <div className="absolute inset-x-0 top-0 h-[900px]">
          <ScreenBackdrop variant="map" />
        </div>
      </div>
      <SplitHandle />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Page seule : l'écran défile avec le contenu, journal système dans la marge */
function ScreenPage({ children, pathname }: Readonly<{ children: ReactNode; pathname: string }>) {
  const seed = pathname.length % 7;
  return (
    <div className="screen-panel relative min-h-full">
      {/* Facettes en haut d'écran seulement (la page peut être très longue) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(100%,900px)] overflow-hidden">
        <ScreenBackdrop variant="triangles" seed={seed + 1} />
      </div>
      <MarginData seed={seed} className="left-1 sm:left-2" />
      <div className="relative pl-6 sm:pl-10">{children}</div>
    </div>
  );
}

/**
 * Mise en page du contenu dans l'écran de la tablette : l'accueil est une suite d'écrans partagés (gérés par le voyage),
 * la galerie des projets est un écran partagé qui s'allonge, les autres pages sont des pages seules.
 * `rewind-target` : c'est ce bloc qui « glitche » pendant une reconstruction.
 */
export default function TabletFrame({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="rewind-target min-h-full">
      {pathname === "/" ? children : pathname === "/projets" ? <ScreenAlbum>{children}</ScreenAlbum> : <ScreenPage pathname={pathname}>{children}</ScreenPage>}
    </div>
  );
}
