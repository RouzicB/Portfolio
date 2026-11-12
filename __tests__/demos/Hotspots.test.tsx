import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hotspots from "@/app/components/demos/Hotspots";

describe("Hotspots", () => {
  it("affiche l’annotation du point cliqué", async () => {
    const user = userEvent.setup();
    render(<Hotspots />);

    const point = screen.getByRole("button", { name: /annotation 3/i });
    await user.click(point);

    expect(point).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/tri par gravité/i)).toBeInTheDocument();
  });

  it("bascule entre wireframe et maquette", async () => {
    const user = userEvent.setup();
    render(<Hotspots />);

    const wire = screen.getByRole("button", { name: "Wireframe" });
    expect(wire).toHaveAttribute("aria-pressed", "false");
    await user.click(wire);
    expect(wire).toHaveAttribute("aria-pressed", "true");
  });
});
