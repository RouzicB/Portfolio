import { projects } from "../data/projects";
import { navigation } from "../data/site";

export interface SearchResult {
  title: string;
  href: string;
  kind: "Page" | "Dossier";
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const index = [
  { title: "Accueil", href: "/", kind: "Page" as const, text: normalize("Accueil voyage presentation") },
  ...navigation.map((n) => ({ title: n.label, href: n.href, kind: "Page" as const, text: normalize(n.label) })),
  { title: "Profil", href: "/a-propos", kind: "Page" as const, text: normalize("Profil a propos biographie methode outils") },
  {
    title: "Crédits",
    href: "/credits",
    kind: "Page" as const,
    text: normalize("Credits Detroit Become Human Quantic Dream Elias Holtsmann inspiration"),
  },
  ...projects.map((p) => ({
    title: p.title,
    href: `/projets/${p.slug}`,
    kind: "Dossier" as const,
    text: normalize([p.title, p.client, p.summary, p.platform, ...p.tags, ...p.tools].join(" ")),
  })),
];

/** Recherche plein texte (sans accents) dans les pages et les études de cas */
export function searchSite(query: string): SearchResult[] {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return index
    .filter((entry) => words.every((w) => entry.text.includes(w)))
    .map(({ title, href, kind }) => ({ title, href, kind }));
}
