import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { BaseVideoComponent } from "../../VideoComponent";

export interface IHeader extends BaseVideoComponent {
  type: "HEADER";
  text: string;
}

export interface IHeaderProps {
  comp: IHeader;
}

export const Header: React.FC<IHeaderProps> = ({ comp }) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography
      variant="h3"
      sx={{
        textAlign: "center",
      }}
    >
      {comp.text}
    </Typography>
  </Box>
);

export default Header;
