// ⚠ Les textes marqués « à compléter » sont des exemples : remplacez-les par vos informations.

export const site = {
  name: "Baptiste Rouzic",
  author: "Baptiste Rouzic",
  /** Identifiant affiché dans l'interface HUD */
  codename: "BR-26",
  /** Logo sur deux lignes, en haut à gauche */
  logo: { top: "Baptiste Rouzic", bottom: "UX · UI Designer" },
  /** Marque en bas à gauche : partie fine + partie grasse + suffixe */
  brand: { light: "Baptiste", bold: "Rouzic", suffix: "2026" },
  role: "UX/UI Designer",
  tagline: "Je conçois des interfaces claires, utiles et désirables, de la recherche utilisateur au prototype.",
  // à compléter
  bio: "Designer d’expérience, je relie les besoins des utilisateurs aux contraintes du produit : entretiens, parcours, prototypes, design system et tests, jusqu’à la mise en production.",
  description: "Baptiste Rouzic — UX/UI Designer. Profil, parcours, études de cas et contact.",
  status: "Disponible pour de nouveaux projets",
  // à compléter
  email: "contact@example.com",
  /** Visuels du grand cadre triangulaire (chemins dans /public), ex. "/images/portrait.jpg" */
  heroImages: [null, null] as readonly (string | null)[],
  socials: {
    linkedin: "https://www.linkedin.com/",
    dribbble: "https://dribbble.com/",
    behance: "https://www.behance.net/",
  },
} as const;

/** Navigation centrale ; `code` = micro-numéro affiché au-dessus du lien actif */
export const navigation = [
  { href: "/parcours", label: "Parcours", code: "01.204" },
  { href: "/projets", label: "Projets", code: "02.117" },
  { href: "/contact", label: "Contact", code: "03.031" },
] as const;

/** Fiche « spécifications » (scène Profil et page Profil) — à compléter */
export const specs = [
  { label: "Localisation", value: "France" },
  { label: "Langues", value: "Français · Anglais" },
  { label: "Spécialité", value: "UX research & UI design" },
  { label: "Statut", value: "Disponible" },
] as const;

/** Aptitudes, niveau de 0 à 100 — à compléter */
export const skills = [
  {
    group: "Recherche",
    items: [
      { name: "Entretiens utilisateurs", level: 85 },
      { name: "Tests d’utilisabilité", level: 80 },
      { name: "Analyse de données", level: 65 },
    ],
  },
  {
    group: "Conception",
    items: [
      { name: "Wireframing", level: 90 },
      { name: "UI design", level: 88 },
      { name: "Design system", level: 80 },
    ],
  },
  {
    group: "Prototypage",
    items: [
      { name: "Figma", level: 92 },
      { name: "ProtoPie", level: 70 },
      { name: "HTML · CSS · React", level: 75 },
    ],
  },
] as const;

/** Crédits de la direction artistique (affichés dans la barre basse et sur /credits) */
export const credits = {
  short: "Direction artistique inspirée de Detroit: Become Human (Quantic Dream)",
  game: {
    title: "Detroit: Become Human",
    studio: "Quantic Dream",
    publisher: "Sony Interactive Entertainment",
    year: 2018,
  },
  concept: {
    title: "DETROIT Become Human — Web Concept",
    author: "Elias Holtsmann",
    url: "https://www.behance.net/gallery/104223147/DETROIT-Become-Human-Web-Concept",
  },
} as const;
