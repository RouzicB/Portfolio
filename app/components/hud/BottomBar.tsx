"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { useTransform, type MotionValue } from "framer-motion";
import Barcode from "./Barcode";
import PageTag from "../tablet/PageTag";
import KeyHints from "../tablet/KeyHints";
import ThemeSwitcher from "../themes/ThemeSwitcher";
import { credits } from "../../data/site";
import { timecode } from "../../lib/format";

interface BottomBarProps {
  progress: MotionValue<number>;
  tone?: "hud" | "loading";
  page: { current: number; total: number; label?: string };
  onPrev: () => void;
  onNext: () => void;
  /** Commande supplémentaire à côté du repère de page (ex. lecture automatique) */
  extra?: ReactNode;
}

/** Bas de l'écran, sous la tablette : « Page n/N » · frise code-barres · commandes · Jour / Nuit */
export default function BottomBar({ progress, tone = "hud", page, onPrev, onNext, extra }: Readonly<BottomBarProps>) {
  const label = useTransform(progress, (v) => timecode(v));

  return (
    <div className="chrome-ui fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-bg via-bg/85 to-transparent">
      <div className="relative mx-auto flex h-[70px] max-w-[1320px] items-center gap-3 px-3 sm:gap-5 sm:px-6 lg:gap-8 lg:px-10">
        {/* Crédit de la direction artistique, sous la frise */}
        <Link
          href="/credits"
          data-prompt="underline"
          className="absolute bottom-1 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[8px] tracking-[0.04em] text-muted transition-colors hover:text-hud-ink sm:block"
        >
          {credits.short} · Crédits
        </Link>
        <PageTag current={page.current} total={page.total} label={page.label} onPrev={onPrev} onNext={onNext} />
        {extra}
        <div className="mx-auto hidden w-full max-w-[480px] sm:block">
          <Barcode progress={progress} label={label} tone={tone} />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-6 text-[13px] uppercase text-fg sm:ml-0">
          <KeyHints />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
