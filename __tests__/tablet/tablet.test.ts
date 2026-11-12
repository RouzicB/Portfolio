import { isTabActive, tabletFor, tabs } from "@/app/data/tablet";
import { pageCount } from "@/app/lib/pages";

describe("tablette", () => {
  it("associe à chaque page son objectif, sa pensée et son ambiance", () => {
    expect(tabletFor("/parcours")?.mood).toBe("stable");
    expect(tabletFor("/projets")?.objective).toMatch(/dossier/i);
    // Les études de cas ont leur propre entrée, plus précise que celle des archives
    expect(tabletFor("/projets/reservation-terrains")?.objective).toMatch(/démo/i);
    expect(tabletFor("/inconnue")).toBeUndefined();
  });

  it("n'active que l'onglet de la page courante", () => {
    const active = (path: string) => tabs.filter((t) => isTabActive(t.href, path)).map((t) => t.label);
    expect(active("/")).toEqual(["Accueil"]);
    expect(active("/projets/refonte-app-bancaire")).toEqual(["Projets"]);
    expect(active("/credits")).toEqual([]);
  });
});

describe("pageCount", () => {
  it("découpe une longue page en pages de la hauteur de l'écran", () => {
    expect(pageCount(0, 800, 800)).toEqual({ current: 1, total: 1 });
    expect(pageCount(0, 800, 3200)).toEqual({ current: 1, total: 4 });
    expect(pageCount(1700, 800, 3200)).toEqual({ current: 3, total: 4 });
    expect(pageCount(5000, 800, 3200).current).toBe(4);
  });
});

describe("slideDirection", () => {
  it("fait glisser la page selon la position des onglets", () => {
    const { slideDirection } = jest.requireActual("@/app/data/tablet");
    expect(slideDirection(null, "/projets")).toBe(0);
    expect(slideDirection("/projets", "/projets")).toBe(0);
    expect(slideDirection("/", "/contact")).toBe(1);
    expect(slideDirection("/parcours", "/a-propos")).toBe(-1);
    // Une étude de cas est juste à droite des projets, avant le parcours
    expect(slideDirection("/projets", "/projets/reservation-terrains")).toBe(1);
    expect(slideDirection("/projets/reservation-terrains", "/parcours")).toBe(1);
    expect(slideDirection("/credits", "/contact")).toBe(-1);
  });
});
