import { fireEvent, render, screen } from "@testing-library/react";
import BeforeAfter from "@/app/components/demos/BeforeAfter";

describe("BeforeAfter", () => {
  it("expose un curseur accessible qui pilote la comparaison", () => {
    render(<BeforeAfter />);
    const slider = screen.getByRole("slider", { name: /comparer/i });
    expect(slider).toHaveValue("50");

    fireEvent.change(slider, { target: { value: "20" } });

    expect(slider).toHaveValue("20");
    expect(slider).toHaveAttribute("aria-valuetext", expect.stringContaining("20"));
  });
});
