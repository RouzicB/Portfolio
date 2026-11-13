"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import {
  BluetoothIcon,
  ContactIcon,
  HomeIcon,
  MessageIcon,
  ParcoursIcon,
  PowerIcon,
  ProfileIcon,
  ProjectsIcon,
  RewindIcon,
  SearchIcon,
  UserIcon,
  WifiIcon,
  type DetroitIcon,
} from "../icons/DetroitIcons";
import Diode from "../hud/Diode";
import ThemeSwitcher from "../themes/ThemeSwitcher";
import SearchOverlay from "../layouts/SearchOverlay";
import ClientPortal from "./ClientPortal";
import { isTabActive, tabs, type TabIcon } from "../../data/tablet";
import { site } from "../../data/site";
import { playRewind } from "../../lib/rewind";
import { lock } from "../../lib/lock";
import { OVERLAY_ID, screenScrollTo } from "../../lib/screen";

const ICONS: Record<TabIcon, DetroitIcon> = {
  home: HomeIcon,
  profile: ProfileIcon,
  projects: ProjectsIcon,
  parcours: ParcoursIcon,
  contact: ContactIcon,
};

const [first, ...rest] = site.author.split(" ");
/** Nom affiché dans la barre, comme une session ouverte : « Baptiste R. » */
const user = `${first} ${rest.map((part) => `${part[0]}.`).join(" ")}`.trim();

/** Onglet d'application : blanc sur violet, l'onglet ouvert est éclairci et souligné de cyan */
function Tab({
  href,
  label,
  icon,
  active,
}: Readonly<(typeof tabs)[number] & { active: boolean }>) {
  const Icon = ICONS[icon];
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      data-prompt-label={active ? undefined : "Ouvrir"}
      data-prompt={active ? "none" : undefined}
      className={`relative flex h-full items-center gap-2 px-3 transition-colors sm:px-4 lg:px-5 ${
        active
          ? "bg-white/12 text-white"
          : "text-white/65 hover:bg-white/6 hover:text-white"
      }`}
    >
      <Icon size={19} strokeWidth={1.4} />
      <span className="hidden text-[12px] font-semibold uppercase tracking-[0.08em] md:block">
        {label}
      </span>
      {active && (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 bg-hud shadow-[0_0_10px_var(--hud)]"
        />
      )}
    </Link>
  );
}

/**
 * Barre de la tablette, d'un seul tenant : capteur, onglets d'application, recherche, reconstruction,
 * Jour / Nuit, réseau, session, bouton d'arrêt (verrouillage) et diode.
 */
export default function NavBar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [searchOpen, setSearchOpen] = useState(false);
  // Changer de page referme la recherche (mise à jour pendant le rendu, sans effet)
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setSearchOpen(false);
  }

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

  /** Reconstruction : retour en haut de l'écran, il passe au bleu et rembobine */
  const rewind = () => {
    playRewind(1200);
    screenScrollTo(0, reduce ? "auto" : "smooth");
  };

  const tool = "flex items-center gap-2 transition-colors";

  return (
    <div className="relative z-20 flex h-12 shrink-0 items-stretch border-b border-white/10 bg-[linear-gradient(90deg,#2b2347,#463a73_55%,#352b5a)] pr-10 text-white sm:h-14 sm:pr-12">
      {/* Capteur frontal */}
      <span
        aria-hidden
        className="mx-4 size-2.5 shrink-0 self-center rounded-full bg-white/85 ring-[3px] ring-white/20"
      />

      <nav
        aria-label="Navigation principale"
        className="flex items-stretch overflow-x-auto [scrollbar-width:none]"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.href}
            {...tab}
            active={isTabActive(tab.href, pathname)}
          />
        ))}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-4 pl-3 sm:gap-5">
        <button
          type="button"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Rechercher (Ctrl + K)"
          aria-expanded={searchOpen}
          className={`${tool} ${searchOpen ? "text-hud" : "text-white/75 hover:text-white"}`}
        >
          <SearchIcon size={19} strokeWidth={1.4} />
          <span className="hidden hud-label 2xl:inline">Rechercher</span>
        </button>
        <button
          type="button"
          onClick={rewind}
          aria-label="Reconstruction (haut de page)"
          data-prompt-label="Reconstruire"
          className={`${tool} text-white/75 hover:text-white`}
        >
          <RewindIcon size={19} strokeWidth={1.4} />
        </button>
        <ThemeSwitcher tone="dark" />
        <span aria-hidden className="hidden h-5 w-px bg-white/25 sm:block" />
        {/* État de l'appareil */}
        <span
          aria-hidden
          className="hidden items-center gap-2.5 text-white/75 xl:flex"
        >
          <WifiIcon size={15} strokeWidth={1.6} />
          <BluetoothIcon size={15} strokeWidth={1.6} />
          <MessageIcon size={15} strokeWidth={1.6} />
        </span>
        <span className="hidden items-center gap-1.5 whitespace-nowrap text-[12px] font-medium lg:flex">
          <UserIcon size={15} strokeWidth={1.6} />
          {user}
        </span>
        <button
          type="button"
          onClick={lock}
          aria-label="Verrouiller la tablette"
          data-prompt-label="Verrouiller"
          className="text-white/80 hover:text-white"
        >
          <PowerIcon size={18} strokeWidth={1.6} />
        </button>
        <Diode size={24} />
      </div>

      {/* Dans l'écran de la tablette, sous la barre */}
      <ClientPortal target={OVERLAY_ID}>
        <AnimatePresence>
          {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
        </AnimatePresence>
      </ClientPortal>
    </div>
  );
}
