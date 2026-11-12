import { demoLabels, getFeaturedProjects, getProjectBySlug, projects } from "@/app/data/projects";

describe("projects data", () => {
  it("a des slugs uniques", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("retrouve un projet par son slug", () => {
    expect(getProjectBySlug(projects[0].slug)).toBe(projects[0]);
    expect(getProjectBySlug("inexistant")).toBeUndefined();
  });

  it("ne renvoie que les projets mis en avant", () => {
    expect(getFeaturedProjects().every((p) => p.featured)).toBe(true);
  });

  it("associe à chaque projet une démo connue et des résultats", () => {
    for (const p of projects) {
      expect(demoLabels[p.demo]).toBeDefined();
      expect(p.outcomes.length).toBeGreaterThan(0);
    }
  });
});
