/** Démo interactive affichée pour un projet */
export type DemoType = "before-after" | "prototype" | "hotspots";

export interface Project {
  slug: string;
  title: string;
  /** Titre d'affichage : partie fine + partie grasse, ex. « NÉO » + « BANK » */
  display: { light: string; bold?: string };
  client: string;
  year: number;
  role: string;
  duration: string;
  platform: string;
  /** Une phrase : l'objectif du projet */
  summary: string;
  challenge: string;
  solution: string;
  /** Disciplines (servent aux filtres des archives) */
  tags: string[];
  tools: string[];
  process: { title: string; description: string }[];
  insights: string[];
  outcomes: { value: string; label: string }[];
  demo: DemoType;
  featured?: boolean;
  links?: {
    prototype?: string;
    figma?: string;
  };
}
