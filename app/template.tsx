"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Diode from "./components/hud/Diode";
import TabletFrame from "./components/tablet/TabletFrame";
import { EASE } from "./components/journey/motion";
import { flashLoading } from "./lib/diode";

const FULL = "polygon(50% -300%, 250% 100%, -150% 100%)";
const COLLAPSED = "polygon(50% 0%, 50% 0%, 50% 0%)";

/** Transition entre les pages : rideau triangulaire, diode en « chargement » (IDYELLOW) ; chaque page s'ouvre dans la tablette */
export default function Template({ children }: Readonly<{ children: ReactNode }>) {
  // Toujours rendu (même structure serveur / client) ; en mouvement réduit, simple fondu
  const reduce = useReducedMotion();

  useEffect(() => flashLoading(1000), []);

  return (
    <>
      <motion.div
        aria-hidden
        className="curtain-failsafe pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-surface"
        initial={{ clipPath: FULL, opacity: 1 }}
        animate={reduce ? { opacity: 0 } : { clipPath: COLLAPSED }}
        transition={reduce ? { duration: 0.3 } : { duration: 0.8, ease: EASE, delay: 0.15 }}
      >
        <Diode size={44} state="loading" />
        <span className="hud-label text-body">Chargement</span>
      </motion.div>
      <TabletFrame>{children}</TabletFrame>
    </>
  );
}
