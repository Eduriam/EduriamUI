import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { ComponentPosition } from "../../types/shared";
import { positionToStyle } from "../../utils/positionToStyle";

export type IHeader = {
  id: string;
  type: "HEADER";
  text: string;
  position: ComponentPosition;
};

export interface IHeaderProps {
  comp: IHeader;
}

export const Header: React.FC<IHeaderProps> = ({ comp }) => (
  <Box style={positionToStyle(comp.position)}>
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
