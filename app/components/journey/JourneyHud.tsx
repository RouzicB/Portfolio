"use client";

import type { MotionValue } from "framer-motion";
import BottomBar from "../hud/BottomBar";
import ClientPortal from "../tablet/ClientPortal";
import Objective from "../tablet/Objective";
import InnerVoice from "../tablet/InnerVoice";
import { useJourney } from "./JourneyContext";
import { useDiode } from "../../lib/diode";
import { FOOTER_ID, OVERLAY_ID } from "../../lib/screen";

/** Interface du voyage : « Page n/N », frise code-barres, objectif et pensée de la scène */
export default function JourneyHud({
  progress,
}: Readonly<{ progress: MotionValue<number> }>) {
  const { scene, scenes, goTo } = useJourney();
  const diode = useDiode();
  const current = scenes[scene];

  // Rendu dans le calque de l'écran et dans le pied de la tablette : reste fixe même quand la scène « glitche »
  return (
    <>
      <ClientPortal target={OVERLAY_ID}>
        <Objective text={current.objective} />
        <InnerVoice id={`accueil:${current.id}`} text={current.thought} />
      </ClientPortal>
      <ClientPortal target={FOOTER_ID}>
        <BottomBar
          progress={progress}
          tone={diode === "loading" ? "loading" : "hud"}
          page={{
            current: scene + 1,
            total: scenes.length,
            label: current.label,
          }}
          onPrev={() => goTo(scene - 1)}
          onNext={() => goTo(scene + 1)}
        />
      </ClientPortal>
    </>
  );
}
