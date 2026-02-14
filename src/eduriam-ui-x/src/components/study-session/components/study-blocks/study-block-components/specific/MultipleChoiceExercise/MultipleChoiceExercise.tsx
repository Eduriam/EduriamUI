import { LargeRadioButtonGroup } from "@eduriam/ui-core";

import React, { useEffect, useMemo, useState } from "react";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { AnswerState } from "../../../../../types/AnswerState";
import { MultipleChoiceExerciseComponent } from "../../types/StudyBlockComponentDTO";

export interface IMultipleChoiceExerciseStudyBlockComponent {
  component: MultipleChoiceExerciseComponent;
  onAnswerStateChange?: (answer: AnswerState) => void;
}

export const MultipleChoiceExercise: React.FC<
  IMultipleChoiceExerciseStudyBlockComponent
> = ({ component, onAnswerStateChange }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const state = useMemo<AnswerState>(() => {
    if (!selectedId) return "NONE";
    return selectedId === component.correctOptionId ? "RIGHT" : "WRONG";
  }, [component.correctOptionId, selectedId]);

  useEffect(() => {
    onAnswerStateChange?.(state);
  }, [state, onAnswerStateChange]);

  return (
    <Stack direction="column" gap={3} alignItems="center">
      <Stack>
        <Typography variant="h5">{component.question}</Typography>
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
