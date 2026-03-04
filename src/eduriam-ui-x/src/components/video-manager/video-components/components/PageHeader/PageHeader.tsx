import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { BaseVideoComponent } from "../../VideoComponent";

export interface IPageHeader extends BaseVideoComponent {
  type: "PAGE_HEADER";
  text: string;
}

export interface IPageHeaderProps {
  comp: IPageHeader;
}

export const PageHeader: React.FC<IPageHeaderProps> = ({ comp }) => (
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
