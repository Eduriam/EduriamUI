import { LargeRadioButtonGroup } from "@eduriam/ui-core";

import React, { useEffect, useMemo, useState } from "react";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { AnswerState } from "../../../../../../types/AnswerState";
import { MultipleChoiceExerciseComponent } from "../../StudyBlockComponentDTO";

export interface MultipleChoiceExerciseLocalization {
  assignmentTitle?: string;
}

export interface IMultipleChoiceExerciseStudyBlockComponent {
  component: MultipleChoiceExerciseComponent;
  onAnswerStateChange?: (answer: AnswerState, userAnswerReport: string) => void;
  localization?: MultipleChoiceExerciseLocalization;
  dataTest?: MultipleChoiceExerciseDataTest;
}

export interface MultipleChoiceExerciseDataTest {
  exerciseSection?: string;
  correctAnswerButton?: string;
  incorrectAnswerButton?: string;
}

export const MultipleChoiceExercise: React.FC<
  IMultipleChoiceExerciseStudyBlockComponent
> = ({ component, onAnswerStateChange, localization, dataTest }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const assignmentTitle = localization?.assignmentTitle;

  const state = useMemo<AnswerState>(() => {
    if (!selectedId) return "NONE";
    return selectedId === component.correctOptionId ? "RIGHT" : "WRONG";
  }, [component.correctOptionId, selectedId]);

  const optionsWithDataTest = useMemo(
    () =>
      component.options.map((option) => ({
        ...option,
        "data-test":
          option.id === component.correctOptionId
            ? dataTest?.correctAnswerButton
            : dataTest?.incorrectAnswerButton,
      })),
    [
      component.correctOptionId,
      component.options,
      dataTest?.correctAnswerButton,
      dataTest?.incorrectAnswerButton,
    ],
  );

  useEffect(() => {
    const selectedOption = component.options.find(
      (option) => option.id === selectedId,
    );
    onAnswerStateChange?.(state, selectedOption?.text ?? "");
  }, [component.options, selectedId, state, onAnswerStateChange]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      data-test={dataTest?.exerciseSection}
    >
      <Stack direction="column" alignItems="flex-start" spacing={4}>
        {assignmentTitle ? (
          <>
            <Typography variant="h5" fontWeight={700}>
              {assignmentTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {component.question}
            </Typography>
          </>
        ) : (
          <Typography variant="h5">{component.question}</Typography>
        )}
        <LargeRadioButtonGroup
          options={optionsWithDataTest}
          fullWidth={false}
          onChange={(id) => setSelectedId(id)}
        />
      </Stack>
    </Stack>
  );
};

export default MultipleChoiceExercise;
