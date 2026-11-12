import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PrototypePhone from "@/app/components/demos/PrototypePhone";

describe("PrototypePhone", () => {
  it("permet de parcourir la réservation jusqu’à la confirmation", async () => {
    const user = userEvent.setup();
    render(<PrototypePhone />);

    await user.click(screen.getByRole("button", { name: /padel · lyon · ce soir/i }));
    await user.click(await screen.findByRole("button", { name: /padel club confluence/i }));

    const reserve = await screen.findByRole("button", { name: /choisissez un créneau/i });
    expect(reserve).toBeDisabled();
    expect(screen.getByRole("button", { name: "17:00" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "18:00" }));
    await user.click(screen.getByRole("button", { name: /réserver 18:00/i }));

    expect(await screen.findByText(/réservation confirmée/i)).toBeInTheDocument();
  });
});
