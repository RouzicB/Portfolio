"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { FolderOpen, GitFork, House, Mail, Rewind, Search, UserRound, type LucideIcon } from "lucide-react";
import Diode from "../hud/Diode";
import ThemeSwitcher from "../themes/ThemeSwitcher";
import SearchOverlay from "../layouts/SearchOverlay";
import ClientPortal from "./ClientPortal";
import { isTabActive, tabs, type TabIcon } from "../../data/tablet";
import { playRewind } from "../../lib/rewind";
import { OVERLAY_ID, screenScrollTo } from "../../lib/screen";

const ICONS: Record<TabIcon, LucideIcon> = {
  home: House,
  profile: UserRound,
  projects: FolderOpen,
  parcours: GitFork,
  contact: Mail,
};

/** Onglet d'application ; l'onglet ouvert prend la couleur de la barre d'état, souligné de cyan */
function Tab({ href, label, icon, active }: Readonly<(typeof tabs)[number] & { active: boolean }>) {
  const Icon = ICONS[icon];
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      data-prompt-label={active ? undefined : "Ouvrir"}
      data-prompt={active ? "none" : "box"}
      className={`relative flex h-full items-center gap-2 px-3 transition-colors sm:px-4 lg:px-5 ${
        active ? "bg-[linear-gradient(180deg,#5e2f4b,#46223b)] text-white" : "text-body hover:bg-bg hover:text-fg"
      }`}
    >
      <Icon size={17} strokeWidth={1.5} className="shrink-0" />
      <span className="hidden text-[12px] font-semibold uppercase tracking-[0.08em] md:block">{label}</span>
      {active && <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-hud shadow-[0_0_8px_var(--hud)]" />}
    </Link>
  );
}

/** Barre de menu de la tablette : onglets d'application, recherche, reconstruction, Jour / Nuit, diode */
export default function NavBar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // La recherche est liée à la page où on l'a ouverte : changer de page la referme
  const [searchPath, setSearchPath] = useState<string | null>(null);
  const searchOpen = searchPath === pathname;
  const setSearchOpen = (open: boolean) => setSearchPath(open ? pathname : null);

  // Ctrl / ⌘ + K ouvre la recherche
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchPath(pathname);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathname]);

  /** Reconstruction : retour en haut de l'écran, il passe au bleu et rembobine */
  const rewind = () => {
    playRewind(1200);
    screenScrollTo(0, reduce ? "auto" : "smooth");
  };

  return (
    <div className="chrome-ui relative z-20 flex h-12 shrink-0 items-stretch border-b border-line bg-surface">
      <nav aria-label="Navigation principale" className="flex items-stretch overflow-x-auto [scrollbar-width:none]">
        {tabs.map((tab) => (
          <Tab key={tab.href} {...tab} active={isTabActive(tab.href, pathname)} />
        ))}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-4 pl-3 pr-4 sm:gap-5 sm:pr-5">
        <button
          type="button"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Rechercher (Ctrl + K)"
          aria-expanded={searchOpen}
          className={`flex items-center gap-2 transition-colors ${searchOpen ? "text-hud-ink" : "text-body hover:text-fg"}`}
        >
          <Search size={18} strokeWidth={1.5} />
          <span className="hidden hud-label lg:inline">Rechercher</span>
        </button>
        <button type="button" onClick={rewind} aria-label="Reconstruction (haut de page)" data-prompt-label="Reconstruire" className="text-body hover:text-fg">
          <Rewind size={18} strokeWidth={1.5} />
        </button>
        <ThemeSwitcher />
        <span aria-hidden className="h-5 w-px bg-line" />
        <Diode size={24} />
      </div>

      {/* Dans l'écran de la tablette, sous la barre de menu */}
      <ClientPortal target={OVERLAY_ID}>
        <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
      </ClientPortal>
    </div>
  );
}
