"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CornerDownLeft, MousePointer2 } from "lucide-react";

/** Éléments qui reçoivent l'indicateur au survol ou au focus clavier */
const INTERACTIVE =
  'a[href], button:not(:disabled), [role="button"], input[type="range"], input[type="checkbox"], input[type="text"], input[type="search"], select, summary, [data-prompt]';
/** Distance (px) en deçà de laquelle le nom d'un objet voisin apparaît */
const NEAR = 170;

type Shape = "ring" | "box" | "underline";
type Side = { x: "right" | "left"; y: "up" | "down" };

interface Target {
  el: HTMLElement;
  shape: Shape;
  verb: string;
  keyboard: boolean;
  side: Side;
  key: number;
  path: string;
  rect: { x: number; y: number; w: number; h: number };
}

interface Nearby {
  key: string;
  name: string;
  x: number;
  y: number;
}

/** Marge autour de l'élément [horizontale, verticale] */
const PAD: Record<Shape, readonly [number, number]> = { ring: [10, 10], box: [7, 6], underline: [4, 0] };

function pick(node: EventTarget | null) {
  if (!(node instanceof Element)) return null;
  const el = node.closest<HTMLElement>(INTERACTIVE);
  return el && el.dataset.prompt !== "none" ? el : null;
}

/** Verbe d'action affiché à côté de l'indicateur */
export function verbOf(el: HTMLElement) {
  if (el.dataset.promptLabel) return el.dataset.promptLabel;
  if (el instanceof HTMLAnchorElement) {
    if ((el.getAttribute("href") ?? "").startsWith("mailto:")) return "Écrire";
    return el.target === "_blank" ? "Ouvrir" : "Aller";
  }
  if (el instanceof HTMLInputElement) {
    if (el.type === "range") return "Glisser";
    if (el.type === "checkbox") return "Cocher";
    return "Écrire";
  }
  return "Utiliser";
}

function shapeOf(el: HTMLElement, width: number, height: number): Shape {
  const wanted = el.dataset.prompt;
  if (wanted === "ring" || wanted === "box" || wanted === "underline") return wanted;
  if (el.matches('input[type="text"], input[type="search"]')) return "underline";
  return width < 56 && height < 56 ? "ring" : "box";
}

function frameOf(shape: Shape, r: Pick<DOMRect, "left" | "top" | "width" | "height" | "bottom">) {
  const [px, py] = PAD[shape];
  if (shape === "underline") return { x: r.left - px, y: r.bottom - 4, w: r.width + px * 2, h: 8 };
  if (shape === "ring") {
    const size = Math.max(r.width, r.height) + px * 2;
    return { x: r.left + r.width / 2 - size / 2, y: r.top + r.height / 2 - size / 2, w: size, h: size };
  }
  return { x: r.left - px, y: r.top - py, w: r.width + px * 2, h: r.height + py * 2 };
}

/** L'indicateur se place en haut à droite, sauf s'il sortirait de l'écran */
function sideOf(r: Pick<DOMRect, "right" | "top">): Side {
  return { x: r.right + 160 > window.innerWidth ? "left" : "right", y: r.top < 150 ? "down" : "up" };
}

/* Positions du trait, du cercle et du verbe autour du cadre, selon le côté */
function layout(side: Side) {
  const h = side.x === "right" ? "left" : "right";
  const up = side.y === "up";
  const flip = `${side.x === "left" ? "scaleX(-1)" : ""} ${up ? "" : "scaleY(-1)"}`.trim() || undefined;
  return {
    line: { [h]: "calc(100% - 2px)", [up ? "top" : "bottom"]: -30, transform: flip } as CSSProperties,
    bubble: { [h]: "calc(100% + 30px)", [up ? "top" : "bottom"]: -56 } as CSSProperties,
    verb: { [h]: "calc(100% + 84px)", [up ? "top" : "bottom"]: -45 } as CSSProperties,
  };
}

/** Cadre en équerres cyan */
function Brackets() {
  const corner = "absolute size-3 border-hud";
  return (
    <motion.span initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="absolute inset-0">
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
    </motion.span>
  );
}

/** Indicateur d'interaction : trait, cercle avec l'icône (souris ou touche Entrée), verbe d'action */
function Prompt({ target }: Readonly<{ target: Target }>) {
  const pos = layout(target.side);
  const Icon = target.keyboard ? CornerDownLeft : MousePointer2;
  return (
    <>
      <svg aria-hidden width="34" height="30" viewBox="0 0 34 30" className="absolute overflow-visible" style={{ ...pos.line, transformOrigin: "center" }}>
        <motion.path
          d="M2 28 L 32 2"
          fill="none"
          className="stroke-hud"
          strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.2 }}
        className="absolute flex size-[44px] items-center justify-center rounded-full border-2 border-white bg-[#0c0e11]/70 text-white shadow-[0_0_12px_var(--hud)]"
        style={pos.bubble}
      >
        <Icon size={18} strokeWidth={1.75} />
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: target.side.x === "right" ? -6 : 6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.32, duration: 0.2 }}
        className="absolute block whitespace-nowrap bg-[#0c0e11]/75 px-2 py-1 text-[12px] font-semibold uppercase leading-none tracking-[0.08em] text-white"
        style={pos.verb}
      >
        {target.verb}
      </motion.span>
    </>
  );
}

/**
 * Indicateurs d'interaction, posés au-dessus de l'écran comme dans un jeu :
 * - l'élément survolé (souris) ou atteint au clavier est encadré d'équerres cyan,
 *   avec un cercle (souris ou Entrée) et le verbe d'action (`data-prompt-label`, sinon déduit : Aller, Ouvrir, Écrire…) ;
 * - les objets voisins (`data-interact="Nom"`) affichent discrètement leur nom quand le pointeur s'approche.
 * `data-prompt="ring|box|underline|none"` force la forme de l'indicateur ou le désactive.
 */
export default function InteractionLayer() {
  const pathname = usePathname();
  const [target, setTarget] = useState<Target | null>(null);
  const [nearby, setNearby] = useState<Nearby[]>([]);
  const frame = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLElement | null>(null);
  const counter = useRef(0);
  const keyboard = useRef(false);

  useEffect(() => {
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let lastNearby = "";

    const show = (el: HTMLElement | null, viaKeyboard: boolean) => {
      if (el === active.current) return;
      active.current = el;
      if (!el) {
        setTarget(null);
        return;
      }
      const r = el.getBoundingClientRect();
      const shape = shapeOf(el, r.width, r.height);
      counter.current += 1;
      setTarget({
        el,
        shape,
        verb: verbOf(el),
        keyboard: viaKeyboard,
        side: sideOf(r),
        key: counter.current,
        path: window.location.pathname,
        rect: frameOf(shape, r),
      });
    };

    // Noms des objets voisins du pointeur
    const scan = () => {
      raf = 0;
      if (!pointer) return;
      const found: (Nearby & { d: number })[] = [];
      document.querySelectorAll<HTMLElement>("[data-interact]").forEach((el, i) => {
        if (el === active.current || el.contains(active.current)) return;
        const r = el.getBoundingClientRect();
        if (!r.width || r.bottom < 0 || r.top > window.innerHeight) return;
        const dx = Math.max(r.left - pointer!.x, 0, pointer!.x - r.right);
        const dy = Math.max(r.top - pointer!.y, 0, pointer!.y - r.bottom);
        const d = Math.hypot(dx, dy);
        if (d < NEAR) found.push({ key: `${i}`, name: el.dataset.interact ?? "", x: r.left + r.width / 2, y: r.top, d });
      });
      const next = found.sort((a, b) => a.d - b.d).slice(0, 3);
      const signature = next.map((n) => `${n.key}:${Math.round(n.x)}:${Math.round(n.y)}`).join("|");
      if (signature === lastNearby) return;
      lastNearby = signature;
      setNearby(next.map(({ key, name, x, y }) => ({ key, name, x, y })));
    };
    const queueScan = () => {
      if (!raf) raf = requestAnimationFrame(scan);
    };
    const clearNearby = () => {
      pointer = null;
      if (lastNearby) {
        lastNearby = "";
        setNearby([]);
      }
    };

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      keyboard.current = false;
      show(pick(e.target), false);
    };
    const onPointerOut = (e: PointerEvent) => {
      if (e.pointerType === "touch" || keyboard.current) return;
      if (!pick(e.relatedTarget)) show(null, false);
      if (!e.relatedTarget) clearNearby();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer = { x: e.clientX, y: e.clientY };
      queueScan();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.key.startsWith("Arrow")) {
        keyboard.current = true;
        clearNearby();
      }
      if (e.key === "Escape") show(null, false);
    };
    const onFocusIn = (e: FocusEvent) => {
      if (keyboard.current) show(pick(e.target), true);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (keyboard.current && !pick(e.relatedTarget)) show(null, true);
    };
    const onPointerDown = () => {
      keyboard.current = false;
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    // L'écran de la tablette défile (pas la fenêtre) : on écoute tous les défilements
    document.addEventListener("scroll", queueScan, { passive: true, capture: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("scroll", queueScan, { capture: true });
    };
  }, []);

  // Suit l'élément (scroll, parallaxe, animations) et s'efface s'il disparaît
  useEffect(() => {
    if (!target) return;
    let raf = 0;
    const tick = () => {
      const node = frame.current;
      if (!target.el.isConnected || window.location.pathname !== target.path) {
        active.current = null;
        setTarget(null);
        return;
      }
      if (node) {
        const r = frameOf(target.shape, target.el.getBoundingClientRect());
        node.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
        node.style.width = `${r.w}px`;
        node.style.height = `${r.h}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <>
      {nearby.map((n) => (
        <span
          key={n.key}
          aria-hidden
          className="pointer-events-none fixed z-[54] flex -translate-x-1/2 -translate-y-full flex-col items-center whitespace-nowrap bg-[#0c0e11]/60 px-1.5 py-0.5 hud-label text-white"
          style={{ left: n.x, top: n.y - 16 }}
        >
          {n.name}
          <span className="absolute -bottom-3 left-1/2 block h-3 w-px bg-hud" />
        </span>
      ))}
      {target?.path === pathname && (
        <div
          ref={frame}
          aria-hidden
          data-testid="interaction-layer"
          className="pointer-events-none fixed left-0 top-0 z-[55] drop-shadow-[0_0_4px_rgb(0_209_255/0.55)]"
          style={{ transform: `translate3d(${target.rect.x}px, ${target.rect.y}px, 0)`, width: target.rect.w, height: target.rect.h }}
        >
          {target.shape === "box" && <Brackets key={target.key} />}
          {target.shape === "ring" && (
            <motion.span
              key={target.key}
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-full border-2 border-hud"
            />
          )}
          {target.shape === "underline" && (
            <motion.span
              key={target.key}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 top-1/2 h-0.5 origin-left bg-hud"
            />
          )}
          <Prompt key={`prompt-${target.key}`} target={target} />
        </div>
      )}
    </>
  );
}
