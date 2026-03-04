import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import React, { useEffect, useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import { TerminalStepLayer } from "./components/TerminalStepLayer/TerminalStepLayer";
import { TerminalTransitionLayer } from "./components/TerminalTransitionLayer/TerminalTransitionLayer";
import {
  TERMINAL_EXPLAINER_CONFIG,
  TERMINAL_HEADER_DOT_SIZE_PX,
  TERMINAL_HEADER_HEIGHT_PX,
  TERMINAL_HORIZONTAL_PADDING_PX,
  TERMINAL_THEME,
  TERMINAL_VERTICAL_PADDING_PX,
} from "./constants";
import type { ITerminalExplainerProps } from "./types";
import { computeResponsiveTerminalLayout } from "./util/layout";
import { computeStepScrollOffsets } from "./util/scroll";
import {
  getStepStartFrames,
  getStepState,
  sortStepsByStartTime,
  validateStepStartTimes,
} from "./util/timing";

export type {
  TerminalExplainerColorMode,
  TerminalExplainerStep,
  ITerminalExplainer,
  ITerminalExplainerProps,
} from "./types";

const WINDOW_DOT_COLORS = ["#ef4444", "#f59e0b", "#22c55e"] as const;

export const TerminalExplainer: React.FC<ITerminalExplainerProps> = ({ comp }) => {
  const frame = useCurrentFrame();
  const {
    fps,
    width: compositionWidth,
    height: compositionHeight,
  } = useVideoConfig();

  if (!Array.isArray(comp.steps) || comp.steps.length === 0) {
    throw new Error("TERMINAL_EXPLAINER component requires at least one step.");
  }

  const colorMode = TERMINAL_EXPLAINER_CONFIG.colorMode;
  const theme = TERMINAL_THEME[colorMode];
  const transitionDurationFrames = Math.max(
    1,
    Math.round((TERMINAL_EXPLAINER_CONFIG.transitionDurationMs / 1000) * fps),
  );

  const timelineSteps = useMemo(() => {
    validateStepStartTimes(comp.steps);
    return sortStepsByStartTime(comp.steps);
  }, [comp.steps]);

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

  const { fontSize, panelWidth, shouldWrap, viewportHeight } = useMemo(
    () =>
      computeResponsiveTerminalLayout({
        steps: timelineSteps,
        compositionWidth,
        compositionHeight,
      }),
    [timelineSteps, compositionWidth, compositionHeight],
  );

  const panelRef = useRef<HTMLDivElement | null>(null);
  const [renderedPanelWidth, setRenderedPanelWidth] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;

    const update = () => {
      const width = node.getBoundingClientRect().width;
      setRenderedPanelWidth(width > 0 ? width : null);
    };

    update();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(update);
      observer.observe(node);
      return () => observer.disconnect();
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    return undefined;
  }, [panelWidth]);

  const effectivePanelWidth = renderedPanelWidth ?? panelWidth;
  const contentViewportHeight = Math.max(
    1,
    viewportHeight - TERMINAL_VERTICAL_PADDING_PX * 2,
  );

  const stepScrollOffsets = useMemo(
    () =>
      computeStepScrollOffsets({
        steps: timelineSteps,
        fontSize,
        panelWidth: effectivePanelWidth,
        viewportHeight: contentViewportHeight,
        wrap: shouldWrap,
      }),
    [
      timelineSteps,
      fontSize,
      effectivePanelWidth,
      contentViewportHeight,
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

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        ref={panelRef}
        sx={{
          width: panelWidth,
          maxWidth: "94vw",
          borderRadius: 3,
          border: `1px solid ${theme.panelBorder}`,
          backgroundColor: theme.panel,
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.36)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: TERMINAL_HEADER_HEIGHT_PX,
            px: 2,
            display: "flex",
            alignItems: "center",
            borderBottom: `1px solid ${theme.panelBorder}`,
            backgroundColor: theme.headerBg,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {WINDOW_DOT_COLORS.map((color) => (
              <Box
                key={color}
                sx={{
                  width: TERMINAL_HEADER_DOT_SIZE_PX,
                  height: TERMINAL_HEADER_DOT_SIZE_PX,
                  borderRadius: "50%",
                  backgroundColor: color,
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            position: "relative",
            height: viewportHeight,
            overflow: "hidden",
            borderTop: `1px solid ${theme.terminalBorder}`,
            borderBottom: `1px solid ${theme.terminalBorder}`,
            backgroundColor: theme.terminalBg,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: `${TERMINAL_VERTICAL_PADDING_PX}px`,
              right: `${TERMINAL_HORIZONTAL_PADDING_PX / 2}px`,
              bottom: `${TERMINAL_VERTICAL_PADDING_PX}px`,
              left: `${TERMINAL_HORIZONTAL_PADDING_PX / 2}px`,
            }}
          >
            {previousStep && isTransitioning ? (
              <TerminalTransitionLayer
                oldStep={previousStep}
                newStep={currentStep}
                colorMode={colorMode}
                transitionProgress={transitionProgress}
                fontSize={fontSize}
                wrap={shouldWrap}
                scrollOffsetPx={smoothScrollOffsetPx}
              />
            ) : (
              <TerminalStepLayer
                step={currentStep}
                colorMode={colorMode}
                fontSize={fontSize}
                wrap={shouldWrap}
                scrollOffsetPx={smoothScrollOffsetPx}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TerminalExplainer;
