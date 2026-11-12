"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { careerEdges, careerNodes, type FlowNode } from "../../data/career";
import { GUTTER, canvasSize, edgePath, isUnlocked, nodeBox } from "../../lib/flowchart";

const { width, height, maxRow } = canvasSize(careerNodes);
const byId = new Map(careerNodes.map((n) => [n.id, n]));

/** Moment (0 → 1) où un élément de la rangée `row` apparaît */
const startAt = (row: number) => (row / Math.max(1, maxRow)) * 0.7;

function PreviewEdge({ from, to, progress }: Readonly<{ from: FlowNode; to: FlowNode; progress: MotionValue<number> }>) {
  const start = startAt(from.row);
  const length = useTransform(progress, [start, start + 0.15], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.15], [0, 0.6]);
  const d = edgePath(from, to);
  return isUnlocked(from) && isUnlocked(to) ? (
    <motion.path d={d} fill="none" className="stroke-hud" strokeWidth={3} style={{ pathLength: length }} />
  ) : (
    <motion.path d={d} fill="none" className="stroke-muted" strokeWidth={2} strokeDasharray="8 10" style={{ opacity }} />
  );
}

function PreviewNode({ node, progress }: Readonly<{ node: FlowNode; progress: MotionValue<number> }>) {
  const start = startAt(node.row);
  const opacity = useTransform(progress, [start, start + 0.1], [0.12, 1]);
  const box = nodeBox(node);
  const muted = !isUnlocked(node);
  const fill = node.kind === "project" ? "fill-loading" : node.kind === "choice" ? "fill-hud/20" : muted ? "fill-transparent" : "fill-surface";

  return (
    <motion.g style={{ opacity }}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        className={`${fill} ${muted ? "stroke-muted" : "stroke-hud"}`}
        strokeWidth={2}
        strokeDasharray={muted ? "8 8" : undefined}
      />
      <text x={box.x + 14} y={box.y + box.h - 18} fontSize="17" className={`uppercase ${muted ? "fill-muted" : "fill-fg"}`}>
        {node.title.length > 18 ? `${node.title.slice(0, 17)}…` : node.title}
      </text>
    </motion.g>
  );
}

/** Aperçu de l'arborescence qui se trace avec la progression (scène « Parcours » de l'accueil) */
export default function FlowchartPreview({ progress }: Readonly<{ progress: MotionValue<number> }>) {
  return (
    <svg viewBox={`${GUTTER - 20} 20 ${width - GUTTER + 40} ${height}`} className="w-full" aria-hidden>
      {careerEdges.map((e) => {
        const from = byId.get(e.from);
        const to = byId.get(e.to);
        return from && to ? <PreviewEdge key={`${e.from}-${e.to}`} from={from} to={to} progress={progress} /> : null;
      })}
      {careerNodes.map((n) => (
        <PreviewNode key={n.id} node={n} progress={progress} />
      ))}
    </svg>
  );
}
