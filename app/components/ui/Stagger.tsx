"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { stagger } from "../journey/motion";

/**
 * En-tête de page : ses enfants `<Item>` apparaissent en cascade (fondu + montée),
 * exactement comme le texte des scènes de l'accueil. Même animation sur toutes les pages.
 */
export default function Stagger({ children, className = "" }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  );
}
