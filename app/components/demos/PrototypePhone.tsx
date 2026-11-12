"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, Check, MapPin, Search } from "lucide-react";
import { pad } from "../../lib/format";

const steps = ["Rechercher", "Choisir un lieu", "Choisir un créneau", "Confirmer"];
const venues = [
  { name: "Padel Club Confluence", meta: "1,2 km · 4 terrains", price: "32 €" },
  { name: "Urban Padel Part-Dieu", meta: "2,8 km · 6 terrains", price: "28 €" },
  { name: "Le Hangar", meta: "4,1 km · 3 terrains", price: "26 €" },
];
const slots = [
  { time: "17:00", free: false },
  { time: "18:00", free: true },
  { time: "19:30", free: true },
  { time: "20:30", free: true },
  { time: "21:00", free: false },
  { time: "22:00", free: true },
];

const slide: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-30%", opacity: dir > 0 ? 1 : 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: (dir: number) => ({
    x: dir > 0 ? "-30%" : "100%",
    opacity: dir > 0 ? 0 : 1,
    transition: { duration: 0.35, ease: "easeOut" },
  }),
};

const eyebrow = "text-[9px] uppercase tracking-[0.2em] text-[#5f6b75]";

/** Prototype cliquable d'un parcours de réservation, dans un cadre de téléphone */
export default function PrototypePhone() {
  const [screen, setScreen] = useState(0);
  const [dir, setDir] = useState(1);
  const [venue, setVenue] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [taps, setTaps] = useState(0);
  const [hints, setHints] = useState(true);

  const tap = () => setTaps((t) => t + 1);
  const go = (next: number) => {
    setDir(next > screen ? 1 : -1);
    setScreen(next);
    tap();
  };
  const restart = () => {
    setDir(-1);
    setScreen(0);
    setSlot(null);
    setTaps(0);
  };
  const hint = (on: boolean) => (hints && on ? "hint" : "");

  const back = (to: number) => (
    <button type="button" onClick={() => go(to)} aria-label="Retour" className="mb-3 flex size-7 items-center justify-center rounded-full bg-[#eef1f4]">
      <ArrowLeft size={12} />
    </button>
  );

  const screens = [
    <div key="home" className="flex h-full flex-col px-4 pt-9">
      <p className={eyebrow}>Bonsoir Camille</p>
      <p className="mt-1 text-base font-semibold leading-tight">Où voulez-vous jouer ?</p>
      <button
        type="button"
        onClick={() => go(1)}
        className={`mt-4 flex items-center gap-2 rounded-xl bg-[#eef1f4] px-3 py-2.5 text-left text-[11px] ${hint(true)}`}
      >
        <Search size={12} aria-hidden /> Padel · Lyon · Ce soir
      </button>
      <p className={`mt-5 ${eyebrow}`}>Sports</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {["Padel", "Tennis", "Foot 5"].map((s, i) => (
          <span key={s} className={`rounded-lg py-3 text-center text-[10px] ${i === 0 ? "bg-[#0d1114] text-white" : "bg-[#eef1f4]"}`}>
            {s}
          </span>
        ))}
      </div>
      <div className="mb-5 mt-auto rounded-xl bg-[#0079b8] p-3 text-white">
        <p className="text-[9px] opacity-80">Prochaine partie</p>
        <p className="text-[11px] font-semibold">Aucune réservation</p>
      </div>
    </div>,

    <div key="results" className="flex h-full flex-col px-4 pt-9">
      {back(0)}
      <p className={eyebrow}>Padel · Ce soir</p>
      <p className="mt-1 text-sm font-semibold">3 terrains disponibles</p>
      <ul className="mt-3 space-y-2">
        {venues.map((v, i) => (
          <li key={v.name}>
            <button
              type="button"
              onClick={() => {
                setVenue(i);
                go(2);
              }}
              className={`flex w-full items-center justify-between rounded-xl border border-[#e3e8ec] p-2.5 text-left ${hint(i === 0)}`}
            >
              <span>
                <span className="block text-[11px] font-semibold">{v.name}</span>
                <span className="mt-0.5 flex items-center gap-1 text-[9px] text-[#5f6b75]">
                  <MapPin size={9} aria-hidden /> {v.meta}
                </span>
              </span>
              <span className="text-[11px] font-semibold text-[#0079b8]">{v.price}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>,

    <div key="detail" className="flex h-full flex-col">
      <div className="relative h-24 shrink-0 bg-gradient-to-br from-[#0079b8] to-[#00b4ff] px-4 pt-8">{back(1)}</div>
      <div className="flex flex-1 flex-col px-4 pt-3">
        <p className="text-sm font-semibold">{venues[venue].name}</p>
        <p className="text-[9px] text-[#5f6b75]">{venues[venue].meta}</p>
        <p className={`mt-4 ${eyebrow}`}>Créneaux ce soir</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {slots.map((s) => (
            <button
              key={s.time}
              type="button"
              disabled={!s.free}
              onClick={() => {
                setSlot(s.time);
                tap();
              }}
              aria-pressed={slot === s.time}
              className={`rounded-lg py-2 text-[10px] ${
                !s.free
                  ? "text-[#b5bcc2] line-through"
                  : slot === s.time
                    ? "bg-[#0d1114] text-white"
                    : `bg-[#eef1f4] ${hint(!slot && s.time === "18:00")}`
              }`}
            >
              {s.time}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={!slot}
          onClick={() => go(3)}
          className={`mb-5 mt-auto rounded-xl py-3 text-[11px] font-semibold transition-colors ${
            slot ? `bg-[#0079b8] text-white ${hint(true)}` : "bg-[#eef1f4] text-[#b5bcc2]"
          }`}
        >
          {slot ? `Réserver ${slot}` : "Choisissez un créneau"}
        </button>
      </div>
    </div>,

    <div key="done" className="flex h-full flex-col items-center justify-center px-5 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-[#0079b8] text-white">
        <Check size={24} aria-hidden />
      </span>
      <p className="mt-4 text-sm font-semibold">Réservation confirmée</p>
      <p className="mt-1 text-[10px] text-[#5f6b75]">
        {venues[venue].name}
        <br />
        Ce soir, {slot}
      </p>
      <span className="mt-5 rounded-lg bg-[#eef1f4] px-3 py-2 text-[10px]">Ajouter au calendrier</span>
    </div>,
  ];

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
      {/* Téléphone */}
      <div className="relative aspect-[9/19] h-[clamp(280px,44svh,520px)] shrink-0 overflow-hidden rounded-[2rem] border-[5px] border-[#0d1114] bg-white text-[#0d1114] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] lg:h-[min(62svh,560px)]">
        <span aria-hidden className="absolute left-1/2 top-1.5 z-20 h-3.5 w-14 -translate-x-1/2 rounded-full bg-[#0d1114]" />
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={screen}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {screens[screen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Panneau de test utilisateur */}
      <div className="hidden w-52 sm:block">
        <p className="hud-label text-[10px] text-muted">Parcours utilisateur</p>
        <ol className="mt-4 space-y-3">
          {steps.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-3 text-xs ${i < screen ? "text-fg" : i === screen ? "text-accent" : "text-muted"}`}
            >
              <span
                className={`flex size-5 items-center justify-center border font-mono text-[9px] ${
                  i < screen ? "border-accent bg-accent text-bg" : i === screen ? "border-accent" : "border-line"
                }`}
              >
                {i < screen ? "✓" : i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-6 hud-label text-[10px] text-muted">
          Interactions <span className="text-fg">{pad(taps)}</span>
        </p>
        {screen === 3 && <p className="mt-2 text-xs text-accent">Tâche réussie en {taps} interactions.</p>}
        <label className="mt-6 flex items-center gap-2 hud-label text-[10px] text-muted">
          <input type="checkbox" checked={hints} onChange={(e) => setHints(e.target.checked)} className="accent-[var(--accent)]" />
          Zones cliquables
        </label>
        <button type="button" onClick={restart} className="mt-4 hud-label text-[10px] text-accent hover:underline">
          ↺ Recommencer
        </button>
      </div>

      {/* Version compacte (mobile) */}
      <div className="flex items-center gap-4 hud-label text-[10px] text-muted sm:hidden">
        <span>
          Étape {screen + 1}/{steps.length} · {steps[screen]}
        </span>
        <button type="button" onClick={restart} className="text-accent">
          ↺
          <span className="sr-only">Recommencer</span>
        </button>
      </div>
    </div>
  );
}
