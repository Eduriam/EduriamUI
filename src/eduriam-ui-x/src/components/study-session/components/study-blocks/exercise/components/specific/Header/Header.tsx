import React from "react";

import Typography from "@mui/material/Typography";

import { HeaderComponent } from "../../ExerciseStudyBlockComponentDTO";

export interface IHeaderExerciseStudyBlockComponent {
  component: HeaderComponent;
}

export const Header: React.FC<IHeaderExerciseStudyBlockComponent> = ({
  component,
}) => {
  return <Typography variant="h5">{component.text}</Typography>;
};
