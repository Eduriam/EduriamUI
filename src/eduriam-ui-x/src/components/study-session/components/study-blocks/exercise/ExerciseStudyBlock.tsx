import { IconButton, LargeButton } from "@eduriam/ui-core";

import React, { useMemo, useState } from "react";

import { Box, Stack } from "@mui/material";

import { useStudySessionAudio } from "../../../context/StudySessionAudioContext";
import { useStudyBlockAudio } from "../../../hooks/useStudyBlockAudio";
import { AnswerState } from "../../../types/AnswerState";
import type { StudySessionDataTest } from "../../../types/StudySessionDataTest";
import type { StudySessionLocalization } from "../../../types/StudySessionLocalization";
import { isAnswerComponent } from "./components/AnswerComponentConfig";
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
  /**
   * When `true` the block has already been completed and audio should
   * not replay.
   */
  isRevisiting?: boolean;
  dataTest?: StudySessionDataTest;
}

export const ExerciseStudyBlock: React.FC<IExerciseStudyBlock> = ({
  components,
  onCheck,
  localization,
  isRevisiting = false,
  dataTest,
}) => {
  const [answerStates, setAnswerStates] = useState<AnswerState[]>([]);
  const [studyBlockState, setStudyBlockState] = useState<
    "NOT_READY" | "READY" | "SUBMITTED"
  >("NOT_READY");

  const { isMuted, toggleMute } = useStudySessionAudio();

  const audioUrls = useMemo(
    () => components.map((c) => c.audio?.url),
    [components],
  );
  useStudyBlockAudio(audioUrls, !isRevisiting);

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
      const answerableIndexes = components
        .map((component, index) => ({ component, index }))
        .filter(({ component }) => isAnswerComponent(component))
        .map(({ index }) => index);

      const isAllRight =
        answerableIndexes.length > 0 &&
        answerableIndexes.every((index) => answerStates[index] === "RIGHT");
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

    const answerableIndexes = components
      .map((component, index) => ({ component, index }))
      .filter(({ component }) => isAnswerComponent(component))
      .map(({ index }) => index);

    return (
      answerableIndexes.length > 0 &&
      answerableIndexes.every(
        (index) => temp[index] !== undefined && temp[index] !== "NONE",
      )
    );
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
            dataTest={dataTest}
          />
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <IconButton
            icon={isMuted ? "audioOff" : "audioOn"}
            variant="text"
            color="textSecondary"
            size="small"
            onClick={toggleMute}
            data-test="study-block-mute-toggle"
          />
          <LargeButton
            onClick={handleClick}
            disabled={studyBlockState !== "READY"}
            fullWidth={true}
            data-test={dataTest?.checkAnswerButton}
          >
            {localization.studyBlock.checkButton}
          </LargeButton>
        </Box>
      </Box>
    </>
  );
};
