"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {/* "user" : coupe les animations de mouvement si l'OS demande moins d'animations */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
