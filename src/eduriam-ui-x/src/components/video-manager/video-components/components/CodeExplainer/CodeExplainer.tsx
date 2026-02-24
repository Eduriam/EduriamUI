import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import React, { useMemo } from "react";

import Box from "@mui/material/Box";

import { positionToStyle } from "../../../utils/positionToStyle";
import { CodeStepLayer } from "./components/CodeStepLayer/CodeStepLayer";
import { CodeTransitionLayer } from "./components/CodeTransitionLayer/CodeTransitionLayer";
import { CODE_THEME } from "./constants";
import type { ICodeExplainerProps } from "./types";
import { computeResponsiveCodeLayout } from "./util/layout";
import { computeStepScrollOffsets } from "./util/scroll";
import {
  getStepStartFrames,
  getStepState,
  sortStepsByStartTime,
  validateStepStartTimes,
} from "./util/timing";
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
  const transitionDurationMs = comp.transitionDurationMs ?? 550;
  const processedSteps = useMemo(
    () =>
      processStepsWithTwoslash(comp.steps, comp.autoParseTwoslash !== false),
    [comp.steps, comp.autoParseTwoslash],
  );
  const timelineSteps = useMemo(() => {
    validateStepStartTimes(processedSteps);
    return sortStepsByStartTime(processedSteps);
  }, [processedSteps]);
  const transitionDurationFrames = Math.max(
    1,
    Math.round((transitionDurationMs / 1000) * fps),
  );

  const stepStartFrames = useMemo(
    () => getStepStartFrames(timelineSteps, fps),
    [timelineSteps, fps],
  );
  const stepState = useMemo(
    () => getStepState(frame, stepStartFrames),
    [frame, stepStartFrames],
  );

  const currentStep = timelineSteps[stepState.index];
  const previousStep =
    stepState.index > 0 ? timelineSteps[stepState.index - 1] : null;
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

  const { fontSize, panelWidth, shouldWrap, codeAreaMinHeight } = useMemo(
    () =>
      computeResponsiveCodeLayout({
        steps: timelineSteps,
        compositionWidth,
        compositionHeight,
        showLineNumbers,
      }),
    [timelineSteps, compositionWidth, compositionHeight, showLineNumbers],
  );
  const stepScrollOffsets = useMemo(
    () =>
      computeStepScrollOffsets({
        steps: timelineSteps,
        fontSize,
        panelWidth,
        viewportHeight: codeAreaMinHeight,
        showLineNumbers,
        wrap: shouldWrap,
      }),
    [
      timelineSteps,
      fontSize,
      panelWidth,
      codeAreaMinHeight,
      showLineNumbers,
      shouldWrap,
    ],
  );
  const currentScrollOffsetPx = stepScrollOffsets[stepState.index] ?? 0;
  const previousScrollOffsetPx =
    stepState.index > 0 ? (stepScrollOffsets[stepState.index - 1] ?? 0) : 0;
  const scrollDurationFrames = Math.max(
    transitionDurationFrames + 8,
    Math.round(fps * 0.8),
  );
  const scrollProgress = previousStep
    ? interpolate(stepState.frameInStep, [0, scrollDurationFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
      })
    : 1;
  const smoothScrollOffsetPx = previousStep
    ? interpolate(
        scrollProgress,
        [0, 1],
        [previousScrollOffsetPx, currentScrollOffsetPx],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      )
    : currentScrollOffsetPx;
  const annotationDelayFrames = Math.max(3, Math.round(fps * 0.1));
  const annotationFadeFrames = Math.max(6, Math.round(fps * 0.2));
  const annotationStartFrame = previousStep
    ? Math.min(
        stepState.duration - 1,
        scrollDurationFrames + annotationDelayFrames,
      )
    : 0;
  const annotationEndFrame = Math.min(
    stepState.duration,
    annotationStartFrame + annotationFadeFrames,
  );
  const annotationOpacity = previousStep
    ? annotationEndFrame <= annotationStartFrame
      ? stepState.frameInStep >= annotationStartFrame
        ? 1
        : 0
      : interpolate(
          stepState.frameInStep,
          [annotationStartFrame, annotationEndFrame],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
    : 1;

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
            height: codeAreaMinHeight,
            overflow: "hidden",
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
              scrollOffsetPx={smoothScrollOffsetPx}
              panelWidth={panelWidth}
              viewportHeightPx={codeAreaMinHeight}
            />
          ) : (
            <CodeStepLayer
              step={currentStep}
              colorMode={colorMode}
              showLineNumbers={showLineNumbers}
              annotationOpacity={annotationOpacity}
              fontSize={fontSize}
              wrap={shouldWrap}
              scrollOffsetPx={smoothScrollOffsetPx}
              panelWidth={panelWidth}
              viewportHeightPx={codeAreaMinHeight}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CodeExplainer;
