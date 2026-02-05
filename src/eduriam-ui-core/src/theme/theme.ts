import createTheme from "@mui/material/styles/createTheme";

import { componentOverrides } from "./components";
import { corePalette } from "./palette";
import { coreTypography } from "./typography";

/**
 * Eduriam design system MUI theme.
 *
 * Combines typography, palette, component overrides and spacing used across
 * all `@eduriam/ui-core` components.
 *
 * Wrap your app in `<ThemeProvider theme={theme}>` to ensure components
 * render with the intended styles.
 */
export const theme = createTheme({
  typography: coreTypography,
  palette: corePalette,
  shape: { borderRadius: 4 },
  components: componentOverrides,
  spacing: 4,
});
