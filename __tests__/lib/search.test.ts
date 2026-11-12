import { searchSite } from "@/app/lib/search";
import { timecode } from "@/app/lib/format";

describe("searchSite", () => {
  it("trouve un dossier sans tenir compte des accents ni de la casse", () => {
    const results = searchSite("PROTOTYPAGE reservation");
    expect(results.some((r) => r.href === "/projets/reservation-terrains")).toBe(true);
  });

  it("renvoie toutes les entrées pour une recherche vide", () => {
    expect(searchSite("").length).toBeGreaterThan(3);
  });

  it("ne renvoie rien pour un terme inconnu", () => {
    expect(searchSite("zzzz")).toEqual([]);
  });
});

describe("timecode", () => {
  it("convertit une progression en code temporel sur 5 minutes", () => {
    expect(timecode(0)).toBe("00.00");
    expect(timecode(0.5)).toBe("02.30");
    expect(timecode(1)).toBe("05.00");
  });
});
