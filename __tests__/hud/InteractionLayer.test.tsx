import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InteractionLayer, { verbOf } from "@/app/components/hud/InteractionLayer";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

function Page() {
  return (
    <>
      <button type="button" data-prompt-label="analyser">
        Dossier
      </button>
      <button type="button" data-prompt="none">
        Sans indicateur
      </button>
      <p>Texte</p>
      <InteractionLayer />
    </>
  );
}

describe("InteractionLayer", () => {
  it("encadre l'élément survolé et affiche son verbe d'action, puis s'efface en le quittant", async () => {
    const user = userEvent.setup();
    render(<Page />);
    expect(screen.queryByTestId("interaction-layer")).not.toBeInTheDocument();

    await user.hover(screen.getByRole("button", { name: "Dossier" }));
    expect(screen.getByTestId("interaction-layer")).toHaveTextContent("analyser");

    await user.unhover(screen.getByRole("button", { name: "Dossier" }));
    await user.hover(screen.getByText("Texte"));
    expect(screen.queryByTestId("interaction-layer")).not.toBeInTheDocument();
  });

  it("suit le focus clavier et respecte data-prompt=\"none\"", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.tab();
    expect(screen.getByTestId("interaction-layer")).toBeInTheDocument();

    await user.tab();
    expect(screen.queryByTestId("interaction-layer")).not.toBeInTheDocument();
  });
});

describe("verbOf", () => {
  const make = (html: string) => {
    const host = document.createElement("div");
    host.innerHTML = html;
    return host.firstElementChild as HTMLElement;
  };

  it("déduit le verbe de l'élément", () => {
    expect(verbOf(make('<a href="mailto:a@b.c">x</a>'))).toBe("Écrire");
    expect(verbOf(make('<a href="https://x.y" target="_blank">x</a>'))).toBe("Ouvrir");
    expect(verbOf(make('<a href="/projets">x</a>'))).toBe("Aller");
    expect(verbOf(make('<input type="range" />'))).toBe("Glisser");
    expect(verbOf(make("<button>x</button>"))).toBe("Utiliser");
    expect(verbOf(make('<button data-prompt-label="Relire">x</button>'))).toBe("Relire");
  });
});
