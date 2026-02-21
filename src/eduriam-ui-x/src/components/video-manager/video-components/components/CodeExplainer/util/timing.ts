import type { CodeExplainerStep, StepState } from "../types";

export const getStepDurations = (
  steps: CodeExplainerStep[],
  fps: number,
  defaultStepDurationMs: number,
): number[] => {
  return steps.map((step) =>
    Math.max(
      1,
      Math.round(((step.durationMs ?? defaultStepDurationMs) / 1000) * fps),
    ),
  );
};

export const getStepState = (
  frame: number,
  durationsInFrames: number[],
): StepState => {
  const totalDurationInFrames = durationsInFrames.reduce(
    (sum, value) => sum + value,
    0,
  );
  const safeTotalDuration = Math.max(1, totalDurationInFrames);
  const clampedFrame = Math.max(0, Math.min(frame, safeTotalDuration - 1));

  let accumulated = 0;
  for (let index = 0; index < durationsInFrames.length; index += 1) {
    const duration = durationsInFrames[index];
    const end = accumulated + duration;
    if (clampedFrame < end || index === durationsInFrames.length - 1) {
      const frameInStep = clampedFrame - accumulated;
      const stepProgress = duration <= 0 ? 1 : frameInStep / duration;
      return {
        index,
        startFrame: accumulated,
        duration,
        frameInStep,
        stepProgress: Math.max(0, Math.min(stepProgress, 1)),
        totalDurationInFrames: safeTotalDuration,
      };
    }
    accumulated = end;
  }

  return {
    index: 0,
    startFrame: 0,
    duration: safeTotalDuration,
    frameInStep: 0,
    stepProgress: 0,
    totalDurationInFrames: safeTotalDuration,
  };
};

