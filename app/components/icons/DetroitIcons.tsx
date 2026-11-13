import { type ReactNode, type SVGProps } from "react";

/**
 * Icônes de l'interface, toutes dessinées pour la direction artistique (aucune icône standard) :
 * - construction en hexagones, triangles et coins biseautés à 45°, comme la tablette ;
 * - traits vifs (pas d'arrondis), parfois interrompus comme une ligne de HUD ;
 * - une partie de la forme elle-même passe en cyan (`--icon-accent`, cyan par défaut), comme la diode des androïdes.
 * Grille 24 × 24, trait `currentColor`.
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number;
  strokeWidth?: number;
  /** Couleur de la partie « diode » ; `currentColor` pour une icône d'une seule couleur */
  accent?: string;
}

export type DetroitIcon = (props: IconProps) => ReactNode;

function make(name: string, draw: (accent: string) => ReactNode): DetroitIcon {
  function Icon({ size = 20, strokeWidth = 1.5, accent = "var(--icon-accent, var(--hud))", className = "", ...rest }: IconProps) {
    return (
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
        className={`shrink-0 ${className}`}
        {...rest}
      >
        {draw(accent)}
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

/* ─── Navigation ─────────────────────────────────────────────────── */

/** Accueil : toit en triangle, mur biseauté, porte en facette cyan */
export const HomeIcon = make("HomeIcon", (a) => (
  <>
    <path d="M2.5 11.5 12 4l9.5 7.5" />
    <path d="M5 10v8.5L6.5 20H19v-10" />
    <path d="M10 20v-4.5l2-2 2 2V20" stroke={a} />
  </>
));

/** Profil : tête hexagonale d'androïde, la tempe est la diode */
export const ProfileIcon = make("ProfileIcon", (a) => (
  <>
    <path d="M15.9 6.25 12 4 8.1 6.25v4.5L12 13l3.9-2.25" />
    <path d="M15.9 6.25v4.5" stroke={a} strokeWidth={2.4} />
    <path d="M4 21v-2.5l3-3h10l3 3V21" />
  </>
));

/** Projets : dossier ouvert en perspective, le rabat avant en cyan */
export const ProjectsIcon = make("ProjectsIcon", (a) => (
  <>
    <path d="M3 18V5h6.5l2 2.5H19V10" />
    <path d="M3 19 5.8 10.5h15.7L18.7 19z" stroke={a} />
  </>
));

/** Parcours : choix hexagonal, branche prise (cyan, pleine) et branche non prise (pointillés) */
export const ParcoursIcon = make("ParcoursIcon", (a) => (
  <>
    <path d="M12 2.2l2.25 1.3v2.6L12 7.4 9.75 6.1V3.5z" />
    <path d="M12 7.4V10M6.5 10h11" />
    <path d="M6.5 10v3.5" stroke={a} />
    <path d="M17.5 10v3.5" strokeDasharray="1.5 1.5" strokeLinecap="butt" />
    <path d="M4 13.5h4.2L9 14.3v3.2H4z" fill={a} stroke={a} />
    <path d="M15 13.5h5v4h-5z" strokeDasharray="1.5 1.5" strokeLinecap="butt" />
    <path d="M6.5 17.5v4" stroke={a} />
  </>
));

/** Contact : enveloppe biseautée, rabat en cyan */
export const ContactIcon = make("ContactIcon", (a) => (
  <>
    <path d="M3 6h14.5L21 9.5V18H3z" />
    <path d="M3 6l8.5 6.5L18 7.5" stroke={a} />
  </>
));

/* ─── Outils ─────────────────────────────────────────────────────── */

/** Recherche : loupe hexagonale, point de visée */
export const SearchIcon = make("SearchIcon", (a) => (
  <>
    <path d="M10.5 3.5l5.6 3.25v6.5L10.5 16.5l-5.6-3.25v-6.5z" />
    <path d="M15 15l5.5 5.5" />
    <rect x="9.7" y="9.2" width="1.6" height="1.6" fill={a} stroke="none" />
  </>
));

/** Reconstruction : retour arrière, un triangle en cyan, une barre */
export const RewindIcon = make("RewindIcon", (a) => (
  <>
    <path d="M4 5v14" />
    <path d="M12.5 6.5 6.5 12l6 5.5z" fill={a} stroke={a} />
    <path d="M20.5 6.5 14.5 12l6 5.5z" />
  </>
));

/** Jour : hexagone, cœur cyan, rayons en triangles */
export const SunIcon = make("SunIcon", (a) => (
  <>
    <path d="M12 8l3.46 2v4L12 16l-3.46-2v-4z" />
    <path d="M12 10.3l1.47.85v1.7L12 13.7l-1.47-.85v-1.7z" fill={a} stroke="none" />
    <path d="M12 1.8l1.3 2.4h-2.6zM12 22.2l1.3-2.4h-2.6zM1.8 12l2.4-1.3v2.6zM22.2 12l-2.4-1.3v2.6z" fill="currentColor" stroke="none" />
    <path d="M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M5.6 18.4l1.5-1.5M16.9 7.1l1.5-1.5" />
  </>
));

/** Nuit : croissant à facettes, étoile cyan */
export const MoonIcon = make("MoonIcon", (a) => (
  <>
    <path d="M13 3 5.5 6.8 3.5 12l2 5.2L13 21l5.5-1.2-5-3.3L11.2 12l2.3-4.5 5-3.3z" />
    <path d="M18.5 9.3l.9 1.8 1.8.9-1.8.9-.9 1.8-.9-1.8-1.8-.9 1.8-.9z" fill={a} stroke="none" />
  </>
));

/** Fermer : croix interrompue au centre, losange cyan */
export const CloseIcon = make("CloseIcon", (a) => (
  <>
    <path d="M5 5l4.8 4.8M14.2 14.2 19 19M19 5l-4.8 4.8M9.8 14.2 5 19" />
    <path d="M12 10.4l1.6 1.6-1.6 1.6-1.6-1.6z" fill={a} stroke="none" />
  </>
));

/* ─── Flèches et chevrons ────────────────────────────────────────── */

/** Chevron droit à pointe coupée, repère cyan */
export const ChevronRightIcon = make("ChevronRightIcon", (a) => (
  <>
    <path d="M8 5.5l5.5 5.5v2L8 18.5" />
    <path d="M17 10v4" stroke={a} />
  </>
));

/** Chevron gauche à pointe coupée, repère cyan */
export const ChevronLeftIcon = make("ChevronLeftIcon", (a) => (
  <>
    <path d="M16 5.5 10.5 11v2l5.5 5.5" />
    <path d="M7 10v4" stroke={a} />
  </>
));

/** Avancer : un chevron, puis une pointe pleine en cyan */
export const ChevronsRightIcon = make("ChevronsRightIcon", (a) => (
  <>
    <path d="M4.5 6l6 6-6 6" />
    <path d="M11.5 5.5h3.2L21 12l-6.3 6.5h-3.2L17.8 12z" fill={a} stroke="none" />
  </>
));

/** Flèche droite : tige interrompue (début en cyan), pointe biseautée */
export const ArrowRightIcon = make("ArrowRightIcon", (a) => (
  <>
    <path d="M3 12h3" stroke={a} />
    <path d="M9 12h10" />
    <path d="M14 6.5l5.5 5.5-5.5 5.5" />
  </>
));

/** Flèche gauche : tige interrompue (début en cyan), pointe biseautée */
export const ArrowLeftIcon = make("ArrowLeftIcon", (a) => (
  <>
    <path d="M21 12h-3" stroke={a} />
    <path d="M15 12H5" />
    <path d="M10 6.5 4.5 12l5.5 5.5" />
  </>
));

/** Lien externe : flèche en diagonale, tige interrompue, angle d'arrivée */
export const ArrowUpRightIcon = make("ArrowUpRightIcon", (a) => (
  <>
    <path d="M5.5 18.5l2.5-2.5" stroke={a} />
    <path d="M10 14l7.5-7.5" />
    <path d="M9 6h9v9" />
  </>
));

/** Entrée (clavier) : retour à angle droit, pointe en cyan */
export const EnterIcon = make("EnterIcon", (a) => (
  <>
    <path d="M19.5 4v8.5l-2 2H6.5" />
    <path d="M10 10.5 5.5 14.5l4.5 4" stroke={a} />
  </>
));

/** Retour arrière (clavier) : étiquette pointée vers la gauche, croix cyan */
export const BackspaceIcon = make("BackspaceIcon", (a) => (
  <>
    <path d="M8.5 5H21v14H8.5L3 12z" />
    <path d="M12 9.5l5 5M17 9.5l-5 5" stroke={a} />
  </>
));

/* ─── Lecture ────────────────────────────────────────────────────── */

/** Lecture : triangle plein à pointe coupée */
export const PlayIcon = make("PlayIcon", () => <path d="M7 4.5v15l10-6.2v-2.6z" fill="currentColor" stroke="none" />);

/** Pause : deux barres biseautées en vis-à-vis */
export const PauseIcon = make("PauseIcon", () => (
  <path d="M6.5 5h4v14.5h-2L6.5 17.5zM13.5 5h2l2 2v12.5h-4z" fill="currentColor" stroke="none" />
));

/* ─── Contenus ───────────────────────────────────────────────────── */

/** Validé : coche vive dans des équerres cyan */
export const CheckIcon = make("CheckIcon", (a) => (
  <>
    <path d="M5 12.5l4.5 4.5L19 7" />
    <path d="M2.5 7V3.5H6M21.5 17v3.5H18" stroke={a} />
  </>
));

/** Voir : œil hexagonal, iris en losange cyan */
export const EyeIcon = make("EyeIcon", (a) => (
  <>
    <path d="M2.5 12 7 6.5h10l4.5 5.5L17 17.5H7z" />
    <path d="M12 8.8l3.2 3.2-3.2 3.2L8.8 12z" stroke={a} />
    <path d="M11.2 11.2h1.6v1.6h-1.6z" fill="currentColor" stroke="none" />
  </>
));

/** Lien : deux maillons hexagonaux, jonction cyan */
export const LinkIcon = make("LinkIcon", (a) => (
  <>
    <path d="M10 7.5H6L3.5 12 6 16.5h4" />
    <path d="M14 7.5h4l2.5 4.5-2.5 4.5h-4" />
    <path d="M8.5 12h7" stroke={a} />
  </>
));

/** Lieu : repère hexagonal à pointe, cœur cyan */
export const MapPinIcon = make("MapPinIcon", (a) => (
  <>
    <path d="M12 21.5 6 13V6.2L12 2.8l6 3.4V13z" />
    <path d="M12 7.3l2 1.15v2.3L12 11.9l-2-1.15v-2.3z" fill={a} stroke="none" />
  </>
));

/** Départ : mât et fanion en triangle cyan */
export const FlagIcon = make("FlagIcon", (a) => (
  <>
    <path d="M5 21V3" />
    <path d="M5 4h13l-4 4.5 4 4.5H5" stroke={a} />
  </>
));

/** Choix : embranchement, branche prise en cyan */
export const ChoiceIcon = make("ChoiceIcon", (a) => (
  <>
    <path d="M12 21v-7l-5.5-5.5V4" />
    <path d="M12 14l5.5-5.5V4" stroke={a} />
    <path d="M5 4h3l-1.5-2.5zM16 4h3l-1.5-2.5z" />
  </>
));

/** En cours : hexagone, cœur cyan plein */
export const CurrentIcon = make("CurrentIcon", (a) => (
  <>
    <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z" />
    <path d="M12 8.5l3 1.75v3.5L12 15.5l-3-1.75v-3.5z" fill={a} stroke="none" />
  </>
));

/** Étape : losange, losange intérieur cyan */
export const DiamondIcon = make("DiamondIcon", (a) => (
  <>
    <path d="M12 3l9 9-9 9-9-9z" />
    <path d="M12 8.5l3.5 3.5-3.5 3.5L8.5 12z" fill={a} stroke="none" />
  </>
));

/** Études : coiffe en losange, gland cyan */
export const StudyIcon = make("StudyIcon", (a) => (
  <>
    <path d="M2.5 9.5 12 5l9.5 4.5L12 14z" />
    <path d="M6.5 11.5V16l5.5 2.5 5.5-2.5v-4.5" />
    <path d="M21.5 9.5V15" stroke={a} />
    <path d="M20.3 15h2.4l-1.2 2.5z" fill={a} stroke="none" />
  </>
));

/** Expérience : mallette biseautée, fermoir cyan */
export const WorkIcon = make("WorkIcon", (a) => (
  <>
    <path d="M3 8h16l2 2v10H3z" />
    <path d="M9 8V5h6v3" />
    <path d="M3 13.5h7M14 13.5h7" />
    <path d="M10.5 12h3v3h-3z" stroke={a} />
  </>
));

/** Pointeur (souris) : curseur anguleux, pointe cyan */
export const PointerIcon = make("PointerIcon", (a) => (
  <>
    <path d="M5 3.5 18.5 11l-6 1.8-3.2 6.2z" />
    <path d="M7.2 6.8l4.3 2.4-3 1.3z" fill={a} stroke="none" />
  </>
));

/* ─── État de l'appareil ─────────────────────────────────────────── */

/** Arrêt : hexagone ouvert en haut, barre cyan */
export const PowerIcon = make("PowerIcon", (a) => (
  <>
    <path d="M8 6.6 4.6 8.6v8.8L12 21.6l7.4-4.2V8.6L16 6.6" />
    <path d="M12 2.5v8" stroke={a} />
  </>
));

/** Réseau : chevrons superposés, triangle cyan */
export const WifiIcon = make("WifiIcon", (a) => (
  <>
    <path d="M2.5 10 12 4l9.5 6" />
    <path d="M6 13.5 12 9.8l6 3.7" />
    <path d="M9.2 16.6 12 15l2.8 1.6" />
    <path d="M12 17.5l2 3h-4z" fill={a} stroke="none" />
  </>
));

/** Bluetooth : rune anguleuse, moitié haute en cyan */
export const BluetoothIcon = make("BluetoothIcon", (a) => (
  <>
    <path d="M6.5 7.5 12 12v9l5.5-4.5L12 12" />
    <path d="M12 12V3l5.5 4.5L6.5 16.5" stroke={a} />
  </>
));

/** Messages : bulle biseautée, première ligne en cyan */
export const MessageIcon = make("MessageIcon", (a) => (
  <>
    <path d="M3 4.5h14l4 4V16h-9l-5 4v-4H3z" />
    <path d="M6.5 8.5h7" stroke={a} />
    <path d="M6.5 12h10" />
  </>
));

/** Session : tête hexagonale, la tempe est la diode */
export const UserIcon = make("UserIcon", (a) => (
  <>
    <path d="M15.5 5.9 12 3.9 8.5 5.9v4L12 12l3.5-2.1" />
    <path d="M15.5 5.9v4" stroke={a} strokeWidth={2.4} />
    <path d="M4.5 21v-2l3-3h9l3 3v2" />
  </>
));

/* ─── Verrouillage ───────────────────────────────────────────────── */

/** Verrouillé : corps biseauté, anse anguleuse, serrure en triangle cyan */
export const LockIcon = make("LockIcon", (a) => (
  <>
    <path d="M4.5 10.5H17l2.5 2.5V21h-15z" />
    <path d="M8 10.5V6l2-2h4l2 2v4.5" />
    <path d="M12 13.5l1.6 2.8h-3.2z" fill={a} stroke="none" />
    <path d="M12 16.3v2" stroke={a} />
  </>
));

/** Déverrouillé : anse relevée */
export const LockOpenIcon = make("LockOpenIcon", (a) => (
  <>
    <path d="M4.5 10.5H17l2.5 2.5V21h-15z" />
    <path d="M8 10.5V6l2-2h4l2 2v1.5" />
    <path d="M12 13.5l1.6 2.8h-3.2z" fill={a} stroke="none" />
    <path d="M12 16.3v2" stroke={a} />
  </>
));

/** Toutes les icônes, pour la planche de présentation (page Crédits) */
export const detroitIcons = {
  Accueil: HomeIcon,
  Profil: ProfileIcon,
  Projets: ProjectsIcon,
  Parcours: ParcoursIcon,
  Contact: ContactIcon,
  Recherche: SearchIcon,
  Reconstruction: RewindIcon,
  Jour: SunIcon,
  Nuit: MoonIcon,
  Fermer: CloseIcon,
  Précédent: ChevronLeftIcon,
  Suivant: ChevronRightIcon,
  Avancer: ChevronsRightIcon,
  Retour: ArrowLeftIcon,
  Aller: ArrowRightIcon,
  Externe: ArrowUpRightIcon,
  Entrée: EnterIcon,
  Effacer: BackspaceIcon,
  Lecture: PlayIcon,
  Pause: PauseIcon,
  Validé: CheckIcon,
  Voir: EyeIcon,
  Lien: LinkIcon,
  Lieu: MapPinIcon,
  Départ: FlagIcon,
  Choix: ChoiceIcon,
  "En cours": CurrentIcon,
  Étape: DiamondIcon,
  Études: StudyIcon,
  Expérience: WorkIcon,
  Pointeur: PointerIcon,
  Arrêt: PowerIcon,
  Réseau: WifiIcon,
  Bluetooth: BluetoothIcon,
  Messages: MessageIcon,
  Session: UserIcon,
  Verrouillé: LockIcon,
  Déverrouillé: LockOpenIcon,
} as const;
