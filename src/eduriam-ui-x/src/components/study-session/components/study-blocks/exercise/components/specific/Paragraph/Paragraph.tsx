import React from "react";

import Typography from "@mui/material/Typography";

import { ParagraphComponent } from "../../ExerciseStudyBlockComponentDTO";

export interface IParagraphExerciseStudyBlockComponent {
  component: ParagraphComponent;
}

export const Paragraph: React.FC<IParagraphExerciseStudyBlockComponent> = ({
  component,
}) => {
  return <Typography variant="body1">{component.text}</Typography>;
};
