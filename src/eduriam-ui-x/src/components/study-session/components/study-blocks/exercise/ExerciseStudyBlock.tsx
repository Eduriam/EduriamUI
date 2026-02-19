import { LargeButton } from "@eduriam/ui-core";

import React, { useState } from "react";

import { Box, Stack } from "@mui/material";

import { AnswerState } from "../../../types/AnswerState";
import type { StudySessionLocalization } from "../../../types/StudySessionLocalization";
import { StudyBlockComponent } from "./components/StudyBlockComponent";
import { StudyBlockComponentDTO } from "./components/StudyBlockComponentDTO";

export interface IExerciseStudyBlock {
  components: StudyBlockComponentDTO[];
  /**
   * Called when the user presses the "Check" button.
   *
   * Receives the evaluation result for the current block.
   */
  onCheck?: (answer: AnswerState) => void;
  localization: StudySessionLocalization;
}

export const ExerciseStudyBlock: React.FC<IExerciseStudyBlock> = ({
  components,
  onCheck,
  localization,
}) => {
  const [answerStates, setAnswerStates] = useState<AnswerState[]>([]);
  const [studyBlockState, setStudyBlockState] = useState<
    "NOT_READY" | "READY" | "SUBMITTED"
  >("NOT_READY");

  function handleAnswerStateChange(
    newAnswerState: AnswerState,
    componentIndex: number,
  ) {
    setAnswerStates((prev) => {
      // Guard against infinite update loops when a component re-emits
      // the same answer state on re-render (common when callback identity changes).
      if (prev[componentIndex] === newAnswerState) return prev;

      const ready = isReadyToSubmit(prev, componentIndex, newAnswerState);
      setStudyBlockState((prevPhase) => {
        if (prevPhase === "SUBMITTED") return prevPhase;
        return ready ? "READY" : "NOT_READY";
      });

      const copy = [...prev];
      copy[componentIndex] = newAnswerState;
      return copy;
    });
  }

  function handleClick() {
    if (studyBlockState === "READY") {
      const isAllRight = answerStates.every((state) => state === "RIGHT");
      onCheck?.(isAllRight ? "RIGHT" : "WRONG");
      setStudyBlockState("SUBMITTED");
    }
  }

  function isReadyToSubmit(
    currentStates: AnswerState[],
    changedIndex: number,
    changedState: AnswerState,
  ) {
    const temp = [...currentStates];
    temp[changedIndex] = changedState;

    return temp.length > 0 && temp.every((s) => s !== "NONE");
  }

  return (
    <>
      <Stack spacing={6}>
        {components.map((component, index) => (
          <StudyBlockComponent
            key={index}
            component={component}
            onAnswerStateChange={(answerState) =>
              handleAnswerStateChange(answerState, index)
            }
            localization={localization}
            passiveTabsUnlocked={studyBlockState === "SUBMITTED"}
            checkDisabled={studyBlockState === "NOT_READY"}
            onCheckPress={handleClick}
          />
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <LargeButton
          onClick={handleClick}
          disabled={studyBlockState !== "READY"}
        >
          {localization.studyBlock.checkButton}
        </LargeButton>
      </Box>
    </>
  );
};
