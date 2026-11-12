"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import TabletFrame from "./components/tablet/TabletFrame";
import { flashLoading } from "./lib/diode";
import { slideDirection } from "./data/tablet";

/** Décélération longue et douce (ease-out quint) : rapide au départ, interminable à l'arrivée */
const SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Dernière page affichée (le template est recréé à chaque navigation) */
let previous: string | null = null;

/**
 * Transition entre les pages : la nouvelle page glisse dans l'écran de la tablette,
 * depuis la droite quand on va vers un onglet plus à droite, depuis la gauche quand on revient.
 * Premier affichage : aucun glissement (HTML serveur et client identiques). Mouvement réduit : simple fondu.
 */
export default function Template({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [dir] = useState(() => slideDirection(previous, pathname));

  useEffect(() => {
    previous = pathname;
    if (dir !== 0) flashLoading(700);
  }, [pathname, dir]);

  return (
    <motion.div
      className="min-h-full will-change-transform"
      // Glissement très court et très amorti (courbe « ease-out » longue) : la page se pose sans à-coup.
      // Pas de mise à l'échelle : le texte resterait flou pendant l'animation.
      initial={dir === 0 ? false : reduce ? { opacity: 0 } : { x: dir * 72, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={
        reduce
          ? { duration: 0.25 }
          : {
              x: { duration: 0.9, ease: SOFT },
              opacity: { duration: 0.6, ease: "easeOut" },
            }
      }
    >
      <TabletFrame>{children}</TabletFrame>
    </motion.div>
  );
}
