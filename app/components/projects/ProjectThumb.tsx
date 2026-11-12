"use client";

import { Check } from "lucide-react";
import ScaledFrame from "../ui/ScaledFrame";
import { AfterScreen } from "../demos/BeforeAfter";
import { Dashboard } from "../demos/Hotspots";
import type { DemoType } from "../../types/project";

function PhonesPreview() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-10 bg-gradient-to-br from-[#0b4bcc] to-[#00d1ff]">
      <div className="h-[300px] w-[142px] -translate-y-4 rounded-[1.6rem] border-[5px] border-[#0d1114] bg-white p-3 pt-7 text-[#0d1114]">
        <p className="text-[8px] uppercase tracking-[0.2em] text-[#5f6b75]">Bonsoir Camille</p>
        <p className="mt-1 text-[13px] font-semibold leading-tight">Où voulez-vous jouer ?</p>
        <div className="mt-3 h-7 rounded-lg bg-[#eef1f4]" />
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <span className="h-8 rounded-md bg-[#0d1114]" />
          <span className="h-8 rounded-md bg-[#eef1f4]" />
          <span className="h-8 rounded-md bg-[#eef1f4]" />
        </div>
        <div className="mt-16 h-12 rounded-lg bg-[#0079b8]" />
      </div>
      <div className="flex h-[300px] w-[142px] translate-y-6 flex-col items-center justify-center rounded-[1.6rem] border-[5px] border-[#0d1114] bg-white text-[#0d1114]">
        <span className="flex size-11 items-center justify-center rounded-full bg-[#0079b8] text-white">
          <Check size={20} />
        </span>
        <p className="mt-3 text-[11px] font-semibold">Réservation confirmée</p>
      </div>
    </div>
  );
}

/** Aperçu statique d'un projet (rendu à 640 × 360 puis réduit) */
export default function ProjectThumb({ demo }: Readonly<{ demo: DemoType }>) {
  return (
    <ScaledFrame baseWidth={640} baseHeight={360}>
      <div className="relative size-full">
        {demo === "before-after" && <AfterScreen />}
        {demo === "hotspots" && <Dashboard wire={false} />}
        {demo === "prototype" && <PhonesPreview />}
      </div>
    </ScaledFrame>
  );
}
