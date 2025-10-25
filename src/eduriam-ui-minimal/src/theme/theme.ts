import { componentOverrides } from "@eduriam/ui-core";

import createTheme from "@mui/material/styles/createTheme";

import { minimalPalette } from "./palette";
import { minimalTypography } from "./typography";

export const theme = createTheme({
  typography: minimalTypography,
  palette: minimalPalette,
  shape: { borderRadius: 16 },
  components: componentOverrides,
});
