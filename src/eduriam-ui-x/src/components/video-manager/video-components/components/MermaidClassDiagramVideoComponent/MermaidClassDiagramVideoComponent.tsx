import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import React, { useMemo } from "react";

import Box from "@mui/material/Box";

import { MermaidDiagram } from "../../../../study-session/components/shared/MermaidDiagram";
import { positionToStyle } from "../../../utils/positionToStyle";
import { MERMAID_CLASS_DIAGRAM_CONFIG } from "./constants";
import type { IMermaidClassDiagramVideoComponentProps } from "./types";
import {
  getStepStartFrames,
  getStepState,
  sortStepsByStartTime,
  validateStepStartTimes,
} from "./util/timing";

export type {
  IMermaidClassDiagramVideoComponent,
  IMermaidClassDiagramVideoComponentProps,
  MermaidClassDiagramStep,
} from "./types";

export const MermaidClassDiagramVideoComponent: React.FC<
  IMermaidClassDiagramVideoComponentProps
> = ({ comp }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!Array.isArray(comp.steps) || comp.steps.length === 0) {
    throw new Error(
      "MERMAID_CLASS_DIAGRAM component requires at least one step.",
    );
  }

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

  const transitionDurationFrames = Math.max(
    1,
    Math.round((MERMAID_CLASS_DIAGRAM_CONFIG.transitionDurationMs / 1000) * fps),
  );
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
        },
      )
    : 1;

  return (
    <Box style={positionToStyle(comp.position)}>
      <Box sx={{ width: "100%", position: "relative" }}>
        {previousStep && isTransitioning ? (
          <>
            <Box sx={{ ...layerSx, opacity: 1 - transitionProgress }}>
              <Box sx={diagramContainerSx}>
                <MermaidDiagram chart={previousStep.diagram} />
              </Box>
            </Box>
            <Box sx={{ ...layerSx, opacity: transitionProgress }}>
              <Box sx={diagramContainerSx}>
                <MermaidDiagram chart={currentStep.diagram} />
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={diagramContainerSx}>
            <MermaidDiagram chart={currentStep.diagram} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

const layerSx = {
  position: "absolute",
  inset: 0,
} as const;

const diagramContainerSx = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& > div": {
    width: "100%",
  },
  "& > div > svg": {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
    height: "auto",
    display: "block",
  },
};

export default MermaidClassDiagramVideoComponent;
