"use client";

import Journey from "./Journey";
import type { SceneDef } from "./JourneyContext";
import IntroScene from "./scenes/IntroScene";
import ProfileScene from "./scenes/ProfileScene";
import ApproachScene from "./scenes/ApproachScene";
import SkillsScene from "./scenes/SkillsScene";
import ParcoursScene from "./scenes/ParcoursScene";
import ContactScene from "./scenes/ContactScene";

/**
 * Accueil = la tablette de Baptiste Rouzic, écran par écran.
 * `length` = durée de scroll de la scène, en hauteurs d'écran ; `mood` = lumière autour de la tablette ;
 * `thought` = pensée en sous-titre (elle remplace les indications d'usage) ; `critical` = l'interface s'efface.
 */
const scenes: SceneDef[] = [
  {
    id: "identification",
    label: "Identification",
    length: 1,
    objective: "Parcourir la tablette",
    thought: "Si je fais défiler, les écrans devraient s’enchaîner tout seuls…",
    mood: "stable",
    render: (p) => <IntroScene {...p} />,
  },
  {
    id: "profil",
    label: "Profil",
    length: 1.2,
    objective: "Faire connaissance",
    thought: "Ma fiche. Il manque encore la photo, mais l’essentiel est là.",
    mood: "analysis",
    render: (p) => <ProfileScene {...p} />,
  },
  {
    id: "methode",
    label: "Méthode",
    length: 2.2,
    objective: "Analyser ma méthode",
    thought: "Quatre étapes. Je continue à descendre pour les voir se tracer.",
    mood: "analysis",
    render: (p) => <ApproachScene {...p} />,
  },
  {
    id: "aptitudes",
    label: "Aptitudes",
    length: 1.2,
    objective: "Faire le point",
    thought: "Ce que je sais faire… honnêtement.",
    mood: "stable",
    render: (p) => <SkillsScene {...p} />,
  },
  {
    id: "parcours",
    label: "Parcours",
    length: 1.6,
    objective: "Relire mes choix",
    thought: "Chaque choix a ouvert une branche. Je me demande où mène la dernière.",
    mood: "warm",
    render: (p) => <ParcoursScene {...p} />,
  },
  {
    id: "contact",
    label: "Contact",
    length: 1,
    objective: "Faire un choix",
    thought: "Écrire, ou continuer à explorer ? C’est à toi de décider.",
    mood: "alert",
    critical: true,
    render: (p) => <ContactScene {...p} />,
  },
];

export default function HomeJourney() {
  return <Journey scenes={scenes} />;
}
