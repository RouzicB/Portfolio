"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GitFork } from "lucide-react";

/**
 * Après un choix important (élément marqué `data-consequence`), une notification apparaît en haut à gauche,
 * comme quand l'arborescence enregistre une décision.
 */
export default function ConsequenceToast() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest("[data-consequence]")) return;
      setShown((n) => n + 1);
      clearTimeout(timer);
      timer = setTimeout(() => setShown(0), 3400);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed left-4 top-[112px] z-[57] sm:left-8">
      <AnimatePresence>
        {shown > 0 && (
          <motion.div
            key={shown}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 border-l-2 border-hud bg-[#0c0e11]/80 py-2.5 pl-3 pr-5 text-white backdrop-blur"
          >
            <motion.span
              initial={{ rotate: -90, scale: 0.4 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
              className="flex size-9 items-center justify-center rounded-full border border-hud text-hud"
            >
              <GitFork size={17} strokeWidth={1.5} />
            </motion.span>
            <span>
              <span className="block hud-label text-hud">Choix enregistré</span>
              <span className="block text-[14px] leading-tight">L’arborescence a été mise à jour.</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
