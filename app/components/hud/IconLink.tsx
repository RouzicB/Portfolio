import { type ReactNode } from "react";
import Link from "next/link";
import { type DetroitIcon } from "../icons/DetroitIcons";

/** Lien « WATCH PANORAMA » : carré jaune avec icône + libellé en capitales */
export default function IconLink({
  href,
  icon: Icon,
  children,
  external = false,
}: Readonly<{ href: string; icon: DetroitIcon; children: ReactNode; external?: boolean }>) {
  const cls = "group inline-flex items-center gap-3 text-[15px] uppercase text-body transition-colors hover:text-fg";
  const content = (
    <>
      <span className="flex size-5 items-center justify-center bg-loading text-[#1d1f22]">
        <Icon size={14} strokeWidth={1.8} accent="currentColor" />
      </span>
      {children}
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
