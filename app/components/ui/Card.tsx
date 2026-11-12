import { type ReactNode } from "react";
import Brackets from "../hud/Corners";

/** Panneau blanc translucide encadré de coins cyan */
export default function Card({ children, className = "" }: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <Brackets size={10} offset={4} className={`bg-surface/80 p-6 backdrop-blur-sm ${className}`}>
      {children}
    </Brackets>
  );
}
