import React, { useMemo } from "react";

import Box from "@mui/material/Box";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { positionToStyle } from "../../../utils/positionToStyle";
import { CODE_THEME } from "./constants";
import { CodeStepLayer } from "./components/CodeStepLayer/CodeStepLayer";
import { CodeTransitionLayer } from "./components/CodeTransitionLayer/CodeTransitionLayer";
import type { ICodeExplainerProps } from "./types";
import { computeResponsiveCodeLayout } from "./util/layout";
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
  const {
    fps,
    width: compositionWidth,
    height: compositionHeight,
  } = useVideoConfig();

  if (!Array.isArray(comp.steps) || comp.steps.length === 0) {
    throw new Error("CODE_EXPLAINER component requires at least one step.");
  }

  const colorMode = comp.colorMode ?? "DARK";
  const theme = CODE_THEME[colorMode];
  const showLineNumbers = comp.showLineNumbers !== false;
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

  const { fontSize, panelWidth, shouldWrap, codeAreaMinHeight } = useMemo(
    () =>
      computeResponsiveCodeLayout({
        steps: processedSteps,
        compositionWidth,
        compositionHeight,
        showLineNumbers,
      }),
    [processedSteps, compositionWidth, compositionHeight, showLineNumbers],
  );

  return (
    <Box style={positionToStyle(comp.position)}>
      <Box
        sx={{
          width: panelWidth,
          maxWidth: "94vw",
          borderRadius: 3,
          border: `1px solid ${theme.panelBorder}`,
          backgroundColor: theme.panel,
          p: 3,
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.28)",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            position: "relative",
            minHeight: codeAreaMinHeight,
          }}
        >
          {previousStep && isTransitioning ? (
            <CodeTransitionLayer
              oldStep={previousStep}
              newStep={currentStep}
              colorMode={colorMode}
              showLineNumbers={showLineNumbers}
              transitionProgress={transitionProgress}
              annotationOpacity={annotationOpacity}
              fontSize={fontSize}
              wrap={shouldWrap}
            />
          ) : (
            <CodeStepLayer
              step={currentStep}
              colorMode={colorMode}
              showLineNumbers={showLineNumbers}
              annotationOpacity={annotationOpacity}
              fontSize={fontSize}
              wrap={shouldWrap}
            />
          )}
        </Box>

      </Box>
    </Box>
  );
};

export default CodeExplainer;
