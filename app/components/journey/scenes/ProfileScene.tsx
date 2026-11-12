"use client";

import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import SceneLayout, { Item } from "./SceneLayout";
import DisplayTitle from "../../hud/DisplayTitle";
import TriangleFrame from "../../hud/TriangleFrame";
import Callout from "../../hud/Callout";
import { Corners } from "../../hud/Corners";
import { buttonClasses } from "../../ui/Button";
import type { SceneProps } from "../JourneyContext";
import { site, specs } from "../../../data/site";

/** Scène 2 — Profil : fiche « spécifications » avec encarts autour du visuel (gabarit AX400) */
export default function ProfileScene({ local }: Readonly<SceneProps>) {
  const visualY = useTransform(local, [0, 1], [40, -40]);
  const calloutX = useTransform(local, [0, 1], [20, -10]);

  return (
    <SceneLayout
      screen="panel" backdrop="triangles" seed={2}
      left={
        <>
          <Item>
            <p className="mb-4 hud-label text-hud-ink">Spécifications</p>
            <DisplayTitle light="Pro" bold="fil" />
          </Item>
          <Item>
            <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">
              Designer UX/UI, entre recherche utilisateur et conception d’interfaces.
            </p>
          </Item>
          <Item>
            <p className="mt-4 hidden max-w-[440px] text-sm leading-relaxed text-body sm:block">{site.bio}</p>
          </Item>
          <Item>
            <dl className="mt-6 grid max-w-[440px] grid-cols-2 gap-x-8 gap-y-4">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt className="hud-label text-hud-ink">{s.label}</dt>
                  <dd className="mt-0.5 text-[15px] text-fg">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Item>
          <Item className="mt-8 flex flex-wrap gap-x-16 gap-y-4">
            <Link href="/a-propos" className={buttonClasses("primary")}>
              Profil complet
            </Link>
          </Item>
        </>
      }
      right={
        <motion.div style={{ y: visualY }} className="relative">
          <TriangleFrame images={site.heroImages} code={site.codename} />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <span className="absolute left-[24%] top-[40%] size-12">
              <Corners size={7} />
              <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-loading" />
            </span>
            <span className="absolute left-[31%] top-[47%] h-px w-[34%] bg-hud/60" />
          </div>
          <motion.div style={{ x: calloutX }} className="absolute right-0 top-[2%] bg-surface/60 p-2 backdrop-blur-sm">
            <Callout title={specs[2].value} text={specs[2].label} />
          </motion.div>
          <motion.div style={{ x: calloutX }} className="absolute right-[2%] top-[44%] bg-surface/60 p-2 backdrop-blur-sm">
            <Callout title={site.role} text={site.status} />
          </motion.div>
        </motion.div>
      }
    />
  );
}
