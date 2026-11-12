import type { Mood } from "../lib/mood";

export type TabIcon = "home" | "profile" | "projects" | "parcours" | "contact";

/** Onglets de la tablette (navigation principale), comme les applications ouvertes sur l'écran */
export const tabs: readonly { href: string; label: string; icon: TabIcon }[] = [
  { href: "/", label: "Accueil", icon: "home" },
  { href: "/a-propos", label: "Profil", icon: "profile" },
  { href: "/projets", label: "Projets", icon: "projects" },
  { href: "/parcours", label: "Parcours", icon: "parcours" },
  { href: "/contact", label: "Contact", icon: "contact" },
];

export const isTabActive = (href: string, pathname: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export interface TabletEntry {
  /** Encart « Objectif » en haut à droite */
  objective: string;
  /** Pensée en sous-titre : remplace les bulles d'aide et les tutoriels */
  thought: string;
  /** Ambiance lumineuse autour de la tablette */
  mood: Mood;
}

/** Une entrée par page ; la plus longue correspondance l'emporte (« /projets/ » couvre les études de cas) */
const entries: Record<string, TabletEntry> = {
  "/a-propos": {
    objective: "Faire connaissance",
    thought: "Ma fiche complète. Autant être honnête sur ce que je sais faire.",
    mood: "analysis",
  },
  "/projets": {
    objective: "Ouvrir un dossier",
    thought: "Mes dossiers. Chacun contient une démo… et il reste des emplacements à remplir.",
    mood: "stable",
  },
  "/projets/": {
    objective: "Manipuler la démo",
    thought: "Ce dossier est encore actif. La démo répond, je peux la manipuler.",
    mood: "analysis",
  },
  "/parcours": {
    objective: "Relire mes choix",
    thought: "Chaque nœud cache un souvenir. Si je le sélectionne, je peux le relire.",
    mood: "stable",
  },
  "/contact": {
    objective: "Établir le contact",
    thought: "Un message… Et si quelqu’un répondait, cette fois ?",
    mood: "warm",
  },
  "/credits": {
    objective: "Dire merci",
    thought: "Rien de tout ça n’existerait sans eux.",
    mood: "analysis",
  },
};

export function tabletFor(pathname: string): TabletEntry | undefined {
  const key = Object.keys(entries)
    .filter((k) => pathname === k || (k.endsWith("/") ? pathname.startsWith(k) : pathname.startsWith(`${k}/`)))
    .sort((a, b) => b.length - a.length)[0];
  return key ? entries[key] : undefined;
}

/** Devises qui défilent dans la marge de l'écran, comme des journaux système */
export const marginWords = ["TESTER", "ÉCOUTER", "ITÉRER", "PROTOTYPER", "UTILISATEUR D’ABORD", "SIMPLIFIER", "OBSERVER"] as const;

/** Nom de l'application ouverte, affiché dans la barre d'état */
export function appOf(pathname: string) {
  if (pathname === "/") return "Accueil";
  if (pathname.startsWith("/projets/")) return "Projets · Dossier";
  if (pathname === "/projets") return "Projets · Archives";
  if (pathname.startsWith("/credits")) return "Crédits";
  return tabs.find((t) => t.href !== "/" && pathname.startsWith(t.href))?.label ?? "Système";
}

/**
 * Position d'une page sur la tablette, de gauche à droite (ordre des onglets) :
 * une étude de cas est juste à droite des projets, les crédits et pages inconnues tout à droite.
 */
export function pageOrder(pathname: string) {
  if (pathname.startsWith("/projets/")) return tabs.findIndex((t) => t.href === "/projets") + 0.5;
  const index = tabs.findIndex((t) => isTabActive(t.href, pathname));
  return index === -1 ? tabs.length : index;
}

/** Sens du glissement entre deux pages : 1 = vers la droite (la page arrive de la droite), -1 = vers la gauche, 0 = aucun */
export function slideDirection(from: string | null, to: string) {
  if (from === null || from === to) return 0;
  return Math.sign(pageOrder(to) - pageOrder(from)) || 1;
}
