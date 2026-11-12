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
import { FOOTER_ID, OVERLAY_ID, screenTurn, useScreenRef } from "../../lib/screen";

/** Pied de la tablette, objectif et pensées des pages classiques (l'accueil a sa propre version, pilotée par le voyage) */
export default function PageBar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const diode = useDiode();
  const { scrollYProgress } = useScroll({ container: useScreenRef() });
  const page = usePageCount();
  const objective = usePageObjective();

  if (pathname === "/") return null;

  const label = tabs.find((t) => t.href !== "/" && pathname.startsWith(t.href))?.label;
  const behavior = reduce ? "auto" : "smooth";
  const turn = (dir: number) => screenTurn(dir, behavior);

  return (
    <>
      <ClientPortal target={OVERLAY_ID}>
        <Objective text={objective} />
        <PageVoice />
      </ClientPortal>
      <ClientPortal target={FOOTER_ID}>
        <BottomBar
        progress={scrollYProgress}
        tone={diode === "loading" ? "loading" : "hud"}
        page={{ ...page, label }}
        onPrev={() => turn(-1)}
        onNext={() => turn(1)}
        />
      </ClientPortal>
    </>
  );
}
