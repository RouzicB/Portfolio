"use client";

import { useEffect } from "react";
import { setDiode } from "../../lib/diode";
import { clearMoodOverride, setMoodOverride } from "../../lib/mood";

/** Passe la diode et la lumière autour de la tablette au rouge (IDRED) tant que le composant est affiché */
export default function DiodeError() {
  useEffect(() => {
    const path = window.location.pathname;
    setDiode("error");
    setMoodOverride("critical", path);
    return () => {
      setDiode("ok");
      clearMoodOverride(path);
    };
  }, []);
  return null;
}
