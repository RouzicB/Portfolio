"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Container from "../ui/Container";
import { searchSite } from "../../lib/search";

/** Recherche plein écran : pages et études de cas. Entrée = premier résultat, Échap = fermer. */
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-bg/95 backdrop-blur"
    >
      <Container className="relative pb-24 pt-32">
        <button type="button" onClick={onClose} aria-label="Fermer la recherche" className="absolute right-6 top-8 text-body hover:text-fg lg:right-10">
          <X size={24} strokeWidth={1.25} />
        </button>

        <p className="hud-label text-hud-ink">Recherche</p>
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
      </Container>
    </motion.div>
  );
}
