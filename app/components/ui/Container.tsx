import { type ReactNode } from "react";

/** Grille de 1240 px (12 colonnes) */
export default function Container({ children, className = "" }: Readonly<{ children: ReactNode; className?: string }>) {
  return <div className={`mx-auto w-full max-w-[1240px] px-6 lg:px-10 ${className}`.trim()}>{children}</div>;
}
