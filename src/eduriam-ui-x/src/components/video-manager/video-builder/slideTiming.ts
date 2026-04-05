import type { Slide } from "../video-slides/Slide";

type SlideWithTiming = {
  slide: Slide;
  from: number;
  durationInFrames: number;
};

const normalizeStartTimeMs = (startTime: unknown): number => {
  if (!Number.isFinite(startTime)) {
    return 0;
  }

  return Math.max(0, Number(startTime));
};

const toFrame = (ms: number, fps: number): number =>
  Math.max(0, Math.round((ms / 1000) * fps));

export const buildSlideTimings = (
  slides: Slide[],
  fps: number,
  sceneDurationFrames: number,
): SlideWithTiming[] => {
  const normalizedSlides = slides
    .map((slide, index) => ({
      slide,
      originalIndex: index,
      normalizedStartMs: normalizeStartTimeMs(
        (slide as Slide & { startTime?: unknown }).startTime,
      ),
    }))
    .sort((a, b) => {
      if (a.normalizedStartMs !== b.normalizedStartMs) {
        return a.normalizedStartMs - b.normalizedStartMs;
      }

      return a.originalIndex - b.originalIndex;
    })
    .map((entry) => ({
      ...entry,
      startFrame: toFrame(entry.normalizedStartMs, fps),
    }));

  return normalizedSlides.map((entry, index) => {
    const nextStartFrame =
      normalizedSlides[index + 1]?.startFrame ?? sceneDurationFrames;
    const durationInFrames = Math.max(1, nextStartFrame - entry.startFrame);

    return {
      slide: entry.slide,
      from: entry.startFrame,
      durationInFrames,
    };
  });
};

export type { SlideWithTiming };
