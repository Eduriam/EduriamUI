import type { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    energy: Palette["primary"];
    coin: Palette["primary"];
  }

  interface PaletteOptions {
    energy?: PaletteOptions["primary"];
    coin?: PaletteOptions["primary"];
  }
}

export const corePalette: PaletteOptions = {
  primary: {
    light: "#90D5FF",
    main: "#57B7FB",
    dark: "#4889D4",
    contrastText: "#000000",
  },
  background: { paper: "#F3F3F3", default: "#FFFFFF" },
  divider: "#E5E5E5",
  success: {
    light: "#CDF9CA",
    main: "#11D23F",
    dark: "#00A500",
    contrastText: "#000000",
  },
  error: {
    light: "#FFD1D6",
    main: "#FF5043",
    dark: "#C12B28",
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
    disabled: "#A6A6A6",
  },
  energy: { main: "#FFD951" },
  coin: { main: "#F5CB10" },
  common: { white: "#ffffff", black: "#000000" },
};

export const corePaletteDark: PaletteOptions = {
  primary: {
    light: "#90D5FF",
    main: "#57B7FB",
    dark: "#4D9CE9",
    contrastText: "#000000",
  },
  background: { paper: "#292834", default: "#1A181D" },
  divider: "#454545",
  success: {
    light: "#CDF9CA",
    main: "#11D23F",
    dark: "#00B800",
    contrastText: "#000000",
  },
  error: {
    light: "#FFD1D6",
    main: "#FF5043",
    dark: "#D03634",
    contrastText: "#000000",
  },
  warning: {
    light: "#FFE3BA",
    main: "#FFA439",
    dark: "#EC7A2F",
    contrastText: "#000000",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#989898",
    disabled: "#A6A6A6",
  },
  energy: { main: "#FFD951" },
  coin: { main: "#F5CB10" },
  common: { white: "#ffffff", black: "#000000" },
};
