"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/** Apparition au scroll : même fondu + montée que les en-têtes de page et les scènes (fadeUp) */
export default function Reveal({ children, delay = 0, className = "" }: Readonly<{ children: ReactNode; delay?: number; className?: string }>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
