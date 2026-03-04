import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { BaseVideoComponent } from "../../VideoComponent";

export interface IPageSubheader extends BaseVideoComponent {
  type: "PAGE_SUBHEADER";
  text: string;
}

export interface IPageSubheaderProps {
  comp: IPageSubheader;
}

export const PageSubheader: React.FC<IPageSubheaderProps> = ({ comp }) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
    }}
  >
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
