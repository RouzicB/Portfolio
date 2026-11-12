import BeforeAfter from "./BeforeAfter";
import PrototypePhone from "./PrototypePhone";
import Hotspots from "./Hotspots";
import type { DemoType } from "../../types/project";

const demos: Record<DemoType, () => React.JSX.Element> = {
  "before-after": BeforeAfter,
  prototype: PrototypePhone,
  hotspots: Hotspots,
};

/** Affiche la démo interactive associée à un projet */
export default function ProjectDemo({ type }: Readonly<{ type: DemoType }>) {
  const Demo = demos[type];
  return <Demo />;
}
