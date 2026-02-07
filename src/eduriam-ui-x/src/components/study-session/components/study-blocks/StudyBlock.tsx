import { ContentContainer, LargeButton } from "@eduriam/ui-core";

import React, { useState } from "react";

import { Stack } from "@mui/material";

import { AnswerState } from "../../types/AnswerState";
import { StudyBlockComponent } from "./study-block-components/StudyBlockComponent";
import { StudyBlockComponentDTO } from "./study-block-components/types/StudyBlockComponentDTO";

export interface IStudyBlock {
  components: StudyBlockComponentDTO[];
  onContinue: (answer: AnswerState) => void;
  localizedTexts?: {
    continueButton: string;
    checkButton: string;
  };
}

export const StudyBlock: React.FC<IStudyBlock> = ({
  components,
  onContinue,
  localizedTexts = {
    continueButton: "Continue",
    checkButton: "Check",
  },
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
      const copy = [...prev];
      copy[componentIndex] = newAnswerState;
      return copy;
    });

    setStudyBlockState((prevPhase) => {
      if (prevPhase === "SUBMITTED") return prevPhase;
      const ready = isReadyToSubmit(
        answerStates,
        componentIndex,
        newAnswerState,
      );
      return ready ? "READY" : "NOT_READY";
    });
  }

  function handleClick() {
    if (studyBlockState === "SUBMITTED") {
      const isAllRight = answerStates.every((state) => state === "RIGHT");
      onContinue(isAllRight ? "RIGHT" : "WRONG");
      return;
    }

    if (studyBlockState === "READY") {
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
    <ContentContainer justifyContent="space-between">
      <Stack spacing={6}>
        {components.map((component, index) => (
          <StudyBlockComponent
            key={index}
            component={component}
            onAnswerStateChange={(answerState) =>
              handleAnswerStateChange(answerState, index)
            }
          />
        ))}
      </Stack>
      <LargeButton
        onClick={handleClick}
        disabled={studyBlockState === "NOT_READY"}
      >
        {studyBlockState === "SUBMITTED"
          ? localizedTexts.continueButton
          : localizedTexts.checkButton}
      </LargeButton>
    </ContentContainer>
  );
};
