"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { FolderOpen, GitFork, House, Mail, Rewind, Search, UserRound, type LucideIcon } from "lucide-react";
import Diode from "../hud/Diode";
import SearchOverlay from "./SearchOverlay";
import { site } from "../../data/site";
import { isTabActive, tabs, type TabIcon } from "../../data/tablet";
import { playRewind } from "../../lib/rewind";

const ICONS: Record<TabIcon, LucideIcon> = {
  home: House,
  profile: UserRound,
  projects: FolderOpen,
  parcours: GitFork,
  contact: Mail,
};

/** Onglet d'application qui dépasse du haut de la tablette ; l'onglet ouvert prend la couleur de la barre d'état */
function Tab({ href, label, icon, active }: Readonly<(typeof tabs)[number] & { active: boolean }>) {
  const Icon = ICONS[icon];
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      data-prompt-label={active ? undefined : "Ouvrir"}
      data-prompt={active ? "none" : "box"}
      className={`chamfer group relative flex w-[54px] flex-col items-center justify-start gap-1 pt-2 transition-[height,background-color,color] duration-300 [--ch:10px] [--r:6px] sm:w-[88px] ${
        active
          ? "h-[46px] bg-[linear-gradient(180deg,#6b3552,#4a2340)] text-white"
          : "h-[40px] bg-surface/85 text-body backdrop-blur hover:h-[44px] hover:bg-surface hover:text-fg"
      }`}
    >
      <Icon size={17} strokeWidth={1.5} className="shrink-0" />
      <span className="hidden hud-label leading-none sm:block">{label}</span>
      {active && <span aria-hidden className="absolute inset-x-3 top-0 h-0.5 bg-hud shadow-[0_0_8px_var(--hud)]" />}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [searchOpen, setSearchOpen] = useState(false);

  // Ctrl / ⌘ + K ouvre la recherche
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Reconstruction : retour en haut de la page, l'écran passe au bleu et rembobine */
  const rewind = () => {
    playRewind(1200);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header className={`chrome-ui fixed inset-x-0 top-0 z-40 h-[64px] ${pathname === "/" ? "" : "bg-gradient-to-b from-bg via-bg/90 to-bg/0"}`}>
      <div className="mx-auto flex h-full max-w-[1320px] items-end px-3 sm:px-6 lg:px-10">
        {/* Logo sur deux lignes */}
        <Link href="/" aria-label="Accueil" data-prompt-label="Revenir" className="mb-3 hidden shrink-0 leading-none md:block">
          <span className="block text-[19px] font-bold uppercase tracking-[0.02em] text-[#5d6268] [text-shadow:0_1px_0_rgba(255,255,255,0.8)] dark:text-[#c4cbd2] dark:[text-shadow:none]">
            {site.logo.top}
          </span>
          <span className="mt-1 block text-[7px] font-bold uppercase tracking-[0.5em] text-fg">{site.logo.bottom}</span>
        </Link>

        {/* Onglets de la tablette */}
        <nav aria-label="Navigation principale" className="mx-auto flex items-end gap-1 sm:gap-1.5">
          {tabs.map((tab) => (
            <Tab key={tab.href} {...tab} active={isTabActive(tab.href, pathname)} />
          ))}
        </nav>

        {/* Outils */}
        <div className="mb-3 flex shrink-0 items-center gap-4 sm:gap-5">
          <button type="button" onClick={() => setSearchOpen(true)} aria-label="Rechercher (Ctrl + K)" className="text-body hover:text-fg">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={rewind}
            aria-label="Reconstruction (haut de page)"
            data-prompt-label="Reconstruire"
            className="hidden text-body hover:text-fg sm:block"
          >
            <Rewind size={20} strokeWidth={1.5} />
          </button>
          <Diode size={28} />
        </div>
      </div>

      <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
    </header>
  );
}
