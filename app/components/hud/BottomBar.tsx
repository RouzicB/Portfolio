"use client";

import Link from "next/link";
import { useTransform, type MotionValue } from "framer-motion";
import Barcode from "./Barcode";
import PageTag from "../tablet/PageTag";
import KeyHints from "../tablet/KeyHints";
import { credits } from "../../data/site";
import { timecode } from "../../lib/format";

interface BottomBarProps {
  progress: MotionValue<number>;
  tone?: "hud" | "loading";
  page: { current: number; total: number; label?: string };
  onPrev: () => void;
  onNext: () => void;
}

/** Pied de la tablette : « Page n/N » · frise code-barres · commandes · crédits */
export default function BottomBar({ progress, tone = "hud", page, onPrev, onNext }: Readonly<BottomBarProps>) {
  const label = useTransform(progress, (v) => timecode(v));

  return (
    <footer className="relative">
      <div className="relative flex h-[62px] items-center gap-3 pl-10 pr-4 sm:gap-5 sm:pl-12 sm:pr-6 lg:gap-8 lg:pl-14 lg:pr-8">
        {/* Crédit de la direction artistique, sous la frise */}
        <Link
          href="/credits"
          className="absolute bottom-0.5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[8px] tracking-[0.04em] text-muted transition-colors hover:text-hud-ink sm:block"
        >
          {credits.short} · Crédits
        </Link>
        <PageTag current={page.current} total={page.total} label={page.label} onPrev={onPrev} onNext={onNext} />
        <div className="mx-auto hidden w-full max-w-[480px] sm:block">
          <Barcode progress={progress} label={label} tone={tone} />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-6 text-[13px] uppercase text-fg sm:ml-0">
          <KeyHints />
        </div>
      </div>
    </footer>
  );
}
