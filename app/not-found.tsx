import Link from "next/link";
import PageHero from "./components/layouts/PageHero";
import { Item } from "./components/journey/scenes/SceneLayout";
import DisplayTitle from "./components/hud/DisplayTitle";
import TriangleFrame from "./components/hud/TriangleFrame";
import DiodeError from "./components/hud/DiodeError";
import { buttonClasses } from "./components/ui/Button";

export default function NotFound() {
  return (
    <>
      <DiodeError />
      <PageHero
        left={
          <>
            <Item>
              <p className="mb-4 text-[15px] text-hud-ink">
                <span className="font-bold">ID</span>RED <span className="text-error">#FF0000</span> ERR / page introuvable
              </p>
              <DisplayTitle as="h1" light="Erreur " bold="404" />
            </Item>
            <Item>
              <p className="mt-6 max-w-[430px] text-[17px] font-medium leading-snug text-fg">
                Le signal est perdu : cette page n’existe pas ou a été déplacée.
              </p>
            </Item>
            <Item className="mt-9">
              <Link href="/" className={buttonClasses("primary")}>
                Retour
              </Link>
            </Item>
          </>
        }
        right={<TriangleFrame code="00.404" />}
      />
    </>
  );
}
