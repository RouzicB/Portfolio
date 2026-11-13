import { ChoiceIcon, CurrentIcon, DiamondIcon, FlagIcon, LockIcon, PlayIcon, StudyIcon, WorkIcon } from "../icons/DetroitIcons";
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
          <PlayIcon size={11} />
        </span>
      );
    case "locked":
      return (
        <span className={`${box} border border-dashed border-muted/60 text-muted`}>
          <LockIcon size={12} strokeWidth={1.6} accent="currentColor" />
        </span>
      );
    case "future":
      return <span className={`${box} border border-dashed border-muted/60 text-[11px] font-bold text-muted`}>?</span>;
    case "choice":
      return (
        <span className={`${box} bg-hud/15 text-hud-ink`}>
          <ChoiceIcon size={13} strokeWidth={1.6} />
        </span>
      );
    case "current":
      return (
        <span className={`${box} bg-hud text-white`}>
          <CurrentIcon size={13} strokeWidth={1.6} accent="currentColor" />
        </span>
      );
    case "start":
      return (
        <span className={`${box} bg-fg text-bg`}>
          <FlagIcon size={12} strokeWidth={1.6} />
        </span>
      );
    default: {
      const Icon = node.domain === "formation" ? StudyIcon : node.domain === "work" ? WorkIcon : DiamondIcon;
      return (
        <span className={`${box} border border-hud/60 text-hud-ink`}>
          <Icon size={13} strokeWidth={1.6} />
        </span>
      );
    }
  }
}
