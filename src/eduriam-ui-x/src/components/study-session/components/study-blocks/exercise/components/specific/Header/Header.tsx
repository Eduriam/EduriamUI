import React from "react";

import Typography from "@mui/material/Typography";

import { HeaderComponent } from "../../StudyBlockComponentDTO";

export interface IHeader {
  component: HeaderComponent;
}

export const Header: React.FC<IHeader> = ({ component }) => {
  return <Typography variant="h5">{component.text}</Typography>;
};
