import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/app/components/ui/Button";

describe("Button", () => {
  it("affiche son contenu et réagit au clic", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Envoyer</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Envoyer" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("est désactivé quand disabled est passé", () => {
    render(<Button disabled>Envoyer</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
