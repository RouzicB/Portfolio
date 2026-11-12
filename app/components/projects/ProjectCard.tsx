import Link from "next/link";
import { Lock, Play } from "lucide-react";
import Badge from "../ui/Badge";
import { Corners } from "../hud/Corners";
import ProjectThumb from "./ProjectThumb";
import type { Project } from "../../types/project";
import { demoLabels } from "../../data/projects";
import { pad } from "../../lib/format";

/** Carte d'archive : grande vignette (carré jaune de lecture), titre fin + gras, disciplines */
export default function ProjectCard({ project, number }: Readonly<{ project: Project; number: number }>) {
  return (
    <Link href={`/projets/${project.slug}`} className="group block">
      <div className="relative">
        <div className="relative aspect-video overflow-hidden bg-line">
          <ProjectThumb demo={project.demo} />
          <span className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
          <span className="absolute bottom-0 left-0 flex size-6 items-center justify-center bg-loading">
            <Play size={10} className="fill-[#1d1f22] text-[#1d1f22]" aria-hidden />
          </span>
        </div>
        <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Corners size={10} offset={6} />
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between hud-label text-hud-ink">
        <span>
          Dossier {pad(number)} · {project.year}
        </span>
        <span className="text-body">{demoLabels[project.demo]}</span>
      </div>
      <h2 className="mt-2 text-[28px] leading-tight font-light uppercase tracking-[0.03em] text-fg">
        {project.display.light}
        <span className="font-bold">{project.display.bold}</span>
      </h2>
      <p className="mt-1 text-[15px] font-medium text-fg">{project.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-body">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}

/** Emplacement verrouillé : un dossier pas encore écrit (les projets à venir) */
export function LockedSlot({ index }: Readonly<{ index: number }>) {
  return (
    <div aria-label="Emplacement verrouillé : projet à venir" role="img">
      <div className="relative flex aspect-video items-center justify-center border border-dashed border-muted/60 bg-bg/50">
        <span className="flex flex-col items-center gap-3 text-muted">
          <Lock size={34} strokeWidth={1.25} />
          <span className="hud-label">Accès restreint</span>
        </span>
      </div>
      <div className="mt-5 hud-label text-muted">Dossier {pad(index)} · verrouillé</div>
      <p className="mt-2 text-[28px] leading-tight font-light uppercase tracking-[0.03em] text-muted">
        Bientôt<span className="font-bold">…</span>
      </p>
      <p className="mt-1 text-sm text-body">Ce dossier n’est pas encore écrit.</p>
    </div>
  );
}
