"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FlowNodeCard from "./FlowNodeCard";
import NodePanel from "./NodePanel";
import ClientPortal from "../tablet/ClientPortal";
import { OVERLAY_ID } from "../../lib/screen";
import { careerChapters, careerEdges, careerNodes } from "../../data/career";
import { ROW_H, TOP, canvasSize, edgePath, isUnlocked } from "../../lib/flowchart";
import { pad } from "../../lib/format";

/** Bandes de chapitres (numéro, titre, séparateur) — partagées avec l'aperçu */
export function ChapterBands() {
  return (
    <>
      {careerChapters.map((chapter, i) => (
        <div
          key={chapter.id}
          className="absolute inset-x-0"
          style={{ top: TOP + chapter.rows[0] * ROW_H - 28, height: (chapter.rows[1] - chapter.rows[0] + 1) * ROW_H }}
        >
          {i > 0 && <span aria-hidden className="absolute inset-x-0 top-0 border-t border-dashed border-line" />}
          <p className="absolute left-0 top-7 w-32">
            <span className="block text-[28px] leading-none font-light text-hud-ink">{pad(i + 1)}</span>
            <span className="mt-1 block hud-label text-body">{chapter.title}</span>
          </p>
        </div>
      ))}
    </>
  );
}

/** Arborescence du parcours : chapitres, liens coudés, nœuds cliquables */
export default function Flowchart() {
  const [selected, setSelected] = useState<string | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const byId = useMemo(() => new Map(careerNodes.map((n) => [n.id, n])), []);
  const { width, height } = canvasSize(careerNodes);
  const node = selected ? byId.get(selected) : undefined;

  return (
    <>
      <div className="-mx-6 overflow-x-auto px-6 pb-8 lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="relative mx-auto" style={{ width, height }}>
          <ChapterBands />

          {/* Liens : chemin emprunté en cyan, chemins non pris en pointillés */}
          <svg aria-hidden width={width} height={height} className="absolute inset-0 overflow-visible">
            {careerEdges.map((edge) => {
              const from = byId.get(edge.from);
              const to = byId.get(edge.to);
              if (!from || !to) return null;
              const d = edgePath(from, to);
              const taken = isUnlocked(from) && isUnlocked(to);
              return taken ? (
                <motion.path
                  key={`${edge.from}-${edge.to}`}
                  d={d}
                  fill="none"
                  className="stroke-hud"
                  strokeWidth={1.5}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              ) : (
                <motion.path
                  key={`${edge.from}-${edge.to}`}
                  d={d}
                  fill="none"
                  className="stroke-muted"
                  strokeDasharray="4 5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              );
            })}
          </svg>

          {careerNodes.map((n) => (
            <FlowNodeCard key={n.id} node={n} selected={selected === n.id} onSelect={() => setSelected(n.id)} />
          ))}
        </div>
      </div>

      {/* Rendu dans le calque de l'écran : le panneau glisse dans la tablette, sous la barre */}
      <ClientPortal target={OVERLAY_ID}>
        {/* Un seul panneau : il reste ouvert et change de contenu quand on choisit un autre nœud */}
        <AnimatePresence>{node && <NodePanel key="panel" node={node} onClose={close} />}</AnimatePresence>
      </ClientPortal>
    </>
  );
}
