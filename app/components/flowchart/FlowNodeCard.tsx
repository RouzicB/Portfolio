"use client";

import { motion } from "framer-motion";
import { Corners } from "../hud/Corners";
import { NodeIcon, kindLabels } from "./nodeMeta";
import type { FlowNode } from "../../data/career";
import { nodeBox } from "../../lib/flowchart";

/* Hexagone pour les choix : la forme signale une décision */
const HEX = "[clip-path:polygon(14px_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,14px_100%,0_50%)]";

const styles: Record<FlowNode["kind"], string> = {
  start: "border border-hud/50 bg-surface/90 shadow-[0_10px_24px_-16px_rgba(29,42,74,0.45)] hover:border-hud",
  step: "border border-hud/50 bg-surface/90 shadow-[0_10px_24px_-16px_rgba(29,42,74,0.45)] hover:border-hud",
  project: "border border-hud/50 bg-surface/90 shadow-[0_10px_24px_-16px_rgba(29,42,74,0.45)] hover:border-hud",
  current: "border border-hud bg-surface shadow-[0_0_24px_-4px_var(--hud)]",
  choice: `${HEX} bg-hud/12 px-6 hover:bg-hud/20`,
  locked: "border border-dashed border-muted/50 bg-bg/40 text-muted hover:border-muted",
  future: "border border-dashed border-muted/50 bg-bg/40 text-muted hover:border-muted",
};

interface FlowNodeCardProps {
  node: FlowNode;
  selected: boolean;
  onSelect: () => void;
}

/** Nœud de l'arborescence : bouton qui ouvre le panneau de détail */
export default function FlowNodeCard({ node, selected, onSelect }: Readonly<FlowNodeCardProps>) {
  const box = nodeBox(node);
  const muted = node.kind === "locked" || node.kind === "future";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-haspopup="dialog"
      aria-expanded={selected}
      aria-label={`${kindLabels[node.kind]} : ${node.title === "?" ? "nœud inconnu" : node.title}`}
      style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1 + (node.row % 3) * 0.05 }}
      className={`group absolute flex flex-col justify-between p-3 text-left transition-colors ${styles[node.kind]}`}
    >
      {selected && <Corners size={8} offset={node.kind === "choice" ? 0 : 5} />}
      <span className="flex items-center justify-between gap-2">
        <span className={`flex items-center gap-2 whitespace-nowrap hud-label ${muted ? "text-muted" : "text-body"}`}>
          <NodeIcon node={node} />
          {kindLabels[node.kind]}
        </span>
        {node.period && <span className="text-right hud-label text-hud-ink">{node.period}</span>}
      </span>
      <span
        className={`line-clamp-2 text-[13px] leading-tight font-semibold uppercase tracking-[0.03em] ${
          muted ? "text-muted" : "text-fg"
        } ${node.kind === "future" ? "text-center text-2xl font-light" : ""}`}
      >
        {node.title}
      </span>
      {node.kind === "current" && (
        <span aria-hidden className="absolute -right-1.5 -top-1.5 size-3 animate-ping rounded-full bg-hud/70" />
      )}
    </motion.button>
  );
}
