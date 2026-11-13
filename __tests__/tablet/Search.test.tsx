import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "@/app/components/tablet/NavBar";
import { OVERLAY_ID } from "@/app/lib/screen";

let path = "/projets";
jest.mock("next/navigation", () => ({ usePathname: () => path, useRouter: () => ({ push: jest.fn() }) }));

function Device() {
  return (
    <>
      <NavBar />
      <div id={OVERLAY_ID} />
    </>
  );
}

describe("recherche", () => {
  it("se ferme quand on change de page", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Device />);

    await user.click(screen.getByRole("button", { name: /rechercher/i }));
    expect(screen.getByRole("dialog", { name: "Recherche" })).toBeInTheDocument();

    path = "/parcours";
    rerender(<Device />);
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Recherche" })).not.toBeInTheDocument());

    // Revenir sur la page d'origine ne la rouvre pas
    path = "/projets";
    rerender(<Device />);
    expect(screen.queryByRole("dialog", { name: "Recherche" })).not.toBeInTheDocument();
  });
});
