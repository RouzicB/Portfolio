import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Reveal from "../components/ui/Reveal";
import { buttonClasses } from "../components/ui/Button";
import PageHero from "../components/layouts/PageHero";
import { Item } from "../components/journey/scenes/SceneLayout";
import DisplayTitle from "../components/hud/DisplayTitle";
import HeroVisual from "../components/hud/HeroVisual";
import SectionTab from "../components/hud/SectionTab";
import { credits, site, skills, specs } from "../data/site";
import { processPhases, tools } from "../data/process";
import { pad } from "../lib/format";

export const metadata: Metadata = { title: "Profil" };

export default function AboutPage() {
  const [first, ...rest] = site.author.split(" ");

  return (
    <div className="pb-20">
      <PageHero
        left={
          <>
            <Item>
              <p className="mb-4 hud-label text-hud-ink">
                Profil · Modèle #{site.codename}
              </p>
              <DisplayTitle as="h1" light={`${first} `} bold={rest.join(" ")} />
            </Item>
            <Item>
              <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">{site.tagline}</p>
            </Item>
            <Item>
              <p className="mt-4 max-w-[440px] text-sm leading-relaxed text-body">{site.bio}</p>
            </Item>
            <Item className="mt-9 flex flex-wrap gap-x-16 gap-y-4">
              <Link href="/parcours" className={buttonClasses("blue")}>
                Parcours
              </Link>
              <Link href="/contact" className={buttonClasses("ghost", "sm")}>
                Contact
              </Link>
            </Item>
          </>
        }
        right={<HeroVisual />}
      />

      <Container className="max-w-5xl">
        <dl className="grid gap-8 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((row) => (
            <div key={row.label}>
              <dt className="hud-label text-hud-ink">{row.label}</dt>
              <dd className="mt-2 text-[15px] text-fg">{row.value}</dd>
            </div>
          ))}
        </dl>

        <SectionTab title="Aptitudes" code="03.1" />
        <div className="grid gap-10 md:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.08}>
              <p className="hud-label text-hud-ink">Module {pad(gi + 1)}</p>
              <h3 className="mt-1 text-[22px] hud-title text-fg">{group.group}</h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className="flex justify-between text-[13px] text-body">
                      {item.name}
                      <span className="text-hud-ink">{item.level}</span>
                    </span>
                    <span className="mt-1.5 block h-1 bg-line">
                      <span className="block h-full bg-hud" style={{ width: `${item.level}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <SectionTab title="Méthode" code="03.2" />
        <ol className="grid gap-10 md:grid-cols-4">
          {processPhases.map((phase, i) => (
            <li key={phase.name}>
              <Reveal delay={i * 0.08}>
                <p className="hud-label text-hud-ink">Phase {pad(i + 1)}</p>
                <h3 className="mt-1 text-[22px] hud-title text-fg">{phase.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{phase.goal}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {phase.methods.map((m) => (
                    <li key={m}>
                      <Badge>{m}</Badge>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <SectionTab title="Outils" code="03.3" />
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {tools.map((t) => (
            <li key={t} className="text-[22px] font-light uppercase tracking-[0.04em] text-body">
              {t}
            </li>
          ))}
        </ul>

        <SectionTab title="Crédits" code="03.4" />
        <p className="text-center text-sm text-body">
          {credits.short}, et du concept web d’{credits.concept.author}.{" "}
          <Link href="/credits" className="text-cobalt hover:underline">
            Voir les crédits
          </Link>
        </p>
      </Container>
    </div>
  );
}
