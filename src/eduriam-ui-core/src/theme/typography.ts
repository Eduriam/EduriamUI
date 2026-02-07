import type { CSSProperties } from "react";

import createTheme from "@mui/material/styles/createTheme";
import type { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    fieldLabel: CSSProperties;
    code: CSSProperties;
    codeButton: CSSProperties;
  }
  interface TypographyVariantsOptions {
    fieldLabel?: CSSProperties;
    code?: CSSProperties;
    codeButton?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    fieldLabel: true;
    code: true;
    codeButton: true;
  }
}

const baseTheme = createTheme();

const responsiveFontSize = (mobile: number, desktop: number) => ({
  fontSize: mobile,
  [baseTheme.breakpoints.up("md")]: { fontSize: desktop },
});

const LINE_HEIGHT_RATIO = 1.21;

export const coreTypography: TypographyOptions = {
  fontFamily: ["Inter", "sans-serif"].join(","),
  h1: {
    ...responsiveFontSize(48, 60),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 700,
  },
  h2: {
    ...responsiveFontSize(40, 48),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 700,
  },
  h3: {
    ...responsiveFontSize(34, 40),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 700,
  },
  h4: {
    ...responsiveFontSize(28, 32),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 600,
  },
  h5: {
    ...responsiveFontSize(24, 26),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 600,
  },
  h6: {
    ...responsiveFontSize(20, 20),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 600,
  },
  subtitle1: {
    ...responsiveFontSize(18, 18),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 400,
  },
  subtitle2: {
    ...responsiveFontSize(16, 16),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 600,
  },
  body1: {
    ...responsiveFontSize(16, 16),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 400,
  },
  body2: {
    ...responsiveFontSize(14, 14),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 400,
  },
  button: {
    ...responsiveFontSize(16, 16),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 700,
    textTransform: "none",
  },
  caption: {
    ...responsiveFontSize(12, 12),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 400,
  },
  overline: {
    ...responsiveFontSize(10, 10),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 400,
  },
  fieldLabel: {
    ...responsiveFontSize(18, 18),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 600,
  },
  code: {
    fontFamily: ['"JetBrains Mono"', "monospace"].join(", "),
    ...responsiveFontSize(16, 16),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 400,
  },
  codeButton: {
    fontFamily: ['"JetBrains Mono"', "monospace"].join(", "),
    ...responsiveFontSize(18, 18),
    lineHeight: LINE_HEIGHT_RATIO,
    fontWeight: 400,
    textTransform: "none",
  },
};
