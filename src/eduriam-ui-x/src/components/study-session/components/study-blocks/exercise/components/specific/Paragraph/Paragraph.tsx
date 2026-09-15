import { Typography } from "@adapters/mui";

import React from "react";

import { ParagraphComponent } from "../../ExerciseStudyBlockComponentDTO";

export interface IParagraphExerciseStudyBlockComponent {
  component: ParagraphComponent;
}

export const Paragraph: React.FC<IParagraphExerciseStudyBlockComponent> = ({
  component,
}) => {
  return <Typography variant="body1">{component.text}</Typography>;
};
