import createTheme from "@mui/material/styles/createTheme";

import { componentOverrides } from "./components";
import { corePalette, corePaletteDark } from "./palette";
import { coreTypography } from "./typography";

/**
 * Eduriam design system MUI theme.
 *
 * Combines typography, palette, component overrides and spacing used across
 * all `@eduriam/ui-core` components.
 *
 * Wrap your app in `<ThemeProvider theme={lightTheme}>` or
 * `<ThemeProvider theme={darkTheme}>` to ensure components render with the
 * intended styles.
 */
export const lightTheme = createTheme({
  typography: coreTypography,
  palette: {
    mode: "light",
    ...corePalette,
  },
  shape: { borderRadius: 4 },
  components: componentOverrides,
  spacing: 4,
});

export const darkTheme = createTheme({
  typography: coreTypography,
  palette: {
    mode: "dark",
    ...corePaletteDark,
  },
  shape: { borderRadius: 4 },
  components: componentOverrides,
  spacing: 4,
});

// Backward-compatible alias.
export const theme = lightTheme;
