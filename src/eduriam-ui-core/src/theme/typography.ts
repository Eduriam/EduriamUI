import type { TypographyOptions } from "@mui/material/styles/createTypography";

export const coreTypography: TypographyOptions = {
  fontFamily: ["Nunito", "Poppins", "sans-serif"].join(","),
  subtitle1: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  h5: { fontSize: 22, fontFamily: "Poppins", fontWeight: 700 },
  h3: { fontSize: 36, fontFamily: "Poppins", fontWeight: 700 },
};
