"use client";

import { usePathname } from "next/navigation";
import { Bluetooth, Mail, Power, UserRound, Wifi } from "lucide-react";
import { site } from "../../data/site";
import { appOf } from "../../data/tablet";
import { lock, useLocked } from "../../lib/lock";

const [first, ...rest] = site.author.split(" ");
/** Nom affiché dans la barre d'état, comme une session ouverte : « Baptiste R. » */
const user = `${first} ${rest.map((part) => `${part[0]}.`).join(" ")}`.trim();

/**
 * Barre d'état de la tablette : capteur, application ouverte, réseau, messages,
 * session de l'utilisateur et bouton d'arrêt (mise en veille : écran de verrouillage).
 */
export default function StatusBar() {
  const app = appOf(usePathname());
  const locked = useLocked();
  return (
    <div className="relative z-20 flex h-7 shrink-0 items-center gap-3 border-b border-white/10 bg-[linear-gradient(90deg,#3a1d31,#5e2f4b_55%,#46223b)] pl-4 pr-10 text-white/90 sm:h-8 sm:pr-12">
      {/* Capteur frontal */}
      <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-white/85 ring-[3px] ring-white/20" />
      <span className="truncate hud-label text-white/70">{locked ? "Veille" : app}</span>
      <span aria-hidden className="ml-auto hidden items-center gap-2.5 text-white/80 sm:flex">
        <Wifi size={13} strokeWidth={2} />
        <Bluetooth size={13} strokeWidth={2} />
        <Mail size={13} strokeWidth={2} />
      </span>
      <span aria-hidden className="ml-auto hidden h-3.5 w-px bg-white/30 sm:ml-0 sm:block" />
      <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium sm:ml-0">
        <UserRound size={13} strokeWidth={2} aria-hidden />
        {user}
      </span>
      <button
        type="button"
        onClick={lock}
        disabled={locked}
        aria-label="Verrouiller la tablette"
        data-prompt-label="Verrouiller"
        className="text-white/80 hover:text-white disabled:opacity-40"
      >
        <Power size={13} strokeWidth={2.2} />
      </button>
    </div>
  );
}
