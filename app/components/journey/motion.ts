import type { Variants } from "framer-motion";

/** Courbe « mécanique » utilisée pour les transitions de scène */
export const EASE: [number, number, number, number] = [0.7, 0, 0.2, 1];

/** Conteneur : fait apparaître ses enfants en cascade, après la transition de scène */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
