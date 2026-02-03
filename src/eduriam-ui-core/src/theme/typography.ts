import createTheme from "@mui/material/styles/createTheme";
import type { TypographyOptions } from "@mui/material/styles/createTypography";

const baseTheme = createTheme();

const responsiveFontSize = (mobile: number, desktop: number) => ({
  fontSize: mobile,
  [baseTheme.breakpoints.up("md")]: { fontSize: desktop },
});

export const coreTypography: TypographyOptions = {
  fontFamily: ["Inter", "sans-serif"].join(","),
  h1: { ...responsiveFontSize(48, 60), fontWeight: 700 },
  h2: { ...responsiveFontSize(40, 48), fontWeight: 700 },
  h3: { ...responsiveFontSize(34, 40), fontWeight: 700 },
  h4: { ...responsiveFontSize(28, 32), fontWeight: 600 },
  h5: { ...responsiveFontSize(24, 26), fontWeight: 600 },
  h6: { ...responsiveFontSize(20, 20), fontWeight: 600 },
  subtitle1: { ...responsiveFontSize(18, 18), fontWeight: 400 },
  subtitle2: { ...responsiveFontSize(16, 16), fontWeight: 600 },
  body1: { ...responsiveFontSize(16, 16), fontWeight: 400 },
  body2: { ...responsiveFontSize(14, 14), fontWeight: 400 },
  button: { ...responsiveFontSize(16, 16), fontWeight: 700 },
  caption: { ...responsiveFontSize(12, 12), fontWeight: 400 },
  overline: { ...responsiveFontSize(10, 10), fontWeight: 400 },
};
