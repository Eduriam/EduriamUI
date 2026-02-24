import type { CodeExplainerStep, StepState } from "../types";

export const getStepStartFrames = (
  steps: CodeExplainerStep[],
  fps: number,
): number[] => {
  return steps.map((step) =>
    Math.max(0, Math.round((step.startTime / 1000) * fps)),
  );
};

export const getStepState = (
  frame: number,
  stepStartFrames: number[],
): StepState => {
  const safeStarts = stepStartFrames.length > 0 ? stepStartFrames : [0];
  const clampedFrame = Math.max(0, frame);

  let currentIndex = 0;
  for (let index = 1; index < safeStarts.length; index += 1) {
    if (safeStarts[index] <= clampedFrame) {
      currentIndex = index;
      continue;
    }
    break;
  }

  const startFrame = safeStarts[currentIndex] ?? 0;
  const nextStartFrame = safeStarts[currentIndex + 1];
  const endFrame =
    nextStartFrame !== undefined
      ? nextStartFrame
      : Math.max(startFrame + 1, clampedFrame + 1);
  const duration = Math.max(1, endFrame - startFrame);

  const totalDurationInFrames = Math.max(
    clampedFrame + 1,
    (safeStarts[safeStarts.length - 1] ?? 0) + 1,
  );

  return {
    index: currentIndex,
    startFrame,
    duration,
    frameInStep: Math.max(0, clampedFrame - startFrame),
    totalDurationInFrames,
  };
};

export const sortStepsByStartTime = (
  steps: CodeExplainerStep[],
): CodeExplainerStep[] => {
  return steps
    .map((step, index) => ({ step, index }))
    .sort((a, b) => {
      if (a.step.startTime !== b.step.startTime) {
        return a.step.startTime - b.step.startTime;
      }
      return a.index - b.index;
    })
    .map(({ step }) => step);
};

export const validateStepStartTimes = (steps: CodeExplainerStep[]): void => {
  for (let index = 0; index < steps.length; index += 1) {
    const startTime = steps[index]?.startTime;
    if (!Number.isFinite(startTime) || startTime < 0) {
      throw new Error(
        `CODE_EXPLAINER step at index ${index} must have a non-negative numeric startTime.`,
      );
    }
  }
};

export const getLastStepHoldMs = (steps: CodeExplainerStep[]): number => {
  if (steps.length < 2) {
    return 2500;
  }

  const last = steps[steps.length - 1]?.startTime ?? 0;
  const previous = steps[steps.length - 2]?.startTime ?? 0;
  return Math.max(1200, last - previous);
};

export const getTotalDurationFramesFromStepStarts = ({
  steps,
  fps,
  transitionDurationMs,
}: {
  steps: CodeExplainerStep[];
  fps: number;
  transitionDurationMs?: number;
}): number => {
  if (steps.length === 0) return 1;

  const sorted = sortStepsByStartTime(steps);
  const lastStartMs = sorted[sorted.length - 1]?.startTime ?? 0;
  const holdMs = getLastStepHoldMs(sorted);
  const transitionMs = transitionDurationMs ?? 0;
  const totalMs = Math.max(1, lastStartMs + holdMs + transitionMs);

  return Math.max(1, Math.round((totalMs / 1000) * fps));
};

