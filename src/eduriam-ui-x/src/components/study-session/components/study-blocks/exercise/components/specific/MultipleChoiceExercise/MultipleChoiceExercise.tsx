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
  onAnswerStateChange?: (answer: AnswerState) => void;
  localization?: MultipleChoiceExerciseLocalization;
}

export const MultipleChoiceExercise: React.FC<
  IMultipleChoiceExerciseStudyBlockComponent
> = ({ component, onAnswerStateChange, localization }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const assignmentTitle = localization?.assignmentTitle;

  const state = useMemo<AnswerState>(() => {
    if (!selectedId) return "NONE";
    return selectedId === component.correctOptionId ? "RIGHT" : "WRONG";
  }, [component.correctOptionId, selectedId]);

  useEffect(() => {
    onAnswerStateChange?.(state);
  }, [state, onAnswerStateChange]);

  return (
    <Stack direction="column" alignItems="center">
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
          options={component.options}
          fullWidth={false}
          onChange={(id) => setSelectedId(id)}
        />
      </Stack>
    </Stack>
  );
};

export default MultipleChoiceExercise;
