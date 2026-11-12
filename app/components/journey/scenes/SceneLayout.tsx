"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import TabletSpread, { type Screen } from "../../tablet/TabletSpread";
import type { ScreenBackdropVariant } from "../../tablet/ScreenBackdrop";
import { useJourney } from "../JourneyContext";
import { fadeUp, stagger } from "../motion";

/** Élément du volet de gauche : apparaît en cascade après la transition */
export function Item({ children, className = "" }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

interface SceneLayoutProps {
  /** Volet de gauche (texte) */
  left: ReactNode;
  /** Volet de droite (visuel) */
  right?: ReactNode;
  /** Affiche aussi le visuel sur mobile (sous le texte) */
  rightOnMobile?: boolean;
  /** Fond et motif du volet de droite */
  screen?: Screen;
  backdrop?: ScreenBackdropVariant;
  seed?: number;
}

/** Gabarit commun aux scènes : la tablette en écran partagé, entre les onglets et la barre basse */
export default function SceneLayout({ left, right, rightOnMobile = false, screen = "panel", backdrop = "triangles", seed = 0 }: Readonly<SceneLayoutProps>) {
  const { scene, scenes } = useJourney();
  return (
    <div className="h-full px-2 pb-[74px] pt-[66px] sm:px-4 lg:px-8">
      <TabletSpread
        fill
        seed={seed}
        screen={screen}
        backdrop={backdrop}
        rightOnMobile={rightOnMobile}
        app={`Accueil · ${scenes[scene]?.label ?? ""}`}
        left={
          <motion.div variants={stagger} initial="hidden" animate="show">
            {left}
          </motion.div>
        }
        right={right}
      />
    </div>
  );
}
