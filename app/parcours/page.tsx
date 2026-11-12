import type { Metadata } from "next";
import Container from "../components/ui/Container";
import DisplayTitle from "../components/hud/DisplayTitle";
import Flowchart from "../components/flowchart/Flowchart";
import { NodeIcon } from "../components/flowchart/nodeMeta";
import { careerChapters, careerNodes } from "../data/career";
import { flowStats } from "../lib/flowchart";
import { pad } from "../lib/format";

export const metadata: Metadata = {
  title: "Parcours",
  description: "Le parcours et les projets de Baptiste Rouzic, présentés comme un arbre de choix.",
};

const legend = [
  { kind: "start" as const, label: "Origine" },
  { kind: "step" as const, label: "Étape franchie", domain: "formation" as const },
  { kind: "choice" as const, label: "Choix décisif" },
  { kind: "current" as const, label: "En cours" },
  { kind: "project" as const, label: "Projet (étude de cas)" },
  { kind: "locked" as const, label: "Chemin non emprunté" },
  { kind: "future" as const, label: "Chapitre inconnu" },
];

export default function ParcoursPage() {
  const stats = flowStats(careerNodes);

  return (
    <Container className="pb-16 pt-14 lg:pr-12">
      <div className="grid gap-10 lg:grid-cols-12 lg:pl-14">
        <div className="lg:col-span-7">
          <p className="mb-4 hud-label text-hud-ink">
            Arborescence · {careerChapters.length} chapitres · {careerNodes.length} nœuds
          </p>
          <DisplayTitle as="h1" light="Par" bold="cours" />
          <p className="mt-6 max-w-[520px] text-[17px] font-medium leading-snug text-fg">
            Mon parcours et mes projets, comme un arbre de choix : chaque décision ouvre une branche… et en referme d’autres.
          </p>
          <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-body">
            Cliquez sur un nœud pour l’analyser. Les branches en pointillés sont les chemins que je n’ai pas pris ; le dernier
            nœud reste à écrire.
          </p>
        </div>

        {/* Bilan, comme l'écran de fin de chapitre */}
        <dl className="grid grid-cols-3 gap-6 self-end lg:col-span-5">
          <div className="col-span-3">
            <dt className="hud-label text-hud-ink">Complété</dt>
            <dd className="mt-1 text-[60px] leading-none font-light text-fg">
              {stats.completion}
              <span className="text-[28px]"> %</span>
            </dd>
            <div className="mt-3 h-1 bg-line">
              <div className="h-full bg-hud" style={{ width: `${stats.completion}%` }} />
            </div>
          </div>
          <div>
            <dt className="hud-label text-hud-ink">Choix</dt>
            <dd className="mt-1 text-[22px] font-light text-fg">{pad(stats.choices)}</dd>
          </div>
          <div>
            <dt className="hud-label text-hud-ink">Projets</dt>
            <dd className="mt-1 text-[22px] font-light text-fg">{pad(stats.projects)}</dd>
          </div>
          <div>
            <dt className="hud-label text-hud-ink">Non explorés</dt>
            <dd className="mt-1 text-[22px] font-light text-fg">{pad(stats.unexplored)}</dd>
          </div>
        </dl>
      </div>

      <ul aria-label="Légende" className="mt-12 flex flex-wrap gap-x-8 gap-y-3 lg:pl-14">
        {legend.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-[13px] text-body">
            <NodeIcon node={item} />
            {item.label}
          </li>
        ))}
      </ul>

      <p className="mt-8 hud-label text-body lg:hidden">← Faites glisser l’arborescence →</p>

      <div className="mt-10">
        <Flowchart />
      </div>
    </Container>
  );
}
