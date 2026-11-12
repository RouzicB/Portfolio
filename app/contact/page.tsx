import type { Metadata } from "next";
import { Eye, Link2, Mail } from "lucide-react";
import { buttonClasses } from "../components/ui/Button";
import PageHero from "../components/layouts/PageHero";
import { Item } from "../components/journey/scenes/SceneLayout";
import DisplayTitle from "../components/hud/DisplayTitle";
import IconLink from "../components/hud/IconLink";
import TriangleFrame from "../components/hud/TriangleFrame";
import { site } from "../data/site";

export const metadata: Metadata = { title: "Contact" };

const channels = [
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Dribbble", href: site.socials.dribbble },
  { label: "Behance", href: site.socials.behance },
];

export default function ContactPage() {
  return (
    <div className="pb-20">
      <PageHero
        left={
          <>
            <Item>
              <p className="mb-4 hud-label text-hud-ink">Canal ouvert</p>
              <DisplayTitle as="h1" light="Contact" />
            </Item>
            <Item>
              <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">
                Un produit à concevoir, une interface à repenser, une recherche utilisateur à mener ?
              </p>
            </Item>
            <Item>
              <p className="mt-4 max-w-[440px] text-sm leading-relaxed text-body">
                {site.status}. Quelques lignes sur votre projet, vos utilisateurs et vos délais suffisent pour commencer.
              </p>
            </Item>
            <Item className="mt-8 flex flex-col items-start gap-4">
              <IconLink href={`mailto:${site.email}`} icon={Mail} external>
                {site.email}
              </IconLink>
              {channels.map((c) => (
                <IconLink key={c.label} href={c.href} icon={Link2} external>
                  {c.label}
                </IconLink>
              ))}
              <IconLink href="/projets" icon={Eye}>
                Voir les études de cas
              </IconLink>
            </Item>
            <Item className="mt-10">
              <a href={`mailto:${site.email}`} className={buttonClasses("primary")}>
                Écrire
              </a>
            </Item>
          </>
        }
        right={<TriangleFrame images={site.heroImages} code="03.031" />}
      />
    </div>
  );
}
