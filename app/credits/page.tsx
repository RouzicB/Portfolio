import type { Metadata } from "next";
import Container from "../components/ui/Container";
import Stagger from "../components/ui/Stagger";
import { Item } from "../components/journey/scenes/SceneLayout";
import DisplayTitle from "../components/hud/DisplayTitle";
import SectionTab from "../components/hud/SectionTab";
import { ArrowUpRightIcon, detroitIcons } from "../components/icons/DetroitIcons";
import { credits, site } from "../data/site";

export const metadata: Metadata = { title: "Crédits" };

const resources = [
  { name: "Montserrat", detail: "Julieta Ulanovsky — SIL Open Font License (alternative libre à Gotham)" },
  { name: "Gotham", detail: "Hoefler&Co — utilisée uniquement si elle est installée sur votre machine" },
  { name: "Simple Icons", detail: "Logos Figma, Maze et Notion — CC0 (les marques appartiennent à leurs propriétaires)" },
  { name: "Next.js, React, Tailwind CSS, Framer Motion", detail: "Licence MIT" },
];

export default function CreditsPage() {
  return (
    <Container className="max-w-5xl pb-16 pt-14">
      <Stagger>
        <Item>
          <p className="mb-4 hud-label text-hud-ink">Crédits</p>
          <DisplayTitle as="h1" light="Cré" bold="dits" />
        </Item>
        <Item>
          <p className="mt-6 max-w-[620px] text-[17px] font-medium leading-snug text-fg">
            La direction artistique de ce portfolio est un hommage à l’univers visuel de {credits.game.title}.
          </p>
        </Item>
      </Stagger>

      <SectionTab title="Inspiration" code="04.1" />
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="hud-label text-hud-ink">Jeu vidéo</p>
          <h2 className="mt-2 text-[22px] hud-title text-fg">{credits.game.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-body">
            Développé par {credits.game.studio}, publié par {credits.game.publisher} ({credits.game.year}). L’interface
            androïde, la diode d’état, les compositions en triangles et l’organigramme des choix (« flowchart ») ont inspiré
            l’interface et la page Parcours de ce site.
          </p>
        </div>
        <div>
          <p className="hud-label text-hud-ink">Concept web</p>
          <h2 className="mt-2 text-[22px] hud-title text-fg">{credits.concept.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-body">
            Concept de site par {credits.concept.author}, publié sur Behance : grille de 12 colonnes, système de couleurs ID
            (bleu, jaune, rouge), typographie Gotham, barre de navigation et frise en code-barres.
          </p>
          <a
            href={credits.concept.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[15px] uppercase text-cobalt hover:underline"
          >
            Voir le projet sur Behance <ArrowUpRightIcon size={16} strokeWidth={1.6} />
          </a>
        </div>
      </div>

      <SectionTab title="Mentions" code="04.2" />
      <p className="max-w-3xl text-sm leading-relaxed text-body">
        Ce portfolio est un projet personnel de {site.author}, sans lien avec {credits.game.studio} ni{" "}
        {credits.game.publisher}, et sans usage commercial de leurs œuvres. Aucun logo, personnage ni visuel du jeu n’est
        reproduit. {credits.game.title} et les marques citées appartiennent à leurs propriétaires respectifs.
      </p>

      <SectionTab title="Ressources" code="04.3" />
      <ul className="divide-y divide-line border-y border-line">
        {resources.map((r) => (
          <li key={r.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="text-[15px] text-fg">{r.name}</span>
            <span className="text-[13px] text-body">{r.detail}</span>
          </li>
        ))}
      </ul>

      <SectionTab title="Icônes" code="04.4" />
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-body">
        Dessinées pour ce portfolio, d’après l’esprit des interfaces du jeu : traits fins et angles vifs, coins biseautés
        comme la tablette, triangles et hexagones, et un détail cyan sur chacune, comme la diode des androïdes.
      </p>
      <ul className="grid grid-cols-3 border-l border-t border-line sm:grid-cols-6">
        {Object.entries(detroitIcons).map(([name, Icon]) => (
          <li key={name} className="flex flex-col items-center gap-3 border-b border-r border-line bg-surface px-2 py-5 text-fg">
            <Icon size={34} strokeWidth={1.25} />
            <span className="hud-label text-body">{name}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
