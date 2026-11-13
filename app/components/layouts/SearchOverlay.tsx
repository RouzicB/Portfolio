"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CloseIcon, SearchIcon } from "../icons/DetroitIcons";
import ScreenBackdrop from "../tablet/ScreenBackdrop";
import { searchSite } from "../../lib/search";

/** Décélération longue et douce (ease-out quint) */
const SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Recherche dans la tablette : un panneau qui descend de la barre de menu et couvre l'écran
 * (rendu dans le calque de l'écran). Pages et études de cas. Entrée = premier résultat, Échap = fermer.
 */
export default function SearchOverlay({ onClose }: Readonly<{ onClose: () => void }>) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const results = searchSite(query);

  useEffect(() => {
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Recherche"
      // Glisse depuis le dessous de la barre (le calque de l'écran le découpe) ; seule la position est animée
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.35, ease: SOFT } }}
      transition={{ duration: 0.5, ease: SOFT }}
      className="pointer-events-auto absolute inset-0 z-20 overflow-y-auto bg-surface shadow-[0_12px_30px_-12px_rgb(11_18_32/0.35)] will-change-transform"
    >
      <ScreenBackdrop variant="triangles" seed={7} className="opacity-50" />
      <div className="relative mx-auto max-w-[960px] px-8 pb-16 pt-12 sm:px-14">
        <button type="button" onClick={onClose} aria-label="Fermer la recherche" className="absolute right-6 top-6 text-body hover:text-fg sm:right-10">
          <CloseIcon size={24} strokeWidth={1.4} />
        </button>

        <p className="flex items-center gap-2 hud-label text-hud-ink">
          <SearchIcon size={13} strokeWidth={1.8} /> Recherche · Ctrl + K
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (results[0]) {
              router.push(results[0].href);
              onClose();
            }
          }}
        >
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Projet, discipline, outil…"
            aria-label="Rechercher"
            className="mt-3 w-full border-b border-line bg-transparent pb-3 text-[clamp(1.75rem,4vw,3rem)] font-light uppercase text-fg outline-none placeholder:text-muted/60 focus:border-hud"
          />
        </form>

        {results.length > 0 ? (
          <ul className="mt-8 divide-y divide-line">
            {results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} onClick={onClose} className="flex items-baseline justify-between gap-4 py-4 text-[17px] text-body hover:text-fg">
                  {r.title}
                  <span className="hud-label text-hud-ink">{r.kind}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-body">Aucun résultat.</p>
        )}
      </div>
    </motion.div>
  );
}
