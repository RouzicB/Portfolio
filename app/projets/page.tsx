import type { Metadata } from "next";
import DisplayTitle from "../components/hud/DisplayTitle";
import ProjectArchive from "../components/projects/ProjectArchive";
import { projects } from "../data/projects";

export const metadata: Metadata = { title: "Projets" };

/** Les archives (la tablette les affiche en écran partagé : panneau à gauche, plan annoté à droite) */
export default function ProjectsPage() {
  return (
    <ProjectArchive
      intro={
        <>
          <p className="mb-4 hud-label text-hud-ink">Archives · {projects.length} dossiers</p>
          <DisplayTitle as="h1" light="Pro" bold="jets" />
          <p className="mt-6 max-w-[480px] text-[17px] font-medium leading-snug text-fg">
            Chaque dossier contient une démo interactive : comparateur avant / après, prototype cliquable ou maquette annotée.
          </p>
        </>
      }
    />
  );
}
