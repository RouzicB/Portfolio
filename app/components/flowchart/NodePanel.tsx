"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Badge from "../ui/Badge";
import { buttonClasses } from "../ui/Button";
import PlayThumb from "../hud/PlayThumb";
import ProjectThumb from "../projects/ProjectThumb";
import { NodeIcon, kindLabels } from "./nodeMeta";
import { EASE } from "../journey/motion";
import { careerChapters, type FlowNode } from "../../data/career";
import { getProjectBySlug } from "../../data/projects";
import { pad } from "../../lib/format";

/** Panneau latéral : détail du nœud sélectionné (Échap pour fermer) */
export default function NodePanel({ node, onClose }: Readonly<{ node: FlowNode; onClose: () => void }>) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const project = node.projectSlug ? getProjectBySlug(node.projectSlug) : undefined;
  const chapter = careerChapters.findIndex((c) => node.row >= c.rows[0] && node.row <= c.rows[1]);

  useEffect(() => {
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.aside
      role="dialog"
      aria-label={node.title === "?" ? "Nœud inconnu" : node.title}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-[420px] overflow-y-auto border-l border-line bg-surface/95 px-8 pb-28 pt-28 backdrop-blur"
    >
      <button
        ref={closeButton}
        type="button"
        onClick={onClose}
        aria-label="Fermer le détail"
        className="absolute right-6 top-24 text-body hover:text-fg"
      >
        <X size={22} strokeWidth={1.25} />
      </button>

      <p className="flex items-center gap-2 hud-label text-hud-ink">
        <NodeIcon node={node} />
        {kindLabels[node.kind]}
        {chapter >= 0 && ` · Chapitre ${pad(chapter + 1)} — ${careerChapters[chapter].title}`}
      </p>
      <h2 className="mt-5 text-[30px] leading-tight font-light uppercase tracking-[0.03em] text-fg">{node.title}</h2>
      {node.period && <p className="mt-2 text-[15px] text-body">{node.period}</p>}

      <svg aria-hidden viewBox="0 0 240 6" className="my-6 h-1.5 w-48 text-hud">
        <line x1="0" y1="5.5" x2="240" y2="5.5" stroke="currentColor" strokeWidth="0.75" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={i * 8} y1="2" x2={i * 8} y2="5.5" stroke="currentColor" strokeWidth="0.75" />
        ))}
      </svg>

      <p className="text-sm leading-relaxed text-body">{project ? project.summary : node.text}</p>

      {node.tags && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {node.tags.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
      )}

      {project && (
        <div className="mt-8 space-y-8">
          <PlayThumb href={`/projets/${project.slug}`} label="ouvrir le dossier">
            <ProjectThumb demo={project.demo} />
          </PlayThumb>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
          <Link href={`/projets/${project.slug}`} className={buttonClasses("primary")}>
            Étude de cas
          </Link>
        </div>
      )}

      {node.kind === "locked" && <p className="mt-8 hud-label text-muted">Ce chemin n’a pas été emprunté.</p>}

      {node.kind === "future" && (
        <Link href="/contact" className={`mt-8 ${buttonClasses("blue")}`}>
          Écrire ce chapitre
        </Link>
      )}
    </motion.aside>
  );
}
