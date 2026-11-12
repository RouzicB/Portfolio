// ⚠ Arborescence d'exemple : remplacez titres, périodes et textes par votre vrai parcours.
//
// Fonctionnement (inspiré de l'organigramme des choix de Detroit: Become Human) :
// - chaque nœud est placé sur une grille (col = colonne, row = rangée, demi-colonnes acceptées) ;
// - « choice » = décision qui ouvre plusieurs branches ;
// - « locked » = chemin non emprunté (affiché grisé, verrouillé) ;
// - « future » = nœud inconnu, le prochain chapitre ;
// - les liens vers un nœud verrouillé ou inconnu sont tracés en pointillés.

export type FlowKind = "start" | "step" | "choice" | "current" | "project" | "locked" | "future";

export interface FlowNode {
  id: string;
  kind: FlowKind;
  title: string;
  period?: string;
  text: string;
  col: number;
  row: number;
  /** Icône des étapes : formation ou expérience */
  domain?: "formation" | "work";
  tags?: string[];
  /** Pour les nœuds « project » : slug de l'étude de cas */
  projectSlug?: string;
}

export interface FlowEdge {
  from: string;
  to: string;
}

export interface FlowChapter {
  id: string;
  title: string;
  /** Rangées couvertes [première, dernière] */
  rows: readonly [number, number];
}

export const careerChapters: FlowChapter[] = [
  { id: "origines", title: "Origines", rows: [0, 2] },
  { id: "formation", title: "Formation", rows: [3, 4] },
  { id: "experiences", title: "Expériences", rows: [5, 6] },
  { id: "projets", title: "Projets", rows: [7, 7] },
  { id: "suite", title: "Prochain chapitre", rows: [8, 8] },
];

export const careerNodes: FlowNode[] = [
  {
    id: "depart",
    kind: "start",
    title: "Point de départ",
    period: "20XX",
    text: "Les premiers déclics : le dessin, le web, l’envie de comprendre pourquoi certaines interfaces sont si simples à utiliser.",
    col: 1.5,
    row: 0,
  },
  {
    id: "orientation",
    kind: "choice",
    title: "Design ou code ?",
    text: "Premier choix décisif : se spécialiser dans le développement pur, ou dans la conception d’interfaces.",
    col: 1.5,
    row: 1,
  },
  {
    id: "etudes-design",
    kind: "step",
    domain: "formation",
    title: "Études en design numérique",
    period: "20XX – 20XX",
    text: "À compléter : établissement, diplôme, ce que vous y avez appris (typographie, ergonomie, prototypage…).",
    col: 0.5,
    row: 2,
    tags: ["Design graphique", "Ergonomie", "Web"],
  },
  {
    id: "filiere-dev",
    kind: "locked",
    title: "Filière 100 % développement",
    text: "Chemin non emprunté… même si le goût du code est resté et sert aujourd’hui à parler le même langage que les développeurs.",
    col: 2.5,
    row: 2,
  },
  {
    id: "specialisation",
    kind: "step",
    domain: "formation",
    title: "Spécialisation UX/UI",
    period: "20XX",
    text: "À compléter : spécialisation, certification ou master orienté expérience utilisateur.",
    col: 0.5,
    row: 3,
    tags: ["UX research", "UI design", "Figma"],
  },
  {
    id: "premier-pas",
    kind: "choice",
    title: "Premier pas pro",
    text: "Deuxième choix : rejoindre une équipe produit pour apprendre au contact du terrain, ou se lancer seul tout de suite.",
    col: 0.5,
    row: 4,
  },
  {
    id: "stage",
    kind: "step",
    domain: "work",
    title: "Stage / alternance UX/UI",
    period: "20XX",
    text: "À compléter : entreprise, équipe, missions et ce que vous avez livré.",
    col: 0,
    row: 5,
    tags: ["Tests utilisateurs", "Wireframes"],
  },
  {
    id: "freelance",
    kind: "locked",
    title: "Freelance immédiat",
    text: "Chemin non emprunté : l’expérience en équipe a été privilégiée.",
    col: 1.5,
    row: 5,
  },
  {
    id: "poste",
    kind: "current",
    domain: "work",
    title: "UX/UI Designer",
    period: "20XX – aujourd’hui",
    text: "À compléter : poste actuel, contexte, utilisateurs, responsabilités. Chaque projet mené ouvre une nouvelle branche ci-dessous.",
    col: 0,
    row: 6,
    tags: ["Design produit", "Design system", "Prototypage"],
  },
  {
    id: "projet-banque",
    kind: "project",
    title: "Refonte app bancaire",
    text: "Rendre la lecture des comptes immédiate pour 120 000 utilisateurs.",
    col: 0,
    row: 7,
    projectSlug: "refonte-app-bancaire",
  },
  {
    id: "projet-padel",
    kind: "project",
    title: "Réservation de terrains",
    text: "Réserver un terrain en moins de 30 secondes.",
    col: 1.3,
    row: 7,
    projectSlug: "reservation-terrains",
  },
  {
    id: "projet-atelier",
    kind: "project",
    title: "Supervision d’atelier",
    text: "Un tableau de bord lisible à 3 mètres.",
    col: 2.6,
    row: 7,
    projectSlug: "supervision-atelier",
  },
  {
    id: "inconnu",
    kind: "future",
    title: "?",
    text: "Ce chapitre n’est pas encore écrit. Votre projet pourrait être la prochaine branche.",
    col: 1.3,
    row: 8,
  },
];

export const careerEdges: FlowEdge[] = [
  { from: "depart", to: "orientation" },
  { from: "orientation", to: "etudes-design" },
  { from: "orientation", to: "filiere-dev" },
  { from: "etudes-design", to: "specialisation" },
  { from: "specialisation", to: "premier-pas" },
  { from: "premier-pas", to: "stage" },
  { from: "premier-pas", to: "freelance" },
  { from: "stage", to: "poste" },
  { from: "poste", to: "projet-banque" },
  { from: "poste", to: "projet-padel" },
  { from: "poste", to: "projet-atelier" },
  { from: "projet-padel", to: "inconnu" },
];
