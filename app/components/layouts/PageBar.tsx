"use client";

import { usePathname } from "next/navigation";
import { useReducedMotion, useScroll } from "framer-motion";
import BottomBar from "../hud/BottomBar";
import ClientPortal from "../tablet/ClientPortal";
import Objective from "../tablet/Objective";
import { PageVoice, usePageObjective } from "../tablet/InnerVoice";
import { tabs } from "../../data/tablet";
import { useDiode } from "../../lib/diode";
import { usePageCount } from "../../lib/pages";

/** Bas d'écran, objectif et pensées des pages classiques (l'accueil a sa propre version, pilotée par le voyage) */
export default function PageBar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const diode = useDiode();
  const { scrollYProgress } = useScroll();
  const page = usePageCount();
  const objective = usePageObjective();

  if (pathname === "/") return null;

  const label = tabs.find((t) => t.href !== "/" && pathname.startsWith(t.href))?.label;
  const behavior = reduce ? "auto" : "smooth";
  const turn = (dir: number) => window.scrollBy({ top: dir * window.innerHeight * 0.85, behavior });

  return (
    <ClientPortal>
      <Objective text={objective} />
      <PageVoice />
      <BottomBar
        progress={scrollYProgress}
        tone={diode === "loading" ? "loading" : "hud"}
        page={{ ...page, label }}
        onPrev={() => turn(-1)}
        onNext={() => turn(1)}
      />
    </ClientPortal>
  );
}
