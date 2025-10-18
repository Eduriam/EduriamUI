import createTheme from "@mui/material/styles/createTheme";
import { corePalette } from "./palette";
import { coreTypography } from "./typography";
import { componentOverrides } from "./components";

export const theme = createTheme({
  typography: coreTypography,
  palette: corePalette,
  shape: { borderRadius: 16 },
  components: componentOverrides,
});
