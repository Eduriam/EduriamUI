import React from "react";
import Typography from "@mui/material/Typography";
import { AnswerState } from "../../../../../types/AnswerState";
import { ParagraphComponent } from "../../types/StudyBlockComponentDTO";

export interface IParagraph {
  component: ParagraphComponent;
  onAnswerStateChange?: (answer: AnswerState) => void;
}

export const Paragraph: React.FC<IParagraph> = ({ component }) => {
  return <Typography variant="body1">{component.paragraphText}</Typography>;
};
