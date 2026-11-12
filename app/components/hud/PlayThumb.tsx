import { type ReactNode } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

interface PlayThumbProps {
  /** Petit libellé en haut à droite, ex. « watch video » */
  label: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

/** Bloc interactif : vignette 225×128, libellé discret, carré jaune de lecture */
export default function PlayThumb({ label, href, onClick, children, className = "" }: Readonly<PlayThumbProps>) {
  const content = (
    <>
      <span className="relative block h-[128px] w-[225px] overflow-hidden bg-line">
        {children}
        <span className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/15" />
      </span>
      <span className="absolute left-full top-0 whitespace-nowrap pl-1.5 text-[9px] text-body">{label}</span>
      <span className="absolute bottom-0 left-0 flex size-5 items-center justify-center bg-loading">
        <Play size={9} className="fill-[#1d1f22] text-[#1d1f22]" aria-hidden />
      </span>
    </>
  );
  const cls = `group relative inline-block text-left ${className}`;

  return href ? (
    <Link href={href} className={cls} aria-label={label}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls} aria-label={label}>
      {content}
    </button>
  );
}
