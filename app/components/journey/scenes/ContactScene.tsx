"use client";

import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import { LinkIcon, PlayIcon } from "../../icons/DetroitIcons";
import SceneLayout, { Item } from "./SceneLayout";
import DisplayTitle from "../../hud/DisplayTitle";
import TriangleFrame from "../../hud/TriangleFrame";
import IconLink from "../../hud/IconLink";
import { buttonClasses } from "../../ui/Button";
import type { SceneProps } from "../JourneyContext";
import { site } from "../../../data/site";

/** Dernière scène — Contact (gabarit « lieu » : composition en triangles + lecture) */
export default function ContactScene({ local }: Readonly<SceneProps>) {
  const visualY = useTransform(local, [0, 1], [30, -30]);

  return (
    <SceneLayout
      screen="glass" backdrop="triangles" seed={6}
      left={
        <>
          <Item>
            <DisplayTitle light="Contact" />
          </Item>
          <Item>
            <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">
              Un produit à concevoir, une interface à repenser, une recherche utilisateur à mener ?
            </p>
          </Item>
          <Item>
            <p className="mt-4 hidden max-w-[440px] text-sm leading-relaxed text-body sm:block">
              {site.status}. Écrivez-moi quelques lignes sur votre projet, vos utilisateurs et vos délais : je réponds sous
              48 h.
            </p>
          </Item>
          <Item className="mt-6">
            <IconLink href={site.socials.linkedin} icon={LinkIcon} external>
              LinkedIn
            </IconLink>
          </Item>
          {/* Le choix final : l'interface s'efface autour */}
          <Item className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={`mailto:${site.email}`} data-consequence data-prompt-label="Écrire" className={buttonClasses("primary")}>
              Écrire
            </a>
            <span aria-hidden className="hud-label text-muted">ou</span>
            <Link href="/projets" data-consequence data-prompt-label="Explorer" className={buttonClasses("ghost", "sm")}>
              Continuer à explorer
            </Link>
          </Item>
        </>
      }
      right={
        <motion.div style={{ y: visualY }}>
          <TriangleFrame
            images={site.heroImages}
            center={
              <Link
                href="/projets"
                aria-label="Explorer les études de cas"
                className="flex size-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105"
              >
                <PlayIcon size={22} className="ml-0.5 text-[#1d1f22]" />
              </Link>
            }
          />
        </motion.div>
      }
    />
  );
}
