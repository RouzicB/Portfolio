"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Panel({ text }: Readonly<{ text: string }>) {
  // Déplié à l'arrivée, puis replié au bout de quelques secondes ; se déplie au survol
  const [fresh, setFresh] = useState(true);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setFresh(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  const open = fresh || hover;

  return (
    <motion.aside
      aria-label={`Objectif : ${text}`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-[230px] border-l-2 border-hud bg-surface/90 py-2.5 pl-3.5 pr-4 shadow-[0_14px_28px_-16px_rgb(11_18_32/0.6)] backdrop-blur"
    >
      <p className="flex items-center gap-2 hud-label font-bold text-hud-ink">
        {/* Losange d'objectif */}
        <span aria-hidden className="size-2 rotate-45 border border-hud-ink" />
        Objectif
        <span aria-hidden className="ml-auto h-px flex-1 bg-hud/40" />
      </p>
      <motion.p
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, marginTop: open ? 6 : 0 }}
        className="overflow-hidden text-[13px] font-semibold uppercase leading-tight tracking-[0.04em] text-fg"
      >
        {text}
      </motion.p>
    </motion.aside>
  );
}

/** Encart « Objectif » en haut à droite de la tablette */
export default function Objective({ text }: Readonly<{ text?: string }>) {
  if (!text) return null;
  return (
    <div className="chrome-ui fixed right-[max(1.5rem,calc((100vw-1320px)/2+1.5rem))] top-[112px] z-[38] hidden md:block">
      <Panel key={text} text={text} />
    </div>
  );
}
