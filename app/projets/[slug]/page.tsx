import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Reveal from "../../components/ui/Reveal";
import { buttonClasses } from "../../components/ui/Button";
import PageHero from "../../components/layouts/PageHero";
import { Item } from "../../components/journey/scenes/SceneLayout";
import DisplayTitle from "../../components/hud/DisplayTitle";
import SectionTab from "../../components/hud/SectionTab";
import Brackets from "../../components/hud/Corners";
import Callout from "../../components/hud/Callout";
import PlayThumb from "../../components/hud/PlayThumb";
import ProjectThumb from "../../components/projects/ProjectThumb";
import ProjectDemo from "../../components/demos/ProjectDemo";
import { demoLabels, getProjectBySlug, projects } from "../../data/projects";
import { pad } from "../../lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const specs = [
    { label: "Rôle", value: project.role },
    { label: "Durée", value: project.duration },
    { label: "Plateforme", value: project.platform },
    { label: "Année", value: String(project.year) },
  ];

  return (
    <div className="pb-20">
      <PageHero
        left={
          <>
            <Item>
              <Link href="/projets" className="mb-6 inline-block hud-label text-body hover:text-fg">
                ← Archives
              </Link>
              <p className="mb-4 hud-label text-hud-ink">
                Dossier {pad(index + 1)} · {project.client}
              </p>
              <DisplayTitle as="h1" light={project.display.light} bold={project.display.bold} />
            </Item>
            <Item>
              <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">
                {project.title} — {project.summary}
              </p>
            </Item>
            <Item>
              <p className="mt-4 max-w-[440px] text-sm leading-relaxed text-body">{project.challenge}</p>
            </Item>
            <Item className="mt-9 flex flex-wrap gap-x-16 gap-y-4">
              <a href="#contexte" className={buttonClasses("primary")}>
                Lire l’étude
              </a>
              <span className={buttonClasses("ghost", "sm")}>{project.tags[0]}</span>
            </Item>
          </>
        }
        right={
          <>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-6">
              <p className="hud-label text-hud-ink">
                Spécifications · {project.platform}
                <br />
                <span className="text-body">▸ {demoLabels[project.demo]}</span>
              </p>
              {project.outcomes[0] && <Callout title={project.outcomes[0].value} text={project.outcomes[0].label} />}
            </div>
            <Brackets size={10} offset={8}>
              <ProjectDemo type={project.demo} />
            </Brackets>
          </>
        }
      />

      <Container className="max-w-5xl">
        <Card>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="hud-label text-hud-ink">{s.label}</dt>
                <dd className="mt-2 text-sm text-fg">{s.value}</dd>
              </div>
            ))}
            <div>
              <dt className="hud-label text-hud-ink">Outils</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.tools.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </dd>
            </div>
          </dl>
        </Card>

        <SectionTab id="contexte" title="Contexte" code="02.1" />
        <Reveal className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-[22px] hud-title text-fg">Le défi</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{project.challenge}</p>
          </div>
          <div>
            <h3 className="text-[22px] hud-title text-fg">La réponse</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{project.solution}</p>
          </div>
        </Reveal>

        <SectionTab title="Processus" code="02.2" />
        <Reveal>
          <ol className="relative grid gap-10 md:grid-cols-4">
            <span aria-hidden className="absolute left-0 right-0 top-[9px] hidden h-px bg-hud/40 md:block" />
            {project.process.map((step, i) => (
              <li key={step.title} className="relative">
                <svg aria-hidden viewBox="0 0 20 18" className="relative size-5 overflow-visible">
                  <polygon points="10,0 20,18 0,18" className="fill-surface stroke-hud" />
                </svg>
                <p className="mt-5 hud-label text-hud-ink">Étape {pad(i + 1)}</p>
                <h3 className="mt-1 text-[17px] font-medium text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{step.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <SectionTab title="Recherche" code="02.3" />
        <Reveal>
          <ul className="grid gap-8 md:grid-cols-3">
            {project.insights.map((insight) => (
              <li key={insight} className="flex gap-4">
                <span aria-hidden className="mt-1 h-10 w-0.5 shrink-0 bg-gradient-to-b from-white to-hud" />
                <p className="text-[15px] leading-relaxed text-fg">{insight}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <SectionTab title="Résultats" code="02.4" />
        <Reveal>
          <dl className="grid gap-10 sm:grid-cols-3">
            {project.outcomes.map((o) => (
              <div key={o.label}>
                <dd className="text-[60px] leading-none font-light text-fg">{o.value}</dd>
                <dt className="mt-3 text-[13px] text-hud-ink">{o.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        {next.slug !== project.slug && (
          <>
            <SectionTab title="Suivant" />
            <div className="flex flex-wrap items-center gap-10">
              <PlayThumb href={`/projets/${next.slug}`} label="dossier suivant">
                <ProjectThumb demo={next.demo} />
              </PlayThumb>
              <Link href={`/projets/${next.slug}`} className="group">
                <span className="text-[clamp(2rem,4vw,3rem)] leading-none font-light uppercase text-fg transition-colors group-hover:text-cobalt">
                  {next.display.light}
                  <span className="font-bold">{next.display.bold}</span>
                </span>
                <span className="mt-2 block text-[15px] text-body">{next.title} →</span>
              </Link>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
