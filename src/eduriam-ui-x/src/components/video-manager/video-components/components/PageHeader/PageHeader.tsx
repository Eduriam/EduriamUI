import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { positionToStyle } from "../../../utils/positionToStyle";
import type { BaseVideoComponent } from "../../VideoComponent";

export interface IPageHeader extends BaseVideoComponent {
  type: "PAGE_HEADER";
  text: string;
}

export interface IPageHeaderProps {
  comp: IPageHeader;
}

export const PageHeader: React.FC<IPageHeaderProps> = ({ comp }) => (
  <Box style={positionToStyle("TOP_CENTER")}>
    <Typography
      variant="h1"
      sx={{
        mt: 10,
        textAlign: "center",
      }}
    >
      {comp.text}
    </Typography>
  </Box>
);

export default PageHeader;
