"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { tabletFor } from "../../data/tablet";
import { site } from "../../data/site";

const seenKey = (id: string) => `pensee:${id}`;
const speaker = site.author.split(" ")[0];

function Subtitle({ id, text }: Readonly<{ id: string; text: string }>) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Une pensée n'est dite qu'une fois par visite
    let seen = false;
    try {
      seen = sessionStorage.getItem(seenKey(id)) === "1";
    } catch {
      // stockage indisponible : on affiche quand même
    }
    if (seen) return;
    const words = text.split(" ").length;
    const show = setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem(seenKey(id), "1");
      } catch {
        // rien à faire
      }
    }, 900);
    const hide = setTimeout(() => setVisible(false), 900 + Math.max(4200, words * 380));
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [id, text]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-fit max-w-[720px] bg-[#0c0e11]/75 px-6 py-2 text-center text-[16px] leading-snug text-white backdrop-blur-sm"
        >
          <span className="mr-2 font-bold uppercase tracking-[0.06em] text-hud">{speaker} :</span>
          {text.split(" ").map((word, i) => (
            <motion.span
              key={`${i}-${word}`}
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.15 + i * 0.07, duration: 0.25 }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/**
 * Pensée en sous-titre, au bas de l'écran : les indications passent par la voix du narrateur
 * plutôt que par des bulles d'aide.
 */
export default function InnerVoice({ id, text }: Readonly<{ id: string; text?: string }>) {
  return (
    <div role="status" aria-live="polite" className="pointer-events-none absolute inset-x-4 bottom-6">
      {text && <Subtitle key={id} id={id} text={text} />}
    </div>
  );
}

/** Pensée de la page courante (l'accueil a la sienne, scène par scène) */
export function PageVoice() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <InnerVoice id={pathname} text={tabletFor(pathname)?.thought} />;
}

/** Objectif de la page courante */
export function usePageObjective() {
  const pathname = usePathname();
  return pathname === "/" ? undefined : tabletFor(pathname)?.objective;
}
