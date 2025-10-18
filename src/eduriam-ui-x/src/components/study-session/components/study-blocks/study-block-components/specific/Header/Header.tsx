import React from "react";
import Typography from "@mui/material/Typography";
import { AnswerState } from "../../../../../types/AnswerState";
import { HeaderComponent } from "../../types/StudyBlockComponentDTO";

export interface IHeader {
  component: HeaderComponent;
  onAnswerStateChange?: (answer: AnswerState) => void;
}

export const Header: React.FC<IHeader> = ({ component }) => {
  return <Typography variant="h5">{component.headerText}</Typography>;
};
