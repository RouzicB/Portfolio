"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard, { LockedSlot } from "./ProjectCard";
import { buttonClasses } from "../ui/Button";
import { allTags, projects } from "../../data/projects";

const ALL = "Tous";
/** Emplacements verrouillés affichés à la suite des projets (les dossiers restant à écrire) */
const LOCKED = 3;

/** Filtres par discipline (actif = bouton plein) */
export function ArchiveFilters({ value, onChange }: Readonly<{ value: string; onChange: (tag: string) => void }>) {
  return (
    <div role="group" aria-label="Filtrer par discipline" className="flex flex-wrap gap-x-6 gap-y-4 px-2">
      {[ALL, ...allTags].map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={value === t}
          onClick={() => onChange(t)}
          data-prompt={value === t ? "none" : undefined}
          data-prompt-label="Trier"
          className={buttonClasses(value === t ? "primary" : "ghost", "sm")}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* Chaque colonne correspond à un volet de l'écran partagé (à gauche du séparateur, puis à droite) */
const cell = (i: number) => (i % 2 === 0 ? "pl-14 pr-6 sm:pl-16 lg:pl-20 lg:pr-16" : "pl-14 pr-6 sm:pl-16 lg:pl-16 lg:pr-12");

/** Galerie des projets : en-tête à gauche, filtres à droite, puis un dossier par volet et par rangée */
export default function ProjectArchive({ intro }: Readonly<{ intro: ReactNode }>) {
  const [tag, setTag] = useState<string>(ALL);
  const list = tag === ALL ? projects : projects.filter((p) => p.tags.includes(tag));
  const locked = tag === ALL ? LOCKED : 0;

  return (
    <>
      <div className="grid lg:grid-cols-2">
        <div className={`${cell(0)} pb-10 pt-14`}>{intro}</div>
        <div className={`${cell(1)} flex flex-col justify-end pb-10 lg:pt-14`}>
          <p className="mb-4 hud-label text-hud-ink">Trier les dossiers</p>
          <ArchiveFilters value={tag} onChange={setTag} />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length} étude(s) de cas affichée(s)
      </p>

      <motion.ul layout className="grid gap-y-20 pb-20 pt-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={cell(i)}
            >
              <ProjectCard project={project} number={projects.indexOf(project) + 1} />
            </motion.li>
          ))}
          {Array.from({ length: locked }, (_, k) => (
            <motion.li key={`locked-${k}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={cell(list.length + k)}>
              <LockedSlot index={projects.length + k + 1} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
