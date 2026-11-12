/** 3 → "03" */
export const pad = (n: number, length = 2) => String(n).padStart(length, "0");

/** Progression (0 → 1) affichée comme un code temporel « 01.34 » sur une frise de 5 minutes */
export const timecode = (progress: number, totalSeconds = 300) => {
  const seconds = Math.round(Math.min(1, Math.max(0, progress)) * totalSeconds);
  return `${pad(Math.floor(seconds / 60))}.${pad(seconds % 60)}`;
};
