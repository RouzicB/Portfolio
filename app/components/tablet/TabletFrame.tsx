"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Tablet from "./Tablet";
import SplitHandle from "./SplitHandle";
import MarginData from "./MarginData";
import ScreenBackdrop from "./ScreenBackdrop";
import { tabs } from "../../data/tablet";

const SHELL = "px-2 pb-28 pt-[66px] sm:px-4 lg:px-8";

/** Nom de l'application ouverte, d'après l'onglet de la page */
function appOf(pathname: string) {
  if (pathname.startsWith("/projets/")) return "Projets · Dossier";
  if (pathname.startsWith("/credits")) return "Crédits";
  return tabs.find((t) => t.href !== "/" && pathname.startsWith(t.href))?.label ?? "Système";
}

/** Galerie des projets : longue tablette en écran partagé, panneau à gauche, plan annoté à droite */
function TabletAlbum({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className={SHELL}>
      <Tablet app="Projets · Archives">
        <div className="relative flex-1">
          <div className="screen-panel absolute inset-y-0 left-0 w-full lg:w-1/2">
            <ScreenBackdrop variant="triangles" seed={4} className="h-[900px]" />
          </div>
          <div className="screen-grid absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <div className="absolute inset-x-0 top-0 h-[900px]">
              <ScreenBackdrop variant="map" />
            </div>
          </div>
          <SplitHandle />
          <div className="relative">{children}</div>
        </div>
      </Tablet>
    </div>
  );
}

/** Page seule : la tablette s'allonge avec son contenu, journal système dans la marge */
function TabletPage({ children, pathname }: Readonly<{ children: ReactNode; pathname: string }>) {
  const seed = pathname.length % 7;
  return (
    <div className={SHELL}>
      <Tablet app={appOf(pathname)}>
        <div className="screen-panel relative flex-1">
          {/* Facettes en haut d'écran seulement (la page peut être très longue) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(100%,900px)] overflow-hidden">
            <ScreenBackdrop variant="triangles" seed={seed + 1} />
          </div>
          <MarginData seed={seed} className="left-1 sm:left-2" />
          <div className="relative pl-6 sm:pl-10">{children}</div>
        </div>
      </Tablet>
    </div>
  );
}

/**
 * Toute l'interface vit dans la tablette : l'accueil est une suite d'écrans partagés (gérés par le voyage),
 * la galerie des projets est un écran partagé qui s'allonge, les autres pages sont des pages seules.
 * `rewind-target` : c'est ce bloc qui « glitche » pendant une reconstruction (sur l'accueil : la scène fixe du voyage).
 */
export default function TabletFrame({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  if (pathname === "/") return <>{children}</>;

  return (
    <div className="rewind-target">
      {pathname === "/projets" ? <TabletAlbum>{children}</TabletAlbum> : <TabletPage pathname={pathname}>{children}</TabletPage>}
    </div>
  );
}
