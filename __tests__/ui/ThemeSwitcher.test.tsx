import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeSwitcher from "@/app/components/themes/ThemeSwitcher";

const setTheme = jest.fn();
jest.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light", setTheme }) }));

describe("ThemeSwitcher", () => {
  it("affiche JOUR actif et bascule en NUIT", async () => {
    render(<ThemeSwitcher />);
    expect(screen.getByRole("button", { name: "Jour" })).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(screen.getByRole("button", { name: "Nuit" }));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
