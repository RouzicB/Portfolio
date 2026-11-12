import { careerChapters, careerEdges, careerNodes } from "@/app/data/career";
import { getProjectBySlug } from "@/app/data/projects";
import { edgePath, flowStats, nodeBox } from "@/app/lib/flowchart";

describe("arborescence du parcours", () => {
  const ids = new Set(careerNodes.map((n) => n.id));

  it("a des identifiants uniques", () => {
    expect(ids.size).toBe(careerNodes.length);
  });

  it("ne relie que des nœuds existants", () => {
    for (const e of careerEdges) {
      expect(ids.has(e.from)).toBe(true);
      expect(ids.has(e.to)).toBe(true);
    }
  });

  it("pointe vers des études de cas existantes", () => {
    for (const n of careerNodes.filter((node) => node.kind === "project")) {
      expect(getProjectBySlug(n.projectSlug ?? "")).toBeDefined();
    }
  });

  it("range chaque nœud dans un chapitre", () => {
    for (const n of careerNodes) {
      expect(careerChapters.some((c) => n.row >= c.rows[0] && n.row <= c.rows[1])).toBe(true);
    }
  });
});

describe("géométrie et statistiques", () => {
  it("trace un lien droit entre deux nœuds alignés, coudé sinon", () => {
    expect(edgePath({ col: 0, row: 0 }, { col: 0, row: 1 })).toMatch(/^M[\d.]+ [\d.]+V[\d.]+$/);
    expect(edgePath({ col: 0, row: 0 }, { col: 1, row: 1 })).toContain("H");
  });

  it("place les rangées les unes sous les autres", () => {
    expect(nodeBox({ col: 0, row: 1 }).y).toBeGreaterThan(nodeBox({ col: 0, row: 0 }).y);
  });

  it("calcule la complétion à partir des nœuds débloqués", () => {
    const stats = flowStats([{ kind: "start" }, { kind: "step" }, { kind: "locked" }, { kind: "future" }]);
    expect(stats.completion).toBe(50);
    expect(stats.unexplored).toBe(1);
  });
});
