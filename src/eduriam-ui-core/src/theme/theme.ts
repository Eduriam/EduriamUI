import createTheme from "@mui/material/styles/createTheme";

import { componentOverrides } from "./components";
import { corePalette } from "./palette";
import { coreTypography } from "./typography";

export const theme = createTheme({
  typography: coreTypography,
  palette: corePalette,
  shape: { borderRadius: 4 },
  components: componentOverrides,
  spacing: 4,
});
