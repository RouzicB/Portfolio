"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import ScaledFrame from "../ui/ScaledFrame";
import { FlowNodeContent, nodeCardClass } from "./FlowNodeCard";
import { careerEdges, careerNodes, type FlowNode } from "../../data/career";
import { GUTTER, canvasSize, edgePath, isUnlocked, nodeBox } from "../../lib/flowchart";

const { width, height, maxRow } = canvasSize(careerNodes);
const byId = new Map(careerNodes.map((n) => [n.id, n]));
/** Cadrage : l'arbre entier, sans la gouttière des chapitres */
const LEFT = GUTTER - 20;
const VIEW_W = width - LEFT + 20;
const VIEW_H = height - 20;

/** Moment (0 → 1) où un élément de la rangée `row` apparaît */
const startAt = (row: number) => (row / Math.max(1, maxRow)) * 0.7;

function PreviewEdge({ from, to, progress }: Readonly<{ from: FlowNode; to: FlowNode; progress: MotionValue<number> }>) {
  const start = startAt(from.row);
  const length = useTransform(progress, [start, start + 0.15], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.15], [0, 0.7]);
  const d = edgePath(from, to);
  // Mêmes traits que l'arborescence de la page Parcours
  return isUnlocked(from) && isUnlocked(to) ? (
    <motion.path d={d} fill="none" className="stroke-hud" strokeWidth={2} style={{ pathLength: length }} />
  ) : (
    <motion.path d={d} fill="none" className="stroke-muted" strokeWidth={1.5} strokeDasharray="5 6" style={{ opacity }} />
  );
}

function PreviewNode({ node, progress }: Readonly<{ node: FlowNode; progress: MotionValue<number> }>) {
  const start = startAt(node.row);
  const opacity = useTransform(progress, [start, start + 0.1], [0.12, 1]);
  const box = nodeBox(node);
  return (
    <motion.div style={{ left: box.x, top: box.y, width: box.w, height: box.h, opacity }} className={nodeCardClass(node)}>
      <FlowNodeContent node={node} />
    </motion.div>
  );
}

/**
 * Aperçu de l'arborescence qui se trace avec la progression (scène « Parcours » de l'accueil) :
 * l'arbre entier, avec les cartes et les liens de la page Parcours, réduit pour tenir dans son cadre.
 */
export default function FlowchartPreview({ progress }: Readonly<{ progress: MotionValue<number> }>) {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
      <ScaledFrame baseWidth={VIEW_W} baseHeight={VIEW_H}>
        <div className="relative" style={{ width, height, marginLeft: -LEFT, marginTop: -20 }}>
          <svg aria-hidden width={width} height={height} className="absolute inset-0 overflow-visible">
            {careerEdges.map((e) => {
              const from = byId.get(e.from);
              const to = byId.get(e.to);
              return from && to ? <PreviewEdge key={`${e.from}-${e.to}`} from={from} to={to} progress={progress} /> : null;
            })}
          </svg>
          {careerNodes.map((n) => (
            <PreviewNode key={n.id} node={n} progress={progress} />
          ))}
        </div>
      </ScaledFrame>
    </div>
  );
}
