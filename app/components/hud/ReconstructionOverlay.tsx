"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RewindIcon } from "../icons/DetroitIcons";
import { useRewindEffect } from "../../lib/rewind";

/**
 * Reconstruction (remonter le temps) : l'écran passe au bleu, des lignes de balayage le parcourent,
 * une barre de lecture recule, et la tablette elle-même « glitche » (classe `rewind-target`).
 * Déclenché uniquement par le bouton ◄◄ de la barre de la tablette (playRewind).
 */
export default function ReconstructionOverlay() {
  const active = useRewindEffect();
  const reduce = useReducedMotion();

  // La tablette glitche pendant l'effet
  useEffect(() => {
    document.documentElement.toggleAttribute("data-rewinding", active);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed inset-0 z-[58] overflow-hidden"
        >
          {/* Teinte bleue d'analyse */}
          <div className="absolute inset-0 mix-blend-color" style={{ background: "#0b6bcc", opacity: 0.6 }} />
          <div className="absolute inset-0 bg-[#00d1ff]/10" />
          <div className="scanlines absolute inset-0" />
          {/* Bords sombres et flous */}
          <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:radial-gradient(ellipse_at_center,transparent_40%,#000_90%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(4_16_36/0.6))]" />
          {/* Ligne de balayage qui remonte l'écran */}
          {!reduce && (
            <motion.span
              className="absolute inset-x-0 h-0.5 bg-hud shadow-[0_0_18px_4px_rgb(0_209_255/0.6)]"
              initial={{ top: "100%" }}
              animate={{ top: "0%" }}
              transition={{ duration: 0.9, ease: "linear" }}
            />
          )}
          {/* Libellé et barre de lecture qui recule */}
          <div className="absolute left-1/2 top-1/2 flex w-[min(80vw,420px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-white">
            <span className="flex items-center gap-3 text-[15px] font-semibold uppercase tracking-[0.4em] [text-shadow:0_0_12px_#00d1ff]">
              <RewindIcon size={24} strokeWidth={1.6} accent="currentColor" />
              Reconstruction
            </span>
            <span className="relative block h-px w-full bg-white/30">
              <motion.span
                className="absolute inset-y-0 left-0 block bg-hud shadow-[0_0_8px_#00d1ff]"
                initial={{ width: "100%" }}
                animate={{ width: reduce ? "100%" : "0%" }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.25, 1] }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
