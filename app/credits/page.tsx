import type { Metadata } from "next";
import Container from "../components/ui/Container";
import DisplayTitle from "../components/hud/DisplayTitle";
import SectionTab from "../components/hud/SectionTab";
import { credits, site } from "../data/site";

export const metadata: Metadata = { title: "Crédits" };

const resources = [
  { name: "Montserrat", detail: "Julieta Ulanovsky — SIL Open Font License (alternative libre à Gotham)" },
  { name: "Gotham", detail: "Hoefler&Co — utilisée uniquement si elle est installée sur votre machine" },
  { name: "Lucide", detail: "Icônes — licence ISC" },
  { name: "Next.js, React, Tailwind CSS, Framer Motion", detail: "Licence MIT" },
];

export default function CreditsPage() {
  return (
    <Container className="max-w-5xl pb-16 pt-14">
      <p className="mb-4 hud-label text-hud-ink">Crédits</p>
      <DisplayTitle as="h1" light="Cré" bold="dits" />
      <p className="mt-6 max-w-[620px] text-[17px] font-medium leading-snug text-fg">
        La direction artistique de ce portfolio est un hommage à l’univers visuel de {credits.game.title}.
      </p>

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
            className="mt-4 inline-block text-[15px] uppercase text-cobalt hover:underline"
          >
            Voir le projet sur Behance →
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
    </Container>
  );
}
