import { type ReactNode } from "react";

export default function Badge({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span className="inline-flex items-center bg-line/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.06em] text-body">{children}</span>
  );
}
