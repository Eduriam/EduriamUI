import { Typography } from "@adapters/mui";

import React from "react";

import { HeaderComponent } from "../../ExerciseStudyBlockComponentDTO";

export interface IHeaderExerciseStudyBlockComponent {
  component: HeaderComponent;
}

export const Header: React.FC<IHeaderExerciseStudyBlockComponent> = ({
  component,
}) => {
  return <Typography variant="h5">{component.text}</Typography>;
};
