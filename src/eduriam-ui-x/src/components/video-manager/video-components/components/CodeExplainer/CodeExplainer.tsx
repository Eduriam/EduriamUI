import React, { useMemo } from "react";

import Box from "@mui/material/Box";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { positionToStyle } from "../../../utils/positionToStyle";
import { resolveSize } from "../../../utils/resolveSize";
import { CODE_THEME } from "./constants";
import { CodeStepLayer } from "./components/CodeStepLayer/CodeStepLayer";
import { CodeTransitionLayer } from "./components/CodeTransitionLayer/CodeTransitionLayer";
import type { ICodeExplainerProps } from "./types";
import { getStepDurations, getStepState } from "./util/timing";
import { processStepsWithTwoslash } from "./util/twoslash";

export type {
  CodeExplainerAnnotation,
  CodeExplainerColorMode,
  CodeExplainerStep,
  ICodeExplainer,
  ICodeExplainerProps,
} from "./types";

export const CodeExplainer: React.FC<ICodeExplainerProps> = ({ comp }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!Array.isArray(comp.steps) || comp.steps.length === 0) {
    throw new Error("CODE_EXPLAINER component requires at least one step.");
  }

  const colorMode = comp.colorMode ?? "DARK";
  const theme = CODE_THEME[colorMode];
  const defaultStepDurationMs = comp.stepDurationMs ?? 2500;
  const transitionDurationMs = comp.transitionDurationMs ?? 550;
  const processedSteps = useMemo(
    () => processStepsWithTwoslash(comp.steps, comp.autoParseTwoslash !== false),
    [comp.steps, comp.autoParseTwoslash],
  );
  const transitionDurationFrames = Math.max(
    1,
    Math.round((transitionDurationMs / 1000) * fps),
  );

  const stepDurations = useMemo(
    () => getStepDurations(processedSteps, fps, defaultStepDurationMs),
    [processedSteps, fps, defaultStepDurationMs],
  );
  const stepState = useMemo(
    () => getStepState(frame, stepDurations),
    [frame, stepDurations],
  );

  const currentStep = processedSteps[stepState.index];
  const previousStep =
    stepState.index > 0 ? processedSteps[stepState.index - 1] : null;
  const isTransitioning = Boolean(
    previousStep && stepState.frameInStep < transitionDurationFrames,
  );

  const transitionProgress = previousStep
    ? interpolate(
        stepState.frameInStep,
        [0, transitionDurationFrames],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.17, 0.67, 0.76, 0.91),
        },
      )
    : 1;

  const annotationOpacity = interpolate(
    stepState.frameInStep,
    [Math.max(0, transitionDurationFrames - 8), transitionDurationFrames + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const width = resolveSize(comp.size);

  return (
    <Box style={positionToStyle(comp.position)}>
      <Box
        sx={{
          width,
          maxWidth: "92vw",
          borderRadius: 3,
          border: `1px solid ${theme.panelBorder}`,
          backgroundColor: theme.panel,
          p: 3,
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.28)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            minHeight: 520,
          }}
        >
          {previousStep && isTransitioning ? (
            <CodeTransitionLayer
              oldStep={previousStep}
              newStep={currentStep}
              colorMode={colorMode}
              showLineNumbers={comp.showLineNumbers !== false}
              transitionProgress={transitionProgress}
              annotationOpacity={annotationOpacity}
            />
          ) : (
            <CodeStepLayer
              step={currentStep}
              colorMode={colorMode}
              showLineNumbers={comp.showLineNumbers !== false}
              opacity={1}
              translateY={0}
              annotationOpacity={annotationOpacity}
            />
          )}
        </Box>

      </Box>
    </Box>
  );
};

export default CodeExplainer;
