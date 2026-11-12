import type { Metadata } from "next";
import "@fontsource-variable/montserrat";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/layouts/Header";
import PageBar from "./components/layouts/PageBar";
import TriangleGrid from "./components/background/TriangleGrid";
import SceneBackdrop from "./components/background/SceneBackdrop";
import InteractionLayer from "./components/hud/InteractionLayer";
import ReconstructionOverlay from "./components/hud/ReconstructionOverlay";
import ConsequenceToast from "./components/tablet/ConsequenceToast";
import { site } from "./data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.author} — ${site.role}`,
    template: `%s · ${site.author}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased min-h-screen">
        <TriangleGrid seed={1} className="fixed inset-0 -z-10" />
        {/* Lumière autour de la tablette : elle suit l'ambiance de la page */}
        <SceneBackdrop />
        <Providers>
          <Header />
          <main>{children}</main>
          <PageBar />
          <InteractionLayer />
          <ConsequenceToast />
          <ReconstructionOverlay />
        </Providers>
      </body>
    </html>
  );
}
