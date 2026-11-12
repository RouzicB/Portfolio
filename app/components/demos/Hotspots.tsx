"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { pad } from "../../lib/format";

const notes = [
  {
    id: 1,
    x: "26%",
    y: "26%",
    title: "Indicateurs en tête",
    text: "L’écran est lu en moins de 5 s, souvent à 3 m : les trois indicateurs critiques sont en haut, en gros, sans décoration.",
  },
  {
    id: 2,
    x: "42%",
    y: "66%",
    title: "Courbe sur le poste",
    text: "La production est tracée sur les 8 h du poste, avec le seuil d’objectif en pointillé plutôt qu’une légende.",
  },
  {
    id: 3,
    x: "85%",
    y: "60%",
    title: "Alertes priorisées",
    text: "Tri par gravité puis ancienneté. Une seule couleur par niveau, et la plus urgente toujours en premier.",
  },
  {
    id: 4,
    x: "4%",
    y: "45%",
    title: "Navigation tactile",
    text: "Des cibles larges et une barre réduite aux icônes : l’écran est partagé et utilisé avec des gants.",
  },
];

const kpis = [
  { label: "TRS", value: "87 %", tone: "text-[#0079b8]" },
  { label: "Arrêts", value: "3", tone: "text-[#d71f2d]" },
  { label: "Pièces", value: "1 240", tone: "" },
];
const alerts = [
  { label: "Poste 4 — bourrage", dot: "bg-[#d71f2d]" },
  { label: "Poste 7 — cadence", dot: "bg-[#f59e0b]" },
  { label: "Maintenance 14 h", dot: "bg-[#0079b8]" },
];

function Chart() {
  const line = "0,60 20,52 40,55 60,38 80,42 100,30 120,34 140,24 160,28 180,18 200,22";
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)]">
      <polygon points={`0,80 ${line} 200,80`} fill="#0079b8" fillOpacity="0.08" />
      <line x1="0" y1="26" x2="200" y2="26" stroke="#d71f2d" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      <polyline points={line} fill="none" stroke="#0079b8" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
      <line x1="0" y1="0" x2="100" y2="100" stroke="#9aa3ab" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0" x2="0" y2="100" stroke="#9aa3ab" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Le même écran en wireframe ou en maquette finale */
export function Dashboard({ wire }: Readonly<{ wire: boolean }>) {
  const card = wire ? "border border-dashed border-[#9aa3ab] bg-[#eceff1]" : "bg-[#f3f6f8]";
  const t = (content: ReactNode, width = "60%") =>
    wire ? <span className="my-0.5 block h-1.5 rounded-sm bg-[#c3c9cf]" style={{ width }} /> : content;

  return (
    <div className={`absolute inset-0 flex text-[#0d1114] ${wire ? "bg-[#f7f8f9]" : "bg-white"}`}>
      <aside
        className={`flex w-[8%] min-w-7 flex-col items-center gap-2 py-3 ${wire ? "border-r border-dashed border-[#9aa3ab]" : "bg-[#0d1114]"}`}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`size-3.5 rounded-sm ${wire ? "border border-[#9aa3ab]" : i === 0 ? "bg-[#00b4ff]" : "bg-white/20"}`}
          />
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-2.5 sm:p-3">
        <div className="flex items-center justify-between text-[10px] font-semibold sm:text-[11px]">
          {t("Atelier Montage — Ligne 2", "40%")}
          {t(<span className="font-normal text-[#d71f2d]">● En direct</span>, "15%")}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k) => (
            <div key={k.label} className={`rounded-md p-2 ${card}`}>
              <div className="text-[8px] uppercase tracking-[0.15em] text-[#5f6b75]">{t(k.label, "45%")}</div>
              <div className={`mt-1 text-sm font-light sm:text-xl ${k.tone}`}>{t(k.value, "70%")}</div>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[2fr_1fr] gap-2">
          <div className={`relative min-h-0 rounded-md ${card}`}>{wire ? <Cross /> : <Chart />}</div>
          <div className={`flex min-h-0 flex-col gap-1.5 overflow-hidden rounded-md p-2 ${card}`}>
            <div className="text-[8px] uppercase tracking-[0.15em] text-[#5f6b75]">{t("Alertes", "50%")}</div>
            {alerts.map((a) => (
              <div key={a.label} className="flex items-center gap-1.5 text-[9px]">
                <span className={`size-2 shrink-0 rounded-full ${wire ? "border border-[#9aa3ab]" : a.dot}`} />
                {t(<span className="truncate">{a.label}</span>, "80%")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Maquette annotée : bascule wireframe / maquette + points cliquables qui expliquent les choix */
export default function Hotspots() {
  const [mode, setMode] = useState<"wire" | "ui">("ui");
  const [active, setActive] = useState<number | null>(null);
  const note = notes.find((n) => n.id === active);

  return (
    <figure className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div role="group" aria-label="Niveau de fidélité" className="flex border border-line">
          {(
            [
              ["wire", "Wireframe"],
              ["ui", "Maquette"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 hud-label text-[10px] transition-colors ${mode === m ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="hud-label text-[10px] text-muted">{notes.length} annotations</span>
      </div>

      <div className="relative h-[clamp(220px,40svh,300px)] w-full overflow-hidden border border-line lg:h-[min(52svh,420px)]">
        <div aria-hidden={mode !== "ui"} className={`transition-opacity duration-500 ${mode === "ui" ? "opacity-100" : "opacity-0"}`}>
          <Dashboard wire={false} />
        </div>
        <div aria-hidden={mode !== "wire"} className={`transition-opacity duration-500 ${mode === "wire" ? "opacity-100" : "opacity-0"}`}>
          <Dashboard wire />
        </div>

        {notes.map((n) => (
          <button
            key={n.id}
            type="button"
            aria-label={`Annotation ${n.id} : ${n.title}`}
            aria-expanded={active === n.id}
            onClick={() => setActive((a) => (a === n.id ? null : n.id))}
            style={{ left: n.x, top: n.y }}
            className={`absolute z-10 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[10px] text-white transition-colors ${
              active === n.id ? "bg-alert" : "hint bg-[#0079b8]"
            }`}
          >
            {n.id}
          </button>
        ))}

        <AnimatePresence>
          {note && (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-3 bottom-3 z-20 border border-line border-l-2 border-l-accent bg-bg/95 p-3 pr-9 backdrop-blur"
            >
              <p className="hud-label text-[10px] text-accent">Annotation {pad(note.id)}</p>
              <p className="mt-1 text-sm font-medium">{note.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{note.text}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Fermer l’annotation"
                className="absolute right-2 top-2 text-muted hover:text-fg"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <figcaption className="mt-3 hud-label text-[10px] text-muted">◆ Cliquez sur les points pour lire les choix de conception</figcaption>
    </figure>
  );
}
