import { type ReactNode } from "react";
import StatusBar from "./StatusBar";

interface TabletProps {
  children: ReactNode;
  /** Nom de l'application ouverte, dans la barre d'état */
  app?: string;
  /** Occupe toute la hauteur disponible (scènes de l'accueil) */
  fill?: boolean;
  className?: string;
}

/**
 * Tablette posée devant l'écran : tranche métallique, bord noir, écran avec barre d'état.
 * Deux coins biseautés (haut droit, bas gauche). Elle s'allonge avec son contenu sur les pages longues.
 */
export default function Tablet({ children, app, fill = false, className = "" }: Readonly<TabletProps>) {
  return (
    <div className={`relative mx-auto w-full max-w-[1320px] ${fill ? "h-full" : ""} ${className}`}>
      {/* Ombre portée (filtre isolé : il ne doit pas toucher au contenu) */}
      <span aria-hidden className="pointer-events-none absolute inset-x-6 -bottom-3 top-8 blur-2xl">
        <span className="chamfer block size-full bg-[#0b1220]/35 dark:bg-black/70" />
      </span>
      {/* Tranche métallique */}
      <div className="tablet-edge chamfer relative flex h-full flex-col p-[2px] [--ch:36px] [--r:24px]">
        {/* Bord noir */}
        <div className="chamfer relative flex h-full flex-col bg-[#0c0e11] p-[7px] [--ch:35px] [--r:22px] sm:p-[9px]">
          {/* Écran */}
          <div className="chamfer relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface [--ch:30px] [--r:14px]">
            <StatusBar app={app} />
            <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
            {/* Reflet sur la vitre */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.07)_45%,transparent_55%)] dark:bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.03)_45%,transparent_55%)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
