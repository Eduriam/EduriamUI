import type { PaletteOptions } from "@mui/material/styles";

export const corePalette: PaletteOptions = {
  primary: {
    main: "#4fb5ea",
    light: "#90d5ff",
    dark: "#4d9ce9",
    contrastText: "#000000",
  },
  secondary: {
    main: "#f29800",
    light: "#ffc947",
    dark: "#ba6a00",
    contrastText: "#000000",
  },
  background: { paper: "#22212a", default: "#ffffff" },
  error: {
    light: "#ffd1d6",
    main: "#ff5043",
    dark: "#c12b28",
    contrastText: "#000000",
  },
  success: {
    light: "#cdf9ca",
    main: "#11d23f",
    dark: "#00a500",
    contrastText: "#000000",
  },
  warning: {
    light: "#ffe3ba",
    main: "#ffa439",
    dark: "#e0642b",
    contrastText: "#000000",
  },
  text: {
    primary: "#000000",
    secondary: "#6F6F6F",
    disabled: "#a6a6a6",
  },
  common: { white: "#ffffff", black: "#000000" },
  divider: "#e5e5e5",
  action: {
    disabled: "#a6a6a6",
    disabledBackground: "#f3f3f3",
  },
};
