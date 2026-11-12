import { Briefcase, CircleDot, Diamond, Flag, GitFork, GraduationCap, Lock, Play } from "lucide-react";
import type { FlowKind, FlowNode } from "../../data/career";

export const kindLabels: Record<FlowKind, string> = {
  start: "Origine",
  step: "Étape",
  choice: "Choix",
  current: "En cours",
  project: "Projet",
  locked: "Verrouillé",
  future: "Inconnu",
};

/** Pastille d'icône d'un nœud (carré jaune pour les projets, comme le bouton lecture) */
export function NodeIcon({ node }: Readonly<{ node: Pick<FlowNode, "kind" | "domain"> }>) {
  const box = "flex size-5 shrink-0 items-center justify-center";
  switch (node.kind) {
    case "project":
      return (
        <span className={`${box} bg-loading text-[#1d1f22]`}>
          <Play size={9} className="fill-current" aria-hidden />
        </span>
      );
    case "locked":
      return (
        <span className={`${box} border border-dashed border-muted/60 text-muted`}>
          <Lock size={10} aria-hidden />
        </span>
      );
    case "future":
      return <span className={`${box} border border-dashed border-muted/60 text-[11px] font-bold text-muted`}>?</span>;
    case "choice":
      return (
        <span className={`${box} bg-hud/15 text-hud-ink`}>
          <GitFork size={11} aria-hidden />
        </span>
      );
    case "current":
      return (
        <span className={`${box} bg-hud text-white`}>
          <CircleDot size={11} aria-hidden />
        </span>
      );
    case "start":
      return (
        <span className={`${box} bg-fg text-bg`}>
          <Flag size={10} aria-hidden />
        </span>
      );
    default: {
      const Icon = node.domain === "formation" ? GraduationCap : node.domain === "work" ? Briefcase : Diamond;
      return (
        <span className={`${box} border border-hud/60 text-hud-ink`}>
          <Icon size={11} aria-hidden />
        </span>
      );
    }
  }
}
