import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { positionToStyle } from "../../../utils/positionToStyle";
import type { BaseVideoComponent } from "../../VideoComponent";

export interface IPageSubheader extends BaseVideoComponent {
  type: "PAGE_SUBHEADER";
  text: string;
}

export interface IPageSubheaderProps {
  comp: IPageSubheader;
}

export const PageSubheader: React.FC<IPageSubheaderProps> = ({ comp }) => (
  <Box style={positionToStyle("TOP_CENTER")}>
    <Typography
      variant="h2"
      sx={{
        mt: 30,
        textAlign: "center",
      }}
    >
      {comp.text}
    </Typography>
  </Box>
);

export default PageSubheader;
