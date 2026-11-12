"use client";

import { useState } from "react";

/* Maquettes dessinées en HTML : remplaçables par deux captures (<Image>) de même format */

const legacyActions = ["Virement", "RIB", "Opposition", "Chéquier", "Épargne", "Bourse", "Crédit", "Assurance", "Documents"];
const legacyRows = [
  ["12/11", "PRLV SEPA ENERGIE", "84,20", "", "2 458,30"],
  ["11/11", "CB SUPERMARCHE 10/11", "62,45", "", "2 542,50"],
  ["10/11", "VIR SALAIRE NOVEMBRE", "", "2 150,00", "2 604,95"],
  ["09/11", "CB BOULANGERIE 08/11", "4,80", "", "454,95"],
  ["08/11", "PRLV SEPA TELECOM", "29,99", "", "459,75"],
  ["07/11", "CB STATION SERVICE", "58,10", "", "489,74"],
  ["06/11", "RETRAIT DAB 05/11", "40,00", "", "547,84"],
];
const spending = [40, 65, 30, 80, 55, 92, 45];
const recent = [
  { label: "Énergie", amount: "− 84,20 €" },
  { label: "Supermarché", amount: "− 62,45 €" },
  { label: "Salaire", amount: "+ 2 150,00 €" },
];

function BeforeScreen() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#e9eaec] font-serif text-[9px] text-[#444] sm:text-[10px]">
      <div className="flex items-center justify-between bg-[#5b6b7c] px-3 py-1.5 text-white">
        <span className="font-bold">MaBanque Online</span>
        <span className="hidden sm:inline">Déconnexion | Aide | Contact</span>
      </div>
      <div className="bg-[#b03a2e] px-3 py-1 text-white">AVIS IMPORTANT : mise à jour de vos conditions générales</div>
      <div className="flex flex-wrap gap-1 p-2">
        {legacyActions.map((a) => (
          <span key={a} className="border border-[#999] bg-[#f7f7f7] px-1.5 py-0.5">
            {a}
          </span>
        ))}
      </div>
      <p className="px-2 pb-1 font-bold">Compte courant n° 0001234567 — Solde : 2458.30 EUR</p>
      <div className="mx-2 min-h-0 flex-1 overflow-hidden border border-[#999] bg-white">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#d5d8dc]">
            <tr>
              {["Date", "Libellé", "Débit", "Crédit", "Solde"].map((h) => (
                <th key={h} className="border border-[#bbb] px-1 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {legacyRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} className="border border-[#ddd] px-1 py-0.5">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="p-2 text-[8px] text-[#777]">Page 1/14 — Afficher 10 | 20 | 50 lignes</p>
    </div>
  );
}

export function AfterScreen() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 bg-white p-4 text-[#0d1114] sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#5f6b75]">Compte courant</p>
          <p className="mt-1 text-2xl font-light sm:text-4xl">2 458,30 €</p>
          <p className="mt-1 text-[10px] text-[#0079b8]">Il vous reste 1 210 € jusqu’au 30/11</p>
        </div>
        <span className="flex size-8 items-center justify-center rounded-full bg-[#0d1114] text-[10px] text-white">CL</span>
      </div>
      <div className="flex gap-2">
        {["Virer", "Payer", "Épargner"].map((a) => (
          <span key={a} className="flex-1 rounded-lg bg-[#eef1f4] py-2 text-center text-[11px] font-medium">
            {a}
          </span>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 items-end gap-1.5">
        {spending.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-sm ${i === spending.length - 2 ? "bg-[#0079b8]" : "bg-[#0079b8]/25"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <ul className="hidden space-y-1.5 text-[11px] sm:block">
        {recent.map((r) => (
          <li key={r.label} className="flex justify-between border-b border-[#eef1f4] pb-1.5">
            <span>{r.label}</span>
            <span className={r.amount.startsWith("+") ? "text-[#0079b8]" : ""}>{r.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Comparateur avant / après : glisser (souris, tactile) ou flèches du clavier */
export default function BeforeAfter() {
  const [position, setPosition] = useState(50);

  return (
    <figure className="w-full">
      <div className="relative h-[clamp(220px,40svh,300px)] w-full select-none overflow-hidden border border-line lg:h-[min(56svh,460px)]">
        <BeforeScreen />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <AfterScreen />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-glow shadow-[0_0_12px_var(--glow)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-glow bg-[#0d1114] font-mono text-[10px] text-white">
            ⇔
          </span>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 bg-[#0d1114]/80 px-2 py-1 hud-label text-[10px] text-white">
          Avant
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-[#0079b8] px-2 py-1 hud-label text-[10px] text-white">
          Après
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Comparer l’interface avant et après la refonte"
          aria-valuetext={`${position} % de l’ancienne interface visible`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 hud-label text-[10px] text-muted">◆ Glissez pour comparer avant / après</figcaption>
    </figure>
  );
}
