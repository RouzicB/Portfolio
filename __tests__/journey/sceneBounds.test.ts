import { sceneBounds } from "@/app/components/journey/Journey";

describe("sceneBounds", () => {
  it("répartit la progression selon la longueur de chaque scène", () => {
    const { bounds, totalLength } = sceneBounds([{ length: 1 }, { length: 2 }, {}]);

    expect(totalLength).toBe(4);
    expect(bounds).toEqual([
      [0, 0.25],
      [0.25, 0.75],
      [0.75, 1],
    ]);
  });
});
