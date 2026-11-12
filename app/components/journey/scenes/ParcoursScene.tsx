"use client";

import Link from "next/link";
import { useTransform } from "framer-motion";
import SceneLayout, { Item } from "./SceneLayout";
import DisplayTitle from "../../hud/DisplayTitle";
import Brackets from "../../hud/Corners";
import FlowchartPreview from "../../flowchart/FlowchartPreview";
import { buttonClasses } from "../../ui/Button";
import type { SceneProps } from "../JourneyContext";
import { careerNodes } from "../../../data/career";
import { flowStats } from "../../../lib/flowchart";

const stats = flowStats(careerNodes);

/** Scène 5 — Parcours : l'arborescence se trace avec le scroll, puis invite à l'explorer */
export default function ParcoursScene({ local }: Readonly<SceneProps>) {
  // L'arborescence est entièrement tracée aux trois quarts de la scène
  const progress = useTransform(local, [0, 0.75], [0, 1]);

  return (
    <SceneLayout
      screen="grid" backdrop="map" seed={5}
      rightOnMobile
      left={
        <>
          <Item>
            <p className="mb-4 hud-label text-hud-ink">Arborescence · complété {stats.completion} %</p>
            <DisplayTitle light="Par" bold="cours" />
          </Item>
          <Item>
            <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">
              Chaque choix ouvre une branche. Formation, expériences et projets, reliés comme dans un arbre de décisions.
            </p>
          </Item>
          <Item>
            <p className="mt-4 hidden max-w-[440px] text-sm leading-relaxed text-body sm:block">
              {stats.choices} choix décisifs, {stats.projects} projets, {stats.unexplored} chemins non empruntés… et un chapitre
              encore inconnu.
            </p>
          </Item>
          <Item className="mt-8 flex flex-wrap gap-x-16 gap-y-4">
            <Link href="/parcours" className={buttonClasses("primary")}>
              Explorer l’arborescence
            </Link>
            <Link href="/projets" className={`hidden sm:inline-flex ${buttonClasses("ghost", "sm")}`}>
              Projets
            </Link>
          </Item>
        </>
      }
      right={
        <Brackets size={10} offset={8} className="mx-auto max-w-[560px] bg-surface/60 p-4 backdrop-blur-sm">
          <FlowchartPreview progress={progress} />
        </Brackets>
      }
    />
  );
}
