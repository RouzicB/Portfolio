import type { DemoType, Project } from "../types/project";

// ⚠ Données d'exemple — à remplacer par vos études de cas (chiffres compris)
export const projects: Project[] = [
  {
    slug: "refonte-app-bancaire",
    display: { light: "Néo", bold: "Bank" },
    title: "Refonte app bancaire",
    client: "Néobanque (exemple)",
    year: 2026,
    role: "Lead UX/UI Designer",
    duration: "4 mois",
    platform: "iOS · Android",
    summary: "Rendre la lecture des comptes immédiate pour 120 000 utilisateurs.",
    challenge:
      "L’ancienne interface empilait neuf actions de même niveau et un tableau d’opérations très dense. Retrouver un virement prenait en moyenne 40 secondes.",
    solution:
      "Une hiérarchie claire : le solde d’abord, trois actions principales, les dépenses visualisées et un historique lisible sur mobile.",
    tags: ["UX Research", "UI Design", "Design System"],
    tools: ["Figma", "Maze", "Notion"],
    process: [
      { title: "Audit", description: "Analytics, heatmaps et revue heuristique de l’existant." },
      { title: "Entretiens", description: "12 utilisateurs interrogés sur leurs usages réels." },
      { title: "Tri de cartes", description: "Réorganisation des actions selon les modèles mentaux." },
      { title: "Tests", description: "3 itérations de prototypes testées sur Maze." },
    ],
    insights: [
      "« Je veux juste savoir combien il me reste avant la fin du mois. »",
      "8 utilisateurs sur 12 n’utilisaient que 3 des 9 actions affichées.",
      "Le tableau était lu comme un relevé papier : personne ne le parcourait sur mobile.",
    ],
    outcomes: [
      { value: "−38 %", label: "Temps pour retrouver une opération" },
      { value: "+24 pts", label: "Score SUS" },
      { value: "4,7/5", label: "Note sur les stores" },
    ],
    demo: "before-after",
    featured: true,
  },
  {
    slug: "reservation-terrains",
    display: { light: "Padel", bold: "Go" },
    title: "Réservation de terrains",
    client: "Start-up sport (exemple)",
    year: 2025,
    role: "UX/UI Designer",
    duration: "3 mois",
    platform: "Mobile",
    summary: "Réserver un terrain en moins de 30 secondes, de la recherche à la confirmation.",
    challenge:
      "62 % des utilisateurs abandonnaient avant la confirmation : trop d’étapes, et des créneaux indisponibles affichés comme les autres.",
    solution:
      "Un parcours en quatre écrans, une recherche pré-remplie selon l’heure et la position, des créneaux indisponibles clairement écartés.",
    tags: ["UX Research", "Prototypage", "UI Design"],
    tools: ["Figma", "ProtoPie", "Maze"],
    process: [
      { title: "Analyse du tunnel", description: "Identification des écrans où les joueurs abandonnent." },
      { title: "Parcours cible", description: "User flow réduit de 7 à 4 écrans." },
      { title: "Prototype", description: "Prototype haute fidélité animé sur ProtoPie." },
      { title: "Tests", description: "Tests modérés avec 8 joueurs réguliers." },
    ],
    insights: [
      "Les joueurs réservent presque toujours le soir même, près de chez eux.",
      "Les créneaux grisés mais cliquables provoquaient le plus d’erreurs.",
      "Le récapitulatif avant paiement rassure plus que n’importe quel badge de sécurité.",
    ],
    outcomes: [
      { value: "−55 %", label: "Abandons du parcours" },
      { value: "28 s", label: "Durée médiane de réservation" },
      { value: "+31 %", label: "Réservations mensuelles" },
    ],
    demo: "prototype",
    featured: true,
  },
  {
    slug: "supervision-atelier",
    display: { light: "Atelier", bold: "360" },
    title: "Supervision d’atelier",
    client: "Industrie (exemple)",
    year: 2025,
    role: "UX/UI Designer",
    duration: "5 mois",
    platform: "Écran tactile 32″",
    summary: "Un tableau de bord lisible à 3 mètres pour piloter une ligne de production.",
    challenge:
      "Les chefs d’équipe jonglaient entre quatre applications et repéraient les arrêts de ligne avec plusieurs minutes de retard.",
    solution:
      "Un écran unique : indicateurs critiques en tête, courbe de production sur le poste, alertes triées par gravité et actionnables.",
    tags: ["UX Research", "UI Design", "Prototypage"],
    tools: ["Figma", "FigJam", "Notion"],
    process: [
      { title: "Observation", description: "Deux semaines d’immersion sur la ligne, en équipe de jour et de nuit." },
      { title: "Ateliers", description: "Co-conception avec chefs d’équipe et maintenance." },
      { title: "Wireframes", description: "Tests de lisibilité à distance sur écran réel." },
      { title: "Déploiement", description: "Pilote sur une ligne, puis extension à l’atelier." },
    ],
    insights: [
      "L’écran est consulté en moins de 5 secondes, souvent à plusieurs mètres.",
      "Les alertes arrivaient sans priorité : tout semblait urgent, donc rien ne l’était.",
      "Les gants rendent les petites cibles tactiles inutilisables.",
    ],
    outcomes: [
      { value: "−4 min", label: "Délai de détection d’un arrêt" },
      { value: "1", label: "Écran au lieu de 4 applications" },
      { value: "92 %", label: "Taux d’adoption à 3 mois" },
    ],
    demo: "hotspots",
    featured: true,
  },
];

export const demoLabels: Record<DemoType, string> = {
  "before-after": "Comparateur avant / après",
  prototype: "Prototype cliquable",
  hotspots: "Maquette annotée",
};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
