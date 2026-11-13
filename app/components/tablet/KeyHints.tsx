"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BackspaceIcon, EnterIcon } from "../icons/DetroitIcons";

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

function Key({ glyph }: Readonly<{ glyph: ReactNode }>) {
  return (
    <span aria-hidden className="flex size-6 shrink-0 items-center justify-center rounded-full border border-fg/60 text-[11px] font-semibold leading-none">
      {glyph}
    </span>
  );
}

/**
 * Aide de commandes en bas à droite, comme dans un jeu : ↵ Sélectionner · ⌫ Retour · Q Quitter.
 * Retour ramène à la page précédente ; Quitter ramène à l'accueil.
 */
export default function KeyHints() {
  const router = useRouter();
  const pathname = usePathname();
  const home = pathname === "/";

  const back = useCallback(() => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target) || document.querySelector('[role="dialog"]')) return;
      if (e.key === "Backspace" && !home) {
        e.preventDefault();
        back();
      } else if ((e.key === "q" || e.key === "Q") && !home) {
        router.push("/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, home, back]);

  return (
    <div className="hidden items-center gap-4 text-[12px] uppercase tracking-[0.06em] text-fg xl:flex">
      <span className="flex items-center gap-1.5 opacity-80">
        <Key glyph={<EnterIcon size={13} strokeWidth={1.8} />} /> Sélectionner
      </span>
      {!home && (
        <>
          <button type="button" onClick={back} className="flex items-center gap-1.5 uppercase hover:text-cobalt">
            <Key glyph={<BackspaceIcon size={13} strokeWidth={1.6} />} /> Retour
          </button>
          <button type="button" onClick={() => router.push("/")} className="flex items-center gap-1.5 uppercase hover:text-cobalt">
            <Key glyph="Q" /> Quitter
          </button>
        </>
      )}
    </div>
  );
}
