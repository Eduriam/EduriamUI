import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { positionToStyle } from "../../utils/positionToStyle";

export type IPageSubheader = {
  id: string;
  type: "PAGE_SUBHEADER";
  text: string;
};

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
