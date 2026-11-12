"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import { stagger } from "../journey/motion";

/** En-tête des pages classiques, sur le même gabarit que les scènes (texte 5/12, visuel 7/12) */
export default function PageHero({ left, right }: Readonly<{ left: ReactNode; right?: ReactNode }>) {
  return (
    <Container className="grid min-h-[min(var(--screen-h),780px)] grid-cols-1 content-center gap-12 pb-12 pt-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pr-12">
      <motion.div variants={stagger} initial="hidden" animate="show" className="lg:col-span-5 lg:pl-14">
        {left}
      </motion.div>
      {right && (
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {right}
        </motion.div>
      )}
    </Container>
  );
}
