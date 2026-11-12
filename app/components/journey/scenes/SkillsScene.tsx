"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import SceneLayout, { Item } from "./SceneLayout";
import DisplayTitle from "../../hud/DisplayTitle";
import Brackets from "../../hud/Corners";
import type { SceneProps } from "../JourneyContext";
import { skills } from "../../../data/site";
import { tools } from "../../../data/process";
import { pad } from "../../../lib/format";

/** Jauge qui se calibre avec le scroll de la scène */
function SkillBar({ local, level, start }: Readonly<{ local: MotionValue<number>; level: number; start: number }>) {
  const scaleX = useTransform(local, [start, start + 0.35], [0, level / 100]);
  return (
    <span className="relative mt-2 block h-1 bg-line">
      <motion.span style={{ scaleX }} className="absolute inset-0 origin-left bg-hud" />
    </span>
  );
}

/** Scène 4 — Aptitudes : modules de compétences qui se remplissent au scroll */
export default function SkillsScene({ local }: Readonly<SceneProps>) {
  return (
    <SceneLayout
      screen="surface" backdrop="none" seed={4}
      rightOnMobile
      left={
        <>
          <Item>
            <p className="mb-4 hud-label text-hud-ink">Analyse des modules</p>
            <DisplayTitle light="Apti" bold="tudes" />
          </Item>
          <Item>
            <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">
              Ce que j’apporte à une équipe produit, de la première interview au dernier pixel.
            </p>
          </Item>
          <Item>
            <p className="mt-4 hidden max-w-[440px] text-sm leading-relaxed text-body sm:block">
              Outils · {tools.join(" · ")}
            </p>
          </Item>
        </>
      }
      right={
        <Brackets size={10} offset={8} className="bg-surface/70 p-6 backdrop-blur-sm">
          <div className="grid gap-8 sm:grid-cols-3">
            {skills.map((group, gi) => (
              <div key={group.group}>
                <p className="hud-label text-hud-ink">Module {pad(gi + 1)}</p>
                <h3 className="mt-1 text-[17px] font-semibold uppercase tracking-[0.03em] text-fg">{group.group}</h3>
                <ul className="mt-5 space-y-4">
                  {group.items.map((item, i) => (
                    <li key={item.name}>
                      <span className="flex items-baseline justify-between gap-2 text-[13px] text-body">
                        {item.name}
                        <span className="text-[11px] tabular-nums text-hud-ink">{item.level}</span>
                      </span>
                      <SkillBar local={local} level={item.level} start={0.05 + gi * 0.1 + i * 0.04} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Brackets>
      }
    />
  );
}
