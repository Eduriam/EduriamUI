import { MERMAID_CLASS_DIAGRAM_CONFIG } from "../constants";
import type {
  MermaidClassDiagramStep,
  MermaidStepState,
} from "../types";

export const sortStepsByStartTime = (
  steps: MermaidClassDiagramStep[],
): MermaidClassDiagramStep[] => {
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

export const validateStepStartTimes = (
  steps: MermaidClassDiagramStep[],
): void => {
  for (let index = 0; index < steps.length; index += 1) {
    const startTime = steps[index]?.startTime;
    if (!Number.isFinite(startTime) || startTime < 0) {
      throw new Error(
        `MERMAID_CLASS_DIAGRAM step at index ${index} must have a non-negative numeric startTime.`,
      );
    }
  }
};

export const getStepStartFrames = (
  steps: MermaidClassDiagramStep[],
  fps: number,
): number[] => {
  return steps.map((step) =>
    Math.max(0, Math.round((step.startTime / 1000) * fps)),
  );
};

export const getStepState = (
  frame: number,
  stepStartFrames: number[],
): MermaidStepState => {
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

  return {
    index: currentIndex,
    startFrame,
    duration: Math.max(1, endFrame - startFrame),
    frameInStep: Math.max(0, clampedFrame - startFrame),
  };
};

export const getTotalDurationFramesFromStepStarts = ({
  steps,
  fps,
}: {
  steps: MermaidClassDiagramStep[];
  fps: number;
}): number => {
  if (steps.length === 0) return 1;

  const sorted = sortStepsByStartTime(steps);
  const lastStartMs = sorted[sorted.length - 1]?.startTime ?? 0;
  const holdMs =
    sorted.length < 2
      ? 2500
      : Math.max(
          1200,
          (sorted[sorted.length - 1]?.startTime ?? 0) -
            (sorted[sorted.length - 2]?.startTime ?? 0),
        );
  const transitionMs = MERMAID_CLASS_DIAGRAM_CONFIG.transitionDurationMs;
  const totalMs = Math.max(1, lastStartMs + holdMs + transitionMs);

  return Math.max(1, Math.round((totalMs / 1000) * fps));
};
