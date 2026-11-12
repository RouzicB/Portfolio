/** Les 4 phases du double diamant, affichées dans la scène « Protocole » et sur la page À propos */
export const processPhases = [
  {
    name: "Découvrir",
    goal: "Comprendre les utilisateurs, leur contexte et leurs frustrations avant de dessiner quoi que ce soit.",
    methods: ["Entretiens", "Observation terrain", "Benchmark", "Analytics"],
  },
  {
    name: "Définir",
    goal: "Transformer la recherche en un problème clair, partagé et mesurable.",
    methods: ["Personas", "Parcours utilisateur", "How Might We", "Priorisation"],
  },
  {
    name: "Développer",
    goal: "Explorer plusieurs pistes, prototyper vite et confronter les idées aux utilisateurs.",
    methods: ["Ateliers d’idéation", "Wireframes", "Prototypes", "Design system"],
  },
  {
    name: "Livrer",
    goal: "Valider, affiner et accompagner l’équipe de développement jusqu’en production.",
    methods: ["Tests utilisateurs", "Specs & handoff", "Recette UI", "Suivi des KPI"],
  },
] as const;

export const tools = ["Figma", "FigJam", "ProtoPie", "Maze", "Notion", "Adobe CC"] as const;
