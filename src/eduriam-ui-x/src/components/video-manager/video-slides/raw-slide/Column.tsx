import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";

const COLUMN_SPACING: StackProps["spacing"] = { xs: 3, sm: 4 };

export interface ColumnProps {
  children?: ReactNode;
}

/**
 * Responsive slide column wrapper that stacks its children vertically.
 */
export const Column: React.FC<ColumnProps> = ({ children }) => (
  <Box
    sx={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minWidth: 0,
      width: "100%",
    }}
  >
    <Stack width="100%" flexGrow={1} direction="column" spacing={COLUMN_SPACING}>
      {children}
    </Stack>
  </Box>
);

export default Column;
