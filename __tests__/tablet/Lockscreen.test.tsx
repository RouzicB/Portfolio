import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnimatePresence } from "framer-motion";
import NavBar from "@/app/components/tablet/NavBar";
import Lockscreen from "@/app/components/tablet/Lockscreen";
import { unlock, useLocked } from "@/app/lib/lock";

jest.mock("next/navigation", () => ({ usePathname: () => "/projets", useRouter: () => ({ push: jest.fn() }) }));

function Device() {
  const locked = useLocked();
  return (
    <>
      <NavBar />
      <AnimatePresence>{locked && <Lockscreen />}</AnimatePresence>
    </>
  );
}

describe("écran de verrouillage", () => {
  afterEach(() => act(() => unlock()));

  it("le bouton d'arrêt verrouille la tablette ; seul un curseur amené au bout la déverrouille", async () => {
    const user = userEvent.setup();
    render(<Device />);
    expect(screen.queryByRole("dialog", { name: /verrouillée/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /verrouiller la tablette/i }));
    expect(screen.getByRole("dialog", { name: /verrouillée/i })).toBeInTheDocument();
    // L'écran de verrouillage couvre toute la tablette, avec sa propre ligne d'état
    expect(screen.getByText("Veille")).toBeInTheDocument();

    // Avancer à moitié ne suffit pas : il faut amener le curseur tout au bout
    const slider = screen.getByRole("slider", { name: /déverrouiller/i });
    expect(slider).toHaveFocus();
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(screen.getByText("Veille")).toBeInTheDocument();

    await user.keyboard("{End}");
    await waitFor(() => expect(screen.queryByRole("dialog", { name: /verrouillée/i })).not.toBeInTheDocument());
  });
});
