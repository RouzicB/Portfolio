# Portfolio — Baptiste Rouzic

Portfolio UX/UI de Baptiste Rouzic, présenté sur une tablette inspirée de Detroit: Become Human : présentation au scroll en écran
partagé, arborescence du parcours, études de cas interactives.

## Stack

- **Next.js 16** (App Router, Turbopack, sortie `standalone`)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, tokens dans `app/globals.css`)
- **next-themes** (mode clair / sombre), **framer-motion** (animations), **lucide-react** (icônes)
- **Jest 30** + **Testing Library** (tests), **ESLint 9** (`eslint-config-next`)
- **Docker** multi-stage (`Dockerfile`)

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm test
npm run lint
```

## Structure

```
app/
├── layout.tsx              # Layout racine (fond triangulaire, cadre, Header, barre basse)
├── template.tsx            # Transition entre pages (rideau triangulaire) + TabletFrame (toutes les pages vivent dans la tablette)
├── page.tsx                # Accueil = la tablette, écran partagé par écran partagé
├── globals.css             # Couleurs (--hud, --navy…), hud-label / hud-title, facettes, animations
├── parcours/               # Arborescence du parcours et des projets (organigramme des choix)
├── projets/                # Archives filtrables + étude de cas /projets/[slug] (SSG)
├── a-propos/               # Profil complet
├── contact/
├── credits/                # Crédits de la direction artistique
├── components/
│   ├── tablet/             # L’interface « dans la tablette » :
│   │                       #   Tablet (tranche, bord, écran, barre d’état), TabletSpread (écran partagé), TabletFrame,
│   │                       #   SplitHandle, MarginData, ScreenBackdrop, Objective, InnerVoice (sous-titres),
│   │                       #   PageTag (Page n/N), KeyHints, ConsequenceToast, ClientPortal
│   ├── hud/                # Système d'interface : Diode, Corners/Brackets, Barcode (frise), InteractionLayer,
│   │                       #   ReconstructionOverlay, BottomBar, PlayThumb, TriangleFrame, Callout,
│   │                       #   DisplayTitle, SectionTab, IconLink, HeroVisual
│   ├── background/         # TriangleGrid (facettes isométriques), SceneBackdrop (lumière d’ambiance)
│   ├── journey/            # Moteur du voyage au scroll
│   │   ├── Journey.tsx     #   scène fixe + transition triangle + progression par scène
│   │   ├── JourneyHud.tsx  #   frise code-barres, lecture, page n/N, flèches ↑/↓
│   │   ├── HomeJourney.tsx #   liste ordonnée des scènes de l'accueil
│   │   └── scenes/         #   Identification, Profil, Méthode, Aptitudes, Parcours, Contact
│   ├── flowchart/          # Arborescence : Flowchart, FlowNodeCard, NodePanel, FlowchartPreview
│   ├── demos/              # Démos interactives : BeforeAfter, PrototypePhone, Hotspots
│   ├── projects/           # ProjectCard, ProjectArchive (filtres)
│   ├── layouts/            # Header, SearchOverlay, PageBar, PageHero
│   ├── themes/             # ThemeSwitcher (Jour / Nuit)
│   └── ui/                 # Button, Card (cadre HUD), Badge, Container, Reveal, ScaledFrame
├── data/                   # Contenu : site.ts (profil, aptitudes, crédits), tablet.ts (onglets, objectifs, pensées,
│                           #   ambiances), career.ts (arborescence),
│                           #   projects.ts, process.ts
├── lib/                    # Utilitaires : format, diode, rewind, mood, pages, search, flowchart
└── types/                  # Types TS partagés
__tests__/                  # Tests Jest (ui/, data/, demos/, journey/, flowchart/, lib/)
public/                     # Images, favicon, CV…
```

## Personnaliser

1. `app/data/site.ts` : nom, rôle, accroche, e-mail, réseaux.
2. `app/data/projects.ts` : vos études de cas (⚠ les données actuelles sont des exemples).
   Le champ `demo` choisit la démo interactive : `before-after`, `prototype` ou `hotspots`.
3. `app/data/process.ts` : vos phases de travail et vos outils.
4. `app/data/career.ts` : votre parcours (nœuds, liens, chapitres) pour l’arborescence.
5. `app/components/journey/HomeJourney.tsx` : scènes de l’accueil (durée, objectif, pensée, ambiance, moment critique).
   `app/data/tablet.ts` : onglets, objectif, pensée et ambiance de chaque page.
6. `app/globals.css` : couleurs (`--hud`, `--navy`, `--cobalt`, `--bg`…) et polices.
7. Visuels du grand cadre triangulaire : déposez vos images dans `public/images/` et renseignez
   `heroImages` dans `app/data/site.ts`.

### Une interface diégétique : tout est dans la tablette

- **La tablette** remplace le carnet : tranche métallique, bord noir, deux coins biseautés, barre d’état prune
  (capteur, application ouverte, réseau, messages, session « Baptiste R. », bouton d’arrêt = retour à l’accueil).
- **Accueil** : chaque scène est un écran partagé (texte à gauche, visuel à droite, séparateur avec poignée).
  **Projets** : un long écran partagé (archives à gauche, plan annoté à droite), dossiers verrouillés à la suite.
  **Autres pages** : la tablette s’allonge avec le contenu, journal système dans la marge.
- **Onglets d’application** au-dessus de la tablette ; l’onglet ouvert prend la couleur de la barre d’état.
- **Indicateurs d’interaction** : au survol (ou au clavier), équerres cyan, cercle (souris ou Entrée) et verbe d’action.
  Les objets voisins (`data-interact="Nom"`) affichent leur nom quand le pointeur s’approche.
  Attributs : `data-prompt="ring|box|underline|none"`, `data-prompt-label="Verbe"`.
- **Objectif** en haut à droite, **pensées en sous-titres** (une fois par visite), **« Page n/N »** et commandes
  **↵ Sélectionner · ⌫ Retour · Q Quitter**.
- **Lumière d’ambiance** autour de la tablette, aux couleurs de la diode : bleu stable, analyse, chaleur,
  alerte jaune, critique rouge (page 404).
- **Choix et conséquences** : notification « Choix enregistré » après un choix important (`data-consequence`) ;
  sur la dernière scène de l’accueil, l’interface s’efface pour laisser le choix seul.
- **Reconstruction** (remonter le temps) : retour du navigateur, ⌫, bouton ◄◄ ou remontée dans l’accueil — l’écran passe
  au bleu, une ligne de balayage le remonte, une barre de lecture recule et la tablette « glitche ».
- **Mouvement réduit** : transitions et reconstruction en simple fondu.

### Système d'interface

- **Diode** (en haut à droite) : bleu `#00D1FF` = normal, jaune `#FFF500` = chargement (transitions),
  rouge `#FF0000` = erreur (page 404).
- **Frise code-barres** (en bas) : progression du scroll, code temporel au-dessus du repère.
- **Police** : Gotham Pro si elle est installée sur la machine (licence payante), sinon Montserrat.

## Crédits

Direction artistique inspirée de **Detroit: Become Human** (Quantic Dream, publié par Sony Interactive
Entertainment, 2018) et du concept web **« DETROIT Become Human — Web Concept »** d’Elias Holtsmann
([Behance](https://www.behance.net/gallery/104223147/DETROIT-Become-Human-Web-Concept)).
L’arborescence `/parcours` s’inspire de l’organigramme des choix (flowchart) du jeu, et la tablette des appareils du jeu.

Projet personnel, sans lien avec Quantic Dream ni Sony Interactive Entertainment. Aucun logo, personnage
ni visuel du jeu n’est reproduit ; les marques citées appartiennent à leurs propriétaires respectifs.
Les crédits sont affichés sous la frise de chaque page et sur `/credits`.

## Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```
