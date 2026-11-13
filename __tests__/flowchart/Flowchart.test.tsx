import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Flowchart from "@/app/components/flowchart/Flowchart";
import { OVERLAY_ID } from "@/app/lib/screen";

/** Le panneau de détail s'ouvre dans le calque de l'écran de la tablette */
function Screen() {
  return (
    <>
      <Flowchart />
      <div id={OVERLAY_ID} />
    </>
  );
}

describe("Flowchart", () => {
  it("ouvre le détail d’un nœud au clic et le ferme avec Échap", async () => {
    const user = userEvent.setup();
    render(<Screen />);

    await user.click(screen.getByRole("button", { name: /choix : design ou code/i }));
    expect(screen.getByRole("dialog", { name: /design ou code/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: /choix : design ou code/i })).toHaveAttribute("aria-expanded", "false");
  });

  it("propose l’étude de cas depuis un nœud projet", async () => {
    const user = userEvent.setup();
    render(<Screen />);

    await user.click(screen.getByRole("button", { name: /projet : réservation de terrains/i }));
    expect(screen.getByRole("link", { name: /étude de cas/i })).toHaveAttribute("href", "/projets/reservation-terrains");
  });
});
