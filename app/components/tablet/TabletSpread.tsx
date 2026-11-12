import { type ReactNode } from "react";
import SplitHandle from "./SplitHandle";
import MarginData from "./MarginData";
import ScreenBackdrop, { type ScreenBackdropVariant } from "./ScreenBackdrop";

export type Screen = "surface" | "panel" | "grid" | "glass" | "scan";

export const screens: Record<Screen, string> = {
  surface: "screen-surface",
  panel: "screen-panel",
  grid: "screen-grid",
  glass: "screen-glass",
  scan: "screen-scan",
};

interface TabletSpreadProps {
  /** Volet de gauche (texte) */
  left: ReactNode;
  /** Volet de droite (visuel) */
  right?: ReactNode;
  /** Fond du volet de droite */
  screen?: Screen;
  /** Motif pâle en fond du volet de droite */
  backdrop?: ScreenBackdropVariant;
  /** Affiche aussi le volet de droite sur mobile (sous le volet de gauche) */
  rightOnMobile?: boolean;
  seed?: number;
}

/** Écran partagé de la tablette : volet texte à gauche, volet visuel à droite, séparateur au milieu */
export default function TabletSpread({ left, right, screen = "panel", backdrop = "triangles", rightOnMobile = false, seed = 0 }: Readonly<TabletSpreadProps>) {
  return (
    <div className={`relative grid h-full grid-cols-1 lg:grid-cols-2 ${rightOnMobile ? "overflow-y-auto lg:overflow-visible" : ""}`}>
      <div className="screen-scan relative flex min-h-0 flex-col justify-center overflow-hidden py-8 pl-14 pr-6 sm:pl-16 sm:pr-10 lg:pl-20 lg:pr-14">
        <MarginData seed={seed} />
        <div className="relative">{left}</div>
      </div>
      {right && (
        <div className={`${screens[screen]} relative min-h-0 flex-col justify-center overflow-hidden px-6 py-8 sm:px-10 lg:pl-16 lg:pr-12 ${rightOnMobile ? "flex" : "hidden lg:flex"}`}>
          <ScreenBackdrop variant={backdrop} seed={seed + 2} />
          <div className="relative">{right}</div>
        </div>
      )}
      <SplitHandle />
    </div>
  );
}
