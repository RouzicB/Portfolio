"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import SceneLayout, { Item } from "./SceneLayout";
import DisplayTitle from "../../hud/DisplayTitle";
import HeroVisual from "../../hud/HeroVisual";
import PlayThumb from "../../hud/PlayThumb";
import FlowchartPreview from "../../flowchart/FlowchartPreview";
import { buttonClasses } from "../../ui/Button";
import type { SceneProps } from "../JourneyContext";
import { site } from "../../../data/site";

/** Scène 1 — Identification (gabarit « personnage ») */
export default function IntroScene({ local }: Readonly<SceneProps>) {
  const [first, ...rest] = site.author.split(" ");
  const full = useMotionValue(1);

  const visualY = useTransform(local, [0, 1], [0, -70]);
  const visualScale = useTransform(local, [0, 1], [1, 1.08]);

  return (
    <SceneLayout
      screen="glass" backdrop="triangles" seed={1}
      left={
        <>
          <Item>
            <p className="mb-4 hud-label text-hud-ink">
              Modèle #{site.codename} · {site.role}
            </p>
            <DisplayTitle as="h1" light={`${first} `} bold={rest.join(" ")} />
          </Item>
          <Item>
            <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">{site.tagline}</p>
          </Item>
          <Item>
            <p className="mt-4 hidden max-w-[440px] text-sm leading-relaxed text-body sm:block">{site.bio}</p>
          </Item>
          <Item className="mt-9 flex flex-wrap gap-x-16 gap-y-4">
            <Link href="/parcours" className={buttonClasses("blue")}>
              Parcours
            </Link>
            <Link href="/contact" className={`hidden sm:inline-flex ${buttonClasses("ghost", "sm")}`}>
              Contact
            </Link>
          </Item>
          {/* Vignette masquée sur les écrans peu hauts, pour garder la scène dans la hauteur de l'écran */}
          <Item className="mt-10 hidden md:[@media(min-height:1000px)]:block">
            <PlayThumb href="/parcours" label="explorer l’arborescence">
              <span className="absolute inset-0 flex items-center justify-center bg-surface p-3">
                <FlowchartPreview progress={full} />
              </span>
            </PlayThumb>
          </Item>
        </>
      }
      right={
        <motion.div style={{ y: visualY, scale: visualScale }}>
          <HeroVisual />
        </motion.div>
      }
    />
  );
}
