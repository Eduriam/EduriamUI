import type { TypographyOptions } from "@mui/material/styles/createTypography";

export const coreTypography: TypographyOptions = {
  fontFamily: ["Inter", "sans-serif"].join(","),
  h1: { fontSize: 48, fontWeight: 700, lineHeight: "100%" },
  h2: { fontSize: 40, fontWeight: 700, lineHeight: "100%" },
  h3: { fontSize: 34, fontWeight: 700, lineHeight: "100%" },
  h4: { fontSize: 28, fontWeight: 600, lineHeight: "100%" },
  h5: { fontSize: 24, fontWeight: 600, lineHeight: "100%" },
  h6: { fontSize: 20, fontWeight: 600, lineHeight: 28 },
  subtitle1: { fontSize: 18, fontWeight: 400, lineHeight: "100%" },
  subtitle2: { fontSize: 16, fontWeight: 600, lineHeight: "100%" },
  body1: { fontSize: 16, fontWeight: 400, lineHeight: "100%" },
  body2: { fontSize: 14, fontWeight: 400, lineHeight: "100%" },
  button: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "0.1px",
    lineHeight: "20px",
    textTransform: "none",
  },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: "100%" },
};
