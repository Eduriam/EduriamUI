/** Shared frame conversion for playback and trusted authoring analysis. */
export const millisecondsToFrames = (
  milliseconds: number,
  fps: number,
): number => Math.round((milliseconds * fps) / 1000);
export const frameTimeMs = (milliseconds: number, fps = 30): number =>
  (millisecondsToFrames(milliseconds, fps) * 1000) / fps;
