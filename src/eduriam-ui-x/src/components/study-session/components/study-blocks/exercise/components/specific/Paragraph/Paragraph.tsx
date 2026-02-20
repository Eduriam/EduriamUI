import React from "react";

import Typography from "@mui/material/Typography";

import { ParagraphComponent } from "../../StudyBlockComponentDTO";

export interface IParagraph {
  component: ParagraphComponent;
}

export const Paragraph: React.FC<IParagraph> = ({ component }) => {
  return <Typography variant="body1">{component.text}</Typography>;
};
