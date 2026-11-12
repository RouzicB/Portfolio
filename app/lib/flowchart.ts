import type { FlowNode } from "../data/career";

/** Gouttière gauche réservée aux numéros de chapitres */
export const GUTTER = 150;
export const COL_W = 228;
export const NODE_W = 196;
export const NODE_H = 88;
export const ROW_H = 140;
export const TOP = 48;

/** Position et taille d'un nœud sur le canevas */
export function nodeBox(node: Pick<FlowNode, "col" | "row">) {
  return {
    x: GUTTER + node.col * COL_W + (COL_W - NODE_W) / 2,
    y: TOP + node.row * ROW_H,
    w: NODE_W,
    h: NODE_H,
  };
}

/** Lien coudé (vertical → horizontal → vertical) du bas d'un nœud au haut du suivant */
export function edgePath(from: Pick<FlowNode, "col" | "row">, to: Pick<FlowNode, "col" | "row">) {
  const a = nodeBox(from);
  const b = nodeBox(to);
  const sx = a.x + a.w / 2;
  const sy = a.y + a.h;
  const tx = b.x + b.w / 2;
  const ty = b.y;
  if (Math.abs(sx - tx) < 1) return `M${sx} ${sy}V${ty}`;
  const my = sy + (ty - sy) / 2;
  return `M${sx} ${sy}V${my}H${tx}V${ty}`;
}

export function canvasSize(nodes: readonly Pick<FlowNode, "col" | "row">[]) {
  const maxCol = Math.max(...nodes.map((n) => n.col));
  const maxRow = Math.max(...nodes.map((n) => n.row));
  return { width: GUTTER + (maxCol + 1) * COL_W, height: TOP + (maxRow + 1) * ROW_H, maxRow };
}

/** Nœud débloqué = chemin réellement emprunté */
export const isUnlocked = (node: Pick<FlowNode, "kind">) => node.kind !== "locked" && node.kind !== "future";

/** Statistiques façon « fin de chapitre » */
export function flowStats(nodes: readonly Pick<FlowNode, "kind">[]) {
  const unlocked = nodes.filter(isUnlocked).length;
  return {
    completion: Math.round((unlocked / nodes.length) * 100),
    choices: nodes.filter((n) => n.kind === "choice").length,
    unexplored: nodes.filter((n) => n.kind === "locked").length,
    projects: nodes.filter((n) => n.kind === "project").length,
  };
}
